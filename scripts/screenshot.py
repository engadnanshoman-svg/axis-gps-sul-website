#!/usr/bin/env python3
"""Start a Next.js server, take screenshots, then shut down."""
import subprocess, time, sys, os, signal

# Start the server
env = os.environ.copy()
proc = subprocess.Popen(
    ['npx', 'next', 'dev', '-p', '3002', '-H', '0.0.0.0'],
    cwd='/home/z/my-project',
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    env=env,
)

# Wait for server to be ready
for i in range(30):
    time.sleep(1)
    try:
        import urllib.request
        urllib.request.urlopen('http://127.0.0.1:3002', timeout=2)
        print(f'Server ready after {i+1}s')
        break
    except:
        if i == 29:
            print('Server failed to start')
            proc.kill()
            sys.exit(1)

# Take screenshots with Playwright
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(args=['--no-sandbox', '--disable-setuid-sandbox'])
    
    # Desktop
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    
    # Capture console messages
    console_messages = []
    page.on('console', lambda msg: console_messages.append(f'{msg.type}: {msg.text}'))
    page_errors = []
    page.on('pageerror', lambda err: page_errors.append(str(err)))
    
    page.goto('http://127.0.0.1:3002', timeout=60000, wait_until='domcontentloaded')
    # Wait for JS hydration and animations
    time.sleep(10)
    # Force nav to visible position (override Framer Motion animation)
    page.evaluate('''(() => {
      const nav = document.querySelector("nav");
      if (nav) nav.style.transform = "translateY(0)";
    })()''')
    time.sleep(2)
    page.screenshot(path='/home/z/my-project/download/navbar-desktop.png', full_page=False)
    
    # Print debug info
    print('Console messages:', console_messages[:10])
    print('Page errors:', page_errors[:5])
    
    # Check if the body has content
    body_text = page.evaluate('document.body.innerText.substring(0, 200)')
    print('Body text preview:', body_text)
    
    # Check nav visibility
    nav_visible = page.evaluate('''(() => {
      const nav = document.querySelector("nav");
      if (!nav) return "No nav found";
      const style = window.getComputedStyle(nav);
      return JSON.stringify({
        transform: style.transform,
        opacity: style.opacity,
        display: style.display,
        position: style.position,
        top: style.top,
        rect: nav.getBoundingClientRect()
      });
    })()''')
    print('Nav style:', nav_visible)
    
    # Check theme toggle button
    theme_btn_info = page.evaluate('''(() => {
      const btns = document.querySelectorAll("button[aria-label]");
      const result = [];
      for (const btn of btns) {
        const label = btn.getAttribute("aria-label");
        if (label && (label.includes("نهاري") || label.includes("ليلي"))) {
          const rect = btn.getBoundingClientRect();
          const style = window.getComputedStyle(btn);
          result.push({
            label,
            rect,
            bg: style.backgroundColor,
            color: style.color,
            display: style.display,
            width: style.width,
            height: style.height
          });
        }
      }
      return JSON.stringify(result);
    })()''')
    print('Theme button info:', theme_btn_info)
    
    page.screenshot(path='/home/z/my-project/download/navbar-desktop.png', full_page=False)
    print('Desktop screenshot saved!')
    
    # Mobile
    page.set_viewport_size({'width': 375, 'height': 812})
    page.reload()
    time.sleep(4)
    page.screenshot(path='/home/z/my-project/download/navbar-mobile.png', full_page=False)
    print('Mobile screenshot saved!')
    
    browser.close()

# Kill the server
proc.kill()
print('Done!')
