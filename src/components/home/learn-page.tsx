"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, QrCode, Barcode, Wifi, Image as ImageIcon, Printer, Layers, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/store";

const GUIDES = [
  { icon: QrCode, title: "How to create a QR code", body: "Open the QR generator, pick a content type (URL, Wi-Fi, vCard…), fill in the fields and watch the live preview update. Customise colours, dot pattern and logo, then download as PNG, SVG or PDF." },
  { icon: ImageIcon, title: "How to add a logo to a QR code", body: "In the Design tab, upload a PNG or SVG logo. Keep the logo under ~30% of the code area and raise error correction to level Q or H so the code stays scannable. We hide the dots behind the logo automatically." },
  { icon: Wifi, title: "How to share Wi-Fi with a QR code", body: "Choose the Wi-Fi type, enter the SSID and password, then select WPA/WPA2/WPA3 or no password. Phones scan it and offer to join the network — no typing required." },
  { icon: Barcode, title: "How to generate a barcode", body: "Pick a format (EAN-13, UPC-A, Code 128…), type the value and we validate the structure and check digit. Download PNG for screens or SVG/PDF for print." },
  { icon: Layers, title: "Difference between QR and barcode", body: "Barcodes are 1D (lines) and hold a short numeric or alphanumeric ID, ideal for retail scanning. QR codes are 2D matrices that hold hundreds of characters — URLs, vCards, Wi-Fi credentials and more — and scan from any angle." },
  { icon: ShieldCheck, title: "Static vs dynamic QR codes", body: "A static QR encodes its destination directly in the image — it never expires and needs no server. A dynamic QR points to a short redirect URL you can edit later, which requires backend infrastructure. ScanForge focuses on reliable static codes." },
  { icon: Printer, title: "How to print QR codes", body: "Export as PDF for print-ready A4 output, or use the bulk generator to lay many codes on a single label-sheet PDF. Always test-scan a printed sample — small sizes and low contrast are the most common print failures." },
  { icon: Layers, title: "How to generate bulk QR codes", body: "Open Bulk generator, paste a list (one per line) or import a CSV, choose QR or barcode, then download a ZIP of PNGs or a single label-sheet PDF. Processing runs in your browser, so your data never leaves your device." },
];

export function LearnPage() {
  const setView = useApp((s) => s.setView);
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-6">
      <div>
        <Badge variant="secondary" className="mb-3"><BookOpen className="mr-1.5 h-3.5 w-3.5" /> Learn</Badge>
        <h1 className="text-3xl font-bold tracking-tight">QR &amp; barcode guides</h1>
        <p className="mt-2 text-muted-foreground">Short, practical explainers so you get reliable, scannable codes every time.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Card key={g.title} className="p-5">
            <g.icon className="h-6 w-6 text-brand" />
            <h2 className="mt-2 font-semibold">{g.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{g.body}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Ready to put it into practice?</h2>
        <p className="mt-1 text-sm text-muted-foreground">All tools are free — no signup, no watermark.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={() => setView("qr")} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-brand">Open QR generator</button>
          <button onClick={() => setView("barcode")} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-brand">Open barcode generator</button>
          <button onClick={() => setView("bulk")} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-brand">Bulk generator</button>
        </div>
      </Card>
    </div>
  );
}
