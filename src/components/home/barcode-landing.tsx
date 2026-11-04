"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Barcode, ShieldCheck, Zap, FileDown, CheckCircle2, ArrowDown,
  Layers, ScanLine, AlertTriangle,
} from "lucide-react";
import { BARCODE_FORMATS } from "@/lib/barcode/formats";
import { useApp } from "@/lib/store";

const FEATURES = [
  { icon: Layers, title: "15 barcode formats", body: "Retail (EAN-13, EAN-8, UPC-A, UPC-E), general-purpose (Code 128/39/93, Codabar, ITF, MSI), industrial (ITF-14, GS1-128) and 2D matrix (Data Matrix, PDF417, Aztec)." },
  { icon: ShieldCheck, title: "Live validation", body: "Each format is validated as you type — accepted characters, data length and check-digit computation. Invalid output is prevented before it can be downloaded." },
  { icon: ScanLine, title: "Check-digit automation", body: "GS1 check digits (EAN, UPC, ITF-14) are computed and verified automatically. You see a clear error if the supplied check digit does not match." },
  { icon: FileDown, title: "PNG · SVG · PDF export", body: "High-resolution raster for screens, true vector SVG for 1D barcodes, and print-ready A4 PDF. Bulk jobs export as a ZIP or label-sheet PDF." },
  { icon: Zap, title: "Browser-side & instant", body: "All rendering runs in your browser via JsBarcode (1D) and bwip-js (2D). No upload, no waiting, no server round-trip." },
  { icon: CheckCircle2, title: "Customisable styling", body: "Bar width, height, margin, foreground and background colours, human-readable text on/off, font size — full control over every barcode." },
];

const CATEGORIES = [
  {
    name: "Retail barcodes",
    desc: "Global product identifiers used at point-of-sale worldwide.",
    formats: BARCODE_FORMATS.filter((f) => ["ean13", "ean8", "upca", "upce"].includes(f.id)),
  },
  {
    name: "General-purpose barcodes",
    desc: "Flexible 1D formats for inventory, badges, internal tracking.",
    formats: BARCODE_FORMATS.filter((f) => ["code128", "code39", "code93", "codabar", "itf", "msi"].includes(f.id)),
  },
  {
    name: "Industrial & shipping",
    desc: "Carton-level and supply-chain identifiers with GS1 Application Identifiers.",
    formats: BARCODE_FORMATS.filter((f) => ["itf14", "gs1-128"].includes(f.id)),
  },
  {
    name: "2D matrix codes",
    desc: "High-capacity 2D symbologies for pharma, electronics, tickets and ID.",
    formats: BARCODE_FORMATS.filter((f) => ["datamatrix", "pdf417", "aztec"].includes(f.id)),
  },
];

const USE_CASES = [
  { title: "Retail & ecommerce", body: "EAN-13 / UPC-A for product packaging, ITF-14 for cartons, GS1-128 for shipping labels with batch and expiry." },
  { title: "Logistics & warehousing", body: "Code 128 for inventory, ITF-14 for outer cartons, PDF417 for shipping manifests with high data capacity." },
  { title: "Healthcare & pharma", body: "Data Matrix for medicine packaging (GS1 Datamatrix mandate), Code 128 for specimen tracking." },
  { title: "Electronics & automotive", body: "Data Matrix for component marking, Code 39 for asset tags, PDF417 for parts databases." },
  { title: "Events & ticketing", body: "Aztec for transport and event tickets, PDF417 for boarding passes, Code 128 for entry wristbands." },
  { title: "Libraries & archives", body: "Codabar for book numbering, Code 39 for shelf labels, ITF for archive boxes." },
];

const FAQS = [
  { q: "How do I generate a barcode for free?", a: "Open the barcode generator, pick a format (EAN-13, UPC-A, Code 128, Data Matrix…), type your value and we validate it instantly. Customise dimensions and colours, then download as PNG, SVG or PDF — completely free, no account, no watermark." },
  { q: "Which barcode format should I use?", a: "For retail products sold at point-of-sale: EAN-13 (worldwide) or UPC-A (North America). For cartons and shipping: ITF-14. For internal use and inventory: Code 128 (most flexible, full ASCII). For pharma and electronics: Data Matrix. For tickets: Aztec or PDF417." },
  { q: "Does generating a barcode register a real GTIN?", a: "No. Generating an EAN, UPC or ITF-14 image does not issue or register an official GS1 identifier. You must only encode identifiers you are authorised to use. ScanForge computes and checks the GS1 check digit so the barcode is structurally valid, but registration is handled by GS1 or your local GS1 member organisation." },
  { q: "What is a check digit and why does it matter?", a: "A check digit is the last digit of an EAN, UPC or ITF-14 code, mathematically derived from the previous digits to let scanners detect errors. ScanForge computes it automatically and warns you if the value you entered has an incorrect check digit — this prevents printing unscannable barcodes." },
  { q: "Can I generate barcodes in bulk?", a: "Yes. Open the bulk generator, paste a list (one per line) or import a CSV, choose your barcode format, and download a ZIP of PNGs or a single label-sheet PDF. Processing runs entirely in your browser." },
  { q: "Are 2D barcodes like QR codes?", a: "Data Matrix, PDF417 and Aztec are 2D symbologies like QR, but optimised for different use cases. Data Matrix is compact and used in pharma; PDF417 holds large payloads for documents; Aztec is used on transport tickets. QR codes are the most universally recognised by consumer phone cameras." },
];

