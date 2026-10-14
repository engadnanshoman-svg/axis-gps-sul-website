#!/usr/bin/env python3
"""Compare user's screenshots against cinema image files to find matches."""
import os
from PIL import Image
import numpy as np
from collections import Counter

CUSTOMERS_DIR = '/home/z/my-project/public/customers'
UPLOAD_DIR = '/home/z/my-project/upload'

# All images in cinema hooks
RIGHT_IMAGES = [f'client-{i:02d}.jpg' for i in range(1, 55)] + \
    [f'customer-dsc-{i:02d}.jpg' for i in range(1, 15)] + \
    ['website-navvis-use-3.jpg', 'website-navvis-use-4.jpg', 'website-navvis-use-5.jpg', 'website-navvis-use-6.jpg',
     'website-1A.png', 'website-2A.png', 'website-3A.png', 'website-5A.png', 'website-6A.png',
     'website-7A.png', 'website-8A.png', 'website-9A.png', 'website-10A.png', 'website-12A.png',
     'trimble-s9.jpg', 'gps-rover.jpg']

LEFT_IMAGES = [f'client-{i:02d}.jpg' for i in range(1, 55)] + \
    ['navvis-full-use-4.jpg', 'navvis-full-use-5.jpg', 'navvis-full-use-6.jpg',
     'navvis-scanning.jpg', 'navvis-industrial.jpg', 'navvis-screen.jpg', 'navvis-team.jpg',
     'field-surveyor.jpg', 'surveyor-site.jpg', 'cat-excavator.jpg',
     'trimble-s9.jpg', 'gps-rover.jpg',
     'website-navvis-use-3.jpg', 'website-navvis-use-4.jpg',
     'website-navvis-use-5.jpg', 'website-navvis-use-6.jpg']

ALL_CINEMA = list(set(RIGHT_IMAGES + LEFT_IMAGES))

def get_dominant_colors(img_path, n=5):
    img = Image.open(img_path).convert('RGB').resize((50, 50), Image.LANCZOS)
    arr = np.array(img).reshape(-1, 3)
    quantized = (arr // 32) * 32
    colors = [tuple(c) for c in quantized]
    counter = Counter(colors)
    return counter.most_common(n)

print("ANALYZING USER SCREENSHOTS")
print("=" * 70)

screenshots = [
    'Screenshot 2026-06-16 090920.png',
    'Screenshot 2026-06-16 091056.png', 
    'Screenshot 2026-06-16 091113.png',
    'Screenshot 2026-06-16 091148.png',
]

for ss_name in screenshots:
    ss_path = os.path.join(UPLOAD_DIR, ss_name)
    if not os.path.exists(ss_path):
        continue
    img = Image.open(ss_path)
    arr = np.array(img)
    print(f"\n{ss_name}: {img.size}")
    dominant = get_dominant_colors(ss_path)
    print(f"  Dominant: {[(f'RGB{c}',n) for c,n in dominant[:5]]}")

print("\n\nANALYZING CINEMA IMAGES")
print("=" * 70)

problematic_candidates = []

for fname in sorted(ALL_CINEMA):
    fpath = os.path.join(CUSTOMERS_DIR, fname)
    if not os.path.exists(fpath):
        continue
    try:
        img = Image.open(fpath).convert('RGB')
        arr = np.array(img)
        r, g, b = arr[:,:,0].astype(float), arr[:,:,1].astype(float), arr[:,:,2].astype(float)
        
        blue_mask = (b > 140) & (b > r * 1.5) & (b > g * 1.3)
        blue_pct = np.sum(blue_mask) / blue_mask.size
        
        gray = np.mean(arr[:,:,:3], axis=2)
        white_pct = np.sum(gray > 230) / gray.size
        dark_on_white = np.sum((gray < 50) & (gray > 0)) / gray.size
        
        file_size = os.path.getsize(fpath)
        w, h = img.size
        
        is_png = fname.endswith('.png')
        is_small_img = w <= 600 and h <= 600
        
        if is_png or is_small_img or (white_pct > 0.4 and blue_pct > 0.001):
            dominant = get_dominant_colors(fpath, 8)
            dominant_str = ', '.join([f"RGB{c}({n})" for c, n in dominant[:5]])
            
            flags = []
            if is_png: flags.append("PNG")
            if is_small_img: flags.append(f"SMALL({w}x{h})")
            if white_pct > 0.4: flags.append(f"WHITE({white_pct:.0%})")
            if blue_pct > 0.001: flags.append(f"BLUE({blue_pct:.2%})")
            if dark_on_white > 0.03: flags.append(f"DARK({dark_on_white:.0%})")
            
            print(f"\n{fname} [{w}x{h}] {file_size//1024}KB: {' | '.join(flags)}")
            print(f"  Dominant: {dominant_str}")
            
            if blue_pct > 0.001 or (is_png and dark_on_white > 0.03):
                problematic_candidates.append(fname)
    except Exception as e:
        print(f"Error with {fname}: {e}")

print(f"\n\nPOTENTIAL PROBLEMATIC: {problematic_candidates}")
