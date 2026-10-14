#!/usr/bin/env python3
"""Compare user screenshots against ALL cinema image files using perceptual hashing and histogram comparison."""
import os
from PIL import Image
import numpy as np

CUSTOMERS_DIR = '/home/z/my-project/public/customers'
UPLOAD_DIR = '/home/z/my-project/upload'

# All cinema images
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

screenshots = [
    ('Screenshot 2026-06-16 090920.png', 'hexagram_star'),
    ('Screenshot 2026-06-16 091056.png', 'hexagram_star_2'),
    ('Screenshot 2026-06-16 091113.png', 'hebrew_logo_1'),
    ('Screenshot 2026-06-16 091148.png', 'hebrew_logo_2'),
]

def compute_phash(img, hash_size=16):
    """Compute perceptual hash."""
    img = img.convert('RGB').resize((hash_size, hash_size), Image.LANCZOS)
    arr = np.array(img, dtype=float)
    gray = np.mean(arr, axis=2)
    median = np.median(gray)
    return (gray > median).flatten()

def hamming_distance(h1, h2):
    return np.sum(h1 != h2)

def color_histogram(img, bins=32):
    img = img.convert('RGB').resize((100, 100), Image.LANCZOS)
    arr = np.array(img)
    hist = []
    for c in range(3):
        h, _ = np.histogram(arr[:,:,c], bins=bins, range=(0, 256))
        hist.extend(h / max(h.sum(), 1))
    return np.array(hist)

def hist_correlation(h1, h2):
    """Pearson correlation between histograms."""
    h1 = h1 - h1.mean()
    h2 = h2 - h2.mean()
    denom = np.sqrt(np.sum(h1**2) * np.sum(h2**2))
    if denom == 0:
        return 0
    return np.sum(h1 * h2) / denom

print("MATCHING SCREENSHOTS TO CINEMA IMAGES")
print("=" * 70)

for ss_name, ss_type in screenshots:
    ss_path = os.path.join(UPLOAD_DIR, ss_name)
    if not os.path.exists(ss_path):
        print(f"NOT FOUND: {ss_name}")
        continue
    
    ss_img = Image.open(ss_path)
    ss_hash = compute_phash(ss_img)
    ss_hist = color_histogram(ss_img)
    
    print(f"\n{'='*50}")
    print(f"Screenshot: {ss_name} ({ss_type})")
    print(f"Size: {ss_img.size}")
    
    matches = []
    for fname in sorted(ALL_CINEMA):
        fpath = os.path.join(CUSTOMERS_DIR, fname)
        if not os.path.exists(fpath):
            continue
        try:
            cimg = Image.open(fpath)
            c_hash = compute_phash(cimg)
            c_hist = color_histogram(cimg)
            
            h_dist = hamming_distance(ss_hash, c_hash)
            corr = hist_correlation(ss_hist, c_hist)
            
            matches.append((fname, h_dist, corr))
        except:
            pass
    
    # Sort by best correlation
    matches.sort(key=lambda x: -x[2])
    print("\nTop 10 by color histogram correlation:")
    for fname, h_dist, corr in matches[:10]:
        print(f"  {fname}: hash_dist={h_dist}, corr={corr:.4f}")
    
    # Sort by hash distance
    matches.sort(key=lambda x: x[1])
    print("\nTop 10 by perceptual hash distance:")
    for fname, h_dist, corr in matches[:10]:
        print(f"  {fname}: hash_dist={h_dist}, corr={corr:.4f}")

