"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  QrCode, Barcode, Layers, ShieldCheck, Zap, Gift, Globe, Eye,
  ArrowRight, CheckCircle2, Sparkles, Type as TypeIcon,
} from "lucide-react";
import { BRAND, PLATFORM_FACTS } from "@/lib/brand";
import { useApp } from "@/lib/store";
import { JsonLd, organizationSchema, webApplicationSchema, websiteSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { HOME_FAQS } from "@/lib/faqs";

const ADVANTAGES = [
  { icon: Gift, title: "Free, truly free", body: "Every core QR and barcode tool is free forever. No premium plans, no paywalls, no credits, no forced watermark." },
  { icon: ShieldCheck, title: "Private by design", body: "Static QR and barcode generation runs in your browser. Your data is not uploaded to a server to produce a code." },
  { icon: Zap, title: "Fast & reliable", body: "Vector SVG, high-resolution PNG and print-ready PDF exports. Each QR design passes a decode test before you download." },
  { icon: Eye, title: "No signup walls", body: "Generate your first codes with no account. Sign up only if you want to save and organise codes in a dashboard." },
  { icon: Globe, title: "Built for the world", body: "12 QR content types and 15 barcode formats — retail, industrial, logistics and 2D — for every region and use case." },
  { icon: Layers, title: "Bulk at scale", body: "Paste a list or import a CSV and generate hundreds of codes in one go, exported as a ZIP or a label-sheet PDF." },
];

const FAQS = HOME_FAQS;

export function Homepage() {
  const setView = useApp((s) => s.setView);

  return (
    <div>
      <JsonLd data={[
        organizationSchema(),
        webApplicationSchema(),
        websiteSchema(),
        faqSchema(HOME_FAQS),
        breadcrumbSchema([{ name: "Home", path: "" }]),
      ]} />
      {/* HERO — dual service showcase */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">100% free · no watermark · no signup</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              The world&apos;s free <span className="brand-text">QR Code &amp; Barcode</span> Workspace
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{BRAND.subheadline}</p>
            <p className="mt-2 text-sm text-muted-foreground">{BRAND.tagline} — {BRAND.promise}</p>
          </div>

          {/* Two big service cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* QR card */}
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

            {/* Barcode card */}
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

          {/* Quick CTA row */}
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

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
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
    </div>
  );
}
