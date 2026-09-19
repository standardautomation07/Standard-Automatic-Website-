import type { MetadataRoute } from "next";
import { families, industries, productPath, products } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/products"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/products/catalogue"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/industries"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/service-support"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/resources"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    ...families.map((family) => ({
      url: url(`/products/${family.id}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...products.map((product) => ({
      url: url(productPath(product)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((industry) => ({
      url: url(`/industries/${industry.id}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
