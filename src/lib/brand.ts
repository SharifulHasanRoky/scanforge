// ScanForge brand constants

export const BRAND = {
  name: "ScanForge",
  tagline: "Scan. Connect. Create.",
  headline: "Create QR Codes & Barcodes. Free. In Seconds.",
  subheadline:
    "Create custom QR codes and barcodes in seconds. Add your logo, customise designs, generate in bulk and download for free — no signup, no watermark, no daily limits.",
  promise:
    "The world's free QR code & barcode workspace. Create, customise, generate, download, print and manage QR codes and barcodes without unnecessary restrictions.",
  domain: "scanforge.app",
  url: "https://scanforge.app",
  email: "hello@scanforge.app",
} as const;

export type View =
  | "home"
  | "qr"
  | "barcode"
  | "bulk"
  | "dashboard"
  | "learn"
  | "about";

export const NAV_ITEMS: { label: string; view: View; desc: string }[] = [
  { label: "Home", view: "home", desc: "Overview of both workspaces" },
  { label: "QR Generator", view: "qr", desc: "12 QR types · custom designer · logo" },
  { label: "Barcode Generator", view: "barcode", desc: "15 formats · retail · industrial · 2D" },
  { label: "Bulk Generator", view: "bulk", desc: "CSV import · batch ZIP export" },
  { label: "Learn", view: "learn", desc: "Guides & QR/barcode knowledge" },
  { label: "Dashboard", view: "dashboard", desc: "Save & organise your codes" },
];

// Quick stats used across the site — honest, no fabricated traffic numbers.
export const PLATFORM_FACTS = [
  { label: "Price", value: "Free forever" },
  { label: "Signup required", value: "Never for generation" },
  { label: "Watermark", value: "None" },
  { label: "Daily limits", value: "No quotas" },
  { label: "Processing", value: "In your browser" },
  { label: "Export", value: "PNG · SVG · PDF · ZIP" },
];
