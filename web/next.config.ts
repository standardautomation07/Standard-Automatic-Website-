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
  async redirects() {
    return redirects as { source: string; destination: string; permanent: boolean }[];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
