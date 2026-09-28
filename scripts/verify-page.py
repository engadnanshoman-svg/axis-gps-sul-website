import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox'])
        
        # Desktop
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(8000)
        await page.screenshot(path="/home/z/my-project/download/verify-desktop.png", full_page=False)
        
        # Check ALL fixed/theme buttons
        result = await page.evaluate("""() => {
            const allBtns = document.querySelectorAll('button');
            const results = [];
            allBtns.forEach((b, i) => {
                const s = window.getComputedStyle(b);
                const r = b.getBoundingClientRect();
                if (s.position === 'fixed' || (b.title && b.title.includes('الوضع')) || (b.ariaLabel && b.ariaLabel.includes('الوضع'))) {
                    results.push({
                        index: i,
                        title: b.title || '',
                        position: s.position,
                        rect: {x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height)},
                        zIndex: s.zIndex,
                        inViewport: r.y >= 0 && r.y < 900 && r.x >= 0 && r.x < 1440
                    });
                }
            });
            return results;
        }""")
        print(f"FIXED/THEME BUTTONS: {result}")
        
        # Check cinema containers
        cinema = await page.evaluate("""() => {
            const rightContainer = document.querySelector('.cinema-scroll-right');
            const leftContainer = document.querySelector('.cinema-scroll-left');
            const result = {};
            if (rightContainer) {
                const r = rightContainer.getBoundingClientRect();
                result.rightScroll = {x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), childCount: rightContainer.children.length};
            }
            if (leftContainer) {
                const r = leftContainer.getBoundingClientRect();
                result.leftScroll = {x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), childCount: leftContainer.children.length};
            }
            
            // Check the parent 22% containers
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const hr = heroSection.getBoundingClientRect();
                result.heroRect = {x: Math.round(hr.x), y: Math.round(hr.y), w: Math.round(hr.width), h: Math.round(hr.height)};
            }
            return result;
        }""")
        print(f"CINEMA: {cinema}")
        
        await browser.close()

asyncio.run(main())
