/**
 * Builds the High Speed Doors type illustrations.
 *
 *   node scripts/build-door-diagrams.mjs  →  public/images/diagrams/*.svg
 *
 * Why these exist. Each of the seven high speed door types is defined by how
 * the leaf is stored and guided: rolled onto a drum, folded into a stack,
 * released from the guides on impact, carried into a spiral, lifted as rigid
 * panels, sealed into a hygienic frame, or insulated and heated for sub-zero
 * rooms. That difference is the product. Stock photography of a closed
 * industrial door shows none of it, and using the same warehouse photograph
 * for all seven would tell the reader nothing and imply things we have not
 * evidenced.
 *
 * So the lead image for each product is an original technical illustration of
 * that specific mechanism, drawn here. They are our own artwork, carry no
 * third-party rights, and depict only what the issued technical data
 * describes. Contextual photography still appears in each product gallery,
 * with alt text describing only what the photograph actually shows.
 *
 * These are diagrams, not renders: they do not represent a particular model,
 * finish or dimension, and nothing in them should be scaled off.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/images/diagrams";

// Palette lifted from the site tokens so the illustrations sit in the design
// rather than on top of it.
const C = {
  ground: "#eceae5",
  wall: "#d9d5cd",
  wallEdge: "#b9b3a8",
  steel: "#3d444d",
  steelDark: "#272c33",
  leaf: "#69707a",
  amber: "#c8892a",
  amberSoft: "#f0dcb8",
  glass: "#cfe0e6",
  white: "#ffffff",
  line: "#a9a396",
};
const W = 800;
const H = 600;

/** Opening geometry shared by every drawing. */
const O = { x: 250, y: 150, w: 300, h: 330 };

const label = (x, y, text, anchor = "start") =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="15" letter-spacing="0.06em" fill="${C.steel}">${text}</text>`;

const tick = (x1, y1, x2, y2) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.amber}" stroke-width="2" fill="none" stroke-linecap="round"/>`;

/** Building shell: floor, reveals and lintel. Every diagram sits in this. */
function shell() {
  return `
  <rect x="0" y="0" width="${W}" height="${H}" fill="${C.ground}"/>
  <rect x="90" y="90" width="620" height="420" fill="${C.wall}" stroke="${C.wallEdge}" stroke-width="2"/>
  <rect x="${O.x}" y="${O.y}" width="${O.w}" height="${O.h}" fill="${C.ground}"/>
  <path d="M90 480 L710 480" stroke="${C.wallEdge}" stroke-width="3"/>
  <path d="M${O.x} ${O.y} L${O.x} ${O.y + O.h} M${O.x + O.w} ${O.y} L${O.x + O.w} ${O.y + O.h}" stroke="${C.steel}" stroke-width="6" stroke-linecap="square"/>`;
}

/** The two side guides, drawn over the leaf. */
function guides(stroke = C.steel) {
  return `<path d="M${O.x} ${O.y} L${O.x} ${O.y + O.h} M${O.x + O.w} ${O.y} L${O.x + O.w} ${O.y + O.h}" stroke="${stroke}" stroke-width="6" stroke-linecap="square"/>`;
}

