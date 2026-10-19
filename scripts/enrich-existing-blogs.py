#!/usr/bin/env python3
"""
Roam Morocco — Automated Blog Enrichment Pipeline via Pexels API

Enriches existing blog posts with high-resolution, brand-filtered,
responsive WebP images with embedded EXIF metadata and <picture> markup.
"""

import os
import sys
import re
from pathlib import Path

# Ensure UTF-8 output on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR / "scripts"))

# Import core curation logic
import importlib.util
spec = importlib.util.spec_from_file_location("pexels_curator", ROOT_DIR / "scripts" / "pexels-curator.py")
curator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(curator)

# ─────────────────────────────────────────────────────────────
# MANIFEST: TARGET BLOG POSTS & IMAGES TO CURATE
# ─────────────────────────────────────────────────────────────
ENRICHMENT_MANIFEST = [
    {
        "file": "src/pages/blog/ferry-from-spain-to-morocco.astro",
        "images": [
            {
                "query": "tangier morocco harbor",
                "slug": "tangier-medina-harbor-strait-gibraltar",
                "alt": "Panoramic view of Tangier historic harbor and whitewashed medina rising above the blue Strait of Gibraltar",
                "caption": "Gateway to North Africa: Tangier's ancient Kasbah and historic harbor overlooking the Strait of Gibraltar.",
                "insert_before": "<h2>1. The Two Main Routes: Tarifa vs Algeciras",
            },
            {
                "query": "morocco private driver car",
                "slug": "tangier-port-private-driver-transfer",
                "alt": "Private luxury chauffeur welcoming international travelers outside the ferry port terminal in Tangier",
                "caption": "Stress-free port transfers: Private chauffeur greeting arrivals directly outside the ferry terminal.",
                "insert_before": "<h2>2. Spain to Morocco Ferry Comparison Matrix",
            }
        ]
    },
    {
        "file": "src/pages/blog/gladiator-2-morocco-filming-locations.astro",
        "images": [
            {
                "query": "ait ben haddou morocco",
                "slug": "ait-ben-haddou-ksar-clay-citadel",
                "alt": "Ancient earthen clay towers and ramparts of Kasbah Ait Benhaddou illuminated by golden afternoon sunlight",
                "caption": "UNESCO World Heritage site: The red-earthen fortified ksar of Ait Benhaddou, backdrop for Gladiator and Gladiator II.",
                "insert_before": '<h2 id="how-to-explore-ait-benhaddou">',
            },
            {
                "query": "desert fortress ruins",
                "slug": "ouarzazate-atlas-film-studios-desert-sets",
                "alt": "Grand historical film set facades and monumental statues at Atlas Film Studios in Ouarzazate Morocco",
                "caption": "Hollywood of the Desert: Walkable monumental sets inside Atlas Film Studios in Ouarzazate.",
                "insert_before": '<h2 id="visiting-atlas-film-studios">',
            }
        ]
    },
    {
        "file": "src/pages/blog/morocco-driving-times.astro",
        "images": [
            {
                "query": "morocco atlas mountains road",
                "slug": "morocco-high-atlas-mountain-road-tizi-tichka",
                "alt": "Winding mountain switchbacks and serpentine roads crossing the High Atlas Tizi n'Tichka pass in Morocco",
                "caption": "Engineering marvel: Serpentine mountain switchbacks climbing through the 2,260-meter Tizi n'Tichka pass.",
                "insert_before": '<h2 id="morocco-driving-times-matrix">',
            },
            {
                "query": "morocco sahara desert dunes",
                "slug": "morocco-sahara-desert-highway-erg-chebbi",
                "alt": "Golden rolling sand dunes of Erg Chebbi near Merzouga under the Moroccan sun",
                "caption": "The golden horizon: The sprawling dunes of Erg Chebbi, the rewarding finale of a Sahara road expedition.",
                "insert_before": '<h2 id="five-driving-rules">',
            }
        ]
    },
    {
        "file": "src/pages/blog/morocco-train-and-private-driver.astro",
        "images": [
            {
                "query": "high speed modern train",
                "slug": "morocco-al-boraq-bullet-train-rail",
                "alt": "Modern high-speed rail train traveling across scenic countryside",
                "caption": "Africa's first high-speed rail: Al Boraq connecting Tangier to Casablanca at 320 km/h.",
                "insert_before": '<h2 id="comparing-transit-options">',
            },
            {
                "query": "morocco desert 4x4",
                "slug": "morocco-private-driver-desert-expedition",
                "alt": "Luxury private 4x4 vehicle navigating scenic desert route in Morocco",
                "caption": "Beyond the rails: Private 4x4 chauffeur handling mountain passes and remote desert tracks.",
                "insert_before": '<h3>Leg 2 (Days 4–7): The Private 4x4 Sahara Expedition</h3>',
            }
        ]
    },
    {
        "file": "src/pages/blog/is-morocco-safe-for-tourists.astro",
        "images": [
            {
                "query": "moroccan mint tea pouring",
                "slug": "morocco-mint-tea-hospitality-tradition",
                "alt": "Traditional Moroccan silver teapot pouring steaming fresh spearmint tea into decorated glasses",
                "caption": "Moroccan hospitality: Fresh mint tea (Berber whiskey) poured with a high flourish, welcoming guests.",
                "insert_before": '<h2>Sensory Overload vs. Real Danger: The Medina Mindset</h2>',
            },
            {
                "query": "chefchaouen morocco alley blue",
                "slug": "morocco-peaceful-medina-stroll-chefchaouen",
                "alt": "Travelers peacefully strolling through the picturesque blue-painted alleys of Chefchaouen Morocco",
                "caption": "Serene streets: The calm, pedestrian-only blue streets of Chefchaouen where travelers explore at leisure.",
                "insert_before": '<h2>Violent Crime vs. Petty Crimes</h2>',
            }
        ]
    },
    {
        "file": "src/pages/blog/the-art-of-the-souk-bargaining-etiquette.astro",
        "images": [
            {
                "query": "morocco spices market",
                "slug": "marrakech-spice-market-rahba-kedima",
                "alt": "Vibrant cones of saffron, cumin, ras el hanout, and paprika in Marrakech Spice Square souk",
                "caption": "A sensory awakening: Aromatic spice mounds in Rahba Kedima, Marrakech medina.",
                "insert_before": '<h2>1. The Morning Whisper: Before the Tour Buses Arrive</h2>',
            },
            {
                "query": "moroccan lanterns brass",
                "slug": "marrakech-souk-handcrafted-brass-lamps",
                "alt": "Intricately patterned handcrafted Moroccan brass lanterns hanging in a dimly lit Marrakech medina workshop",
                "caption": "Ancient metalcraft: Hand-pierced brass lanterns casting intricate geometric shadows in Souk Haddadine.",
                "insert_before": '<h2>3. The Contradiction: Transaction vs. Conversation</h2>',
            }
        ]
    }
]

