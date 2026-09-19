import { chromium } from "playwright";
const base = process.argv[2] || "http://localhost:3002";
const b = await chromium.launch();
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["wide", { width: 1920, height: 1000 }], ["tablet", { width: 768, height: 1024 }], ["iphone", { width: 390, height: 844 }], ["android", { width: 360, height: 800 }]]) {
  for (const path of ["/", "/projects"]) {
    const p = await b.newPage({ viewport: vp }); const errors = []; p.on("console", m => { if (m.type() === "error") errors.push(m.text().slice(0, 120)); }); p.on("pageerror", e => errors.push("pageerror " + e.message.slice(0, 120)));
    await p.goto(base + path, { waitUntil: "networkidle" });
    await p.locator("#clients").scrollIntoViewIfNeeded(); await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } }); await p.waitForTimeout(1200);
    const r = await p.evaluate(() => {
      const imgs = [...document.querySelectorAll("#clients img")]; const cards = [...document.querySelectorAll("#clients > div > ul > li")];
      const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.getAttribute("src"));
      const hs = cards.map(c => c.getBoundingClientRect().height);
      return { cards: cards.length, imgs: imgs.length, placeholders: cards.length - imgs.length, broken, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, minH: Math.min(...hs), maxH: Math.max(...hs), names: [...document.querySelectorAll("#clients h3")].slice(0,3).map(h=>h.textContent) };
    });
    console.log(name.padEnd(8), path.padEnd(10), JSON.stringify(r), "errors:", errors.length ? errors : 0);
    if (name === "desktop" && path === "/") {
      await p.locator("#clients li button").first().click(); await p.waitForTimeout(400);
      const dlg = await p.evaluate(() => { const d = document.querySelector("#clients dialog[open]"); return d ? d.querySelector("h4").textContent + " | " + d.querySelectorAll("li").length + " projects" : "NO DIALOG"; });
      console.log("  dialog:", dlg); await p.keyboard.press("Escape");
      const more = p.locator("#clients button", { hasText: "more" }).first(); if (await more.count()) { await more.click(); console.log("  +more expanded:", await more.count() === 0 ? "yes" : "still visible?"); }
      await p.locator("#clients").screenshot({ path: process.env.SHOT_DIR + "/clients-desktop.png" });
    }
    if (name === "iphone" && path === "/") await p.locator("#clients").screenshot({ path: process.env.SHOT_DIR + "/clients-iphone.png" });
    if (name === "tablet" && path === "/projects") await p.locator("#clients").screenshot({ path: process.env.SHOT_DIR + "/clients-tablet.png" });
    await p.close();
  }
}
await b.close();
