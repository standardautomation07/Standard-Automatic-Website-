/**
 * One-off: repoint every product image away from the legacy asset library.
 *
 * Why: the old site's product images are either 1400x298 page banners with
 * headings burned into the pixels, or 300x294 thumbnails inside a decorative
 * octagonal frame. Neither can be used on the new design. The only legacy
 * assets that survive are clean catalogue renders (turnstiles, flap and full
 * height barriers) and two genuine photographs.
 */
import { readFileSync, writeFileSync } from "node:fs";

const edits = {
  "src/data/products/entrance-automation.ts": {
    "automatic-sliding-gates": ["/images/photography/gates-industrial.jpg", "Industrial site entrance with a large powered gate", "cover"],
    "swing-gates": ["/images/photography/gate-driveway.jpg", "A gated driveway entrance", "cover"],
    "telescopic-gates": ["/images/photography/gate-metal.jpg", "A black metal gate at a site entrance", "cover"],
    "retractable-gates": ["/images/photography/gate-sliding.jpg", "A yellow and black site gate across a vehicle entrance", "cover"],
    "automatic-sliding-glass-doors": ["/images/photography/entrance-automation.jpg", "Automatic glass entrance doors at a modern building", "cover"],
  },
  "src/data/products/industrial-doors.ts": {
    "high-speed-roll-up-doors": ["/images/legacy/intro.jpg", "High speed door at a warehouse opening with a forklift passing through", "cover"],
    "high-speed-self-repairing-doors": ["/images/photography/industrial-doors.jpg", "Industrial roll-up door on a building opening", "cover"],
    "high-speed-fold-up-doors": ["/images/photography/loading-bay.jpg", "Wide industrial door openings on a distribution building", "cover"],
    "high-speed-industrial-doors": ["/images/photography/manufacturing.jpg", "Large production machinery inside a manufacturing plant", "cover"],
    "overhead-sectional-doors": ["/images/photography/garage-door-house.jpg", "A closed sectional overhead door beside a brick wall", "cover"],
    "aluminium-garage-doors": ["/images/photography/garage-door-modern.jpg", "A modern elevation with a sectional garage door", "cover"],
    "residential-garage-doors": ["/images/photography/parking-entry.jpg", "A controlled vehicle entrance to a parking structure", "cover"],
    "fire-sliding-doors": ["/images/photography/installation.jpg", "Technician inspecting a door installation on site", "cover"],
  },
  "src/data/products/rolling-shutters.ts": {
    "galvanized-rolling-shutters": ["/images/photography/shutter-grey.jpg", "A closed steel rolling shutter in a plain wall", "cover"],
    "insulated-rolling-shutters": ["/images/photography/shutter-white.jpg", "A white rolling shutter with horizontal slats", "cover"],
    "aluminium-rolling-shutters": ["/images/photography/shutter-brown.jpg", "A closed aluminium-finish roller shutter", "cover"],
    "aluminium-single-wall-rolling-shutters": ["/images/photography/shutter-slats.jpg", "Close detail of rolling shutter slats", "cover"],
    "fire-rated-rolling-shutters": ["/images/photography/shutter-red.jpg", "A closed red rolling shutter at a building opening", "cover"],
    "fire-proof-shutters": ["/images/photography/door-red-shutter.jpg", "A closed shutter door on an industrial elevation", "cover"],
    "polycarbonate-rolling-shutters": ["/images/photography/rolling-shutters.jpg", "Closed roller shutters across a retail frontage", "cover"],
    "bright-bar-rolling-shutters": ["/images/photography/industrial-doors.jpg", "A closed roll-up shutter on a commercial opening", "cover"],
    "perforated-rolling-shutters": ["/images/photography/shutter-grey.jpg", "A closed metal rolling shutter across an opening", "cover"],
  },
  "src/data/products/security-access.ts": {
    "bollards": ["/images/legacy/bollard-cover.jpg", "A protection bollard installed beside an industrial door opening", "cover"],
    "tripod-turnstiles": ["/images/legacy/HL145.PNG", "Tripod turnstile unit", "contain"],
    "flap-barriers": ["/images/legacy/Flap-A203.PNG", "Flap barrier lane unit", "contain"],
    "full-height-turnstiles": ["/images/legacy/fullG535.PNG", "Full height turnstile, G535 series", "contain"],
    "boom-barriers": ["/images/photography/barrier-arm.jpg", "A boom barrier arm at a controlled vehicle entry", "cover"],
    "retractable-barriers": ["/images/photography/barrier-closed.jpg", "A vehicle waiting at a closed barrier line", "cover"],
  },
  "src/data/products/motors-accessories.ts": {
    "side-motor-with-chain-drive": ["/images/photography/motor-gears.jpg", "Close view of a geared drive assembly", "cover"],
    "side-motor-with-gear-drive": ["/images/photography/motor-gear-detail.jpg", "Close detail of a drive gear", "cover"],
    "central-motor": ["/images/photography/motor-unit.jpg", "An electric drive motor unit", "cover"],
    "tubular-motor": ["/images/photography/motor-service.jpg", "A technician servicing a drive unit", "cover"],
    "australian-type-motor": ["/images/photography/engineering-panel.jpg", "Engineer operating an industrial equipment control panel", "cover"],
    "sliding-gate-motor": ["/images/photography/gate-sliding.jpg", "A powered site gate across a vehicle entrance", "cover"],
    "swing-gate-motor": ["/images/photography/gate-driveway.jpg", "A gated driveway entrance", "cover"],
    "sliding-glass-door-motor": ["/images/photography/entrance-night.jpg", "Illuminated building lobby behind automatic glass doors", "cover"],
    "sectional-door-motor": ["/images/photography/garage-door-house.jpg", "A closed sectional overhead door", "cover"],
    "industrial-sliding-gate-motor": ["/images/photography/gates-industrial.jpg", "Industrial site entrance with a large powered gate", "cover"],
  },
};

/** Legacy galleries kept: only the clean catalogue renders. */
const keepGallery = new Set(["tripod-turnstiles", "flap-barriers", "full-height-turnstiles"]);

for (const [file, products] of Object.entries(edits)) {
  let source = readFileSync(file, "utf8");

  for (const [slug, [image, alt, fit]] of Object.entries(products)) {
    const start = source.indexOf(`slug: "${slug}"`);
    if (start === -1) throw new Error(`slug not found: ${slug}`);
    const end = source.indexOf('    slug: "', start + 10);
    const boundary = end === -1 ? source.length : end;
    let block = source.slice(start, boundary);

    block = block.replace(/ {4}image: .*?,\n {4}imageAlt: .*?,\n/s, () =>
      `    image: ${JSON.stringify(image)},\n    imageAlt: ${JSON.stringify(alt)},\n` +
      (fit === "contain" ? `    imageFit: "contain",\n` : ""),
    );

    if (!keepGallery.has(slug)) {
      block = block.replace(/ {4}gallery: \[[\s\S]*?\n {4}\],\n/, "");
      block = block.replace(/ {4}gallery: \[\{[^\n]*\}\],\n/, "");
    }

    source = source.slice(0, start) + block + source.slice(boundary);
  }

  writeFileSync(file, source);
  console.log(`patched ${file}`);
}
