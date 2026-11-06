// Renders the daily page (#p1) to a 1080x1350 PNG at 2x.
// Usage: node shot.js <page.html> <out.png>
const fs = require('fs');
const path = require('path');
function loadPlaywright() {
  const candidates = [
    path.join(__dirname, 'node_modules', 'playwright'),
    path.join(process.env.HOME, '.claude/skills/weekly-market-wrap/notebook/node_modules/playwright'),
    'playwright',
  ];
  for (const c of candidates) { try { return require(c); } catch (e) {} }
  throw new Error('Playwright not found. Run `npm install` in this folder.');
}
(async () => {
  const [file, out] = process.argv.slice(2);
  if (!file || !out) { console.error('Usage: node shot.js <page.html> <out.png>'); process.exit(1); }
  const { chromium } = loadPlaywright();
  const local = path.join(process.env.HOME, 'Library/Caches/ms-playwright/chromium-1148/chrome-mac/Chromium.app/Contents/MacOS/Chromium');
  const exe = process.env.CHROMIUM_PATH || (fs.existsSync(local) ? local : undefined);
  const b = await chromium.launch(exe ? { executablePath: exe } : {});
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.resolve(file));
  await p.waitForLoadState('networkidle');
  await p.evaluate(() => document.fonts.ready);
  await p.locator('#p1').screenshot({ path: out });
  await b.close();
})();
