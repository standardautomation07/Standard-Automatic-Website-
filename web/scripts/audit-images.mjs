// One-off rendered-image audit for the 13 product pages.
// Usage: node scripts/audit-images.mjs http://localhost:3001
import { chromium, devices } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3001";
const pages = [
  "access-control/boom-barriers",
  "access-control/bollards",
  "access-control/retractable-barriers",
  "access-control/tripod-turnstiles",
  "access-control/flap-barriers",
  "access-control/full-height-turnstiles",
  "entrance-automation/automatic-sliding-glass-doors",
  "entrance-automation/automatic-swing-doors",
  "entrance-automation/hermetic-cleanroom-doors",
  "automatic-gates/automatic-sliding-gates",
  "automatic-gates/automatic-swing-gates",
  "automatic-gates/telescopic-sliding-gates",
  "loading-bay/dock-levellers",
];

const profiles = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { ...devices["Pixel 7"] },
};

const browser = await chromium.launch();
for (const [name, opts] of Object.entries(profiles)) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  console.log(`\n===== ${name.toUpperCase()} =====`);
  for (const p of pages) {
    await page.goto(`${base}/products/${p}`, { waitUntil: "networkidle" });
    // Scroll the whole page so lazy images load, then settle.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll("img")]
        .map((i) => {
          const u = decodeURIComponent(i.currentSrc || i.src);
          const m = u.match(/url=([^&]+)/);
          const src = (m ? decodeURIComponent(m[1]) : u.replace(location.origin, "")) || "(empty)";
          const rect = i.getBoundingClientRect();
          return {
            src,
            alt: i.alt,
            loaded: i.complete && i.naturalWidth > 0,
            nat: `${i.naturalWidth}x${i.naturalHeight}`,
            box: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            visible: rect.width > 0 && rect.height > 0,
            upscaled: i.naturalWidth > 0 && rect.width > i.naturalWidth * 1.15,
          };
        })
        .filter((x) => /\/images\/(products|photography|legacy|diagrams)\//.test(x.src));
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        imgs,
      };
    });
    const hero = r.imgs[0];
    const gallery = r.imgs.slice(1);
    const broken = r.imgs.filter((i) => i.visible && !i.loaded);
    const up = r.imgs.filter((i) => i.visible && i.upscaled);
    console.log(
      `${p.padEnd(50)} overflow=${r.overflow}  hero=${hero ? `${hero.loaded ? "ok" : "BROKEN"} ${hero.nat}→${hero.box}` : "NONE"}  gallery=${gallery.filter((g) => g.visible).length} visible/${gallery.length}  broken=${broken.length}  upscaled=${up.length}`,
    );
    for (const u of up) console.log(`   upscaled: ${u.src.split("/").pop()} ${u.nat} → ${u.box}`);
    for (const b of broken) console.log(`   BROKEN:   ${b.src}`);
    for (const i of r.imgs.filter((x) => !x.alt)) console.log(`   EMPTY ALT: ${i.src}`);
  }
  await ctx.close();
}
await browser.close();