export function BarcodeLanding() {
  const setView = useApp((s) => s.setView);

  const scrollToTool = () => {
    document.getElementById("barcode-tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-3 w-fit">Free · 15 formats · live validation</Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Free <span className="text-highlight">Barcode Generator</span> — EAN, UPC, Code 128 &amp; more
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Generate retail, industrial and 2D barcodes with format-specific validation and automatic check-digit checks. Download as PNG, SVG or PDF — 100% free, no watermark, no signup.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={scrollToTool} className="bg-highlight text-highlight-foreground hover:bg-highlight/90">
                <Barcode className="mr-2 h-5 w-5" /> Start generating
              </Button>
              <Button size="lg" variant="outline" onClick={() => setView("bulk")}>
                Bulk barcode generator
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-highlight" /> No watermark</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-highlight" /> No signup</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-highlight" /> PNG · SVG · PDF</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-highlight" /> Check-digit verified</span>
            </div>
          </div>

          {/* Format preview chips */}
          <div className="space-y-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{cat.name}</span>
                  <Badge variant="outline" className="text-[10px]">{cat.formats.length}</Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {cat.formats.map((f) => (
                    <button
                      key={f.id}
                      onClick={scrollToTool}
                      className="rounded border border-border bg-background px-2 py-1 text-[11px] font-medium hover:border-highlight hover:text-highlight"
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">A barcode workspace that produces valid output</h2>
          <p className="mt-2 text-muted-foreground">15 formats, format-specific validation, check-digit automation and print-ready exports.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="p-5">
              <f.icon className="h-6 w-6 text-highlight" />
              <h3 className="mt-2 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FORMAT CATEGORIES — detailed */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Barcode formats by category</h2>
          <p className="mt-2 text-muted-foreground">Pick the right symbology for your use case — retail, industrial, 2D or general-purpose.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <Card key={cat.name} className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">{cat.name}</h3>
                  <Badge variant="secondary">{cat.formats.length}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
                <div className="mt-3 space-y-2">
                  {cat.formats.map((f) => (
                    <button
                      key={f.id}
                      onClick={scrollToTool}
                      className="block w-full rounded-md border border-border bg-background p-2.5 text-left transition-colors hover:border-highlight"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{f.label}</span>
                        {f.twoD && <Badge variant="outline" className="text-[10px]">2D</Badge>}
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Barcodes for every industry</h2>
        <p className="mt-2 text-muted-foreground">From retail shelves to pharma packaging, event tickets to warehouse racks.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="text-sm font-semibold">{u.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* GS1 notice */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex items-start gap-3 rounded-lg border border-highlight/30 bg-highlight/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
            <div className="text-sm">
              <p className="font-semibold">Generating a barcode image does not register a real GS1 identifier.</p>
              <p className="mt-1 text-muted-foreground">
                You must only encode EAN, UPC or ITF-14 numbers you are authorised to use. ScanForge computes and verifies the check digit so the barcode is structurally valid, but official GTIN registration is handled by <a href="https://www.gs1.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">GS1</a> or your local GS1 member organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section id="barcode-tool" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ArrowDown className="h-4 w-4" />
          <span>Barcode generator workspace — pick a format, type your value, download</span>
        </div>
        {/* The actual workspace is injected by page.tsx right after this landing */}
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Barcode FAQ</h2>
          <Accordion type="single" collapsible className="mt-6">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row">
            <div>
              <h2 className="text-lg font-bold">Ready to generate your barcode?</h2>
              <p className="text-sm text-muted-foreground">Free forever, no watermark, no signup.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={scrollToTool} className="bg-highlight text-highlight-foreground hover:bg-highlight/90">Open generator</Button>
              <Button variant="outline" onClick={() => setView("qr")}>Try QR codes</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
