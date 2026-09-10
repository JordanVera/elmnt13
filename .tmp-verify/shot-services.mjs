import { chromium } from 'playwright-core';

const out = new URL('.', import.meta.url).pathname;
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(800);
await page.evaluate(() => {
  const about = [...document.querySelectorAll('section')].find((s) =>
    s.textContent?.includes('Experiential'),
  );
  about?.scrollIntoView({ block: 'center' });
});
await page.waitForSelector('.reveal.is-in', { timeout: 5000 });
await page.waitForTimeout(700);
const section = page.locator('section').filter({ hasText: 'Explore services' });
await section.screenshot({ path: `${out}services-section.png` });
await page.getByRole('link', { name: /explore services/i }).hover();
await page.waitForTimeout(400);
await section.screenshot({ path: `${out}services-hover.png` });
const weddings = page.getByRole('link', { name: /^Weddings$/ });
const href = await weddings.getAttribute('href');
console.log('weddings href', href);
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
await page.evaluate(() => {
  const about = [...document.querySelectorAll('section')].find((s) =>
    s.textContent?.includes('Experiential'),
  );
  about?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(500);
await section.screenshot({ path: `${out}services-mobile.png` });
await browser.close();
