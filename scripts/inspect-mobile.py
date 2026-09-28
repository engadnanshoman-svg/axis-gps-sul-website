import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox'])
        
        # Mobile screenshot
        page = await browser.new_page(viewport={"width": 390, "height": 844})
        await page.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(6000)
        await page.screenshot(path="/home/z/my-project/download/mobile-full.png", full_page=False)
        print("Mobile screenshot saved")
        
        # Check mobile theme toggle
        toggle_info = await page.evaluate("""() => {
            const btns = document.querySelectorAll('.theme-toggle-btn');
            const results = [];
            btns.forEach((btn, i) => {
                const rect = btn.getBoundingClientRect();
                const styles = window.getComputedStyle(btn);
                results.push({
                    index: i,
                    visible: rect.width > 0 && rect.height > 0,
                    rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                    display: styles.display,
                    opacity: styles.opacity,
                    zIndex: styles.zIndex,
                    parentVisible: styles.display !== 'none'
                });
            });
            return results;
        }""")
        print(f"MOBILE TOGGLES: {toggle_info}")
        
        # Check if cinema images loaded
        img_status = await page.evaluate("""() => {
            const imgs = document.querySelectorAll('.cinema-card img');
            const results = [];
            for (let i = 0; i < Math.min(imgs.length, 5); i++) {
                results.push({
                    src: imgs[i].src,
                    naturalWidth: imgs[i].naturalWidth,
                    naturalHeight: imgs[i].naturalHeight,
                    complete: imgs[i].complete
                });
            }
            return results;
        }""")
        print(f"IMAGE STATUS: {img_status}")
        
        await browser.close()

asyncio.run(main())
