#!/usr/bin/env python3
"""Quick scan of all client images for Hebrew text and star patterns."""
import os
import subprocess
from PIL import Image
import numpy as np

CUSTOMERS_DIR = '/home/z/my-project/public/customers'
TESSDATA_DIR = '/home/z/my-project/scripts/tessdata'

# Scan all 54 client images with Tesseract for Hebrew
print("TESSERACT HEBREW SCAN ON CLIENT IMAGES")
print("=" * 50)

hebrew_found = []
for i in range(1, 55):
    fname = f'client-{i:02d}.jpg'
    fpath = os.path.join(CUSTOMERS_DIR, fname)
    if not os.path.exists(fpath):
        continue
    try:
        result = subprocess.run(
            ['tesseract', fpath, 'stdout', '-l', 'heb+eng', '--psm', '3'],
            capture_output=True, text=True, timeout=15,
            env={**os.environ, 'TESSDATA_PREFIX': f'{TESSDATA_DIR}/../'}
        )
        text = result.stdout.strip()
        hebrew_chars = [c for c in text if 0x0590 <= ord(c) <= 0x05FF]
        if len(hebrew_chars) >= 3:
            hebrew_found.append((fname, len(hebrew_chars), ''.join(hebrew_chars[:20])))
            print(f"HEBREW in {fname}: {len(hebrew_chars)} chars")
    except:
        pass

if not hebrew_found:
    print("No Hebrew found in client images")

# Also check for logo-like images (white background, small, with text)
print("\n\nLOGO-LIKE IMAGE CHECK")
print("=" * 50)

for i in range(1, 55):
    fname = f'client-{i:02d}.jpg'
    fpath = os.path.join(CUSTOMERS_DIR, fname)
    if not os.path.exists(fpath):
        continue
    try:
        img = Image.open(fpath).convert('RGB')
        arr = np.array(img)
        gray = np.mean(arr[:,:,:3], axis=2)
        white_pct = np.sum(gray > 230) / gray.size
        w, h = img.size
        
        # Check for images that look like logos (white background, small)
        if white_pct > 0.6 and w < 1200:
            print(f"LOGO-LIKE: {fname} [{w}x{h}] white={white_pct:.0%}")
    except:
        pass

