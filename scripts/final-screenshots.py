import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox'])
        
        # ===== DESKTOP =====
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(6000)
        
        # Screenshot the FULL page
        await page.screenshot(path="/home/z/my-project/download/desktop-hero.png", full_page=False)
        
        # Screenshot just the navbar area
        nav = await page.query_selector('nav')
        if nav:
            await nav.screenshot(path="/home/z/my-project/download/desktop-navbar.png")
            print("Desktop navbar screenshot saved")
        
        # ===== MOBILE =====
        page2 = await browser.new_page(viewport={"width": 390, "height": 844})
        await page2.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=60000)
        await page2.wait_for_timeout(6000)
        await page2.screenshot(path="/home/z/my-project/download/mobile-hero.png", full_page=False)
        
        nav2 = await page2.query_selector('nav')
        if nav2:
            await nav2.screenshot(path="/home/z/my-project/download/mobile-navbar.png")
            print("Mobile navbar screenshot saved")
        
        await browser.close()
        print("All screenshots saved!")

asyncio.run(main())
