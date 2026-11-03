"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QrCode, Barcode, Layers, ShieldCheck, Zap, Gift, Globe, Eye, Image as ImageIcon, FileDown, Link2, Wifi, Mail, Phone, MessageCircle, MapPin, Share2, Calendar, Smartphone, Contact, Type as TypeIcon } from "lucide-react";
import { BRAND, PLATFORM_FACTS } from "@/lib/brand";
import { QR_TYPES } from "@/lib/qr/types";
import { BARCODE_FORMATS } from "@/lib/barcode/formats";
import { useApp } from "@/lib/store";

const QR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Link: Link2, Type: TypeIcon, Wifi, Contact, Mail, Phone, MessageSquare: MessageCircle, MessageCircle, MapPin, Share2, Calendar, Smartphone,
};

const ADVANTAGES = [
  { icon: Gift, title: "Free, truly free", body: "Every core QR and barcode tool is free forever. No premium plans, no paywalls, no credits, no forced watermark." },
  { icon: ShieldCheck, title: "Private by design", body: "Static QR and barcode generation runs in your browser. Your data is not uploaded to a server to produce a code." },
  { icon: Zap, title: "Fast & reliable", body: "Vector SVG, high-resolution PNG and print-ready PDF exports. Each design passes a decode test before you download." },
  { icon: Eye, title: "No signup walls", body: "Generate your first codes with no account. Sign up only if you want to save and organise codes in a dashboard." },
  { icon: Globe, title: "Built for the world", body: "12 QR content types and 15 barcode formats — retail, industrial, logistics and 2D — for every region and use case." },
  { icon: Layers, title: "Bulk at scale", body: "Paste a list or import a CSV and generate hundreds of codes in one go, exported as a ZIP or a label-sheet PDF." },
];

const COMPARISON = [
  { feature: "Free QR with logo", scanforge: true, monkey: "Limited", canva: "Pro", tiger: "Paid" },
  { feature: "No account to generate", scanforge: true, monkey: true, canva: false, tiger: false },
  { feature: "No watermark", scanforge: true, monkey: true, canva: "Pro", tiger: "Paid" },
  { feature: "No daily generation limit", scanforge: true, monkey: "Limited", canva: "Pro", tiger: "Paid" },
  { feature: "Barcode generator included", scanforge: true, monkey: false, canva: false, tiger: "Limited" },
  { feature: "Bulk + CSV import", scanforge: true, monkey: "Paid", canva: false, tiger: "Paid" },
  { feature: "SVG / PDF export", scanforge: true, monkey: "Paid", canva: "Pro", tiger: "Paid" },
  { feature: "Browser-side processing", scanforge: true, monkey: "Partial", canva: false, tiger: false },
];

const FAQS = [
  { q: "Is ScanForge really free?", a: "Yes. Every core QR and barcode generator is free forever — including logo upload, custom designs, bulk generation and PNG/SVG/PDF export. We never add a watermark and we never lock generation behind a paywall. The platform is funded by ads, not by charging you." },
  { q: "Do I need to create an account?", a: "No. You can generate and download QR codes and barcodes without signing up. Accounts are completely optional and only exist so you can save, organise and re-open your codes later. The first three generations never prompt you; after that you will see one dismissible invitation, never a block." },
  { q: "What is the difference between static and dynamic QR codes?", a: "A static QR code encodes its destination directly inside the image — it never expires on our side and needs no redirect server, database or account. A dynamic QR code points to a short redirect URL that you can edit later, which requires backend infrastructure. ScanForge focuses on reliable static generation; dynamic codes are only introduced where the redirect service can be maintained long-term." },
  { q: "Will my custom-designed QR code still scan?", a: "Each design is checked against a contrast threshold and re-decoded with a QR reader before you download. If contrast is low, the logo too large or the quiet zone too small, you will see a warning. For logos we recommend raising error correction to level Q or H and keeping the logo under ~30% of the code area." },
  { q: "Does generating a barcode register a real GTIN?", a: "No. Generating an EAN, UPC or ITF-14 image does not issue or register an official GS1 identifier. You must only encode identifiers you are authorised to use. ScanForge computes and checks the GS1 check digit so the barcode is structurally valid, but registration is handled by GS1 or your local GS1 member organisation." },
  { q: "Is my data uploaded anywhere?", a: "For static QR and barcode generation, processing happens in your browser. Uploaded logos and CSV files for bulk generation stay on your device. Only codes you explicitly save to your account are stored on the server, and only you can access them." },
  { q: "Which export formats are supported?", a: "PNG (high-resolution raster), SVG (vector, where the format allows), PDF (print-ready, A4) and ZIP (for bulk PNG export). Label-sheet PDFs lay multiple codes out on a single A4 page for printing." },
  { q: "How many codes can I generate in bulk?", a: "As many as your device can handle. Bulk generation runs locally and shows live progress with the ability to cancel. Invalid rows are reported and skipped without losing the valid ones." },
];

