/**
 * Derives transparent-background logo assets from the company's original
 * logo.png (which ships as opaque RGB on a white field).
 *
 *   brand/logo.png        original colours, white keyed out  -> light backgrounds
 *   brand/logo-invert.png every non-white pixel forced white -> dark backgrounds
 *
 * Run: node scripts/derive-logo.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.join(__dirname, "..", "public", "images", "legacy", "logo.png");
const outDir = path.join(__dirname, "..", "public", "images", "brand");

const png = PNG.sync.read(fs.readFileSync(src));
const { width, height } = png;

function build(invert) {
  const out = new PNG({ width, height });
  for (let i = 0; i < png.data.length; i += 4) {
    const r = png.data[i];
    const g = png.data[i + 1];
    const b = png.data[i + 2];
    // Luminance decides how much of the ink is present; pure white -> alpha 0.
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const alpha = Math.round((1 - lum) * 255);
    if (invert) {
      out.data[i] = 255;
      out.data[i + 1] = 255;
      out.data[i + 2] = 255;
    } else {
      out.data[i] = r;
      out.data[i + 1] = g;
      out.data[i + 2] = b;
    }
    out.data[i + 3] = alpha;
  }
  return PNG.sync.write(out);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "logo.png"), build(false));
fs.writeFileSync(path.join(outDir, "logo-invert.png"), build(true));
console.log(`Wrote brand logos at ${width}x${height}`);