function frame(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <title>${title}</title>
  <desc>${subtitle}</desc>
${shell()}
${body}
  ${label(90, 552, title.toUpperCase())}
  ${label(710, 552, "STANDARD AUTOMATION", "end")}
  <path d="M90 566 L710 566" stroke="${C.line}" stroke-width="1"/>
</svg>
`;
}

/** A partly-open flexible curtain, drawn from y down to the sill. */
function curtain(top, fill = C.leaf, opacity = 1) {
  return `<rect x="${O.x + 3}" y="${top}" width="${O.w - 6}" height="${O.y + O.h - top}" fill="${fill}" opacity="${opacity}"/>`;
}

const vision = (top) =>
  `<rect x="${O.x + 40}" y="${top}" width="${O.w - 80}" height="42" fill="${C.glass}" stroke="${C.steelDark}" stroke-width="2"/>`;

const bottomBeam = (y) =>
  `<rect x="${O.x + 3}" y="${y}" width="${O.w - 6}" height="14" fill="${C.steelDark}"/>`;

// ------------------------------------------------------------------ 1. roll-up
function rollUp() {
  const top = 300;
  // drum, drawn as a spiral so the wound curtain is legible
  const spiral = [];
  for (let i = 0; i < 46; i += 1) {
    const a = (i / 46) * Math.PI * 6;
    const r = 12 + i * 1.05;
    spiral.push(`${i === 0 ? "M" : "L"}${400 + r * Math.cos(a)} ${185 + r * Math.sin(a)}`);
  }
  return frame(
    "High speed roll-up door",
    "The flexible curtain winds onto a drum above the opening and runs in side guides.",
    `
  <rect x="${O.x - 20}" y="118" width="${O.w + 40}" height="14" fill="${C.steelDark}"/>
  <path d="${spiral.join(" ")}" stroke="${C.amber}" stroke-width="3" fill="none"/>
  <circle cx="400" cy="185" r="62" fill="none" stroke="${C.steel}" stroke-width="2" stroke-dasharray="6 6"/>
  ${curtain(top)}
  ${vision(top + 26)}
  ${bottomBeam(O.y + O.h - 14)}
  ${guides()}
  ${tick(600, 185, 640, 185)}
  ${label(648, 190, "drum")}
  ${tick(600, 360, 640, 360)}
  ${label(648, 365, "PVC curtain")}
  ${tick(232, 300, 200, 300)}
  ${label(192, 305, "guide", "end")}`,
  );
}

// ----------------------------------------------------------------- 2. fold-up
function foldUp() {
  const folds = [];
  for (let i = 0; i < 4; i += 1) {
    const y = 168 + i * 30;
    folds.push(
      `<path d="M${O.x + 6} ${y} Q400 ${y + 26} ${O.x + O.w - 6} ${y}" fill="none" stroke="${C.leaf}" stroke-width="13" stroke-linecap="round"/>`,
    );
  }
  return frame(
    "High speed fold-up door",
    "The curtain gathers into horizontal folds on lifting straps instead of rolling onto a drum.",
    `
  <rect x="${O.x - 20}" y="118" width="${O.w + 40}" height="14" fill="${C.steelDark}"/>
  ${folds.join("\n  ")}
  <path d="M${O.x + 40} 132 L${O.x + 40} 300 M${O.x + O.w - 40} 132 L${O.x + O.w - 40} 300" stroke="${C.amber}" stroke-width="2" stroke-dasharray="7 5"/>
  ${curtain(300)}
  ${vision(330)}
  ${bottomBeam(O.y + O.h - 14)}
  ${guides()}
  ${tick(600, 200, 640, 200)}
  ${label(648, 205, "folded stack")}
  ${tick(600, 300, 640, 300)}
  ${label(648, 305, "lifting straps")}
  ${tick(232, 400, 200, 400)}
  ${label(192, 405, "wind bars", "end")}
  <path d="M${O.x + 10} 360 L${O.x + O.w - 10} 360 M${O.x + 10} 410 L${O.x + O.w - 10} 410" stroke="${C.steelDark}" stroke-width="4"/>`,
  );
}

// ---------------------------------------------------------- 3. self-repairing
function selfRepairing() {
  return frame(
    "High speed self-repairing door",
    "On impact the curtain leaves the guide instead of tearing, and re-seats itself on the next opening cycle.",
    `
  <rect x="${O.x - 20}" y="118" width="${O.w + 40}" height="14" fill="${C.steelDark}"/>
  <circle cx="400" cy="185" r="46" fill="none" stroke="${C.steel}" stroke-width="2" stroke-dasharray="6 6"/>
  ${curtain(280)}
  ${vision(306)}
  ${bottomBeam(O.y + O.h - 14)}
  <path d="M${O.x + 3} 380 Q${O.x - 46} 424 ${O.x + 34} 466 L${O.x + 3} 466 Z" fill="${C.leaf}"/>
  <path d="M${O.x + 3} 380 Q${O.x - 46} 424 ${O.x + 34} 466" fill="none" stroke="${C.amber}" stroke-width="3"/>
  ${guides()}
  <path d="M196 430 Q176 300 236 214" fill="none" stroke="${C.amber}" stroke-width="3" stroke-dasharray="8 6"/>
  <path d="M236 214 L226 232 L246 230 Z" fill="${C.amber}"/>
  ${label(96, 452, "curtain released")}
  ${label(96, 472, "on impact")}
  ${tick(600, 250, 640, 250)}
  ${label(648, 255, "re-seats at the")}
  ${label(648, 275, "top of travel")}`,
  );
}

// ------------------------------------------------------------------ 4. spiral
function spiral() {
  // Rigid panels carried into a spiral above the head, not touching each other.
  const panels = [];
  for (let i = 0; i < 9; i += 1) {
    const a = 1.4 + (i / 9) * Math.PI * 2.4;
    const r = 20 + i * 6.6;
    const cx = 400 + r * Math.cos(a);
    const cy = 190 + r * Math.sin(a);
    panels.push(
      `<rect x="${(cx - 22).toFixed(1)}" y="${(cy - 6).toFixed(1)}" width="44" height="12" rx="3" fill="${C.leaf}" transform="rotate(${((a * 180) / Math.PI + 90).toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`,
    );
  }
  const track = [];
  for (let i = 0; i <= 60; i += 1) {
    const a = 1.4 + (i / 60) * Math.PI * 2.4;
    const r = 20 + (i / 60) * 60;
    track.push(`${i === 0 ? "M" : "L"}${(400 + r * Math.cos(a)).toFixed(1)} ${(190 + r * Math.sin(a)).toFixed(1)}`);
  }
  const leaf = [];
  for (let i = 0; i < 5; i += 1) {
    leaf.push(
      `<rect x="${O.x + 4}" y="${330 + i * 30}" width="${O.w - 8}" height="26" rx="3" fill="${C.leaf}" stroke="${C.steelDark}" stroke-width="2"/>`,
    );
  }
  return frame(
    "High speed spiral door",
    "Rigid insulated panels are carried into a spiral track above the opening, so the leaf never rests on itself.",
    `
  <rect x="${O.x - 20}" y="118" width="${O.w + 40}" height="14" fill="${C.steelDark}"/>
  <path d="${track.join(" ")}" fill="none" stroke="${C.amber}" stroke-width="3"/>
  ${panels.join("\n  ")}
  ${leaf.join("\n  ")}
  <rect x="${O.x + 44}" y="336" width="${O.w - 88}" height="14" fill="${C.glass}"/>
  ${guides()}
  ${tick(600, 190, 640, 190)}
  ${label(648, 195, "spiral track")}
  ${tick(600, 380, 640, 380)}
  ${label(648, 385, "insulated")}
  ${label(648, 405, "aluminium panels")}`,
  );
}

