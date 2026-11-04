"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Link2, Type as TypeIcon, Wifi, Contact, Mail, Phone, MessageCircle,
  MapPin, Share2, Calendar, Smartphone, QrCode, Palette, ShieldCheck,
  Zap, Image as ImageIcon, FileDown, CheckCircle2, ArrowDown,
} from "lucide-react";
import { QR_TYPES } from "@/lib/qr/types";
import { useApp } from "@/lib/store";

const QR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Link: Link2, Type: TypeIcon, Wifi, Contact, Mail, Phone, MessageSquare: MessageCircle, MessageCircle, MapPin, Share2, Calendar, Smartphone,
};

const FEATURES = [
  { icon: Palette, title: "Custom designer", body: "Dot patterns (square, dots, rounded, classy), custom eye frames & dots, solid colours or gradients, logo upload — all with live preview." },
  { icon: ShieldCheck, title: "Scan-reliability validation", body: "Every design is checked for contrast ratio and re-decoded with a QR reader before download. Warnings appear if a code may not scan." },
  { icon: ImageIcon, title: "Logo insertion", body: "Upload a PNG, JPG or SVG logo. We hide the dots behind it and recommend raising error correction to Q or H so the code stays scannable." },
  { icon: FileDown, title: "PNG · SVG · PDF export", body: "High-resolution raster, true vector and print-ready A4 PDF. Bulk jobs export as a ZIP of PNGs or a label-sheet PDF." },
  { icon: Zap, title: "Browser-first & fast", body: "All generation runs in your browser. No upload, no waiting, no server round-trip — your data never leaves your device." },
  { icon: CheckCircle2, title: "Static & reliable", body: "Each QR encodes its destination directly — no redirect server, no expiry from our side, no account required." },
];

const USE_CASES = [
  { title: "Business & marketing", body: "Website QR on flyers, vCard on business cards, WhatsApp for instant contact, social profile links." },
  { title: "Restaurants & hospitality", body: "Digital menus via URL QR, Wi-Fi QR for guests, location QR for delivery directions." },
  { title: "Events & ticketing", body: "Calendar event QR on invitations, location QR on tickets, social QR for event hashtags." },
  { title: "Ecommerce & retail", body: "Product page QR on packaging, app download QR, social QR for unboxing campaigns." },
  { title: "Education & institutions", body: "Wi-Fi QR for campuses, URL QR for course materials, contact QR for staff." },
  { title: "Personal & creators", body: "Link-in-bio QR, vCard QR, social QR for portfolios, event QR for meetups." },
];

const FAQS = [
  { q: "How do I create a QR code for free?", a: "Open the QR generator, pick a content type (URL, Wi-Fi, vCard…), fill in the fields and the live preview updates instantly. Customise colours, dot pattern and logo if you want, then download as PNG, SVG or PDF — completely free, no account, no watermark." },
  { q: "Can I add a logo to my QR code?", a: "Yes. In the Design tab, upload a PNG, JPG or SVG logo. Keep the logo under ~30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
  { q: "Will my custom QR code still scan?", a: "Each design is checked against a contrast threshold (≥3:1) and re-decoded with a QR reader before you download. If contrast is low, the logo too large or the quiet zone too small, you will see a clear warning." },
  { q: "What is the difference between static and dynamic QR codes?", a: "A static QR encodes its destination directly inside the image — it never expires on our side and needs no redirect server or account. A dynamic QR points to a short redirect URL you can edit later, which requires backend infrastructure. ScanForge focuses on reliable static generation." },
  { q: "Which QR content types are supported?", a: "12 types: URL/website, plain text, Wi-Fi, vCard contact, email, phone call, SMS, WhatsApp, location, social media, calendar event and app download." },
  { q: "Do I need to sign up?", a: "No. You can generate and download QR codes without an account. Accounts are completely optional and only for saving and organising codes you want to re-open later." },
];

export function QrLanding() {
  const setView = useApp((s) => s.setView);

  const scrollToTool = () => {
    document.getElementById("qr-tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-3 w-fit">Free · 12 types · custom designer</Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Free <span className="brand-text">QR Code Generator</span> with logo &amp; custom designs
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Create custom QR codes for URLs, Wi-Fi, vCards, WhatsApp, events and more. Add your logo, customise colours and patterns, validate scannability, and download as PNG, SVG or PDF — 100% free, no watermark, no signup.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={scrollToTool}>
                <QrCode className="mr-2 h-5 w-5" /> Start generating
              </Button>
              <Button size="lg" variant="outline" onClick={() => setView("bulk")}>
                Bulk QR generator
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> No watermark</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> No signup</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> PNG · SVG · PDF</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> Browser-side</span>
            </div>
          </div>

          {/* 12 types grid */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {QR_TYPES.map((t) => {
              const Icon = QR_ICONS[t.icon] || TypeIcon;
              return (
                <button
                  key={t.id}
                  onClick={scrollToTool}
                  className="group flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3 text-center transition-colors hover:border-brand hover:bg-brand/5"
                >
                  <Icon className="h-5 w-5 text-brand" />
                  <span className="text-[11px] font-medium">{t.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Everything you need to make a QR code</h2>
          <p className="mt-2 text-muted-foreground">Professional designer, scan validation and print-ready exports — all in one workspace.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="p-5">
              <f.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-2 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">QR codes for every use case</h2>
          <p className="mt-2 text-muted-foreground">From business cards to packaging, events and classrooms — one tool covers them all.</p>
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

      {/* TOOL */}
      <section id="qr-tool" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ArrowDown className="h-4 w-4" />
          <span>QR generator workspace — scroll within to design &amp; download</span>
        </div>
        {/* The actual workspace is injected by page.tsx right after this landing */}
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">QR code FAQ</h2>
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
              <h2 className="text-lg font-bold">Ready to make your QR code?</h2>
              <p className="text-sm text-muted-foreground">Free forever, no watermark, no signup.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={scrollToTool}>Open generator</Button>
              <Button variant="outline" onClick={() => setView("barcode")}>Try barcodes</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
