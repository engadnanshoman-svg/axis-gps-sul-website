#!/usr/bin/env python3
"""Deep scan all cinema images for Hebrew text and hexagram patterns."""
import os
import subprocess
from PIL import Image
import numpy as np

CUSTOMERS_DIR = '/home/z/my-project/public/customers'
TESSDATA_DIR = '/home/z/my-project/scripts/tessdata'

# All unique images currently in the cinema hooks
RIGHT_IMAGES = []
for i in range(1, 55):
    RIGHT_IMAGES.append(f'client-{i:02d}.jpg')
for i in range(1, 15):
    RIGHT_IMAGES.append(f'customer-dsc-{i:02d}.jpg')
RIGHT_IMAGES.extend([
    'website-navvis-use-3.jpg', 'website-navvis-use-4.jpg',
    'website-navvis-use-5.jpg', 'website-navvis-use-6.jpg',
    'website-1A.png', 'website-2A.png', 'website-3A.png',
    'website-5A.png', 'website-6A.png', 'website-7A.png',
    'website-8A.png', 'website-9A.png', 'website-10A.png', 'website-12A.png',
    'trimble-s9.jpg', 'gps-rover.jpg',
])

LEFT_IMAGES = []
for i in range(1, 55):
    LEFT_IMAGES.append(f'client-{i:02d}.jpg')
LEFT_IMAGES.extend([
    'navvis-full-use-4.jpg', 'navvis-full-use-5.jpg', 'navvis-full-use-6.jpg',
    'navvis-scanning.jpg', 'navvis-industrial.jpg', 'navvis-screen.jpg', 'navvis-team.jpg',
    'field-surveyor.jpg', 'surveyor-site.jpg', 'cat-excavator.jpg',
    'trimble-s9.jpg', 'gps-rover.jpg',
    'website-navvis-use-3.jpg', 'website-navvis-use-4.jpg',
    'website-navvis-use-5.jpg', 'website-navvis-use-6.jpg',
])

ALL_IMAGES = list(set(RIGHT_IMAGES + LEFT_IMAGES))

print("=" * 70)
print("STEP 1: TESSERACT OCR SCAN FOR HEBREW TEXT")
print("=" * 70)

hebrew_found = []
for fname in sorted(ALL_IMAGES):
    fpath = os.path.join(CUSTOMERS_DIR, fname)
    if not os.path.exists(fpath):
        continue
    try:
        result = subprocess.run(
            ['tesseract', fpath, 'stdout', '-l', 'heb', '--psm', '6'],
            capture_output=True, text=True, timeout=10,
            env={**os.environ, 'TESSDATA_PREFIX': f'{TESSDATA_DIR}/../'}
        )
        text = result.stdout.strip()
        # Filter out noise - Hebrew Unicode range: 0x0590-0x05FF
        hebrew_chars = [c for c in text if 0x0590 <= ord(c) <= 0x05FF]
        if len(hebrew_chars) >= 2:  # At least 2 Hebrew characters
            hebrew_found.append((fname, ''.join(hebrew_chars), len(hebrew_chars)))
            print(f"🔴 HEBREW FOUND in {fname}: {len(hebrew_chars)} chars - {''.join(hebrew_chars[:30])}")
    except Exception as e:
        pass

if not hebrew_found:
    print("No Hebrew text found with Tesseract OCR")

print("\n" + "=" * 70)
print("STEP 2: HEXAGRAM/STAR PATTERN DETECTION")
print("=" * 70)

def detect_hexagram_pattern(img_path):
    """Detect hexagram (Star of David) pattern by looking for:
    - Two overlapping triangles forming a six-pointed star
    - Dominant blue color (Israeli flag blue)
    - High symmetry
    """
    try:
        img = Image.open(img_path).convert('RGB')
        arr = np.array(img)
        h, w = arr.shape[:2]
        
        # Resize for faster processing if large
        if max(h, w) > 600:
            scale = 600 / max(h, w)
            img2 = img.resize((int(w*scale), int(h*scale)), Image.LANCZOS)
            arr = np.array(img2)
            h, w = arr.shape[:2]
        
        r, g, b = arr[:,:,0].astype(float), arr[:,:,1].astype(float), arr[:,:,2].astype(float)
        
        # 1. Check for Israeli-flag-like blue: RGB(0, 51, 160) range
        israeli_blue = (r < 60) & (g < 80) & (b > 120) & (b < 220) & (b > r + 60) & (b > g + 40)
        blue_pct = np.sum(israeli_blue) / israeli_blue.size
        
        # 2. Check for ANY strong blue presence
        any_blue = (b > 150) & (b > r * 1.5) & (b > g * 1.3)
        any_blue_pct = np.sum(any_blue) / any_blue.size
        
        # 3. Check for star-like shapes by looking at symmetry
        # A hexagram has 6-fold rotational symmetry
        # Check if the blue pixels are concentrated in a central region
        if np.sum(israeli_blue) > 50:
            blue_ys, blue_xs = np.where(israeli_blue)
            if len(blue_ys) > 0:
                cy, cx = np.mean(blue_ys), np.mean(blue_xs)
                # Check if blue pixels are roughly symmetric around center
                left_blue = np.sum(israeli_blue[:, :int(cx)])
                right_blue = np.sum(israeli_blue[:, int(cx):])
                if left_blue + right_blue > 0:
                    lr_symmetry = min(left_blue, right_blue) / max(left_blue, right_blue)
                else:
                    lr_symmetry = 0
                
                top_blue = np.sum(israeli_blue[:int(cy), :])
                bottom_blue = np.sum(israeli_blue[int(cy):, :])
                if top_blue + bottom_blue > 0:
                    tb_symmetry = min(top_blue, bottom_blue) / max(top_blue, bottom_blue)
                else:
                    tb_symmetry = 0
                
                # Spread of blue pixels
                spread_y = np.std(blue_ys) / h
                spread_x = np.std(blue_xs) / w
                
                return {
                    'blue_pct': blue_pct,
                    'any_blue_pct': any_blue_pct,
                    'lr_symmetry': lr_symmetry,
                    'tb_symmetry': tb_symmetry,
                    'spread': (spread_x + spread_y) / 2,
                    'is_star_like': lr_symmetry > 0.6 and tb_symmetry > 0.4 and spread < 0.25 and blue_pct > 0.005
                }
        
        return {
            'blue_pct': blue_pct,
            'any_blue_pct': any_blue_pct,
            'lr_symmetry': 0,
            'tb_symmetry': 0,
            'spread': 1,
            'is_star_like': False
        }
    except Exception as e:
        return {'blue_pct': 0, 'any_blue_pct': 0, 'lr_symmetry': 0, 'tb_symmetry': 0, 'spread': 1, 'is_star_like': False, 'error': str(e)}