// ----------------------------------------------------------- 5. rigid panels
function rigid() {
  const leaf = [];
  for (let i = 0; i < 4; i += 1) {
    leaf.push(
      `<rect x="${O.x + 4}" y="${330 + i * 38}" width="${O.w - 8}" height="34" rx="2" fill="${C.leaf}" stroke="${C.steelDark}" stroke-width="2"/>`,
    );
  }
  return frame(
    "High speed rigid insulated door",
    "Double-skin insulated panels lift vertically, with an insulation core between two metal skins.",
    `
  <rect x="${O.x - 20}" y="118" width="${O.w + 40}" height="14" fill="${C.steelDark}"/>
  <rect x="${O.x + 4}" y="146" width="${O.w - 8}" height="150" fill="${C.leaf}" opacity="0.28" stroke="${C.steel}" stroke-width="2" stroke-dasharray="7 5"/>
  ${label(O.x + 20, 226, "stored leaf")}
  ${leaf.join("\n  ")}
  ${guides()}
  <path d="M560 470 L660 400" stroke="${C.steel}" stroke-width="1.5"/>
  <rect x="600" y="300" width="96" height="100" fill="${C.white}" stroke="${C.steel}" stroke-width="2"/>
  <rect x="600" y="300" width="96" height="12" fill="${C.steelDark}"/>
  <rect x="600" y="388" width="96" height="12" fill="${C.steelDark}"/>
  <rect x="600" y="312" width="96" height="76" fill="${C.amberSoft}"/>
  ${label(600, 288, "panel section")}
  ${label(704, 356, "PU core")}
  ${tick(600, 356, 592, 356)}`,
  );
}

