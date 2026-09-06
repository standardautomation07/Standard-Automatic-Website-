import type { NextConfig } from "next";
import redirects from "./src/data/redirects.json";

/**
 * Path-level 301s from every old .html URL to its new home.
 *
 * Deliberately absent: `hotels-in-alibaug.html`. The business has retired
 * that page; a real 404 is the intended outcome and it must not be
 * redirected anywhere to avoid one.
 *
 * Also not handled here: http -> https and non-www -> www consolidation.
 * By the time a request reaches this app the host and protocol have already
 * been resolved by the edge/hosting layer, which is where that rule belongs.
 */
const nextConfig: NextConfig = {
  /**
   * Dev and production build into separate directories.
   *
   * They used to share `.next`, and running `next build` then `next dev`
   * against it left the dev server serving a half-stale graph — the symptom
   * was dynamic product routes 404ing while the family pages still worked.
   * Nothing about the code was wrong and it cost an hour twice. Two
   * directories cannot corrupt each other.
   */
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",

  async redirects() {
    return redirects as { source: string; destination: string; permanent: boolean }[];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // The High Speed Doors lead images are our own technical illustrations,
    // authored in scripts/build-door-diagrams.mjs and served from
    // public/images/diagrams. They are first-party files with no scripting;
    // the CSP below is belt and braces so an SVG can never execute anything
    // even if one is ever added by hand.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
