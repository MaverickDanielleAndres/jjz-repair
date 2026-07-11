import type { MetadataRoute } from "next";
import { BRAND, SITE_URL } from "@/lib/site-constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.displayName,
    short_name: BRAND.legalName,
    description: BRAND.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/logo-nobg.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
