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
import type { Category, Family, FamilyId, Product } from "@/lib/types";

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
