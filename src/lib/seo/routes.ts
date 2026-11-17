// Per-route SEO metadata. Each route = one URL = one search-result entry.
// Uses relative paths (resolved against metadataBase in layout.tsx = BRAND.url)
// so changing the domain in brand.ts cascades to every canonical / OG URL.

export type RouteMeta = {
  /** Title core (the layout template appends " · ScanForge"). */
  title: string;
  /** ≤160 chars, primary + supporting keywords, no quotes. */
  description: string;
  /** Path including leading slash. "/" for the homepage. */
  path: string;
  /** H1 used on the page (kept in sync with the rendered heading). */
  h1: string;
  /** Open Graph image alt text. */
  ogAlt: string;
  /** Whether search engines should index this URL. */
  indexable: boolean;
  /** Sitemap priority 0..1. */
  priority: number;
  /** Sitemap change frequency. */
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};

export const HOME_ROUTE: RouteMeta = {
  title: "Free QR Code & Barcode Generator Online",
  description:
    "Free QR code generator and barcode generator online. Create custom QR codes with logo, generate EAN/UPC/Code 128 barcodes, bulk generate from CSV, download PNG/SVG/PDF. No signup, no watermark, no daily limits.",
  path: "/",
  h1: "Create QR Codes & Barcodes. Free. In Seconds.",
  ogAlt: "ScanForge — Free QR Code & Barcode Generator",
  indexable: true,
  priority: 1.0,
  changeFrequency: "weekly",
};

export const ROUTE_META: Record<string, RouteMeta> = {
  qr: {
    title: "Free QR Code Generator with Logo & Custom Designs",
    description:
      "Free QR code generator with 12 content types (URL, Wi-Fi, vCard, WhatsApp, location, event). Custom designer with dot patterns, gradients and logo upload. Scan-validated. PNG, SVG, PDF export. No signup, no watermark.",
    path: "/qr",
    h1: "Free QR Code Generator with logo & custom designs",
    ogAlt: "ScanForge QR Code Generator",
    indexable: true,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  barcode: {
    title: "Free Barcode Generator Online — EAN, UPC, Code 128, Data Matrix",
    description:
      "Free barcode generator. Create EAN-13, UPC-A, Code 128, Code 39, ITF-14, GS1-128, Data Matrix, PDF417, Aztec barcodes. Automatic check-digit validation. PNG, SVG, PDF export. No signup, no watermark.",
    path: "/barcode",
    h1: "Free Barcode Generator — 15 formats",
    ogAlt: "ScanForge Barcode Generator",
    indexable: true,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  bulk: {
    title: "Bulk QR & Barcode Generator — CSV Import, ZIP & PDF Export",
    description:
      "Bulk QR code and barcode generator. Paste a list or import a CSV, generate hundreds of codes at once, export as a ZIP of PNGs or a label-sheet PDF. 100% in-browser processing. No signup, no watermark.",
    path: "/bulk",
    h1: "Bulk QR & Barcode Generator",
    ogAlt: "ScanForge Bulk Generator",
    indexable: true,
    priority: 0.8,
    changeFrequency: "weekly",
  },
  learn: {
    title: "Learn QR Codes & Barcodes — Guides, Formats, Use Cases",
    description:
      "Learn how QR codes and barcodes work. Compare QR types (URL, Wi-Fi, vCard), barcode formats (EAN, UPC, Code 128, Data Matrix), error correction, GS1 standards and best practices for printing.",
    path: "/learn",
    h1: "Learn QR codes & barcodes",
    ogAlt: "ScanForge Knowledge Base",
    indexable: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  about: {
    title: "About ScanForge — Free QR & Barcode Workspace",
    description:
      "ScanForge is a free, browser-first QR code and barcode generator. No signup, no watermark, no daily limits. Static generation runs in your browser; accounts are optional and only for saving codes.",
    path: "/about",
    h1: "About ScanForge",
    ogAlt: "About ScanForge",
    indexable: true,
    priority: 0.5,
    changeFrequency: "monthly",
  },
  // Dashboard is user-private — do not index.
  dashboard: {
    title: "Dashboard — ScanForge",
    description: "Your saved QR codes and barcodes. Sign in to save and organise your work.",
    path: "/dashboard",
    h1: "Your dashboard",
    ogAlt: "ScanForge Dashboard",
    indexable: false,
    priority: 0.3,
    changeFrequency: "weekly",
  },
};

// All hash view IDs that the catch-all route should accept.
export const APP_ROUTE_VIEWS = [
  "qr",
  "barcode",
  "bulk",
  "dashboard",
  "learn",
  "about",
] as const;
