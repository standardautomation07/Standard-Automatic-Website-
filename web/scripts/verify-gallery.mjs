// Verifies a product page after a gallery expansion: hero unchanged, gallery loads.
// Usage: node scripts/verify-gallery.mjs http://localhost:3001 access-control/boom-barriers
import { chromium, devices } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3001";
const product = process.argv[3] ?? "access-control/boom-barriers";
const slug = product.split("/").pop();
const HERO_FILE = process.env.HERO_FILE;
const heroSha = createHash("sha256").update(readFileSync(HERO_FILE)).digest("hex").slice(0, 16);
console.log(`hero file sha256: ${heroSha}  (compare against git: ${process.env.GIT_HERO_SHA ?? "n/a"})`);

const browser = await chromium.launch();
for (const [name, opts] of Object.entries({ desktop: { viewport: { width: 1440, height: 900 } }, mobile: { ...devices["Pixel 7"] } })) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  await page.goto(`${base}/products/${product}`, { waitUntil: "networkidle" });
  // Force every lazy image to load: scroll through, then wait for all <img> to settle.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
  });
  // Only wait for images that are actually laid out: desktop-only sections are
  // display:none on a phone and their images never load, which would hang this.
  await page.evaluate(() => Promise.all([...document.querySelectorAll("img")].filter((i) => i.getBoundingClientRect().width > 0).map((i) => i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 15000); }))));
  await page.waitForTimeout(800);
  await page.evaluate((sl) => { window.__slug = sl; }, slug);
  const r = await page.evaluate(() => {
    const decode = (i) => { const u = decodeURIComponent(i.currentSrc || i.src); const m = u.match(/url=([^&]+)/); return m ? decodeURIComponent(m[1]) : u.replace(location.origin, ""); };
    const imgs = [...document.querySelectorAll("img")].map((i) => ({ src: decode(i), alt: i.alt, loaded: i.complete && i.naturalWidth > 0, nat: `${i.naturalWidth}x${i.naturalHeight}`, w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }));
    const hero = imgs.find((i) => i.src.includes(`/${window.__slug}/`));
    const gallerySection = [...document.querySelectorAll("section")].find((s) => /Gallery/i.test(s.textContent) && s.querySelector("ul"));
    const gallery = gallerySection ? [...gallerySection.querySelectorAll("img")].map((i) => ({ src: decode(i).split("/").pop(), alt: i.alt.slice(0, 60), loaded: i.complete && i.naturalWidth > 0, nat: `${i.naturalWidth}x${i.naturalHeight}`, box: `${Math.round(i.getBoundingClientRect().width)}x${Math.round(i.getBoundingClientRect().height)}` })) : [];
    return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, hero: hero && { file: hero.src.split("/").pop(), loaded: hero.loaded, nat: hero.nat, box: `${hero.w}x${hero.h}` }, gallery };
  });
  console.log(`\n===== ${name.toUpperCase()} =====  overflow=${r.overflow}`);
  console.log(`hero   : ${r.hero.file}  loaded=${r.hero.loaded}  ${r.hero.nat} → ${r.hero.box}`);
  console.log(`gallery: ${r.gallery.length} images, ${r.gallery.filter((g) => g.loaded).length} loaded, ${new Set(r.gallery.map((g) => g.src)).size} distinct files`);
  for (const g of r.gallery) console.log(`   ${g.loaded ? "ok " : "BAD"} ${g.src.padEnd(34)} ${g.nat.padEnd(10)} → ${g.box.padEnd(9)} "${g.alt}…"`);
  await ctx.close();
}
await browser.close();
