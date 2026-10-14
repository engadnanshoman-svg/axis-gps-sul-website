import asyncio
import socket
from playwright.async_api import async_playwright

async def check_port(host, port):
    try:
        reader, writer = await asyncio.wait_for(
            asyncio.open_connection(host, port), timeout=2)
        writer.close()
        await writer.wait_closed()
        return True
    except:
        return False

async def main():
    # Check port first
    if not await check_port('127.0.0.1', 3000):
        print("Port 3000 is not open!")
        return

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        try:
            await page.goto("http://127.0.0.1:3000/", wait_until="domcontentloaded", timeout=30000)
            await page.wait_for_timeout(5000)
            await page.screenshot(path="/home/z/my-project/download/navbar-check.png", full_page=False)
            print("Desktop screenshot taken")
        except Exception as e:
            print(f"Desktop screenshot error: {e}")
        
        try:
            page2 = await browser.new_page(viewport={"width": 390, "height": 844})
            await page2.goto("http://127.0.0.1:3000/", wait_until="domcontentloaded", timeout=30000)
            await page2.wait_for_timeout(5000)
            await page2.screenshot(path="/home/z/my-project/download/navbar-mobile-check.png", full_page=False)
            print("Mobile screenshot taken")
        except Exception as e:
            print(f"Mobile screenshot error: {e}")
        
        await browser.close()

asyncio.run(main())
