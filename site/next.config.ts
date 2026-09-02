import type { NextConfig } from "next";
import redirectsData from "./src/data/redirects.json";

/**
 * Path-level 301s for every old .html URL, generated from
 * planning/final-redirects.csv via scripts/build-redirects-json.js - every
 * entry here traces back to that file (planning/URL-MIGRATION-PLAN.md).
 *
 * NOT handled here: http:// -> https:// and non-www -> www consolidation
 * (research/seo-audit.md §1.1). By the time a request reaches this Next.js
 * app, TLS/host have already been resolved by the hosting/edge layer
 * (e.g. Vercel enforces HTTPS automatically); that layer - not this file -
 * is where the protocol/host redirect must be configured before launch.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return redirectsData as { source: string; destination: string; permanent: boolean }[];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
