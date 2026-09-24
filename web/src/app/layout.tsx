import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ConversionRail, MobileActionBar } from "@/components/layout/conversion";
import { JsonLd } from "@/components/seo/json-ld";
import { Motion } from "@/components/ui/motion";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site-config";
import { families } from "@/data/families";
import { industries } from "@/data/industries";
import { productsInFamily } from "@/lib/catalog";

/**
 * Brand typefaces. Loaded through next/font rather than a Google Fonts <link>:
 * the files are self-hosted at build time, so there is no third-party request
 * on first paint and no layout shift while a webfont arrives.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Entrance Automation & Industrial Access Solutions | Standard Automation",
    template: "%s | Standard Automation",
  },
  description:
    "Standard Automatic Solutions Pvt. Ltd. designs, supplies and installs entrance automation, industrial doors, rolling shutters, loading bay equipment and access control systems from Pune.",
  applicationName: siteConfig.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.legalName,
    locale: "en_IN",
    url: siteConfig.url,
    title: "Entrance Automation & Industrial Access Solutions",
    description:
      "Entrance automation, industrial doors, rolling shutters, loading bay and access control systems — engineered, supplied and installed.",
    images: [{ url: "/images/photography/hero-facility.jpg", width: 1920, height: 1280 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The header is a client component; hand it the eight family records it
  // needs rather than letting it import the catalogue and image registry.
  const headerFamilies = families.map((family) => ({
    id: family.id,
    name: family.name,
    tagline: family.tagline,
    count: productsInFamily(family.id).length,
  }));
  const headerIndustries = industries.map(({ id, name }) => ({ id, name }));
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="pb-14 xl:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SiteHeader families={headerFamilies} industries={headerIndustries} />
        <main id="main">{children}</main>
        <SiteFooter />
        <ConversionRail />
        <MobileActionBar />
        <Motion />
      </body>
    </html>
  );
}
