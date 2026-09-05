/**
 * Builds the internal product master.
 *
 *   node scripts/build-product-master.mjs
 *     → research/product-master.json
 *     → research/product-master.csv
 *
 * This is the internal research database, not a published artefact. It joins
 * the taxonomy, the written content, the specification schema, the values we
 * can support, the image provenance and the business-status evidence into one
 * row per product so gaps are visible at a glance.
 *
 * Nothing here is invented: every specification field is either a value from
 * spec-values.json or the string "SPECIFICATION REQUIRES BUSINESS
 * CONFIRMATION", which never reaches the website.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { highSpeedDoorProducts } from "../src/data/products/high-speed-doors.ts";
import { industrialDoorProducts } from "../src/data/products/industrial-doors.ts";
import { rollingShutterProducts } from "../src/data/products/rolling-shutters.ts";
import { fireSafetyProducts } from "../src/data/products/fire-safety-doors.ts";
import { automaticGateProducts } from "../src/data/products/automatic-gates.ts";
import { entranceAutomationProducts } from "../src/data/products/entrance-automation.ts";
import { loadingBayProducts } from "../src/data/products/loading-bay.ts";
import { accessControlProducts } from "../src/data/products/access-control.ts";
import { families } from "../src/data/families.ts";
import { categories } from "../src/data/categories.ts";
import { industries } from "../src/data/industries.ts";
import { schemaFor } from "../src/data/spec-schema.ts";
import { categoryGuidance } from "../src/data/category-guidance.ts";
import { imageList } from "../src/data/images.ts";

const products = [
  ...highSpeedDoorProducts,
  ...industrialDoorProducts,
  ...rollingShutterProducts,
  ...fireSafetyProducts,
  ...automaticGateProducts,
  ...entranceAutomationProducts,
  ...loadingBayProducts,
  ...accessControlProducts,
];

const values = JSON.parse(readFileSync("src/data/spec-values.json", "utf8"));
const images = Object.fromEntries(imageList.map((i) => [i.id, i]));
const TBC = "SPECIFICATION REQUIRES BUSINESS CONFIRMATION";

const family = (id) => families.find((f) => f.id === id);
const category = (id) => categories.find((c) => c.id === id);
const industryName = (id) => industries.find((i) => i.id === id)?.name ?? id;

/** Pull a field out of the resolved specs by fuzzy label, for the flat CSV. */
function spec(record, ...labels) {
  for (const label of labels) {
    const hit = Object.entries(record).find(([key]) =>
      key.toLowerCase().includes(label.toLowerCase()),
    );
    if (hit) return hit[1];
  }
  return TBC;
}

