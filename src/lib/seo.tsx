// Centralized schema.org structured data for SEO + AEO + GEO.
// Each export returns a JSON-LD object that pages inject via a <script> tag.
import { BRAND } from "@/lib/brand";

const SITE = BRAND.url;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE,
    logo: `${SITE}/logo.svg`,
    description: BRAND.subheadline,
    slogan: BRAND.tagline,
    email: BRAND.email,
    sameAs: [],
  };
}

export function webApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: BRAND.name,
    url: SITE,
    description: BRAND.subheadline,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web (any browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5 canvas.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free forever. No watermark. No signup required for generation.",
    },
    featureList: [
      "QR code generator (12 content types: URL, Wi-Fi, vCard, WhatsApp, event and more)",
      "Barcode generator (15 formats: EAN-13, UPC-A, Code 128, Data Matrix, PDF417, Aztec)",
      "Custom QR designer with logo upload, gradients and dot patterns",
      "Bulk QR & barcode generator with CSV import and ZIP / label-sheet PDF export",
      "PNG, SVG and PDF export",
      "Optional user accounts for saving and organising codes",
    ],
    aggregateRating: undefined,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: SITE,
    description: BRAND.subheadline,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function howToSchema(name: string, steps: { step: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.step,
      text: s.text,
    })),
  };
}

// Injects a JSON-LD script tag into the page head. Call from a client component.
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
