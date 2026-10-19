#!/usr/bin/env python3
"""
Roam Morocco — Pexels Image Curator & SEO Optimization Pipeline

Automates searching, downloading, brand-grading, compressing (WebP),
generating responsive variants (400w, 800w, 1200w), and producing
SEO-optimized Astro/HTML markup for blog posts and landing pages.
"""

import os
import sys
import json
import re
import argparse
import urllib.request
import urllib.parse
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

# Ensure clean UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# ─────────────────────────────────────────────────────────────
# CONFIGURATION & ENVIRONMENT

# ─────────────────────────────────────────────────────────────
ROOT_DIR = Path(__file__).resolve().parent.parent

def load_api_key():
    """Load Pexels API key from environment or root .env file."""
    api_key = os.environ.get("PEXELS_API_KEY")
    if api_key:
        return api_key

    env_path = ROOT_DIR / ".env"
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("PEXELS_API_KEY="):
                    val = line.split("=", 1)[1].strip().strip('"').strip("'")
                    if val:
                        return val
    return None

API_KEY = load_api_key()
BASE_URL = "https://api.pexels.com/v1"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

def check_auth():
    if not API_KEY:
        print("\n❌ Error: PEXELS_API_KEY not found in environment or .env file.")
        print("Please ensure .env contains: PEXELS_API_KEY=your_key_here\n")
        sys.exit(1)

# ─────────────────────────────────────────────────────────────
# API CLIENT
# ─────────────────────────────────────────────────────────────
def api_request(endpoint, params=None, retries=2):
    """Execute authenticated GET request to Pexels API with retry."""
    check_auth()
    url = f"{BASE_URL}/{endpoint}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": API_KEY,
            "User-Agent": USER_AGENT,
        }
    )
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=25) as res:
                return json.loads(res.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            print(f"❌ Pexels API HTTP Error {e.code}: {e.reason}")
            sys.exit(1)
        except Exception as e:
            if attempt < retries:
                continue
            print(f"❌ Network error contacting Pexels: {e}")
            sys.exit(1)


def search_photos(query, per_page=10, page=1, orientation="landscape"):
    """Search Pexels for photos matching query."""
    params = {
        "query": query,
        "per_page": per_page,
        "page": page,
    }
    if orientation:
        params["orientation"] = orientation
    return api_request("search", params)

def get_photo_by_id(photo_id):
    """Fetch details of a specific photo by ID."""
    return api_request(f"photos/{photo_id}")

# ─────────────────────────────────────────────────────────────
# LUXURY WARM-GOLD BRAND FILTER
# ─────────────────────────────────────────────────────────────
def apply_roam_morocco_filter(img, intensity=0.35):
    """
    Applies Roam Morocco's signature desert luxury warm-gold grade:
    - Subtle warm golden highlight/midtone lift (#C8A45C palette)
    - Gentle contrast curve
    - Slight vibrance enhancement
    - Crisp unsharp mask for architectural/textural detail
    """
    if img.mode != "RGB":
        img = img.convert("RGB")
    
    # 1. Warm Golden Tone Shift via channel curve
    r, g, b = img.split()
    
    # Curve lookup tables: warm reds & golds, softly attenuated blues
    r_lut = [min(255, int(i * 1.035)) for i in range(256)]
    g_lut = [min(255, int(i * 1.015)) for i in range(256)]
    b_lut = [max(0, int(i * 0.965)) for i in range(256)]
    
    r_warm = r.point(r_lut)
    g_warm = g.point(g_lut)
    b_warm = b.point(b_lut)
    
    warm_img = Image.merge("RGB", (r_warm, g_warm, b_warm))
    
    # Blend with original according to intensity
    graded = Image.blend(img, warm_img, alpha=intensity)
    
    # 2. Subtle luxury contrast boost
    graded = ImageEnhance.Contrast(graded).enhance(1.05)
    
    # 3. Micro-vibrance boost (makes saffron, sand, tiles pop without oversaturating)
    graded = ImageEnhance.Color(graded).enhance(1.06)
    
    # 4. Subtle unsharp mask for crisp medina & sand textures
    graded = graded.filter(ImageFilter.UnsharpMask(radius=1.2, percent=65, threshold=3))
    
    return graded

# ─────────────────────────────────────────────────────────────
# IMAGE PROCESSING & RESPONSIVE WEBP EXPORT
# ─────────────────────────────────────────────────────────────
def clean_slug(text):
    """Convert text to safe kebab-case filename."""
    s = text.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_-]+", "-", s)
    return s.strip("-")

