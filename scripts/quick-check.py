import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox'])
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        try:
            await page.goto("http://localhost:3000/", timeout=30000)
            await page.wait_for_timeout(6000)
        except Exception as e:
            print(f"Navigation error: {e}")
            await browser.close()
            return
        
        await page.screenshot(path="/home/z/my-project/download/final-check.png", full_page=False)
        print("Screenshot saved")
        
        # Check theme buttons
        result = await page.evaluate("""() => {
            const btns = [...document.querySelectorAll('button')];
            const themeBtns = btns.filter(b => b.title && b.title.includes('الوضع'));
            return themeBtns.map(b => {
                const s = window.getComputedStyle(b);
                const r = b.getBoundingClientRect();
                return {
                    title: b.title,
                    pos: s.position,
                    x: Math.round(r.x), y: Math.round(r.y),
                    w: Math.round(r.width), h: Math.round(r.height),
                    visible: r.width > 0 && r.height > 0 && r.y < 900,
                    parent: b.parentElement?.tagName
                };
            });
        }""")
        print(f"THEME: {result}")
        
        await browser.close()

asyncio.run(main())
