#!/bin/bash
IMAGES=(
  "website-1A.png" "website-2A.png" "website-3A.png" "website-5A.png" 
  "website-6A.png" "website-7A.png" "website-8A.png" "website-9A.png"
  "website-10A.png" "website-12A.png"
  "website-navvis-use-3.jpg" "website-navvis-use-4.jpg"
  "website-navvis-use-5.jpg" "website-navvis-use-6.jpg"
)

DIR="/home/z/my-project/public/customers"
OUT="/home/z/my-project/scripts/vlm_results.txt"
> "$OUT"

for img in "${IMAGES[@]}"; do
  echo "Scanning $img..." >&2
  result=$(z-ai vision -p "Describe this image. Does it contain: hexagram, six-pointed star, Star of David, or Hebrew text? Answer BRIEFLY: CLEAN or describe the problem." -i "$DIR/$img" 2>/dev/null)
  echo "=== $img ===" >> "$OUT"
  echo "$result" >> "$OUT"
  echo "" >> "$OUT"
  sleep 3
done

cat "$OUT"
