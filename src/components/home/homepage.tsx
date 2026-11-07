"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  QrCode, Barcode, Layers, ShieldCheck, Zap, Gift, Globe, Eye,
  ArrowRight, CheckCircle2, Sparkles, Type as TypeIcon, Search,
} from "lucide-react";
import { BRAND, PLATFORM_FACTS } from "@/lib/brand";
import { useApp } from "@/lib/store";
import { JsonLd, organizationSchema, webApplicationSchema, websiteSchema, faqSchema, breadcrumbSchema, howToSchema } from "@/lib/seo";
import { HOME_FAQS } from "@/lib/faqs";

const ADVANTAGES = [
  { icon: Gift, title: "Free, truly free", body: "Every core QR and barcode tool is free forever. No premium plans, no paywalls, no credits, no forced watermark. Funded by ads — never by charging you." },
  { icon: ShieldCheck, title: "Private by design", body: "Static QR and barcode generation runs in your browser. Your data is not uploaded to a server to produce a code — logos and CSVs stay on your device." },
  { icon: Zap, title: "Fast & reliable", body: "Vector SVG, high-resolution PNG and print-ready PDF exports. Each QR design passes a decode test before download, so what you see is what scans." },
  { icon: Eye, title: "No signup walls", body: "Generate your first codes with no account. Sign up only if you want to save and organise codes in a dashboard. The first three generations never prompt." },
  { icon: Globe, title: "Built for the world", body: "12 QR content types and 15 barcode formats — retail, industrial, logistics and 2D — for every region, industry and use case." },
  { icon: Layers, title: "Bulk at scale", body: "Paste a list or import a CSV and generate hundreds of codes in one go, exported as a ZIP or a label-sheet PDF. Processing stays in your browser." },
];

// Honest comparison — independently presented, no fabricated data.
const COMPARISON = [
  { feature: "Free QR with logo", scanforge: "Yes", monkey: "Limited", canva: "Pro only", tiger: "Paid" },
  { feature: "No account to generate", scanforge: "Yes", monkey: "Yes", canva: "No", tiger: "No" },
  { feature: "No watermark", scanforge: "Yes", monkey: "Yes", canva: "Pro only", tiger: "Paid" },
  { feature: "No daily generation limit", scanforge: "Yes", monkey: "Limited", canva: "Pro only", tiger: "Paid" },
  { feature: "Barcode generator included", scanforge: "Yes (15 formats)", monkey: "No", canva: "No", tiger: "Limited" },
  { feature: "Bulk + CSV import", scanforge: "Yes (free)", monkey: "Paid", canva: "No", tiger: "Paid" },
  { feature: "SVG / PDF export", scanforge: "Yes (free)", monkey: "Paid", canva: "Pro only", tiger: "Paid" },
  { feature: "Browser-side processing", scanforge: "Yes", monkey: "Partial", canva: "No", tiger: "No" },
];

const USE_CASES = [
  { title: "Business & marketing", body: "Website QR codes on flyers, vCard QR on business cards, WhatsApp QR for instant customer contact, social media QR for campaigns." },
  { title: "Restaurants & hospitality", body: "Digital menus via URL QR, Wi-Fi QR for guests, location QR for delivery directions, payment QR at the counter." },
  { title: "Events & ticketing", body: "Calendar event QR on invitations, location QR on tickets, social QR for event hashtags, app QR for event apps." },
  { title: "Ecommerce & retail", body: "Product page QR on packaging, app download QR, social QR for unboxing campaigns, EAN-13 barcodes for products." },
  { title: "Education & institutions", body: "Wi-Fi QR for campuses, URL QR for course materials, contact QR for staff, vCard QR for directories." },
  { title: "Logistics & warehousing", body: "Code 128 for inventory, ITF-14 for outer cartons, PDF417 for shipping manifests, GS1-128 for batch tracking." },
];

const HOW_TO_STEPS = [
  { step: "Pick a tool", text: "Open the QR code generator or barcode generator from the homepage. Each tool is free — no signup needed." },
  { step: "Enter your content", text: "Choose a content type (URL, Wi-Fi, vCard, barcode format…) and fill in the fields. The live preview updates instantly." },
  { step: "Customise the design", text: "For QR codes: change colours, dot pattern, eye shape, add a logo. For barcodes: adjust width, height, colours and label." },
  { step: "Download or print", text: "Export as PNG, SVG or PDF. Bulk jobs export as a ZIP of PNGs or a label-sheet PDF. Print directly from the browser." },
];

