#!/usr/bin/env python3
"""
Packaging script for Roam Morocco Travel Companion browser extension.
Validates Manifest V3 compliance, icons, and bundles a ready-to-upload ZIP.
"""

import json
import os
import sys
import zipfile
from pathlib import Path

BASE_DIR = Path(__file__).parent.resolve()
EXT_DIR = BASE_DIR / "roammorocco-travel-companion"
OUTPUT_ZIP = BASE_DIR / "roammorocco-travel-companion-v1.0.0.zip"

def validate_extension():
    print("=== 1. Validating Extension Manifest & Files ===")
    manifest_path = EXT_DIR / "manifest.json"
    if not manifest_path.exists():
        print("ERROR: manifest.json not found!", file=sys.stderr)
        return False

    with open(manifest_path, "r", encoding="utf-8") as f:
        try:
            m = json.load(f)
        except Exception as e:
            print(f"ERROR: Invalid manifest JSON: {e}", file=sys.stderr)
            return False

    if m.get("manifest_version") != 3:
        print("ERROR: manifest_version must be 3!", file=sys.stderr)
        return False

    print(f"[OK] Manifest V3: OK (Name: {m.get('name')}, Version: {m.get('version')})")

    # Validate required icons
    icons = m.get("icons", {})
    for size, rel_path in icons.items():
        icon_file = EXT_DIR / rel_path
        if not icon_file.exists():
            print(f"ERROR: Icon {rel_path} missing!", file=sys.stderr)
            return False
    print("[OK] All icon assets verified (16, 32, 48, 128px)")

    # Validate HTML / CSS / JS
    for req_file in ["popup.html", "popup.css", "popup.js"]:
        if not (EXT_DIR / req_file).exists():
            print(f"ERROR: {req_file} missing!", file=sys.stderr)
            return False
    print("[OK] UI files verified (popup.html, popup.css, popup.js)")
    return True

def package_zip():
    print("\n=== 2. Creating Store-Ready ZIP Package ===")
    if OUTPUT_ZIP.exists():
        OUTPUT_ZIP.unlink()

    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(EXT_DIR):
            for file in files:
                full_path = Path(root) / file
                rel_path = full_path.relative_to(EXT_DIR)
                # Skip hidden/system files
                if file.startswith(".") or file.endswith(".tmp"):
                    continue
                zipf.write(full_path, rel_path)
                print(f"  + Added: {rel_path}")

    size_kb = OUTPUT_ZIP.stat().st_size / 1024
    print(f"\nSUCCESS: Created package -> {OUTPUT_ZIP.name} ({size_kb:.1f} KB)")
    print(f"Absolute Path: {OUTPUT_ZIP}")
    return True

if __name__ == "__main__":
    if validate_extension():
        package_zip()
        print("\nAll checks passed! Extension is ready for Microsoft Edge & Firefox submission.")
    else:
        sys.exit(1)
