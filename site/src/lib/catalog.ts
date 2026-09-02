import catalogData from "@/data/catalog.json";
import type { Catalog, Category, Product } from "./types";

const catalog = catalogData as Catalog;

export function getAllCategories(): Category[] {
  return catalog.categories;
}

export function getCategory(slug: string): Category | undefined {
  return catalog.categories.find((c) => c.slug === slug);
}

export function getAllProducts(): Product[] {
  return catalog.products;
}

export function getProductsForCategory(categorySlug: string): Product[] {
  return catalog.products.filter((p) => p.categorySlug === categorySlug);
}

export function getProduct(
  categorySlug: string,
  productSlug: string
): Product | undefined {
  return catalog.products.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs
    .map((slug) => catalog.products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

/**
 * The 4 URLs confirmed by the business as genuine Rolling Shutter variants
 * (planning/OPEN-BUSINESS-DECISIONS.md, "Resolved by the business" section) -
 * returns the OTHER confirmed variants for a given product, for the
 * product page's "Variants" section. Empty for any product that isn't one
 * of the four.
 */
export function getConfirmedVariants(product: Product): Product[] {
  if (!product.confirmedVariant) return [];
  return catalog.products.filter(
    (p) => p.confirmedVariant && p.slug !== product.slug
  );
}

export function getFeaturedProducts(count = 6): Product[] {
  // Prefer products from currently-active (not pending-confirmation) categories
  // for homepage prominence - see planning/OPEN-BUSINESS-DECISIONS.md item 3.
  const activeCategorySlugs = new Set(
    catalog.categories.filter((c) => c.status === "active").map((c) => c.slug)
  );
  return catalog.products
    .filter((p) => activeCategorySlugs.has(p.categorySlug) && p.navLive)
    .slice(0, count);
}

/**
 * Applications/industries aggregated from real per-product data
 * (see planning/FINAL-IA.md §4) - not an invented taxonomy.
 */
export const SOLUTIONS = [
  {
    slug: "warehousing-logistics",
    name: "Warehousing & Logistics",
    matchTerms: ["warehouse", "logistic", "loading bay"],
  },
  {
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial Plants",
    matchTerms: ["factory", "factories", "industrial", "manufactur"],
  },
  {
    slug: "cold-storage",
    name: "Cold Storage",
    matchTerms: ["cold storage"],
  },
  {
    slug: "commercial-retail",
    name: "Commercial & Retail",
    matchTerms: ["commercial", "supermarket", "showroom", "retail"],
  },
  {
    slug: "institutional",
    name: "Institutional",
    matchTerms: ["hospital", "office"],
  },
  {
    slug: "transport-infrastructure",
    name: "Transport Infrastructure",
    matchTerms: ["airport"],
  },
] as const;

export function getProductsForSolution(slug: string): Product[] {
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return [];
  return catalog.products.filter((p) =>
    p.applications.some((app) =>
      solution.matchTerms.some((term) =>
        app.toLowerCase().includes(term.toLowerCase())
      )
    )
  );
}
