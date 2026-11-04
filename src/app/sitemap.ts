import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

// Static sitemap. Because the app is a single-route hash-based SPA, we expose
// the primary content views as hash URLs. Search engines treat # fragments as
// on-page anchors (not separate URLs), so we list the canonical root and rely
// on the structured content + schema markup to communicate the sub-sections.
// When the site graduates to multi-route, each entry here becomes a real path.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BRAND.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
