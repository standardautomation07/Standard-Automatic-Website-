import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ClickTracker } from "@/components/analytics/click-tracker";
import { StickyConversionRail } from "@/components/layout/sticky-conversion-rail";
import { MobileStickyBar } from "@/components/layout/mobile-sticky-bar";
import { siteConfig } from "@/lib/site-config";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale - the old site's ux-audit.md §3 flagged pinch-zoom being
  // disabled as a WCAG 1.4.4 failure. Never re-add that restriction here.
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} | Industrial Doors, Gates & Shutters`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Manufacturer of automatic rolling shutters, sliding gates, industrial doors, high speed doors and loading bay equipment, based in Pune, India.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.legalName,
    url: siteConfig.url,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-surface-base pb-14 text-ink lg:pb-0">
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <GoogleAnalytics />
        <ClickTracker />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-brand-steel focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyConversionRail />
        <MobileStickyBar />
      </body>
    </html>
  );
}
