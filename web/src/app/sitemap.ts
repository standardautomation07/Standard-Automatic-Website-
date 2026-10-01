import type { MetadataRoute } from "next";
import { families, industries, productPath, products } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";
import { resourceGuides } from "@/data/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/") },
    { url: url("/products") },
    { url: url("/products/catalogue") },
    { url: url("/industries") },
    { url: url("/service-support") },
    { url: url("/resources") },
    ...resourceGuides.map((guide) => ({
      url: url(`/resources/${guide.slug}`),
    })),
    { url: url("/about") },
    { url: url("/projects") },
    { url: url("/contact") },
    ...families.map((family) => ({
      url: url(`/products/${family.id}`),
    })),
    ...products.map((product) => ({
      url: url(productPath(product)),
    })),
    ...industries.map((industry) => ({
      url: url(`/industries/${industry.id}`),
    })),
  ];
}
