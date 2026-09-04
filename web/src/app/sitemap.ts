import type { MetadataRoute } from "next";
import { categories, products, productPath } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

/**
 * `/projects` is deliberately absent: it is noindex until it carries real
 * project content, so listing it in the sitemap would contradict the page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/products"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/industries"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/resources"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    ...categories.map((category) => ({
      url: url(`/products/${category.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: url(productPath(product)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
