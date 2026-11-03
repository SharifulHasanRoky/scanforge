// Barcode format catalogue + format-specific validation.
// 1D formats are rendered with JsBarcode (canvas + native SVG).
// 2D matrix formats are rendered with bwip-js (canvas).

export type BarcodeEngine = "jsbarcode" | "bwip";

export type BarcodeFormat = {
  id: string;
  label: string;
  engine: BarcodeEngine;
  // jsbarcode format id, or bwip-js bcid
  code: string;
  desc: string;
  placeholder: string;
  twoD?: boolean;
};

export const BARCODE_FORMATS: BarcodeFormat[] = [
  { id: "code128", label: "Code 128", engine: "jsbarcode", code: "CODE128", desc: "General-purpose, full ASCII. The most flexible 1D barcode.", placeholder: "ScanForge-001" },
  { id: "code39", label: "Code 39", engine: "jsbarcode", code: "CODE39", desc: "Legacy alphanumeric format used in industry and defence.", placeholder: "SCANFORGE-001" },
  { id: "code93", label: "Code 93", engine: "jsbarcode", code: "CODE93", desc: "Compact successor to Code 39 with extra security.", placeholder: "SCANFORGE001" },
  { id: "ean13", label: "EAN-13", engine: "jsbarcode", code: "EAN13", desc: "Global retail product identifier (13 digits).", placeholder: "5901234123457" },
  { id: "ean8", label: "EAN-8", engine: "jsbarcode", code: "EAN8", desc: "Compact retail code for small products (8 digits).", placeholder: "40170725" },
  { id: "upca", label: "UPC-A", engine: "jsbarcode", code: "UPC", desc: "North-American retail code (12 digits).", placeholder: "036000291452" },
  { id: "upce", label: "UPC-E", engine: "jsbarcode", code: "UPC", desc: "Compressed UPC for very small packages.", placeholder: "01234565" },
  { id: "itf14", label: "ITF-14", engine: "jsbarcode", code: "ITF14", desc: "Carton / shipping container code (14 digits).", placeholder: "10012345678902" },
  { id: "itf", label: "Interleaved 2 of 5", engine: "jsbarcode", code: "ITF", desc: "Numeric logistics barcode (even number of digits).", placeholder: "1234567890" },
  { id: "codabar", label: "Codabar", engine: "jsbarcode", code: "codabar", desc: "Numeric + ABCD start/stop, used in libraries and blood banks.", placeholder: "A12345B" },
  { id: "msi", label: "MSI", engine: "jsbarcode", code: "MSI", desc: "Numeric warehouse / inventory code.", placeholder: "1234567" },
  { id: "gs1-128", label: "GS1-128", engine: "jsbarcode", code: "CODE128", desc: "Code 128 with GS1 Application Identifiers (FNC1).", placeholder: "(01)10012345678902(10)BATCH123" },
  { id: "datamatrix", label: "Data Matrix", engine: "bwip", code: "datamatrix", desc: "Compact 2D matrix used in pharma and electronics.", placeholder: "SN-2026-001", twoD: true },
  { id: "pdf417", label: "PDF417", engine: "bwip", code: "pdf417", desc: "High-capacity stacked 2D code for documents and ID.", placeholder: "Large text or binary payload…", twoD: true },
  { id: "aztec", label: "Aztec", engine: "bwip", code: "aztec", desc: "2D code used on transport tickets and boarding passes.", placeholder: "TICKET-2026-ABC", twoD: true },
];

export type ValidationResult = { ok: boolean; error?: string; cleaned?: string };

// EAN/UPC/ITF-14 check digit (GS1 algorithm).
export function gs1CheckDigit(digits12: string): number {
  const d = digits12.replace(/\D/g, "");
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    sum += parseInt(d[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  return (10 - (sum % 10)) % 10;
}

export function validateFormat(format: BarcodeFormat, value: string): ValidationResult {
  const v = value.trim();
  if (!v) return { ok: false, error: "Enter a value to encode." };

  switch (format.id) {
    case "ean13": {
      const d = v.replace(/\D/g, "");
      if (d.length !== 13) return { ok: false, error: "EAN-13 requires exactly 13 digits (12 + check digit)." };
      const expected = gs1CheckDigit(d.slice(0, 12));
      if (expected !== parseInt(d[12], 10)) return { ok: false, error: `Check digit mismatch. Expected ${expected}.`, cleaned: d.slice(0, 12) + expected };
      return { ok: true, cleaned: d };
    }
    case "ean8": {
      const d = v.replace(/\D/g, "");
      if (d.length !== 8) return { ok: false, error: "EAN-8 requires exactly 8 digits (7 + check digit)." };
      return { ok: true, cleaned: d };
    }
    case "upca": {
      const d = v.replace(/\D/g, "");
      if (d.length !== 12) return { ok: false, error: "UPC-A requires exactly 12 digits (11 + check digit)." };
      return { ok: true, cleaned: d };
    }
    case "upce": {
      const d = v.replace(/\D/g, "");
      if (d.length < 6 || d.length > 8) return { ok: false, error: "UPC-E requires 6–8 digits." };
      return { ok: true, cleaned: d };
    }
    case "itf14": {
      const d = v.replace(/\D/g, "");
      if (d.length !== 14) return { ok: false, error: "ITF-14 requires exactly 14 digits (13 + check digit)." };
      return { ok: true, cleaned: d };
    }
    case "itf": {
      const d = v.replace(/\D/g, "");
      if (d.length < 2 || d.length % 2 !== 0) return { ok: false, error: "Interleaved 2 of 5 needs an even number of digits." };
      return { ok: true, cleaned: d };
    }
    case "code39": {
      if (!/^[A-Z0-9\-. $/+%]+$/.test(v)) return { ok: false, error: "Code 39 allows A–Z, 0–9 and - . $ / + % space only." };
      return { ok: true, cleaned: v.toUpperCase() };
    }
    case "code93": {
      if (!/^[A-Za-z0-9\-. $/+%]+$/.test(v)) return { ok: false, error: "Code 93 allows alphanumerics and - . $ / + % space." };
      return { ok: true, cleaned: v.toUpperCase() };
    }
    case "codabar": {
      if (!/^[A-D][\d\-.$:/]+[A-D]$/.test(v.toUpperCase())) return { ok: false, error: "Codabar needs a start (A–D), digits/symbols, and an end letter (A–D)." };
      return { ok: true, cleaned: v.toUpperCase() };
    }
    case "msi": {
      const d = v.replace(/\D/g, "");
      if (!d) return { ok: false, error: "MSI requires digits only." };
      return { ok: true, cleaned: d };
    }
    case "gs1-128": {
      if (!v.includes("(")) return { ok: false, error: "Use GS1 AIs in parentheses, e.g. (01)10012345678902(10)BATCH." };
      return { ok: true, cleaned: v };
    }
    case "code128":
      return { ok: true, cleaned: v };
    case "datamatrix":
    case "pdf417":
    case "aztec":
      return { ok: true, cleaned: v };
    default:
      return { ok: true, cleaned: v };
  }
}

export type BarcodeStyle = {
  width: number; // bar width multiplier (scale)
  height: number; // bar height in px (1D)
  margin: number;
  fgColor: string;
  bgColor: string;
  showText: boolean;
  fontSize: number;
  // 2D
  scale: number;
};

export const DEFAULT_BARCODE_STYLE: BarcodeStyle = {
  width: 2,
  height: 80,
  margin: 10,
  fgColor: "#000000",
  bgColor: "#ffffff",
  showText: true,
  fontSize: 14,
  scale: 3,
};
