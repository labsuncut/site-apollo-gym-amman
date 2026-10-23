// Bakes the English words and lists into index.html so the content is in the HTML itself
// (for Google, AI crawlers, link previews and anyone with JavaScript off). The page still fills
// itself from content.js at load, so run this after every change to content.js or index.html:
//   NODE_PATH=$(npm root -g) node tools/prerender.cjs        (needs Playwright with Chromium)
const { chromium } = require('playwright');
const { createServer } = require('http');
const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join, extname } = require('path');

const root = join(__dirname, '..');
(async () => {
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const file = join(root, decodeURIComponent(req.url.split('?')[0].replace(/\/$/, '/index.html')));
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }); res.end(readFileSync(file));
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.route(/^(?!http:\/\/localhost)/, (r) => r.abort()); // nothing leaves the machine
await page.goto(`http://localhost:${port}/index.html?prerender=1`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => document.documentElement.dataset.prerendered === '1', null, { timeout: 15000 });
// Motion state must never be baked: strip any transform left on an element, then read the page.
const body = await page.evaluate(() => { document.querySelectorAll('[style*="transform"]').forEach((el) => { el.style.transform = ''; if (!el.getAttribute('style')) el.removeAttribute('style'); }); return document.body.innerHTML; });
await browser.close(); server.close();

const file = join(root, 'index.html');
const html = readFileSync(file, 'utf8');
const start = html.indexOf('<body>') + '<body>'.length, end = html.lastIndexOf('</body>');
if (start < 6 || end < 0) throw new Error('index.html has no <body> … </body>');
const out = html.slice(0, start) + body.replace(/\s+$/, '\n') + html.slice(end);
writeFileSync(file, out);
const words = body.replace(/<script[\s\S]*?<\/script>|<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`index.html prerendered: ${words} words in the HTML (${Math.round(out.length / 1024)} KB).`);
})();
