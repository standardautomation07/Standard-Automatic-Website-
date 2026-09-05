/**
 * Technical data round-trip.
 *
 *   node scripts/spec-data.mjs request   → writes research/technical-data-request.csv
 *   node scripts/spec-data.mjs import    → reads that CSV back into src/data/spec-values.json
 *   node scripts/spec-data.mjs status    → prints how complete each product is
 *
 * The sheet is the only thing anyone needs to touch to publish technical
 * data. Fill the `value` column, run `import`, and the site picks it up —
 * no code changes, and no way for a value to appear without passing through
 * this file.
 *
 * These imports work under plain Node because every file involved imports
 * types only, which type-stripping removes at runtime.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { highSpeedDoorProducts } from "../src/data/products/high-speed-doors.ts";
import { industrialDoorProducts } from "../src/data/products/industrial-doors.ts";
import { rollingShutterProducts } from "../src/data/products/rolling-shutters.ts";
import { fireSafetyProducts } from "../src/data/products/fire-safety-doors.ts";
import { automaticGateProducts } from "../src/data/products/automatic-gates.ts";
import { entranceAutomationProducts } from "../src/data/products/entrance-automation.ts";
import { loadingBayProducts } from "../src/data/products/loading-bay.ts";
import { accessControlProducts } from "../src/data/products/access-control.ts";
import { schemaFor } from "../src/data/spec-schema.ts";
import { authoredSpecs } from "../src/data/product-specs.ts";
import { families } from "../src/data/families.ts";

/**
 * Products whose full parameter set has been issued by the business live in
 * product-specs.ts and are deliberately absent from this sheet. Collecting
 * them here would let an import write a second, competing copy of their data
 * into spec-values.json.
 */
const allProducts = [
  ...highSpeedDoorProducts,
  ...industrialDoorProducts,
  ...rollingShutterProducts,
  ...fireSafetyProducts,
  ...automaticGateProducts,
  ...entranceAutomationProducts,
  ...loadingBayProducts,
  ...accessControlProducts,
];

const products = allProducts.filter((product) => !authoredSpecs[product.id]);
const authoredCount = allProducts.length - products.length;

const VALUES = "src/data/spec-values.json";
const SHEET = "../research/technical-data-request.csv";

const familyName = (id) => families.find((f) => f.id === id)?.name ?? id;
const readValues = () => (existsSync(VALUES) ? JSON.parse(readFileSync(VALUES, "utf8")) : {});

const quote = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

/** Minimal RFC4180 row parser — handles quoted fields containing commas. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 1; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field !== "" || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c !== ""));
}

function buildRequest() {
  const values = readValues();
  const header = [
    "product_id", "product", "family", "variant_id", "group", "field", "unit", "guidance", "value",
  ];
  const lines = [header.map(quote).join(",")];
  let fields = 0;
  let answered = 0;

  for (const product of products) {
    for (const group of schemaFor(product)) {
      for (const field of group.fields) {
        const value = values[product.id]?.[field.label] ?? "";
        fields += 1;
        if (value) answered += 1;
        lines.push([
          product.id, product.name, familyName(product.familyId), "",
          group.group, field.label, field.unit ?? "", field.note ?? "", value,
        ].map(quote).join(","));
      }
    }
    // Values whose label is not a schema field must still round-trip, or
    // importing the sheet would silently delete them.
    const schemaLabels = new Set(schemaFor(product).flatMap((g) => g.fields.map((f) => f.label)));
    for (const [label, value] of Object.entries(values[product.id] ?? {})) {
      if (schemaLabels.has(label)) continue;
      fields += 1;
      answered += 1;
      lines.push([
        product.id, product.name, familyName(product.familyId), "",
        "Additional published data", label, "",
        "Published for this line but outside the standard field list.", value,
      ].map(quote).join(","));
    }

    // one block per variant, for figures that change with the configuration
    for (const variant of product.variants) {
      const key = `${product.id}::${variant.id}`;
      const existing = values[key] ?? {};
      const labels = Object.keys(existing);
      const rows = labels.length > 0 ? labels : ["", "", ""];
      for (const label of rows) {
        lines.push([
          product.id, product.name, familyName(product.familyId), variant.id,
          `Variant — ${variant.name}`, label, "",
          "Only fill this in where the configuration changes the figure.",
          existing[label] ?? "",
        ].map(quote).join(","));
      }
    }
  }

  writeFileSync(SHEET, `${lines.join("\n")}\n`);
  console.log(`wrote ${SHEET}`);
  console.log(`${products.length} products, ${fields} schema fields, ${answered} already answered, ${fields - answered} to collect`);
  console.log(`${authoredCount} products excluded: their parameters are issued and held in src/data/product-specs.ts`);
}

function importSheet() {
  if (!existsSync(SHEET)) throw new Error(`${SHEET} not found — run "request" first`);
  const rows = parseCsv(readFileSync(SHEET, "utf8"));
  const [header, ...body] = rows;
  const col = Object.fromEntries(header.map((h, i) => [h, i]));
  const out = {};
  let count = 0;

  for (const row of body) {
    const value = (row[col.value] ?? "").trim();
    const field = (row[col.field] ?? "").trim();
    if (!value || !field) continue;
    const productId = row[col.product_id];
    const variantId = (row[col.variant_id] ?? "").trim();
    const key = variantId ? `${productId}::${variantId}` : productId;
    (out[key] ??= {})[field] = value;
    count += 1;
  }

  writeFileSync(VALUES, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`imported ${count} values across ${Object.keys(out).length} records into ${VALUES}`);
}

function status() {
  const values = readValues();
  const rows = products
    .map((product) => {
      const fields = schemaFor(product).flatMap((g) => g.fields);
      const answered = fields.filter((f) => values[product.id]?.[f.label]).length;
      return { name: product.name, answered, total: fields.length };
    })
    .sort((a, b) => a.answered / a.total - b.answered / b.total);

  let answered = 0;
  let total = 0;
  for (const r of rows) {
    answered += r.answered;
    total += r.total;
    const pct = Math.round((r.answered / r.total) * 100);
    console.log(`${String(r.answered).padStart(3)}/${String(r.total).padEnd(3)} ${String(pct).padStart(3)}%  ${r.name}`);
  }
  console.log(`\noverall ${answered}/${total} (${Math.round((answered / total) * 100)}%)`);
}

const mode = process.argv[2] ?? "status";
if (mode === "request") buildRequest();
else if (mode === "import") importSheet();
else status();
