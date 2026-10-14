import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox'])
        
        # Desktop screenshot
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(6000)
        await page.screenshot(path="/home/z/my-project/download/desktop-full.png", full_page=False)
        print("Desktop screenshot saved")
        
        # Get the HTML of the navbar to inspect
        nav_html = await page.evaluate("""() => {
            const nav = document.querySelector('nav');
            if (!nav) return 'NO NAV FOUND';
            return nav.innerHTML.substring(0, 2000);
        }""")
        print(f"NAV HTML (first 2000 chars): {nav_html[:500]}")
        
        # Check if theme toggle exists
        toggle_exists = await page.evaluate("""() => {
            const btn = document.querySelector('.theme-toggle-btn');
            if (!btn) return { exists: false };
            const rect = btn.getBoundingClientRect();
            const styles = window.getComputedStyle(btn);
            return {
                exists: true,
                visible: rect.width > 0 && rect.height > 0,
                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                display: styles.display,
                opacity: styles.opacity,
                zIndex: styles.zIndex,
                background: styles.background,
                innerHTML: btn.innerHTML.substring(0, 300)
            };
        }""")
        print(f"THEME TOGGLE: {toggle_exists}")
        
        # Check cinema screens
        cinema_exists = await page.evaluate("""() => {
            const cinema = document.querySelector('.cinema-scroll-right');
            const cinemaLeft = document.querySelector('.cinema-scroll-left');
            const imgs = document.querySelectorAll('.cinema-card img');
            return {
                rightScrollExists: !!cinema,
                leftScrollExists: !!cinemaLeft,
                imageCount: imgs.length,
                firstImageSrc: imgs.length > 0 ? imgs[0].src : 'none'
            };
        }""")
        print(f"CINEMA: {cinema_exists}")
        
        await browser.close()

asyncio.run(main())
