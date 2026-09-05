import { siteConfig } from "@/lib/site-config";
import type { Product, Spec, SpecGroup } from "@/lib/types";

const { address } = siteConfig;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/brand/logo.png`,
    foundingDate: String(siteConfig.foundedYear),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.locality}`,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "mr"],
      },
    ],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.locality}`,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path}`,
    })),
  };
}

/**
 * Product schema. Deliberately carries no `offers`, `aggregateRating` or
 * `review` — there are no published prices and no real review data, and
 * inventing either would be schema spam.
 */
export function productJsonLd(
  product: Product,
  path: string,
  imageSrc: string | null,
  specGroups: SpecGroup[],
) {
  // Only answered fields become structured data. A to-be-confirmed field is
  // absent rather than published as an empty or placeholder property.
  const specs = specGroups
    .flatMap((group) => group.specs)
    .filter((spec): spec is Spec & { value: string } => spec.value !== null);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    url: `${siteConfig.url}${path}`,
    ...(imageSrc ? { image: `${siteConfig.url}${imageSrc}` } : {}),
    category: product.familyId,
    brand: { "@type": "Brand", name: siteConfig.shortName },
    manufacturer: { "@type": "Organization", name: siteConfig.legalName },
    ...(specs.length > 0
      ? {
          additionalProperty: specs.map((spec) => ({
            "@type": "PropertyValue",
            name: spec.label,
            value: spec.value,
          })),
        }
      : {}),
  };
}

/** CollectionPage + ItemList for a family page. */
export function familyCollectionJsonLd(
  name: string,
  description: string,
  path: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${siteConfig.url}${item.path}`,
      })),
    },
  };
}

/**
 * FAQPage. Emitted only where the page actually carries the questions and
 * answers, because schema that does not match visible content is spam.
 */
export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}
