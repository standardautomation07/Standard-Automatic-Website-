/**
 * Confirmed business information only. Per planning/OPEN-BUSINESS-DECISIONS.md
 * and the client's build-approval brief (section 2), this is the single
 * authoritative source for company contact details across the whole app -
 * the old site's 3-different-addresses problem (research/seo-audit.md §1.9)
 * happened because this data was hand-repeated in multiple places.
 *
 * Do not add a field here unless it has been explicitly confirmed by the
 * business. Fields still pending confirmation are represented as `null` and
 * every component that reads them must handle that by omitting the element,
 * not by falling back to a guess.
 */
export const siteConfig = {
  legalName: "Standard Automatic Solutions Pvt Ltd",
  shortName: "Standard Automation",
  foundedYear: 2006,
  isoCertification: "ISO 9001:2015",
  url: "https://www.standardautomation.in",

  address: {
    street: "215, Business Square, Opp. DSK Ranwara",
    locality: "Bavdhan",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411021",
    country: "IN",
  },

  phone: "+91 8888 100 280",
  whatsapp: "+91 8888 100 280",
  email: "sales@standardautomation.in",

  // Not yet confirmed - see planning/OPEN-BUSINESS-DECISIONS.md. Leave null,
  // do not invent. Components must render nothing when these are null.
  gaMeasurementId: null as string | null,
  socialLinks: [] as { platform: string; url: string }[],
} as const;

export function whatsappHref(message?: string) {
  const digits = siteConfig.whatsapp.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function telHref() {
  return `tel:${siteConfig.phone.replace(/\s/g, "")}`;
}

export function mailtoHref(subject?: string) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.email}${query}`;
}
