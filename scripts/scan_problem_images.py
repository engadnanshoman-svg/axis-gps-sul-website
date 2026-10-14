#!/usr/bin/env python3
"""Scan all cinema images for Star of David/hexagram symbols and Hebrew text."""
import os
from PIL import Image
import numpy as np

CUSTOMERS_DIR = '/home/z/my-project/public/customers'

# Images in RIGHT cinema hook
RIGHT_CINEMA = []
# client images
for i in range(1, 55):
    RIGHT_CINEMA.append(f'client-{i:02d}.jpg')
# dsc images
for i in range(1, 15):
    RIGHT_CINEMA.append(f'customer-dsc-{i:02d}.jpg')
# website images in right hook
RIGHT_CINEMA.extend([
    'website-navvis-use-3.jpg', 'website-navvis-use-4.jpg',
    'website-navvis-use-5.jpg', 'website-navvis-use-6.jpg',
    'website-1A.png', 'website-2A.png', 'website-3A.png',
    'website-5A.png', 'website-6A.png', 'website-7A.png',
    'website-8A.png', 'website-9A.png', 'website-10A.png', 'website-12A.png',
    'trimble-s9.jpg', 'gps-rover.jpg',
])

# Images in LEFT cinema hook
LEFT_CINEMA = []
for i in range(1, 55):
    LEFT_CINEMA.append(f'client-{i:02d}.jpg')
LEFT_CINEMA.extend([
    'navvis-full-use-4.jpg', 'navvis-full-use-5.jpg', 'navvis-full-use-6.jpg',
    'navvis-scanning.jpg', 'navvis-industrial.jpg', 'navvis-screen.jpg', 'navvis-team.jpg',
    'field-surveyor.jpg', 'surveyor-site.jpg', 'cat-excavator.jpg',
    'trimble-s9.jpg', 'gps-rover.jpg',
    'website-navvis-use-3.jpg', 'website-navvis-use-4.jpg',
    'website-navvis-use-5.jpg', 'website-navvis-use-6.jpg',
])

ALL_CINEMA = list(set(RIGHT_CINEMA + LEFT_CINEMA))

def has_hebrew_pixels(img_path):
    """Check if image likely contains Hebrew text by looking for specific patterns."""
    try:
        img = Image.open(img_path)
        arr = np.array(img)
        # Check if image is mostly white/light (typical of logos/screenshots with text)
        if len(arr.shape) == 3:
            gray = np.mean(arr[:,:,:3], axis=2)
        else:
            gray = arr.astype(float)
        
        white_ratio = np.sum(gray > 230) / gray.size
        dark_ratio = np.sum(gray < 50) / gray.size
        
        # Logo-type images: high white ratio with some dark elements
        return white_ratio, dark_ratio
    except Exception as e:
        return 0, 0

def detect_blue_star(img_path):
    """Look for blue star/hexagram patterns - Israeli flag blue is approximately RGB(0,51,160)."""
    try:
        img = Image.open(img_path)
        arr = np.array(img)
        if len(arr.shape) != 3:
            return False, 0
        
        r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
        # Israeli flag blue range: R<80, G<80, B>120
        blue_mask = (r < 80) & (g < 80) & (b > 120)
        blue_ratio = np.sum(blue_mask) / blue_mask.size
        
        # Check for the specific blue (0, 51-70, 150-200)
        specific_blue = (r < 30) & (g > 30) & (g < 100) & (b > 140) & (b < 220)
        specific_blue_ratio = np.sum(specific_blue) / specific_blue.size
        
        return blue_ratio > 0.01, specific_blue_ratio
    except Exception as e:
        return False, 0

print("=" * 70)
print("SCANNING ALL CINEMA IMAGES FOR PROBLEMATIC CONTENT")
print("=" * 70)

suspicious = []

for fname in sorted(ALL_CINEMA):
    fpath = os.path.join(CUSTOMERS_DIR, fname)
    if not os.path.exists(fpath):
        continue
    
    try:
        img = Image.open(fpath)
        w, h = img.size
        arr = np.array(img)
        
        white_ratio, dark_ratio = has_hebrew_pixels(fpath)
        has_blue, blue_ratio = detect_blue_star(fpath)
        
        # Detect small images (likely logos) with high white content
        is_small = w < 800 or h < 600
        is_logo_like = white_ratio > 0.5 and dark_ratio > 0.05
        
        flags = []
        if is_logo_like:
            flags.append(f"LOGO_LIKE(w={white_ratio:.2f},d={dark_ratio:.2f})")
        if has_blue and blue_ratio > 0.005:
            flags.append(f"BLUE_STAR(blue={blue_ratio:.4f})")
        if is_small:
            flags.append(f"SMALL({w}x{h})")
        
        if flags:
            suspicious.append((fname, flags, w, h))
            print(f"⚠️  {fname} [{w}x{h}]: {' | '.join(flags)}")
    except Exception as e:
        print(f"❌ {fname}: ERROR - {e}")

print("\n" + "=" * 70)
print(f"Total suspicious images: {len(suspicious)}")
print("=" * 70)

# Now specifically check the website-XA images more carefully
print("\n\nDETAILED ANALYSIS OF WEBSITE-XA IMAGES:")
print("-" * 50)
for i in range(1, 13):
    for ext in ['png', 'jpg']:
        fname = f'website-{i}A.{ext}'
        fpath = os.path.join(CUSTOMERS_DIR, fname)
        if os.path.exists(fpath):
            img = Image.open(fpath)
            arr = np.array(img)
            w, h = img.size
            # Color analysis
            if len(arr.shape) == 3:
                r_ch = arr[:,:,0].astype(float)
                g_ch = arr[:,:,1].astype(float)
                b_ch = arr[:,:,2].astype(float)
                
                # Check for distinct blue areas
                blue_mask = (r_ch < 80) & (g_ch < 80) & (b_ch > 120)
                blue_pct = np.sum(blue_mask) / blue_mask.size * 100
                
                # Check for red areas
                red_mask = (r_ch > 150) & (g_ch < 100) & (b_ch < 100)
                red_pct = np.sum(red_mask) / red_mask.size * 100
                
                # Check for gray (common in logos)
                gray_vals = np.mean(arr[:,:,:3], axis=2).astype(float)
                gray_mask = (gray_vals > 100) & (gray_vals < 200)
                gray_pct = np.sum(gray_mask) / gray_mask.size * 100
                
                # White background
                white_pct = np.sum(gray_vals > 230) / gray_vals.size * 100
                
                print(f"{fname} [{w}x{h}]: blue={blue_pct:.1f}%, red={red_pct:.1f}%, gray={gray_pct:.1f}%, white={white_pct:.1f}%")
            break

