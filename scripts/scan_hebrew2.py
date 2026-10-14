#!/usr/bin/env python3
"""Scan all images for Hebrew text using tesseract with Hebrew language support."""
import os
import re
import subprocess
import json

HEBREW_RE = re.compile(r'[\u0590-\u05FF\uFB1D-\uFB4F]')

# Only scan images that are currently USED in the cinema display
IMAGES_TO_SCAN = [
    # website images currently used in useCustomerImages()  
    '/home/z/my-project/public/customers/website-B.jpg',
    '/home/z/my-project/public/customers/website-D.jpg',
    '/home/z/my-project/public/customers/website-G.jpg',
    '/home/z/my-project/public/customers/website-I.jpg',
    '/home/z/my-project/public/customers/website-pic.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-3.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-4.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-5.jpg',
    '/home/z/my-project/public/customers/website-navvis-use-6.jpg',
    # website-1A through 12A
    *[f'/home/z/my-project/public/customers/website-{i}A.png' for i in range(1, 13)],
    # client images
    *[f'/home/z/my-project/public/customers/client-{str(i).zfill(2)}.jpg' for i in range(1, 55)],
    # dsc images
    *[f'/home/z/my-project/public/customers/customer-dsc-{str(i).zfill(2)}.jpg' for i in range(1, 15)],
    # equipment images
    '/home/z/my-project/public/customers/trimble-s9.jpg',
    '/home/z/my-project/public/customers/trimble-tripod.jpg',
    '/home/z/my-project/public/customers/trimble-fieldlink.jpg',
    '/home/z/my-project/public/customers/gps-rover.jpg',
    # navvis images
    '/home/z/my-project/public/customers/navvis-full-use-3.jpg',
    '/home/z/my-project/public/customers/navvis-full-use-4.jpg',
    '/home/z/my-project/public/customers/navvis-full-use-5.jpg',
    '/home/z/my-project/public/customers/navvis-full-use-6.jpg',
    '/home/z/my-project/public/customers/navvis-scanning.jpg',
    '/home/z/my-project/public/customers/navvis-industrial.jpg',
    '/home/z/my-project/public/customers/navvis-screen.jpg',
    '/home/z/my-project/public/customers/navvis-team.jpg',
    # field images
    '/home/z/my-project/public/customers/field-surveyor.jpg',
    '/home/z/my-project/public/customers/surveyor-site.jpg',
    '/home/z/my-project/public/customers/cat-excavator.jpg',
    '/home/z/my-project/public/customers/trimble-gnss.jpg',
    # Team walaa
    '/home/z/my-project/public/team/walaa.jpg',
    '/home/z/my-project/public/team/walaa.png',
]

hebrew_found = []
scanned = 0

env = os.environ.copy()
env['TESSDATA_PREFIX'] = '/home/z/my-project/scripts/'

for img_path in IMAGES_TO_SCAN:
    if not os.path.exists(img_path):
        continue
    scanned += 1
    try:
        # Try with Hebrew language
        result = subprocess.run(
            ['tesseract', img_path, 'stdout', '--psm', '6', '-l', 'heb+eng'],
            capture_output=True, text=True, timeout=30, env=env
        )
        text = result.stdout
        if HEBREW_RE.search(text):
            matches = HEBREW_RE.findall(text)
            contexts = []
            for m in HEBREW_RE.finditer(text):
                start = max(0, m.start() - 30)
                end = min(len(text), m.end() + 30)
                contexts.append(text[start:end].strip())
            basename = os.path.basename(img_path)
            hebrew_found.append({
                'file': basename,
                'path': img_path,
                'hebrew_chars': len(matches),
                'contexts': contexts[:5],
            })
            print(f"⚠️  HEBREW: {basename} ({len(matches)} chars)")
            for ctx in contexts[:3]:
                print(f"    → {ctx}")
    except Exception as e:
        basename = os.path.basename(img_path)
        print(f"Error {basename}: {e}")

# Also check for Israeli/inappropriate keywords in English OCR
print(f"\n{'='*60}")
print("Checking for Israeli/institution references...")
israeli_keywords = ['israel', 'israeli', 'idf', 'ministry of defence', 'ben-gurion', 
                     'hebrew university', 'technion', 'elbit', 'rafael', 'iaf ',
                     'mossad', 'shin bet', 'israel defense']
keyword_found = []

for img_path in IMAGES_TO_SCAN:
    if not os.path.exists(img_path):
        continue
    try:
        result = subprocess.run(
            ['tesseract', img_path, 'stdout', '--psm', '6', '-l', 'eng'],
            capture_output=True, text=True, timeout=30
        )
        text = result.stdout.lower()
        for kw in israeli_keywords:
            if kw in text:
                basename = os.path.basename(img_path)
                keyword_found.append({'file': basename, 'keyword': kw})
                print(f"⚠️  KEYWORD '{kw}' found in: {basename}")
                break
    except:
        pass

print(f"\n{'='*60}")
print(f"Scanned: {scanned} images")
print(f"Hebrew text found in: {len(hebrew_found)} images")
print(f"Israeli keywords found in: {len(keyword_found)} images")

print(f"\n--- HEBREW IMAGES ---")
for item in hebrew_found:
    print(f"  REMOVE: {item['file']}")

print(f"\n--- KEYWORD IMAGES ---")
for item in keyword_found:
    print(f"  REMOVE: {item['file']} (keyword: {item['keyword']})")

# Save combined results
all_bad = []
for item in hebrew_found:
    all_bad.append({'file': item['file'], 'reason': 'hebrew_text', 'chars': item['hebrew_chars']})
for item in keyword_found:
    if not any(b['file'] == item['file'] for b in all_bad):
        all_bad.append({'file': item['file'], 'reason': f'keyword:{item["keyword"]}'})

with open('/home/z/my-project/scripts/hebrew_scan_results.json', 'w') as f:
    json.dump(all_bad, f, ensure_ascii=False, indent=2)
print(f"\nTotal images to remove: {len(all_bad)}")
