#!/usr/bin/env python3
"""Start a Next.js server, wait, then let user take screenshot manually."""
import subprocess, time, sys, os

# Start the server
env = os.environ.copy()
proc = subprocess.Popen(
    ['node', '-e', '''
const { createServer } = require('http');
const next = require('next');
const app = next({ dev: false, hostname: '0.0.0.0', port: 3009 });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(3009, '0.0.0.0', () => {
    console.log('READY');
  });
  setInterval(() => {}, 60000);
});
'''],
    cwd='/home/z/my-project',
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    env=env,
)

# Wait for server to be ready
for i in range(30):
    time.sleep(1)
    try:
        import urllib.request
        urllib.request.urlopen('http://127.0.0.1:3009', timeout=2)
        print(f'Server ready after {i+1}s')
        break
    except:
        if i == 29:
            print('Server failed to start')
            out = proc.stdout.read1(1024) if proc.stdout.readable() else b''
            print('Output:', out.decode())
            proc.kill()
            sys.exit(1)

# Keep alive and take screenshot
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1280, 'height': 900})
    page.goto('http://127.0.0.1:3009', timeout=60000, wait_until='domcontentloaded')
    time.sleep(20)  # Wait for Hero animations (converge→merge→reveal→content = ~5s + buffer)
    page.screenshot(path='/home/z/my-project/download/hero-cinema.png', full_page=False)
    print('Hero screenshot saved!')
    browser.close()

proc.kill()
print('Done!')
