const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false, port: 3000 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  
  server.listen(3000, '0.0.0.0', () => {
    console.log('>>> SERVER READY ON PORT 3000 <<<');
  });
  
  // Prevent process from exiting
  process.on('SIGTERM', () => { server.close(); });
  
  // Keep alive
  setInterval(() => {}, 30000);
});