def generate_figure_markup(img_info, result):
    """Builds a luxury styled responsive <figure> block for blog insertion."""
    slug = img_info["slug"]
    alt = img_info["alt"]
    caption = img_info.get("caption", alt)
    photographer = result.get("photographer", "Pexels Creator")
    photographer_url = result.get("photographer_url", "")
    
    markup = f"""
      <!-- Roam Morocco Brand Graded Responsive Visual -->
      <figure class="roam-inline-article-figure" style="margin: 36px 0; border-radius: 16px; overflow: hidden; background: #ffffff; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
        <picture>
          <source
            type="image/webp"
            srcset="/images/blog/{slug}-400.webp 400w, /images/blog/{slug}-800.webp 800w, /images/blog/{slug}-1200.webp 1200w"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
          />
          <img
            src="/images/blog/{slug}.webp"
            alt="{alt}"
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            style="width: 100%; height: auto; max-height: 480px; object-fit: cover; display: block;"
          />
        </picture>
        <figcaption style="padding: 12px 18px; font-family: 'Inter', -apple-system, sans-serif; font-size: 13px; color: rgba(0,0,0,0.65); font-style: italic; background: #faf9f6; border-top: 1px solid rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <span>{caption}</span>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #8A6A23; font-style: normal; font-weight: 600;">Photo: {photographer}</span>
        </figcaption>
      </figure>
"""
    return markup

def main():
    print("=" * 75)
    print("🚀 STARTING AUTOMATED BLOG ENRICHMENT VIA PEXELS API PIPELINE")
    print("=" * 75)
    curator.check_auth()
    
    dest_dir = "public/images/blog"
    
    for item in ENRICHMENT_MANIFEST:
        rel_path = item["file"]
        file_path = ROOT_DIR / rel_path
        
        if not file_path.exists():
            print(f"⚠️ Skipping {rel_path} (file not found)")
            continue
            
        print(f"\n📂 Processing blog: {file_path.name}")
        content = file_path.read_text(encoding="utf-8")
        modified = False
        
        for img_info in item["images"]:
            slug = img_info["slug"]
            target_file = ROOT_DIR / dest_dir / f"{slug}.webp"
            
            # Check if image already generated
            if target_file.exists():
                print(f"  ✓ Image {slug}.webp already exists on disk.")
                result = {
                    "photographer": "Curated Artist",
                    "photographer_url": "https://www.pexels.com"
                }
            else:
                print(f"  🔍 Searching Pexels for: '{img_info['query']}'...")
                res = curator.search_photos(img_info["query"], per_page=3, orientation="landscape")
                photos = res.get("photos", [])
                if not photos:
                    print(f"  ⚠️ No photos found for '{img_info['query']}', trying broader search...")
                    res = curator.search_photos("morocco travel", per_page=3, orientation="landscape")
                    photos = res.get("photos", [])
                    
                if not photos:
                    print(f"  ❌ Failed to find photo for {slug}")
                    continue
                    
                selected_photo = photos[0]
                print(f"  📥 Downloading photo ID {selected_photo['id']} by {selected_photo.get('photographer')}...")
                
                result = curator.process_and_save_photo(
                    photo_data=selected_photo,
                    slug=slug,
                    dest_dir=dest_dir,
                    custom_alt=img_info["alt"],
                    apply_filter=True,
                    sizes=[1200, 800, 400],
                    quality=82
                )
                
            # Insert into blog post if not already present
            marker = f"/images/blog/{slug}.webp"
            if marker in content:
                print(f"  ✓ Image already referenced in {file_path.name}")
            else:
                insert_anchor = img_info["insert_before"]
                if insert_anchor in content:
                    figure_html = generate_figure_markup(img_info, result)
                    content = content.replace(insert_anchor, f"{figure_html}\n{insert_anchor}", 1)
                    modified = True
                    print(f"  ➕ Inserted <figure> before anchor: '{insert_anchor[:40]}...'")
                else:
                    print(f"  ⚠️ Anchor '{insert_anchor[:40]}...' not found in {file_path.name}")
                    
        if modified:
            file_path.write_text(content, encoding="utf-8")
            print(f"💾 Updated {file_path.name} with new visual figures.")
            
    print("\n" + "=" * 75)
    print("🎉 ALL TARGET BLOG POSTS ENRICHED SUCCESSFULLY!")
    print("=" * 75)

if __name__ == "__main__":
    main()
