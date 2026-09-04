import { categories, categoryBySlug } from "@/data/categories";
import { entranceAutomationProducts } from "@/data/products/entrance-automation";
import { industrialDoorProducts } from "@/data/products/industrial-doors";
import { rollingShutterProducts } from "@/data/products/rolling-shutters";
import { loadingBayProducts } from "@/data/products/loading-bay";
import { securityAccessProducts } from "@/data/products/security-access";
import { motorProducts } from "@/data/products/motors-accessories";
import type { Category, CategorySlug, Product } from "@/lib/types";

export const products: Product[] = [
  ...entranceAutomationProducts,
  ...industrialDoorProducts,
  ...rollingShutterProducts,
  ...loadingBayProducts,
  ...securityAccessProducts,
  ...motorProducts,
];

export { categories, categoryBySlug };

const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productsInCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function relatedProducts(product: Product): Product[] {
  return product.related
    .map((slug) => productBySlug.get(slug))
    .filter((p): p is Product => Boolean(p));
}

export function productPath(product: Product): string {
  return `/products/${product.category}/${product.slug}`;
}

export function categoryPath(slug: CategorySlug): string {
  return `/products/${slug}`;
}

/** Homepage selection — one representative product per category, plus the
 *  two strongest technical stories. Confirmed lines only. */
export const featuredSlugs = [
  "high-speed-roll-up-doors",
  "automatic-sliding-gates",
  "dock-levellers",
  "polycarbonate-rolling-shutters",
  "flap-barriers",
  "overhead-sectional-doors",
] as const;

export const featuredProducts: Product[] = featuredSlugs
  .map((slug) => productBySlug.get(slug))
  .filter((p): p is Product => Boolean(p));

/** Categories whose entire line is awaiting confirmation from the business. */
export function categoryIsPending(slug: CategorySlug): boolean {
  const inCategory = productsInCategory(slug);
  return inCategory.length > 0 && inCategory.every((p) => p.pendingConfirmation);
}
