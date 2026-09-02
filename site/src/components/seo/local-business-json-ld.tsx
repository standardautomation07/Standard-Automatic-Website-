import { siteConfig } from "@/lib/site-config";

/**
 * LocalBusiness schema - was previously gated behind address confirmation
 * (planning/SEO-IMPLEMENTATION-PLAN.md §5, OPEN-BUSINESS-DECISIONS.md item 1).
 * The client's build-approval brief confirmed the Bavdhan address as
 * authoritative, so this now ships. If the address is ever in question again,
 * gate this component on `siteConfig.address` being non-null rather than
 * shipping a guess.
 */
export function LocalBusinessJsonLd() {
  const { address } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    image: `${siteConfig.url}/images/legacy/logo.png`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: `${address.locality}, ${address.city}`,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
