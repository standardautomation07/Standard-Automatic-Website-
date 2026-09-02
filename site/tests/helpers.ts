import catalog from "../src/data/catalog.json";
import type { Catalog } from "../src/lib/types";

const data = catalog as Catalog;

export const categories = data.categories;
export const products = data.products;

export const CORE_ROUTES = [
  "/",
  "/products",
  "/solutions",
  "/projects",
  "/clients",
  "/about-us",
  "/resources",
  "/service-support",
  "/contact",
];

export const CATEGORY_ROUTES = categories.map((c) => `/products/${c.slug}`);

// A representative sample (not all 43) for per-page functional/SEO checks;
// the full set is covered by the lighter-weight smoke test.
export const SAMPLE_PRODUCT_ROUTES = [
  products.find((p) => p.slug === "sliding-gate"),
  products.find((p) => p.slug === "m-s-rolling-shutters"),
  products.find((p) => p.slug === "dock-levellers"),
  products.find((p) => p.slug === "fire-proof-shutters"), // confirmed Rolling Shutter variant
]
  .filter((p): p is (typeof products)[number] => Boolean(p))
  .map((p) => `/products/${p.categorySlug}/${p.slug}`);

export const ALL_PRODUCT_ROUTES = products.map(
  (p) => `/products/${p.categorySlug}/${p.slug}`
);
