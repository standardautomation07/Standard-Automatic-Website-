/**
 * Warms the Next.js image optimizer cache.
 *
 *   node scripts/warm-image-cache.mjs [origin]     default http://localhost:3100
 *
 * Why this exists. The site declares `formats: ["image/avif", "image/webp"]`,
 * so the first request for each image at each width is an AVIF encode. AVIF is
 * expensive — far more so than WebP — and the results are cached under
 * `.next/cache/images`, which survives `next build`.
 *
 * The Playwright suite opens every page at three viewports. On a cold cache
 * that asks the optimizer for several hundred encodes at once while three
 * browsers are also running, and on a laptop the machine runs out of sockets:
 * navigations start failing with ERR_INSUFFICIENT_RESOURCES and image polls
 * time out. Those failures say nothing about the site.
 *
 * Running this once, serially, against the test server does all that encoding
 * up front with nothing competing for the machine. Afterwards the suite reads
 * from cache and the failures go away. It only needs re-running if
 * `.next/cache` is deleted or an image is added.
 */
import { imageList } from "../src/data/images.ts";

const origin = process.argv[2] ?? "http://localhost:3100";

// The widths Next actually requests for the `sizes` values used on this site.
const WIDTHS = [256, 384, 640, 750, 828, 1080, 1200, 1920];

const targets = imageList.flatMap((image) =>
  WIDTHS.map((w) => `${origin}/_next/image?url=${encodeURIComponent(image.src)}&w=${w}&q=75`),
);

console.log(`warming ${targets.length} variants from ${imageList.length} images against ${origin}`);

let done = 0;
let failed = 0;
const started = Date.now();

for (const url of targets) {
  try {
    // AVIF is what costs the time, so ask for it explicitly rather than
    // letting curl's default Accept header get a cheap JPEG back.
    const response = await fetch(url, { headers: { accept: "image/avif,image/webp,*/*" } });
    if (!response.ok) {
      failed += 1;
      console.warn(`  ${response.status} ${url}`);
    }
    await response.arrayBuffer();
  } catch (error) {
    failed += 1;
    console.warn(`  failed ${url}: ${error.message}`);
  }
  done += 1;
  if (done % 50 === 0) {
    console.log(`  ${done}/${targets.length} (${Math.round((Date.now() - started) / 1000)}s)`);
  }
}

console.log(
  `warmed ${done - failed} of ${targets.length} in ${Math.round((Date.now() - started) / 1000)}s` +
    (failed ? `, ${failed} failed` : ""),
);