const master = products.map((product) => {
  const fam = family(product.familyId);
  const cat = category(product.categoryId);
  const guidance = categoryGuidance[product.categoryId] ?? {};
  const published = values[product.id] ?? {};

  const schema = schemaFor(product);
  const technical = {};
  let answered = 0;
  let total = 0;
  for (const group of schema) {
    technical[group.group] = {};
    for (const field of group.fields) {
      total += 1;
      const value = published[field.label];
      if (value !== undefined) answered += 1;
      technical[group.group][field.label] = value ?? TBC;
    }
  }
  const schemaLabels = new Set(schema.flatMap((g) => g.fields.map((f) => f.label)));
  const extra = Object.fromEntries(
    Object.entries(published).filter(([label]) => !schemaLabels.has(label)),
  );
  if (Object.keys(extra).length > 0) technical["Additional published data"] = extra;

  const image = images[product.imageId];

  return {
    category: fam?.name,
    category_slug: product.familyId,
    product_family: cat?.name,
    product_family_slug: product.categoryId,
    product_name: product.name,
    product_slug: product.id,
    url: `/products/${product.familyId}/${product.id}`,
    business_status: product.status,
    naming_note: product.namingNote ?? null,

    short_description: product.summary,
    value_proposition: product.tagline,
    overview: product.overview,

    variants: product.variants.map((v) => ({
      variant: v.name,
      variant_slug: v.id,
      status: v.status,
      note: v.note,
      specification_delta: values[`${product.id}::${v.id}`] ?? {},
    })),

    operating_type: product.operatingMethod,
    construction: product.construction,

    // flattened headline fields, for the CSV view
    opening_size: spec(published, "maximum clear width", "maximum clear opening", "platform length"),
    operating_speed: spec(published, "opening speed", "travel speed"),
    usage_cycle: spec(published, "rated daily cycles", "duty rating"),
    wind_rating: spec(published, "wind load", "rated wind"),
    insulation: spec(published, "thermal transmittance", "insulation core"),
    fire_rating: spec(published, "integrity rating"),

    safety_features: product.safety ?? cat?.defaults.safety ?? [],
    control_options: product.controls ?? cat?.defaults.controls ?? [],
    optional_features: product.options ?? cat?.defaults.options ?? [],
    maintenance_notes: product.maintenance ?? cat?.defaults.maintenance ?? [],
    installation_notes: product.installation ?? guidance.installation ?? [],
    integration: product.integration ?? guidance.integration ?? [],
    selection_guide: product.selectionGuide ?? guidance.selectionGuide ?? [],
    faq: product.faq ?? guidance.faq ?? [],

    applications: product.applications,
    industries: product.industries.map(industryName),
    operating_environments: product.environments,
    related_products: product.related,

    technical_parameters: technical,
    technical_completeness: {
      answered,
      total,
      percent: Math.round((answered / total) * 100),
    },

    seo_primary_keyword: product.name.toLowerCase(),
    seo_secondary_keywords: [
      ...product.applications.slice(0, 3).map((a) => a.toLowerCase()),
      `${product.name.toLowerCase()} india`,
      `${product.name.toLowerCase()} pune`,
    ],
    buyer_intent: product.status === "CONFIRMED" ? "commercial — ready for campaign traffic" : "commercial — hold until the line is confirmed",

    research_sources: product.legacyUrls
      ? ["Standard Automation published product page", "research/market-product-research.md"]
      : ["research/market-product-research.md", "2026-09-05 market review"],
    evidence: product.legacyUrls ?? [],
    image_sources: [
      image
        ? { file: image.src, source: image.source, usage: image.usage, alt: image.alt }
        : null,
      ...(product.galleryIds ?? []).map((id) =>
        images[id] ? { file: images[id].src, source: images[id].source, usage: images[id].usage, alt: images[id].alt } : null,
      ),
    ].filter(Boolean),
    confidence_level: product.status === "CONFIRMED" ? (product.namingNote ? "Medium" : "High") : "Medium",
  };
});

writeFileSync("../research/product-master.json", `${JSON.stringify(master, null, 2)}\n`);

// ------------------------------------------------------------------- CSV view
const columns = [
  "category", "product_family", "product_name", "product_slug", "url", "business_status",
  "short_description", "opening_size", "operating_speed", "usage_cycle", "wind_rating",
  "insulation", "fire_rating", "variants", "applications", "industries",
  "related_products", "technical_completeness", "confidence_level", "research_sources",
];
const cell = (v) => {
  const text = Array.isArray(v)
    ? v.map((x) => (typeof x === "object" && x !== null ? x.variant ?? x.system ?? JSON.stringify(x) : x)).join(" | ")
    : typeof v === "object" && v !== null
      ? `${v.answered}/${v.total} (${v.percent}%)`
      : String(v ?? "");
  return `"${text.replace(/"/g, '""')}"`;
};
const csv = [
  columns.map(cell).join(","),
  ...master.map((row) => columns.map((c) => cell(row[c])).join(",")),
].join("\n");
writeFileSync("../research/product-master.csv", `${csv}\n`);

const confirmed = master.filter((m) => m.business_status === "CONFIRMED").length;
console.log(`product master: ${master.length} products (${confirmed} confirmed, ${master.length - confirmed} potential)`);
console.log(`fields answered: ${master.reduce((n, m) => n + m.technical_completeness.answered, 0)} of ${master.reduce((n, m) => n + m.technical_completeness.total, 0)}`);
