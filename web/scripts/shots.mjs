/**
 * Visual QA helper. Captures the key pages at the four viewports named in
 * the build brief so the layout can be inspected at real desktop widths
 * (the in-app preview pane is narrower than 1440px).
 *
 *   node scripts/shots.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3001";
const outDir = "shots";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "mobile-375", width: 375, height: 812, mobile: true },
];

const pages = [
  { name: "home", path: "/" },
  { name: "products", path: "/products" },
  { name: "category", path: "/products/industrial-doors" },
  { name: "product", path: "/products/industrial-doors/high-speed-roll-up-doors" },
  { name: "contact", path: "/contact" },
  { name: "about", path: "/about" },
  { name: "industries", path: "/industries" },
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
    await page.goto(`${base}${target.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const full = viewport.name.startsWith("desktop") && target.name === "home";
    await page.screenshot({
      path: `${outDir}/${viewport.name}-${target.name}.png`,
      fullPage: full,
    });
  }

  await context.close();
}

await browser.close();
console.log(`Captured ${viewports.length * pages.length} screenshots into ${outDir}/`);