star_found = []
for fname in sorted(ALL_IMAGES):
    fpath = os.path.join(CUSTOMERS_DIR, fname)
    if not os.path.exists(fpath):
        continue
    result = detect_hexagram_pattern(fpath)
    if result['is_star_like']:
        star_found.append((fname, result))
        print(f"⭐ STAR-LIKE PATTERN in {fname}: blue={result['blue_pct']:.4f}, sym_lr={result['lr_symmetry']:.2f}, sym_tb={result['tb_symmetry']:.2f}, spread={result['spread']:.3f}")
    elif result['blue_pct'] > 0.01:
        print(f"🔵 Blue in {fname}: blue={result['blue_pct']:.4f}, any_blue={result['any_blue_pct']:.4f}")

if not star_found:
    print("No hexagram/star pattern detected with pixel analysis")

# STEP 3: Compare user screenshots against cinema images
print("\n" + "=" * 70)
print("STEP 3: MATCHING USER SCREENSHOTS TO IMAGE FILES")
print("=" * 70)

# The user's screenshot shows a blue hexagram. Let me find which image has the most similar blue pattern.
screenshot_path = '/home/z/my-project/upload/Screenshot 2026-06-16 090920.png'
if os.path.exists(screenshot_path):
    # Extract the blue pattern from the screenshot
    ss_img = Image.open(screenshot_path).convert('RGB')
    ss_arr = np.array(ss_img)
    ss_r, ss_g, ss_b = ss_arr[:,:,0].astype(float), ss_arr[:,:,1].astype(float), ss_arr[:,:,2].astype(float)
    ss_blue = (ss_r < 60) & (ss_g < 80) & (ss_b > 120) & (ss_b < 220)
    ss_blue_profile = np.mean(ss_arr[ss_blue], axis=0) if np.sum(ss_blue) > 0 else np.array([0,0,0])
    print(f"Screenshot blue color profile: R={ss_blue_profile[0]:.0f}, G={ss_blue_profile[1]:.0f}, B={ss_blue_profile[2]:.0f}")
    
    # Now find cinema images with similar blue profile
    best_matches = []
    for fname in sorted(ALL_IMAGES):
        fpath = os.path.join(CUSTOMERS_DIR, fname)
        if not os.path.exists(fpath):
            continue
        try:
            img = Image.open(fpath).convert('RGB')
            arr = np.array(img)
            r, g, b = arr[:,:,0].astype(float), arr[:,:,1].astype(float), arr[:,:,2].astype(float)
            
            # Find blue pixels matching the screenshot's blue profile
            # Israeli blue: R<60, G<80, 120<B<220
            blue_mask = (r < 60) & (g < 80) & (b > 120) & (b < 220)
            blue_count = np.sum(blue_mask)
            
            if blue_count > 100:
                blue_pixels = arr[blue_mask]
                mean_blue = np.mean(blue_pixels, axis=0)
                
                # Calculate color distance to screenshot blue
                dist = np.sqrt(np.sum((mean_blue - ss_blue_profile) ** 2))
                
                # Also check for white background (logo-like)
                gray = np.mean(arr[:,:,:3], axis=2)
                white_pct = np.sum(gray > 230) / gray.size
                
                best_matches.append((fname, dist, np.sum(blue_mask)/blue_mask.size, white_pct))
        except:
            pass
    
    best_matches.sort(key=lambda x: x[1])
    print("\nClosest blue color matches to screenshot:")
    for fname, dist, blue_pct, white_pct in best_matches[:10]:
        print(f"  {fname}: color_dist={dist:.1f}, blue_pct={blue_pct:.4f}, white={white_pct:.2f}")

print("\n" + "=" * 70)
print("SUMMARY")
print("=" * 70)
print(f"Hebrew text found in: {[f[0] for f in hebrew_found]}")
print(f"Star pattern found in: {[f[0] for f in star_found]}")

