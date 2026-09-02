import { siteConfig } from "@/lib/site-config";

/**
 * Organization schema - safe to ship unconditionally (unlike LocalBusiness,
 * see local-business-json-ld.tsx) because it doesn't depend on the address
 * confirmation. See planning/SEO-IMPLEMENTATION-PLAN.md §5.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/legacy/logo.png`,
    foundingDate: String(siteConfig.foundedYear),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    ...(siteConfig.socialLinks.length
      ? { sameAs: siteConfig.socialLinks.map((s) => s.url) }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
