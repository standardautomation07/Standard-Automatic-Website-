import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Web app manifest. Icons point at the same mark the favicon uses, so an
 * installed shortcut and a browser tab show the same thing.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.shortName,
    description:
      "Entrance automation, industrial doors, rolling shutters, loading bay equipment and access control, engineered from Pune.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F7F9",
    theme_color: "#14161C",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
