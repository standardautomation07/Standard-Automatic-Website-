import { families, familyById } from "@/data/families";
import { categories, categoryById } from "@/data/categories";
import { industries, industryById } from "@/data/industries";
import { highSpeedDoorProducts } from "@/data/products/high-speed-doors";
import { industrialDoorProducts } from "@/data/products/industrial-doors";
import { rollingShutterProducts } from "@/data/products/rolling-shutters";
import { fireSafetyProducts } from "@/data/products/fire-safety-doors";
import { automaticGateProducts } from "@/data/products/automatic-gates";
import { entranceAutomationProducts } from "@/data/products/entrance-automation";
import { loadingBayProducts } from "@/data/products/loading-bay";
import { accessControlProducts } from "@/data/products/access-control";
import specValues from "@/data/spec-values.json";
import { schemaFor } from "@/data/spec-schema";
import { guidanceFor } from "@/data/category-guidance";
import type {
  Category,
  Family,
  FamilyId,
  Product,
  Spec,
  SpecGroup,
  VariantSpec,
} from "@/lib/types";

export { families, familyById, categories, categoryById, industries, industryById };

/** Every published product, in family order. */
export const products: Product[] = [
  ...highSpeedDoorProducts,
  ...industrialDoorProducts,
  ...rollingShutterProducts,
  ...fireSafetyProducts,
  ...automaticGateProducts,
  ...entranceAutomationProducts,
  ...loadingBayProducts,
  ...accessControlProducts,
];

const productById = new Map(products.map((p) => [p.id, p]));

export function getProduct(id: string): Product | undefined {
  return productById.get(id);
}

export function getFamily(id: string): Family | undefined {
  return families.find((f) => f.id === id);
}

export function productsInFamily(familyId: FamilyId): Product[] {
  return products.filter((p) => p.familyId === familyId);
}

export function categoriesInFamily(familyId: FamilyId): Category[] {
  return categories.filter((c) => c.familyId === familyId);
}

export function productsInCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function relatedProducts(product: Product): Product[] {
  return product.related.map((id) => productById.get(id)).filter((p): p is Product => Boolean(p));
}

export function productsForIndustry(industryId: string): Product[] {
  const industry = industries.find((i) => i.id === industryId);
  if (!industry) return [];
  return industry.recommendedProductIds
    .map((id) => productById.get(id))
    .filter((p): p is Product => Boolean(p));
}

export function familyPath(familyId: string): string {
  return `/products/${familyId}`;
}

export function productPath(product: Product): string {
  return `/products/${product.familyId}/${product.id}`;
}

export function industryPath(industryId: string): string {
  return `/industries/${industryId}`;
}

/**
 * Category defaults merged under any product-level override. This is what
 * lets 38 product pages carry safety, control, option and maintenance detail
 * without 38 copies of the same paragraphs.
 */
export function resolveDetail(
  product: Product,
  key: "safety" | "controls" | "options" | "maintenance",
): string[] {
  return product[key] ?? categoryById[product.categoryId]?.defaults[key] ?? [];
}

/** Homepage selection: one product from each of six families, confirmed only. */
export const featuredProductIds = [
  "high-speed-roll-up-doors",
  "industrial-sectional-overhead-doors",
  "polycarbonate-rolling-shutters",
  "dock-levellers",
  "flap-barriers",
  "automatic-sliding-gates",
] as const;

export const featuredProducts: Product[] = featuredProductIds
  .map((id) => productById.get(id))
  .filter((p): p is Product => Boolean(p));

export const counts = {
  families: families.length,
  categories: categories.length,
  products: products.length,
};

/* ------------------------------------------------------------------ *
 * Specifications
 *
 * A product's technical data is the schema for its category (the fields a
 * specifier needs answered) merged with whatever supportable values exist in
 * spec-values.json. A field with no value resolves to null and the UI renders
 * it as to-be-confirmed — there is deliberately no code path that can invent
 * one. Values that do not correspond to a schema field are not discarded;
 * they surface in a final "Additional published data" group.
 * ------------------------------------------------------------------ */

const values = specValues as Record<string, Record<string, string>>;

export function productSpecGroups(product: Product): SpecGroup[] {
  const published = values[product.id] ?? {};
  const claimed = new Set<string>();

  const groups: SpecGroup[] = schemaFor(product).map((group) => ({
    group: group.group,
    specs: group.fields.map((field) => {
      const value = published[field.label];
      if (value !== undefined) claimed.add(field.label);
      return { ...field, value: value ?? null } satisfies Spec;
    }),
  }));

  const extra = Object.entries(published).filter(([label]) => !claimed.has(label));
  if (extra.length > 0) {
    groups.push({
      group: "Additional published data",
      specs: extra.map(([label, value]) => ({ label, value })),
    });
  }

  return groups;
}

/** How much of the schema is actually answered — shown on the page so the
 *  reader knows what they are looking at without counting rows. */
export function specCompleteness(product: Product) {
  const groups = productSpecGroups(product);
  const specs = groups.flatMap((group) => group.specs);
  const published = specs.filter((spec) => spec.value !== null).length;
  return { published, total: specs.length, groups };
}

/** Per-variant specification deltas, keyed "<productId>::<variantId>". */
export function variantSpecs(product: Product): VariantSpec[] {
  return product.variants
    .map((variant) => {
      const published = values[`${product.id}::${variant.id}`] ?? {};
      const specs = Object.entries(published).map(([label, value]) => ({ label, value }));
      return { variant, specs };
    })
    .filter((entry) => entry.specs.length > 0);
}

/** Every product that still has unanswered fields, worst first. Drives the
 *  data-request sheet in scripts/build-spec-request.mjs. */
export function specGaps() {
  return products
    .map((product) => {
      const { published, total } = specCompleteness(product);
      return { product, published, total, missing: total - published };
    })
    .sort((a, b) => b.missing - a.missing);
}

/**
 * Integration, installation, selection guidance and FAQ, resolved product
 * over category. All four are properties of how a product type works, so the
 * category carries them and a product overrides only where it genuinely
 * differs.
 */
export function productGuidance(product: Product) {
  const shared = guidanceFor(product.categoryId);
  return {
    integration: product.integration ?? shared?.integration ?? [],
    installation: product.installation ?? shared?.installation ?? [],
    selectionGuide: product.selectionGuide ?? shared?.selectionGuide ?? [],
    faq: product.faq ?? shared?.faq ?? [],
  };
}
