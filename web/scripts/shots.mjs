/**
 * Visual QA helper. Captures the key pages at the six viewports named in the
 * brief, so layout can be inspected at real widths (the in-app preview pane
 * is narrower than 1440px).
 *
 *   node scripts/shots.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3001";
const outDir = "shots";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-430", width: 430, height: 932, mobile: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "mobile-375", width: 375, height: 812, mobile: true },
];

const pages = [
  { name: "home", path: "/" },
  { name: "products", path: "/products" },
  { name: "catalogue", path: "/products/catalogue" },
  { name: "family", path: "/products/high-speed-doors" },
  { name: "product", path: "/products/high-speed-doors/high-speed-roll-up-doors" },
  { name: "product-nospec", path: "/products/access-control/tripod-turnstiles" },
  { name: "industries", path: "/industries" },
  { name: "industry", path: "/industries/warehousing-logistics" },
  { name: "service", path: "/service-support" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    isMobile: Boolean(viewport.mobile),
    hasTouch: Boolean(viewport.mobile),
  });
  const page = await context.newPage();

  for (const target of pages) {
    await page.goto(`${base}${target.path}`, { waitUntil: "load" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${outDir}/${viewport.name}-${target.name}.png` });
  }

  await context.close();
}

await browser.close();
console.log(`Captured ${viewports.length * pages.length} screenshots into ${outDir}/`);