export function Homepage() {
  const setView = useApp((s) => s.setView);

  return (
    <article>
      <JsonLd data={[
        organizationSchema(),
        webApplicationSchema(),
        websiteSchema(),
        faqSchema(HOME_FAQS),
        breadcrumbSchema([{ name: "Home", path: "" }]),
        howToSchema("How to create a QR code or barcode with ScanForge", HOW_TO_STEPS),
      ]} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">100% free · no watermark · no signup</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Free <span className="brand-text">QR Code &amp; Barcode Generator</span> Online
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Create custom QR codes and barcodes in seconds. Add your logo, customise designs, generate in bulk and download for free — no signup, no watermark, no daily limits.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{BRAND.tagline} — {BRAND.promise}</p>
          </div>

          {/* Two big service cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <button
              onClick={() => setView("qr")}
              className="group relative overflow-hidden rounded-2xl border border-brand/30 bg-card p-8 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-brand/10 blur-2xl" aria-hidden />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                    <QrCode className="h-8 w-8 text-brand" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                </div>
                <h2 className="mt-5 text-2xl font-bold">QR Code Generator</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  12 content types — URL, Wi-Fi, vCard, WhatsApp, Event &amp; more. Custom designer with logo, gradients and patterns. Live scan validation.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["URL", "Wi-Fi", "vCard", "WhatsApp", "Event", "Social"].map((t) => (
                    <Badge key={t} variant="outline" className="text-[11px]">{t}</Badge>
                  ))}
                </div>
                <p className="mt-5 text-sm font-semibold brand-text">Open QR generator →</p>
              </div>
            </button>

            <button
              onClick={() => setView("barcode")}
              className="group relative overflow-hidden rounded-2xl border border-highlight/40 bg-card p-8 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-highlight hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-highlight/10 blur-2xl" aria-hidden />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-highlight/10">
                    <Barcode className="h-8 w-8 text-highlight" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-highlight" />
                </div>
                <h2 className="mt-5 text-2xl font-bold">Barcode Generator</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  15 formats — retail (EAN, UPC), industrial (ITF-14, GS1-128) &amp; 2D (Data Matrix, PDF417, Aztec). Live validation with check-digit checks.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["EAN-13", "UPC-A", "Code 128", "Data Matrix", "PDF417", "Aztec"].map((t) => (
                    <Badge key={t} variant="outline" className="text-[11px]">{t}</Badge>
                  ))}
                </div>
                <p className="mt-5 text-sm font-semibold text-highlight">Open barcode generator →</p>
              </div>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => setView("bulk")}>
              <Layers className="mr-2 h-4 w-4" /> Bulk generate
            </Button>
            <Button variant="ghost" onClick={() => setView("learn")}>
              <TypeIcon className="mr-2 h-4 w-4" /> Learn how it works
            </Button>
          </div>
        </div>
      </section>

      {/* PLATFORM FACTS */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {PLATFORM_FACTS.map((f) => (
              <div key={f.label} className="text-center">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.label}</p>
                <p className="mt-1 text-sm font-bold">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR QR TYPES — internal links to dedicated landing pages */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Popular QR code generators</h2>
            <p className="mt-1 text-muted-foreground">Dedicated pages with guides, use cases and FAQs for each QR type.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { slug: "wifi-qr", label: "Wi-Fi QR Code Generator", desc: "Share network credentials — guests scan and connect instantly." },
            { slug: "vcard-qr", label: "vCard QR Code Generator", desc: "Share contact details as a scannable digital business card." },
            { slug: "whatsapp-qr", label: "WhatsApp QR Code Generator", desc: "Open a WhatsApp chat with a pre-filled message." },
            { slug: "email-qr", label: "Email QR Code Generator", desc: "Open an email with recipient, subject and body pre-filled." },
            { slug: "phone-qr", label: "Phone QR Code Generator", desc: "Start a phone call to your number with one scan." },
            { slug: "location-qr", label: "Location QR Code Generator", desc: "Open Google Maps at your address or coordinates." },
          ].map((p) => (
            <button
              key={p.slug}
              onClick={() => setView(p.slug as typeof view)}
              className="group rounded-xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <QrCode className="h-6 w-6 text-brand" />
              <h3 className="mt-2 text-base font-semibold">{p.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-3 text-xs font-semibold brand-text inline-flex items-center gap-1">
                Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* WHAT IS — AEO definition block */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">What is a QR code?</h2>
            <p className="mt-3 text-muted-foreground">
              A QR code (Quick Response code) is a two-dimensional matrix barcode that stores information — URLs, text, Wi-Fi credentials, contact details, calendar events and more. Invented in 1994 for automotive parts tracking, QR codes are now scanned billions of times per year by phone cameras worldwide. A standard QR code holds up to 7,089 numeric characters or 4,296 alphanumeric characters, and includes built-in error correction so it stays scannable even when partially damaged or styled with a logo.
            </p>
            <p className="mt-3 text-muted-foreground">
              ScanForge generates <strong>static QR codes</strong> — the destination is encoded directly inside the image, so it never expires on our side and needs no redirect server, database or account.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">What is a barcode?</h2>
            <p className="mt-3 text-muted-foreground">
              A barcode is a machine-readable pattern of parallel lines (1D) or a matrix of squares (2D) that represents data. Retail barcodes like <strong>EAN-13</strong> and <strong>UPC-A</strong> identify products at point-of-sale worldwide; industrial barcodes like <strong>ITF-14</strong> and <strong>GS1-128</strong> mark cartons and shipments; 2D codes like <strong>Data Matrix</strong>, <strong>PDF417</strong> and <strong>Aztec</strong> hold large payloads in a compact area for pharma, electronics and ticketing.
            </p>
            <p className="mt-3 text-muted-foreground">
              ScanForge generates 15 barcode formats with format-specific validation and automatic GS1 check-digit computation. Generating an image does <strong>not</strong> register an official GTIN — you must only encode identifiers you are authorised to use.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TO */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3"><Search className="mr-1.5 h-3.5 w-3.5" /> Step-by-step</Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">How to create a QR code or barcode</h2>
            <p className="mt-2 text-muted-foreground">Four steps from open to download — no account needed.</p>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_TO_STEPS.map((s, i) => (
              <Card key={i} className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">{i + 1}</div>
                <h3 className="mt-3 text-base font-semibold">{s.step}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </Card>
            ))}
          </ol>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-3"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Why ScanForge</Badge>
          <h2 className="text-2xl font-bold sm:text-3xl">A complete QR &amp; barcode workspace, free forever</h2>
          <p className="mt-2 text-muted-foreground">Two powerful tools, one consistent experience — built for individuals, businesses and teams worldwide.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a) => (
            <Card key={a.title} className="p-5">
              <a.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-2 text-base font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">QR codes &amp; barcodes for every industry</h2>
          <p className="mt-2 text-muted-foreground">From business cards to packaging, events to warehouses — one tool covers them all.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u) => (
              <Card key={u.title} className="p-5">
                <h3 className="text-sm font-semibold">{u.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{u.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON — GEO citable table */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">How ScanForge compares</h2>
          <p className="mt-2 text-muted-foreground">An honest, independently presented feature comparison. Competitor names belong to their respective owners; ScanForge is not affiliated with them.</p>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 pr-4 font-semibold">Feature</th>
                <th className="px-3 py-3 text-center font-semibold brand-text">ScanForge</th>
                <th className="px-3 py-3 text-center font-medium text-muted-foreground">QRCode Monkey</th>
                <th className="px-3 py-3 text-center font-medium text-muted-foreground">Canva</th>
                <th className="px-3 py-3 text-center font-medium text-muted-foreground">QR TIGER</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-border/60">
                  <td className="py-3 pr-4">{row.feature}</td>
                  <td className="px-3 py-3 text-center font-semibold text-brand">{row.scanforge}</td>
                  <td className="px-3 py-3 text-center text-muted-foreground">{row.monkey}</td>
                  <td className="px-3 py-3 text-center text-muted-foreground">{row.canva}</td>
                  <td className="px-3 py-3 text-center text-muted-foreground">{row.tiger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Comparison reflects publicly advertised feature tiers at the time of writing and is presented independently. Always verify current competitor pricing before publishing marketing claims.</p>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-6">
            {HOME_FAQS.map((f, i) => (
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
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="brand-gradient rounded-2xl px-6 py-10 text-center text-white sm:px-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Start creating in seconds</h2>
            <p className="mx-auto mt-2 max-w-xl text-white/90">No account, no watermark, no daily limit. Just open a tool and generate.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" onClick={() => setView("qr")}>
                <QrCode className="mr-2 h-5 w-5" /> QR generator
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setView("barcode")}>
                <Barcode className="mr-2 h-5 w-5" /> Barcode generator
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setView("bulk")}>
                <Layers className="mr-2 h-5 w-5" /> Bulk generator
              </Button>
            </div>
            <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-white/80">
              <CheckCircle2 className="h-3.5 w-3.5" /> Free forever · no forced watermarks · no daily quotas
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
