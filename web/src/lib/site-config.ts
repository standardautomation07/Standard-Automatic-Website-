/**
 * Single source of truth for confirmed business information.
 *
 * Rule for this file: nothing goes in unless it is confirmed by the business
 * or verifiable on Standard Automation's own published material. Anything
 * unconfirmed stays `null` and every consumer must render nothing rather
 * than fall back to a guess. (The old site published three different
 * addresses because this data was hand-repeated across templates.)
 */
export const siteConfig = {
  legalName: "Standard Automatic Solutions Pvt. Ltd.",
  shortName: "Standard Automation",
  /** Confirmed: company's own about page states the business was founded in 2006 in Pune. */
  foundedYear: 2006,
  /** Confirmed: the company publishes "An ISO 9001-2015 Registered Company" on its own site. */
  isoCertification: "ISO 9001:2015",
  url: "https://www.standardautomation.in",

  /** Confirmed by the business (supersedes the two other addresses on the old site). */
  address: {
    street: "215, Business Square, Opp. DSK Ranwara",
    locality: "Bavdhan",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411021",
    country: "IN",
    countryName: "India",
  },

  phone: "+91 8888 100 280",
  whatsapp: "+91 8888 100 280",
  email: "sales@standardautomation.in",

  /** Not confirmed. Leave null — components must render nothing. */
  gaMeasurementId: null as string | null,
  socialLinks: [] as { platform: string; url: string }[],
} as const;

export const addressLine = [
  siteConfig.address.street,
  siteConfig.address.locality,
  `${siteConfig.address.city} ${siteConfig.address.postalCode}`,
  siteConfig.address.region,
].join(", ");

export function whatsappHref(message?: string) {
  const digits = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function telHref() {
  return `tel:${siteConfig.phone.replace(/\s/g, "")}`;
}

export function mailtoHref(subject?: string) {
  return `mailto:${siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
