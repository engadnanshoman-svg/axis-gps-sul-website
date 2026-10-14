#!/usr/bin/env python3
"""Start server, take screenshot, find '54' on page - all in one process."""
import subprocess, time, os, json

OUT = "/home/z/my-project/download"
os.makedirs(OUT, exist_ok=True)

# Start the server
server = subprocess.Popen(
    ["node", "scripts/persistent-server.js"],
    cwd="/home/z/my-project",
    stdout=subprocess.PIPE, stderr=subprocess.PIPE
)

# Wait for server
for i in range(20):
    time.sleep(1)
    try:
        import urllib.request
        urllib.request.urlopen("http://localhost:3000/", timeout=2)
        print(f"Server ready after {i+1}s")
        break
    except:
        if i == 19:
            print("Server failed!")
            server.kill()
            exit(1)

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    page.goto("http://localhost:3000", wait_until="domcontentloaded", timeout=30000)
    time.sleep(10)
    
    # Screenshot of the top area
    page.screenshot(path=os.path.join(OUT, "debug-top.png"), full_page=False)
    
    # Search for ALL elements containing "54" in their text
    elements = page.evaluate("""
        () => {
            const results = [];
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
                const text = walker.currentNode.textContent;
                if (text.includes('54')) {
                    const parent = walker.currentNode.parentElement;
                    const rect = parent?.getBoundingClientRect();
                    results.push({
                        text: text.substring(0, 200),
                        tag: parent?.tagName,
                        className: parent?.className?.substring(0, 150),
                        id: parent?.id,
                        left: rect?.left,
                        top: rect?.top,
                        width: rect?.width,
                        height: rect?.height
                    });
                }
            }
            return results;
        }
    """)
    
    print(f"Found {len(elements)} elements containing '54':")
    for i, el in enumerate(elements):
        print(f"\n--- Element {i+1} ---")
        print(f"  Text: {el['text'][:100]}")
        print(f"  Tag: {el['tag']}")
        print(f"  Class: {el['className'][:100]}")
        print(f"  Position: left={el['left']:.0f}, top={el['top']:.0f}, w={el['width']:.0f}, h={el['height']:.0f}")
    
    # Also search for the number 54 specifically
    exact = page.evaluate("""
        () => {
            const results = [];
            const all = document.querySelectorAll('*');
            for (const el of all) {
                if (el.childNodes.length === 1 && el.textContent.trim() === '54') {
                    const rect = el.getBoundingClientRect();
                    results.push({
                        tag: el.tagName,
                        className: el.className?.substring(0, 150),
                        text: el.textContent,
                        left: rect.left,
                        top: rect.top,
                        width: rect.width,
                        height: rect.height
                    });
                }
            }
            return results;
        }
    """)
    
    print(f"\n\nExact '54' elements: {len(exact)}")
    for i, el in enumerate(exact):
        print(f"  Tag={el['tag']}, Class={el['className'][:80]}, Pos=({el['left']:.0f},{el['top']:.0f})")
    
    browser.close()

# Don't kill server
print("\nDone! Server still running.")
