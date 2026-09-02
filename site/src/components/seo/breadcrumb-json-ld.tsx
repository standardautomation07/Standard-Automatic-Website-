import { siteConfig } from "@/lib/site-config";
import { jsonLdHtml } from "@/lib/json-ld";

export interface Crumb {
  name: string;
  href: string;
}

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml(data) }}
    />
  );
}
