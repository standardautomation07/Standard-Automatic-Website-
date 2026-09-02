import { siteConfig } from "@/lib/site-config";
import type { Product } from "@/lib/types";

/**
 * Product schema populated only from confirmed fields. No `offers`/pricing -
 * this is an enquiry-based catalogue, not e-commerce. See
 * planning/SEO-IMPLEMENTATION-PLAN.md §5.
 */
export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription ?? undefined,
    image: product.images.map((img) => `${siteConfig.url}${img.src}`),
    brand: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
