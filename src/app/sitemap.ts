import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { QR_LANDING_CONTENT } from "@/lib/qr/landing-content";
import { BARCODE_LANDING_CONTENT } from "@/lib/barcode/landing-content";
import { ROUTE_META } from "@/lib/seo/routes";

// Public route map. Only indexable routes appear in the sitemap; the
// dashboard route is intentionally excluded because it is user-private.
// Every URL is built from BRAND.url so a domain change in brand.ts
// propagates everywhere with no other edit.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const indexableRoutes = Object.values(ROUTE_META).filter((m) => m.indexable);
  const qrLandingRoutes = Object.values(QR_LANDING_CONTENT).map((c) => ({
    path: `/${c.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));
  const barcodeLandingRoutes = Object.values(BARCODE_LANDING_CONTENT).map((c) => ({
    path: `/${c.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: BRAND.url,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Generic top-level routes (/qr, /barcode, /bulk, /learn, /about)
  for (const r of indexableRoutes) {
    entries.push({
      url: `${BRAND.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    });
  }

  // Per-QR-type landing pages (/wifi-qr, /vcard-qr, …)
  for (const r of qrLandingRoutes) {
    entries.push({
      url: `${BRAND.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    });
  }

  // Per-barcode-format landing pages (/ean-13-barcode, /upc-a-barcode, …)
  for (const r of barcodeLandingRoutes) {
    entries.push({
      url: `${BRAND.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    });
  }

  return entries;
}