export function Homepage() {
  const setView = useApp((s) => s.setView);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-4 w-fit">100% free · no watermark · no signup</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Create QR Codes &amp; Barcodes. <span className="brand-text">Free. In Seconds.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{BRAND.subheadline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setView("qr")}><QrCode className="mr-2 h-5 w-5" /> Generate a QR code</Button>
              <Button size="lg" variant="outline" onClick={() => setView("barcode")}><Barcode className="mr-2 h-5 w-5" /> Make a barcode</Button>
              <Button size="lg" variant="ghost" onClick={() => setView("bulk")}><Layers className="mr-2 h-5 w-5" /> Bulk generate</Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{BRAND.tagline} — {BRAND.promise}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold"><QrCode className="h-4 w-4 text-brand" /> QR workspace</div>
                <p className="mt-1 text-xs text-muted-foreground">12 content types, custom designer, logo &amp; gradients.</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {["URL", "Wi-Fi", "vCard", "WhatsApp", "Event"].map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold"><Barcode className="h-4 w-4 text-highlight" /> Barcode workspace</div>
                <p className="mt-1 text-xs text-muted-foreground">15 formats — retail, industrial &amp; 2D matrix.</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {["EAN-13", "UPC-A", "Code 128", "Data Matrix", "PDF417"].map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
                </div>
              </div>
              <div className="col-span-2 rounded-2xl border border-border bg-gradient-to-br from-brand/10 to-highlight/10 p-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {PLATFORM_FACTS.slice(0, 6).map((f) => (
                    <div key={f.label}>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{f.label}</p>
                      <p className="text-sm font-bold">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR TYPES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">12 QR code types, one workspace</h2>
            <p className="mt-1 text-muted-foreground">Pick a type, fill the content, customise the design, download. All free.</p>
          </div>
          <Button variant="outline" onClick={() => setView("qr")} className="hidden sm:inline-flex">Open QR generator</Button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QR_TYPES.map((t) => {
            const Icon = QR_ICONS[t.icon] || TypeIcon;
            return (
              <button key={t.id} onClick={() => setView("qr")} className="group rounded-xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md">
                <Icon className="h-6 w-6 text-brand" />
                <h3 className="mt-2 text-sm font-semibold">{t.label}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* BARCODE FORMATS */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">15 barcode formats</h2>
              <p className="mt-1 text-muted-foreground">Retail, industrial, logistics and 2D — with live validation and check-digit checks.</p>
            </div>
            <Button variant="outline" onClick={() => setView("barcode")} className="hidden sm:inline-flex">Open barcode generator</Button>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {BARCODE_FORMATS.map((f) => (
              <button key={f.id} onClick={() => setView("barcode")} className="rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-brand">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{f.label}</span>
                  {f.twoD && <Badge variant="secondary" className="text-[9px]">2D</Badge>}
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{f.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Why people choose ScanForge</h2>
        <p className="mt-1 text-muted-foreground">A complete QR &amp; barcode workspace that stays free and respects your data.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a) => (
            <Card key={a.title} className="p-5">
              <a.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-2 text-base font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">How ScanForge compares</h2>
          <p className="mt-1 text-muted-foreground">An honest, independently presented feature comparison.</p>
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
                    <td className="px-3 py-3 text-center font-semibold text-brand">{row.scanforge === true ? "✓" : row.scanforge}</td>
                    <td className="px-3 py-3 text-center text-muted-foreground">{typeof row.monkey === "boolean" ? (row.monkey ? "✓" : "—") : row.monkey}</td>
                    <td className="px-3 py-3 text-center text-muted-foreground">{typeof row.canva === "boolean" ? (row.canva ? "✓" : "—") : row.canva}</td>
                    <td className="px-3 py-3 text-center text-muted-foreground">{typeof row.tiger === "boolean" ? (row.tiger ? "✓" : "—") : row.tiger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Comparison reflects publicly advertised feature tiers at the time of writing and is presented independently. Competitor names belong to their respective owners; ScanForge is not affiliated with them.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="brand-gradient rounded-2xl px-6 py-10 text-center text-white sm:px-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Start creating in seconds</h2>
            <p className="mx-auto mt-2 max-w-xl text-white/90">No account, no watermark, no daily limit. Just open a tool and generate.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" onClick={() => setView("qr")}>QR generator</Button>
              <Button size="lg" variant="secondary" onClick={() => setView("barcode")}>Barcode generator</Button>
              <Button size="lg" variant="secondary" onClick={() => setView("bulk")}>Bulk generator</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
