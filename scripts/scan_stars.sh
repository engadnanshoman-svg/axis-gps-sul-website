#!/bin/bash
for i in $(seq 1 54); do
  num=$(printf "%02d" $i)
  result=$(z-ai vision -p "Star or hexagram? YES/NO" -i "/home/z/my-project/public/customers/client-${num}.jpg" 2>&1)
  if echo "$result" | rg -i '"YES"'; then
    echo "⚠️ client-${num}: HAS STAR"
  elif echo "$result" | rg -i '429'; then
    echo "client-${num}: RATE LIMITED, waiting 30s..."
    sleep 30
    # retry
    result=$(z-ai vision -p "Star or hexagram? YES/NO" -i "/home/z/my-project/public/customers/client-${num}.jpg" 2>&1)
    if echo "$result" | rg -i '"YES"'; then
      echo "⚠️ client-${num}: HAS STAR"
    fi
  fi
  sleep 4
done
echo "Scan complete!"