def process_and_save_photo(photo_data, slug, dest_dir, custom_alt=None, apply_filter=True, sizes=(1200, 800, 400), quality=82):
    """
    Downloads high-res source, applies brand grading, generates responsive WebP variants,
    and returns metadata & ready-to-paste Astro/HTML snippet.
    """
    dest_path = ROOT_DIR / dest_dir
    dest_path.mkdir(parents=True, exist_ok=True)
    
    # Select highest available resolution
    srcs = photo_data.get("src", {})
    download_url = srcs.get("original") or srcs.get("large2x") or srcs.get("large")
    if not download_url:
        print("❌ Could not find valid image source URL in photo payload.")
        sys.exit(1)
        
    photographer = photo_data.get("photographer", "Pexels Creator")
    photographer_url = photo_data.get("photographer_url", "")
    alt_text = custom_alt or photo_data.get("alt") or f"{slug.replace('-', ' ').title()} Morocco"
    
    print(f"\n📥 Downloading high-res image from: {photographer}...")
    req = urllib.request.Request(download_url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as res:
        raw_data = res.read()
        
    temp_img_path = dest_path / f"_temp_{slug}.jpg"
    with open(temp_img_path, "wb") as f:
        f.write(raw_data)
        
    orig_img = Image.open(temp_img_path)
    orig_w, orig_h = orig_img.size
    aspect_ratio = orig_w / orig_h
    print(f"✓ Source resolution: {orig_w}x{orig_h} (aspect ratio: {aspect_ratio:.2f})")
    
    # Apply warm brand filter if enabled
    if apply_filter:
        print("✨ Applying Roam Morocco luxury warm-gold filter (#C8A45C warmth)...")
        master_img = apply_roam_morocco_filter(orig_img)
    else:
        master_img = orig_img.convert("RGB")
        
    # Build EXIF metadata for Google Images & brand attribution
    exif = master_img.getexif()
    exif[0x010E] = alt_text  # ImageDescription
    exif[0x013B] = f"Photo by {photographer} on Pexels / Curated by Roam Morocco Tours"  # Artist
    exif[0x8298] = "Copyright 2026 Roam Morocco Tours (https://roammorocco.tours)"  # Copyright

    saved_files = []
    
    # Generate responsive WebP variants
    # Standard sizes: 1200w (desktop/hero), 800w (content/tablet), 400w (mobile/card)
    sorted_sizes = sorted(sizes, reverse=True)
    
    for target_w in sorted_sizes:
        if orig_w < target_w:
            target_w = orig_w
            
        target_h = int(target_w / aspect_ratio)
        variant_img = master_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Suffix: -1200.webp, -800.webp, -400.webp
        filename = f"{slug}-{target_w}.webp"
        filepath = dest_path / filename
        
        variant_img.save(
            filepath,
            format="WEBP",
            quality=quality,
            method=6,
            exif=exif
        )
        size_kb = filepath.stat().st_size / 1024
        saved_files.append((filename, f"{target_w}x{target_h}", size_kb))
        
    # Also save primary fallback: <slug>.webp (using the largest generated size)
    primary_filename = f"{slug}.webp"
    primary_filepath = dest_path / primary_filename
    
    largest_w = sorted_sizes[0] if orig_w >= sorted_sizes[0] else orig_w
    largest_h = int(largest_w / aspect_ratio)
    master_variant = master_img.resize((largest_w, largest_h), Image.Resampling.LANCZOS)
    master_variant.save(
        primary_filepath,
        format="WEBP",
        quality=quality,
        method=6,
        exif=exif
    )
    primary_size_kb = primary_filepath.stat().st_size / 1024
    saved_files.insert(0, (primary_filename, f"{largest_w}x{largest_h}", primary_size_kb))
    
    # Cleanup temp download
    if temp_img_path.exists():
        temp_img_path.unlink()
        
    # Relative web URL (strips leading 'public' for Astro/Vite static serving)
    clean_dest = str(dest_dir).replace("\\", "/").strip("/")
    if clean_dest.startswith("public/"):
        clean_dest = clean_dest[7:]
    elif clean_dest == "public":
        clean_dest = ""
    rel_folder = ("/" + clean_dest.strip("/")) if clean_dest else ""
    
    print("\n✅ Successfully generated optimized WebP assets:")
    for fn, res, kb in saved_files:
        print(f"   • {fn.ljust(35)} [{res.ljust(9)}] {kb:6.1f} KB")
        
    # Construct responsive <picture> snippet
    srcset_parts = [f"{rel_folder}/{slug}-{w}.webp {w}w" for w in sorted(sizes)]
    srcset_str = ", ".join(srcset_parts)
    
    html_snippet = f"""<!-- Optimized Responsive Image (Roam Morocco Brand Graded) -->
<picture>
  <source
    type="image/webp"
    srcset="{srcset_str}"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
  />
  <img
    src="{rel_folder}/{primary_filename}"
    alt="{alt_text}"
    width="{largest_w}"
    height="{largest_h}"

    loading="lazy"
    decoding="async"
    class="w-full h-auto rounded-xl shadow-lg object-cover"
  />
</picture>
<!-- Photo by {photographer} on Pexels ({photographer_url}) -->"""

    print("\n" + "="*70)
    print("📋 READY-TO-PASTE ASTRO / HTML SNIPPET:")
    print("="*70)
    print(html_snippet)
    print("="*70 + "\n")
    
    return {
        "slug": slug,
        "primary_file": f"{rel_folder}/{primary_filename}",
        "saved_files": saved_files,
        "alt": alt_text,
        "snippet": html_snippet,
        "photographer": photographer,
        "photographer_url": photographer_url
    }

# ─────────────────────────────────────────────────────────────
# CLI COMMAND ROUTING
# ─────────────────────────────────────────────────────────────
def cmd_search(args):
    """Handle `search` command."""
    print(f"\n🔍 Searching Pexels for: '{args.query}' (orientation: {args.orientation})...\n")
    results = search_photos(args.query, per_page=args.limit, orientation=args.orientation)
    photos = results.get("photos", [])
    total = results.get("total_results", 0)
    
    if not photos:
        print(f"No photos found for '{args.query}'. Try broader search terms.")
        return
        
    print(f"Found {total} total results (showing top {len(photos)}):\n")
    print(f"{'#':<3} {'ID':<10} {'Photographer':<20} {'Size':<12} {'Description'}")
    print("-" * 75)
    for i, p in enumerate(photos, 1):
        desc = p.get("alt") or "Morocco scenic photo"
        if len(desc) > 36:
            desc = desc[:33] + "..."
        size_str = f"{p.get('width', 0)}x{p.get('height', 0)}"
        print(f"[{i}] {p['id']:<10} {p.get('photographer', 'Unknown')[:18]:<20} {size_str:<12} {desc}")
        print(f"    Preview: {p['src']['medium']}")
        print(f"    Page:    {p.get('url', '')}\n")
        
    print("💡 To curate and download a photo, run:")
    print(f'   python scripts/pexels-curator.py fetch --id <ID> --slug "your-custom-slug" --dest "public/images/blog"\n')

def cmd_fetch(args):
    """Handle `fetch` command by Photo ID."""
    print(f"🔎 Fetching details for Pexels Photo ID: {args.id}...")
    photo_data = get_photo_by_id(args.id)
    
    slug = clean_slug(args.slug)
    dest_dir = args.dest
    apply_filter = not args.no_filter
    
    process_and_save_photo(
        photo_data=photo_data,
        slug=slug,
        dest_dir=dest_dir,
        custom_alt=args.alt,
        apply_filter=apply_filter,
        sizes=[int(s.strip()) for s in args.sizes.split(",")],
        quality=args.quality
    )

def cmd_get(args):
    """One-shot search and curate top result or specified index."""
    print(f"🔎 Searching for '{args.query}'...")
    results = search_photos(args.query, per_page=5, orientation=args.orientation)
    photos = results.get("photos", [])
    if not photos:
        print(f"❌ No photos found for '{args.query}'.")
        return
        
    idx = max(0, min(args.index, len(photos) - 1))
    selected = photos[idx]
    print(f"✓ Selected photo #{idx+1} (ID: {selected['id']}) by {selected.get('photographer')}")
    
    slug = clean_slug(args.slug) if args.slug else clean_slug(args.query)
    apply_filter = not args.no_filter
    
    process_and_save_photo(
        photo_data=selected,
        slug=slug,
        dest_dir=args.dest,
        custom_alt=args.alt,
        apply_filter=apply_filter,
        sizes=[int(s.strip()) for s in args.sizes.split(",")],
        quality=args.quality
    )

def cmd_test_auth(args):
    """Test API authentication and connection."""
    check_auth()
    print("🔐 Testing Pexels API credentials...")
    data = api_request("curated", {"per_page": 1})
    if "photos" in data:
        print("✅ Pexels API connection successful!")
        print(f"   API Key: {API_KEY[:6]}...{API_KEY[-4:]}")
        print(f"   Endpoint reachable: {BASE_URL}")
    else:
        print("⚠️ API returned unexpected response.")

# ─────────────────────────────────────────────────────────────
# MAIN PARSER
# ─────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description="Roam Morocco Pexels Image Curator & SEO Optimization Pipeline"
    )
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # test-auth
    p_auth = subparsers.add_parser("test-auth", help="Verify Pexels API key and connection")
    p_auth.set_defaults(func=cmd_test_auth)
    
    # search
    p_search = subparsers.add_parser("search", help="Search photos on Pexels")
    p_search.add_argument("query", help="Keywords to search (e.g. 'morocco spices')")
    p_search.add_argument("--limit", type=int, default=5, help="Number of results (default: 5)")
    p_search.add_argument("--orientation", choices=["landscape", "portrait", "square"], default="landscape")
    p_search.set_defaults(func=cmd_search)
    
    # fetch
    p_fetch = subparsers.add_parser("fetch", help="Download and optimize photo by ID")
    p_fetch.add_argument("--id", type=int, required=True, help="Pexels photo ID")
    p_fetch.add_argument("--slug", required=True, help="SEO kebab-case filename (e.g. 'marrakech-souk-spices')")
    p_fetch.add_argument("--dest", default="public/images/blog", help="Destination folder (default: public/images/blog)")
    p_fetch.add_argument("--alt", default=None, help="Custom descriptive alt text for SEO")
    p_fetch.add_argument("--no-filter", action="store_true", help="Disable Roam Morocco luxury warm-gold filter")
    p_fetch.add_argument("--sizes", default="1200,800,400", help="Comma-separated responsive widths (default: 1200,800,400)")
    p_fetch.add_argument("--quality", type=int, default=82, help="WebP compression quality (default: 82)")
    p_fetch.set_defaults(func=cmd_fetch)
    
    # get (one-shot search & download)
    p_get = subparsers.add_parser("get", help="One-shot search and download top match")
    p_get.add_argument("query", help="Keywords to search (e.g. 'morocco sahara desert')")
    p_get.add_argument("--slug", default=None, help="SEO kebab-case filename")
    p_get.add_argument("--dest", default="public/images/blog", help="Destination folder (default: public/images/blog)")
    p_get.add_argument("--index", type=int, default=0, help="Result index to pick (default: 0)")
    p_get.add_argument("--alt", default=None, help="Custom descriptive alt text")
    p_get.add_argument("--orientation", choices=["landscape", "portrait", "square"], default="landscape")
    p_get.add_argument("--no-filter", action="store_true", help="Disable Roam Morocco luxury warm-gold filter")
    p_get.add_argument("--sizes", default="1200,800,400", help="Responsive widths (default: 1200,800,400)")
    p_get.add_argument("--quality", type=int, default=82, help="WebP quality (default: 82)")
    p_get.set_defaults(func=cmd_get)
    
    args = parser.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
