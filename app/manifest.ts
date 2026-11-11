import type { MetadataRoute } from "next";
import { BUSINESS_NAME, site } from "@/config/site";
import { withBase } from "@/lib/base-path";

export const dynamic = "force-static";

/** Pentru „Adaugă pe ecranul principal” de pe telefon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_NAME,
    short_name: BUSINESS_NAME.split(" ").at(-1),
    description: `${BUSINESS_NAME}: ${site.tagline}`,
    lang: "ro",
    start_url: withBase("/"),
    display: "standalone",
    background_color: "#FBF7EC",
    theme_color: "#1F6B52",
    icons: [
      { src: withBase("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: withBase("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: withBase("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
