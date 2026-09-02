import type { MetadataRoute } from "next";
import { getAllCategories, getAllProducts, SOLUTIONS } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
  const products = getAllProducts();

  const staticRoutes = [
    "",
    "/about-us",
    "/clients",
    "/contact",
    "/products",
    "/solutions",
    "/projects",
    "/resources",
    "/service-support",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    })),
    ...categories.map((c) => ({
      url: `${siteConfig.url}/products/${c.slug}`,
      lastModified: new Date(),
    })),
    ...products.map((p) => ({
      url: `${siteConfig.url}/products/${p.categorySlug}/${p.slug}`,
      lastModified: new Date(),
    })),
    ...SOLUTIONS.map((s) => ({
      url: `${siteConfig.url}/solutions/${s.slug}`,
      lastModified: new Date(),
    })),
  ];
}
