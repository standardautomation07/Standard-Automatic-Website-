import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ConversionRail, MobileActionBar } from "@/components/layout/conversion";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site-config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
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
  return (
    <html
      lang="en-IN"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="pb-14 xl:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ConversionRail />
        <MobileActionBar />
      </body>
    </html>
  );
}
