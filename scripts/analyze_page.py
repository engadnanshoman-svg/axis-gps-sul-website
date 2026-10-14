#!/usr/bin/env python3
"""Start the server, take screenshots, and save page text - all in one process."""
import subprocess, time, os, sys

OUT = "/home/z/my-project/download"
os.makedirs(OUT, exist_ok=True)

# Start the server
print("Starting server...")
server = subprocess.Popen(
    ["node", "scripts/persistent-server.js"],
    cwd="/home/z/my-project",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# Wait for server
for i in range(30):
    time.sleep(1)
    try:
        import urllib.request
        urllib.request.urlopen("http://localhost:3000/", timeout=2)
        print(f"Server ready after {i+1}s")
        break
    except:
        if i == 29:
            print("Server failed to start!")
            server.kill()
            sys.exit(1)

# Now take screenshots
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    page.goto("http://localhost:3000", wait_until="domcontentloaded", timeout=30000)
    time.sleep(8)
    
    # Hero section
    page.screenshot(path=os.path.join(OUT, "current-hero.png"), full_page=False)
    print("Hero screenshot saved")
    
    # Services section
    page.evaluate("window.scrollBy(0, 1200)")
    time.sleep(2)
    page.screenshot(path=os.path.join(OUT, "current-services.png"), full_page=False)
    print("Services screenshot saved")
    
    # More services
    page.evaluate("window.scrollBy(0, 800)")
    time.sleep(2)
    page.screenshot(path=os.path.join(OUT, "current-services2.png"), full_page=False)
    print("Services2 screenshot saved")
    
    # Full page
    page.evaluate("window.scrollTo(0, 0)")
    time.sleep(1)
    page.screenshot(path=os.path.join(OUT, "current-fullpage.png"), full_page=True)
    print("Full page screenshot saved")
    
    # Save text
    text = page.evaluate("document.body.innerText")
    with open(os.path.join(OUT, "page-text.txt"), "w") as f:
        f.write(text)
    print("Page text saved")
    
    browser.close()

# Keep server running
print("All done! Server PID:", server.pid)
# Don't kill the server - let it persist
