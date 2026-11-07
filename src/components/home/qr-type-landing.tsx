"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  QrCode, ArrowDown, ArrowRight, Search, CheckCircle2, Sparkles,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { JsonLd, webApplicationSchema, faqSchema, breadcrumbSchema, howToSchema } from "@/lib/seo";
import { QR_LANDING_CONTENT } from "@/lib/qr/landing-content";

type Props = { slug: string };

export function QrTypeLanding({ slug }: Props) {
  const c = QR_LANDING_CONTENT[slug];
  const setView = useApp((s) => s.setView);
  if (!c) return null;

  const scrollToTool = () => {
    document.getElementById(`${slug}-tool`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article>
      <JsonLd data={[
        webApplicationSchema(),
        faqSchema(c.faqs),
        breadcrumbSchema([
          { name: "Home", path: "" },
          { name: "QR Generator", path: "#qr" },
          { name: c.h1.replace(/^Free /, "").replace(/ Generator$/, ""), path: `#${slug}` },
        ]),
        howToSchema(`How to create a ${c.primaryKeyword.replace(" generator", "")}`, c.howTo),
      ]} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-3">Free · no signup · no watermark</Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {c.h1}
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">{c.subtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={scrollToTool}>
                <QrCode className="mr-2 h-5 w-5" /> Start generating
              </Button>
              <Button size="lg" variant="outline" onClick={() => setView("qr")}>
                All QR types
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> PNG · SVG · PDF</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> Browser-side</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> Custom designer + logo</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand" /> Scan-validated</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS — AEO definition */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">
          What is {c.h1.replace(/^Free /, "").replace(/ Generator$/i, "").toLowerCase()}?
        </h2>
        <div className="mt-4 space-y-3 text-muted-foreground">
          {c.whatIs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* HOW TO */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3"><Search className="mr-1.5 h-3.5 w-3.5" /> Step-by-step</Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">How to create one</h2>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.howTo.map((s, i) => (
              <Card key={i} className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">{i + 1}</div>
                <h3 className="mt-3 text-base font-semibold">{s.step}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </Card>
            ))}
          </ol>
        </div>
      </section>

      {/* USE CASES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Use cases</h2>
        <p className="mt-2 text-muted-foreground">Where this QR code type delivers the most value.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.useCases.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="text-sm font-semibold">{u.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* TOOL */}
      <section id={`${slug}-tool`} className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ArrowDown className="h-4 w-4" />
          <span>{c.h1.replace(/^Free /, "")} — generate yours below</span>
        </div>
        {/* The actual workspace is injected by page.tsx right after this landing, pre-seeded with c.typeId */}
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">FAQ</h2>
          <Accordion type="single" collapsible className="mt-6">
            {c.faqs.map((f, i) => (
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
              <h2 className="text-lg font-bold">Ready to generate?</h2>
              <p className="text-sm text-muted-foreground">Free forever, no watermark, no signup.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={scrollToTool}>Open generator</Button>
              <Button variant="outline" onClick={() => setView("bulk")}>Bulk generate <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