// --------------------------------------------------------------- 6. cleanroom
function cleanroom() {
  return frame(
    "High speed cleanroom and hygiene door",
    "A sealed rapid-door assembly in a stainless frame, with side and bottom seals between two controlled rooms.",
    `
  <rect x="90" y="90" width="160" height="390" fill="${C.white}" opacity="0.55"/>
  ${label(104, 124, "CLASSIFIED")}
  ${label(104, 144, "AREA")}
  <rect x="${O.x - 22}" y="118" width="${O.w + 44}" height="16" fill="${C.steel}"/>
  <rect x="${O.x - 22}" y="118" width="${O.w + 44}" height="5" fill="${C.white}"/>
  <circle cx="400" cy="188" r="44" fill="none" stroke="${C.steel}" stroke-width="2" stroke-dasharray="6 6"/>
  ${curtain(288, "#8f97a1")}
  ${vision(316)}
  ${bottomBeam(O.y + O.h - 14)}
  <path d="M${O.x - 8} ${O.y} L${O.x - 8} ${O.y + O.h} M${O.x + O.w + 8} ${O.y} L${O.x + O.w + 8} ${O.y + O.h}" stroke="${C.amber}" stroke-width="5"/>
  ${guides("#8b929b")}
  <path d="M${O.x + 3} ${O.y + O.h} L${O.x + O.w - 3} ${O.y + O.h}" stroke="${C.amber}" stroke-width="6"/>
  ${tick(600, 300, 640, 300)}
  ${label(648, 305, "side seals")}
  ${tick(600, 470, 640, 470)}
  ${label(648, 475, "bottom seal")}
  ${tick(232, 220, 200, 220)}
  ${label(192, 225, "stainless", "end")}
  ${label(192, 245, "frame", "end")}
  <path d="M170 340 L228 340" stroke="${C.amber}" stroke-width="3"/>
  <path d="M228 340 L214 332 L214 348 Z" fill="${C.amber}"/>
  ${label(104, 328, "pressure")}`,
  );
}

// -------------------------------------------------------------- 7. cold store
function coldStore() {
  const frost = [];
  for (let i = 0; i < 7; i += 1) {
    const x = 110 + i * 20;
    frost.push(
      `<path d="M${x} 300 L${x} 322 M${x - 8} 306 L${x + 8} 316 M${x + 8} 306 L${x - 8} 316" stroke="#7fa9bd" stroke-width="2" stroke-linecap="round"/>`,
    );
  }
  return frame(
    "High speed cold storage and freezer door",
    "An insulated flexible curtain with heated guides and a cold-storage bottom seal, between a freezer room and a warmer one.",
    `
  <rect x="90" y="90" width="160" height="390" fill="#cfe0ea" opacity="0.75"/>
  ${label(104, 124, "FREEZER")}
  ${label(104, 144, "ROOM")}
  ${frost.join("\n  ")}
  <rect x="${O.x - 20}" y="118" width="${O.w + 40}" height="14" fill="${C.steelDark}"/>
  <circle cx="400" cy="186" r="48" fill="none" stroke="${C.steel}" stroke-width="2" stroke-dasharray="6 6"/>
  ${curtain(284, "#5f7d8c")}
  <rect x="${O.x + 3}" y="284" width="${O.w - 6}" height="${O.y + O.h - 284}" fill="${C.white}" opacity="0.16"/>
  ${vision(312)}
  ${bottomBeam(O.y + O.h - 14)}
  ${guides()}
  <path d="M${O.x - 9} ${O.y + 10} L${O.x - 9} ${O.y + O.h} M${O.x + O.w + 9} ${O.y + 10} L${O.x + O.w + 9} ${O.y + O.h}" stroke="${C.amber}" stroke-width="5" stroke-dasharray="12 7"/>
  <path d="M${O.x + 3} ${O.y + O.h + 4} L${O.x + O.w - 3} ${O.y + O.h + 4}" stroke="${C.amber}" stroke-width="6"/>
  ${tick(600, 260, 640, 260)}
  ${label(648, 265, "insulated")}
  ${label(648, 285, "curtain")}
  ${tick(600, 380, 640, 380)}
  ${label(648, 385, "heated guides")}
  ${tick(600, 490, 640, 490)}
  ${label(648, 495, "cold-store seal")}`,
  );
}

const drawings = {
  "high-speed-roll-up-door": rollUp,
  "high-speed-fold-up-door": foldUp,
  "high-speed-self-repairing-door": selfRepairing,
  "high-speed-spiral-door": spiral,
  "high-speed-rigid-insulated-door": rigid,
  "high-speed-cleanroom-hygiene-door": cleanroom,
  "high-speed-cold-storage-freezer-door": coldStore,
};

mkdirSync(OUT, { recursive: true });
for (const [name, draw] of Object.entries(drawings)) {
  writeFileSync(`${OUT}/${name}.svg`, draw());
  console.log(`wrote ${OUT}/${name}.svg`);
}
