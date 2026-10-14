from PIL import Image
import os

src_dir = "/home/z/my-project/upload"
dst_dir = "/home/z/my-project/public/customers"
os.makedirs(dst_dir, exist_ok=True)

# The DSC files the user uploaded
dsc_files = [
    "DSC_0018.JPG",
    "DSC_0021 - Copy.JPG",
    "DSC_0030.JPG",
    "DSC_9327 - Copy.JPG",
    "DSC_9396 - Copy.JPG",
    "DSC_9411 - Copy (2).JPG",
    "DSC_9422.JPG",
    "DSC_9428.JPG",
    "DSC_9444 - Copy.JPG",
    "DSC_9776.JPG",
    "DSC_9797.JPG",
    "DSC_9811.JPG",
    "DSC_9818.JPG",
    "DSC_9825.JPG",
]

# Short names for the output
short_names = [
    "customer-dsc-01",
    "customer-dsc-02",
    "customer-dsc-03",
    "customer-dsc-04",
    "customer-dsc-05",
    "customer-dsc-06",
    "customer-dsc-07",
    "customer-dsc-08",
    "customer-dsc-09",
    "customer-dsc-10",
    "customer-dsc-11",
    "customer-dsc-12",
    "customer-dsc-13",
    "customer-dsc-14",
]

for dsc, short in zip(dsc_files, short_names):
    src_path = os.path.join(src_dir, dsc)
    dst_path = os.path.join(dst_dir, f"{short}.jpg")
    
    if not os.path.exists(src_path):
        print(f"SKIP: {dsc} not found")
        continue
    
    try:
        img = Image.open(src_path)
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to max 800px wide (good for cinema cards)
        max_w = 800
        if img.width > max_w:
            ratio = max_w / img.width
            new_h = int(img.height * ratio)
            img = img.resize((max_w, new_h), Image.LANCZOS)
        
        # Save optimized
        img.save(dst_path, "JPEG", quality=80, optimize=True)
        size_kb = os.path.getsize(dst_path) / 1024
        print(f"OK: {dsc} -> {short}.jpg ({size_kb:.0f}KB, {img.width}x{img.height})")
    except Exception as e:
        print(f"ERROR: {dsc} -> {e}")

print("\nDone!")
