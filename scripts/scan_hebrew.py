#!/usr/bin/env python3
"""Scan all images used in the cinema display for Hebrew text."""
import os
import re
import subprocess
import json

# Hebrew Unicode range
HEBREW_RE = re.compile(r'[\u0590-\u05FF\uFB1D-\uFB4F]')

# All images currently referenced in useCustomerImages() and useCustomerImagesLeft()
IMAGES_TO_SCAN = [
    # client images
    *[f'/home/z/my-project/public/customers/client-{str(i).zfill(2)}.jpg' for i in range(1, 55)],
    # dsc images
    *[f'/home/z/my-project/public/customers/customer-dsc-{str(i).zfill(2)}.jpg' for i in range(1, 15)],
    # website images (currently used)
    '/home/z/my-project/public/customers/website-B.jpg',
    '/home/z/my-project/public/customers/website-D.jpg',
    '/home/z/my-project/public/customers/website-G.jpg',
    '/home/z/my-project/public/customers/website-I.jpg',
    '/home/z/my-project/public/customers/website-pic.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-3.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-4.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-5.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-6.jpg',
    # website-A images (1A through 12A)
    *[f'/home/z/my-project/public/customers/website-{i}A.png' for i in range(1, 13)],
    # equipment images
    '/home/z/my-project/public/customers/trimble-s9.jpg',
    '/home/z/my-project/public/customers/trimble-tripod.jpg',
    '/home/z/my-project/public/customers/trimble-fieldlink.jpg',
    '/home/z/my-project/public/customers/gps-rover.jpg',
    # navvis images (left side)
    '/home/z/my-project/public/customers/navvis-full-use-3.jpg',
    '/home/z/my-project/public/customers/navvis-full-use-4.jpg',
    '/home/z/my-project/public/customers/navvis-full-use-5.jpg',
    '/home/z/my-project/public/customers/navvis-full-use-6.jpg',
    '/home/z/my-project/public/customers/navvis-scanning.jpg',
    '/home/z/my-project/public/customers/navvis-industrial.jpg',
    '/home/z/my-project/public/customers/navvis-screen.jpg',
    '/home/z/my-project/public/customers/navvis-team.jpg',
    # field images (left side)
    '/home/z/my-project/public/customers/field-surveyor.jpg',
    '/home/z/my-project/public/customers/surveyor-site.jpg',
    '/home/z/my-project/public/customers/cat-excavator.jpg',
    '/home/z/my-project/public/customers/trimble-gnss.jpg',
    # Team images
    '/home/z/my-project/public/team/walaa.jpg',
    '/home/z/my-project/public/team/walaa.png',
    # Also scan the REMOVED website images to confirm they still exist
    '/home/z/my-project/public/customers/website-A.jpg',
    '/home/z/my-project/public/customers/website-C.jpg',
    '/home/z/my-project/public/customers/website-E.jpg',
    '/home/z/my-project/public/customers/website-F.jpg',
    '/home/z/my-project/public/customers/website-H.jpg',
    '/home/z/my-project/public/customers/website-J.jpg',
    '/home/z/my-project/public/customers/website-K.jpg',
    '/home/z/my-project/public/customers/website-L.jpg',
]

hebrew_found = []
scanned = 0
skipped = 0

for img_path in IMAGES_TO_SCAN:
    if not os.path.exists(img_path):
        skipped += 1
        continue
    scanned += 1
    try:
        result = subprocess.run(
            ['tesseract', img_path, 'stdout', '--psm', '6'],
            capture_output=True, text=True, timeout=30
        )
        text = result.stdout
        if HEBREW_RE.search(text):
            matches = HEBREW_RE.findall(text)
            # Get surrounding context
            hebrew_contexts = []
            for m in HEBREW_RE.finditer(text):
                start = max(0, m.start() - 20)
                end = min(len(text), m.end() + 20)
                hebrew_contexts.append(text[start:end].strip())
            basename = os.path.basename(img_path)
            hebrew_found.append({
                'file': basename,
                'path': img_path,
                'hebrew_chars': len(matches),
                'contexts': hebrew_contexts[:5],
            })
            print(f"⚠️  HEBREW FOUND: {basename} ({len(matches)} Hebrew chars)")
            for ctx in hebrew_contexts[:3]:
                print(f"    Context: {ctx}")
    except Exception as e:
        print(f"Error scanning {img_path}: {e}")

print(f"\n{'='*60}")
print(f"Scanned: {scanned} images, Skipped (not found): {skipped}")
print(f"Hebrew found in: {len(hebrew_found)} images")
print(f"\nFiles with Hebrew text:")
for item in hebrew_found:
    print(f"  - {item['file']} ({item['hebrew_chars']} Hebrew chars)")
    for ctx in item['contexts'][:3]:
        print(f"    → {ctx}")

# Save results
with open('/home/z/my-project/scripts/hebrew_scan_results.json', 'w') as f:
    json.dump(hebrew_found, f, ensure_ascii=False, indent=2)
