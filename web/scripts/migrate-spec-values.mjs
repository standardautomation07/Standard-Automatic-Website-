/**
 * One-off migration: lift the specification values that were embedded in the
 * product data files into `src/data/spec-values.json`, renaming each field to
 * its label in the new schema so nothing is lost or misfiled.
 *
 * Values that read "to be confirmed" are dropped rather than carried over —
 * an unknown field is represented by its absence, and the site renders that
 * as to-be-confirmed from the schema.
 *
 *   node scripts/migrate-spec-values.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const existing = JSON.parse(readFileSync("scripts/tmp/existing-specs.json", "utf8"));

/** old label -> new schema label, per product where the mapping differs. */
const rename = {
  common: {
    "Maximum width": "Maximum clear width",
    "Maximum height": "Maximum clear height",
    "Maximum span": "Maximum clear width",
    "Wind resistance": "Wind load resistance",
    "Sound reduction": "Airborne sound reduction",
    "Acoustic performance": "Airborne sound reduction",
    "Standard colour": "Finish and colour",
    "Finishes": "Finish and colour",
    "Standard finish": "Finish and colour",
    "Curtain colours": "Finish and colour",
    "Operation": "Operator type",
    "Drive": "Operator type",
    "Supply": "Supply voltage",
    "Motor power": "Rated motor power",
    "Activation": "Activation devices",
    "Control options": "Activation devices",
    "Manual operation": "Manual override",
    "Sealing": "Perimeter sealing",
    "Frame material": "Frame material",
  },
  "high-speed-roll-up-doors": {
    Curtain: "Curtain or panel material",
    "Vision panel": "Vision panel",
    "Side guides": "Side guide material",
  },
  "high-speed-insulated-panel-doors": {
    Panel: "Curtain or panel material",
    "Panel thickness": "Curtain or panel thickness",
    "Panel finish": "Finish and colour",
  },
  "industrial-sectional-overhead-doors": { Frame: "Track and hardware" },
  "aluminium-garage-doors": { Panel: "Panel material", "Hardware and track": "Track and hardware" },
  "residential-garage-doors": { Panel: "Panel material", "Hardware and track": "Track and hardware" },
  "galvanized-steel-rolling-shutters": {
    "Curtain material": "Slat material",
    "Slat height": "Slat profile height",
    "Guides and frame": "Guide material and section",
  },
  "aluminium-rolling-shutters": {
    "Curtain material": "Slat material",
    "Slat height": "Slat profile height",
    "Guides and frame": "Guide material and section",
  },
  "fire-rated-rolling-shutters": {
    "Curtain material": "Slat material",
    "Slat height": "Slat profile height",
    "Guides and frame": "Guide material and section",
  },
  "polycarbonate-rolling-shutters": {
    "Panel material": "Slat material",
    "Panel height": "Slat profile height",
    "Panel thickness": "Slat thickness",
    Frame: "Guide material and section",
  },
  "fire-rated-sliding-doors": {
    "Leaf facing": "Leaf facing material",
    "Lead sheet thickness": "Shielding — lead sheet thickness",
    "Vision window": "Vision panel glazing",
  },
  "retractable-gates": {
    "Maximum length": "Maximum clear opening",
    "Standard height": "Maximum leaf height",
    "Main tube": "Frame section",
    Wheels: "Running gear",
    "Track options": "Ground arrangement",
    "Travel speed": "Travel speed",
  },
  "dock-levellers": {
    "Deck material": "Deck plate type",
    "Upper working range": "Working range above dock",
    "Lower working range": "Working range below dock",
    "Power consumption": "Power pack rating",
  },
  "dock-shelters-and-houses": { "Size and colour": "Finish and colour" },
};

const isUnknown = (v) => /to be confirmed/i.test(v);

const out = {};
let carried = 0;
let dropped = 0;

for (const [id, values] of Object.entries(existing)) {
  const map = { ...rename.common, ...(rename[id] ?? {}) };
  const record = {};
  for (const [label, value] of Object.entries(values)) {
    if (isUnknown(value)) {
      dropped += 1;
      continue;
    }
    record[map[label] ?? label] = value;
    carried += 1;
  }
  if (Object.keys(record).length > 0) out[id] = record;
}

writeFileSync("src/data/spec-values.json", `${JSON.stringify(out, null, 2)}\n`);
console.log(`carried ${carried} values across ${Object.keys(out).length} products; dropped ${dropped} to-be-confirmed placeholders`);
