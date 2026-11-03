// Design settings for the QR designer and a builder that turns them into the
// option object consumed by the qr-code-styling engine.
import type { Options } from "qr-code-styling";

export type DotType = "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded";
export type CornerSquareType = "square" | "dot" | "extra-rounded";
export type CornerDotType = "square" | "dot";
export type Ecc = "L" | "M" | "Q" | "H";

export type QrDesign = {
  fgColor: string;
  bgColor: string;
  gradient: { enabled: boolean; from: string; to: string; rotation: number };
  dots: DotType;
  cornersSquare: CornerSquareType;
  cornersDot: CornerDotType;
  errorCorrection: Ecc;
  margin: number; // quiet zone in modules
  logo: { dataUrl: string | null; size: number; margin: number; removeBg: boolean };
};

export const DEFAULT_DESIGN: QrDesign = {
  fgColor: "#0f172a",
  bgColor: "#ffffff",
  gradient: { enabled: false, from: "#10b981", to: "#f59e0b", rotation: 45 },
  dots: "rounded",
  cornersSquare: "extra-rounded",
  cornersDot: "dot",
  errorCorrection: "M",
  margin: 4,
  logo: { dataUrl: null, size: 0.28, margin: 6, removeBg: true },
};

export const DESIGN_PRESETS: { name: string; design: QrDesign }[] = [
  { name: "Classic", design: { ...DEFAULT_DESIGN, dots: "square", cornersSquare: "square", cornersDot: "square" } },
  { name: "Forest", design: { ...DEFAULT_DESIGN, fgColor: "#065f46", gradient: { enabled: true, from: "#059669", to: "#065f46", rotation: 90 }, dots: "rounded" } },
  { name: "Sunset", design: { ...DEFAULT_DESIGN, fgColor: "#9a3412", gradient: { enabled: true, from: "#f59e0b", to: "#dc2626", rotation: 45 }, dots: "extra-rounded", cornersSquare: "dot" } },
  { name: "Ink", design: { ...DEFAULT_DESIGN, fgColor: "#111827", dots: "classy", cornersSquare: "extra-rounded" } },
  { name: "Berry", design: { ...DEFAULT_DESIGN, fgColor: "#6d28d9", gradient: { enabled: true, from: "#8b5cf6", to: "#db2777", rotation: 135 }, dots: "classy-rounded" } },
  { name: "Ocean", design: { ...DEFAULT_DESIGN, fgColor: "#0e7490", gradient: { enabled: true, from: "#0891b2", to: "#1e40af", rotation: 60 }, dots: "dots" } },
];

export function buildOptions(data: string, design: QrDesign, size = 320): Options {
  const dotsOptions: Options["dotsOptions"] = {
    type: design.dots,
    color: design.fgColor,
  };
  if (design.gradient.enabled) {
    dotsOptions.gradient = {
      type: "linear",
      rotation: (design.gradient.rotation * Math.PI) / 180,
      colorStops: [
        { offset: 0, color: design.gradient.from },
        { offset: 1, color: design.gradient.to },
      ],
    };
  }
  return {
    data: data || " ",
    width: size,
    height: size,
    type: "svg",
    margin: design.margin,
    qrOptions: { errorCorrectionLevel: design.errorCorrection },
    backgroundOptions: { color: design.bgColor },
    dotsOptions,
    cornersSquareOptions: { type: design.cornersSquare, color: design.fgColor },
    cornersDotOptions: { type: design.cornersDot, color: design.fgColor },
    imageOptions: {
      hideBackgroundDots: design.logo.removeBg,
      imageSize: design.logo.size,
      margin: design.logo.margin,
      crossOrigin: "anonymous",
    },
    image: design.logo.dataUrl || undefined,
  };
}
