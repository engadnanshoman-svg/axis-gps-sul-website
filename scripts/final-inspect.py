import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox'])
        
        # Desktop full page
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(7000)
        await page.screenshot(path="/home/z/my-project/download/final-desktop.png", full_page=False)
        print("Desktop screenshot saved")
        
        # Check floating toggle
        floating_toggle = await page.evaluate("""() => {
            const btn = document.querySelector('[title*="الوضع"]');
            if (!btn) {
                // Try all buttons with fixed position
                const btns = document.querySelectorAll('button');
                const fixedBtns = [];
                btns.forEach((b, i) => {
                    const s = window.getComputedStyle(b);
                    if (s.position === 'fixed') {
                        const r = b.getBoundingClientRect();
                        fixedBtns.push({
                            index: i,
                            text: b.title || b.ariaLabel || '',
                            rect: {x: r.x, y: r.y, w: r.width, h: r.height},
                            bg: s.background.substring(0, 80),
                            zIndex: s.zIndex
                        });
                    }
                });
                return {toggleFound: false, fixedButtons: fixedBtns};
            }
            const rect = btn.getBoundingClientRect();
            return {
                toggleFound: true,
                rect: {x: rect.x, y: rect.y, width: rect.width, height: rect.height},
                title: btn.title,
                bg: window.getComputedStyle(btn).background.substring(0, 80)
            };
        }""")
        print(f"FLOATING TOGGLE: {floating_toggle}")
        
        # Check cinema cards visibility
        cinema = await page.evaluate("""() => {
            const cards = document.querySelectorAll('.cinema-card');
            let visibleCount = 0;
            const sampleRects = [];
            for (let i = 0; i < cards.length; i++) {
                const r = cards[i].getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && r.y >= 0 && r.y < 900) {
                    visibleCount++;
                    if (sampleRects.length < 3) {
                        sampleRects.push({x: r.x, y: r.y, w: r.width, h: r.height});
                    }
                }
            }
            return {totalCards: cards.length, visibleCards: visibleCount, sampleRects};
        }""")
        print(f"CINEMA CARDS: {cinema}")
        
        # Mobile
        page2 = await browser.new_page(viewport={"width": 390, "height": 844})
        await page2.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=60000)
        await page2.wait_for_timeout(7000)
        await page2.screenshot(path="/home/z/my-project/download/final-mobile.png", full_page=False)
        print("Mobile screenshot saved")
        
        # Check mobile toggle
        mobile_toggle = await page2.evaluate("""() => {
            const btns = document.querySelectorAll('button');
            const fixedBtns = [];
            btns.forEach((b, i) => {
                const s = window.getComputedStyle(b);
                if (s.position === 'fixed') {
                    const r = b.getBoundingClientRect();
                    fixedBtns.push({
                        title: b.title || '',
                        rect: {x: r.x, y: r.y, w: r.width, h: r.height},
                        zIndex: s.zIndex
                    });
                }
            });
            return fixedBtns;
        }""")
        print(f"MOBILE FIXED BUTTONS: {mobile_toggle}")
        
        await browser.close()

asyncio.run(main())
