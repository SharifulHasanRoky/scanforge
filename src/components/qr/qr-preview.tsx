"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { buildOptions, type QrDesign } from "@/lib/qr/designer";

type Props = {
  data: string;
  design: QrDesign;
  size?: number;
  className?: string;
  onReady?: (qr: QRCodeStyling) => void;
};

/**
 * Live QR preview. Renders an SVG-backed qr-code-styling instance into a
 * container element. The parent component is responsible for the download
 * buttons by calling qr.download(...) via the onReady callback.
 */
export function QrPreview({ data, design, size = 300, className, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(buildOptions(data, design, size));
      qrRef.current.append(containerRef.current);
      onReady?.(qrRef.current);
    }
    return () => {
      // keep instance across re-renders; do not destroy
    };
     
  }, []);

  useEffect(() => {
    if (!qrRef.current) return;
    qrRef.current.update(buildOptions(data, design, size));
  }, [data, design, size]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      aria-label="QR code preview"
    />
  );
}
