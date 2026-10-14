#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
import time, os

OUT = "/home/z/my-project/download"
os.makedirs(OUT, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    page.goto("http://localhost:3000", wait_until="domcontentloaded", timeout=30000)
    time.sleep(8)
    
    page.screenshot(path=os.path.join(OUT, "current-hero.png"), full_page=False)
    
    page.evaluate("window.scrollBy(0, 1200)")
    time.sleep(2)
    page.screenshot(path=os.path.join(OUT, "current-services.png"), full_page=False)
    
    page.evaluate("window.scrollBy(0, 800)")
    time.sleep(2)
    page.screenshot(path=os.path.join(OUT, "current-services2.png"), full_page=False)
    
    page.evaluate("window.scrollTo(0, 0)")
    time.sleep(1)
    page.screenshot(path=os.path.join(OUT, "current-fullpage.png"), full_page=True)
    
    text = page.evaluate("document.body.innerText")
    with open(os.path.join(OUT, "page-text.txt"), "w") as f:
        f.write(text)
    
    browser.close()
    print("Screenshots saved!")
