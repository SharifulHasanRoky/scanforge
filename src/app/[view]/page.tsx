import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Homepage } from "@/components/home/homepage";
import { QrLanding } from "@/components/home/qr-landing";
import { BarcodeLanding } from "@/components/home/barcode-landing";
import { QrTypeLanding } from "@/components/home/qr-type-landing";
import { LearnPage } from "@/components/home/learn-page";
import { QrWorkspace } from "@/components/qr/qr-workspace";
import { BarcodeWorkspace } from "@/components/barcode/barcode-workspace";
import { BulkWorkspace } from "@/components/bulk/bulk-workspace";
import { Dashboard } from "@/components/dashboard/dashboard";
import { AuthModal } from "@/components/auth/auth-modal";
import { QR_LANDING_CONTENT } from "@/lib/qr/landing-content";
import { ROUTE_META, APP_ROUTE_VIEWS } from "@/lib/seo/routes";

const QR_TYPE_SLUGS = Object.keys(QR_LANDING_CONTENT);

const ALL_VIEWS = [...APP_ROUTE_VIEWS, ...QR_TYPE_SLUGS];

export function generateStaticParams() {
  return ALL_VIEWS.map((view) => ({ view }));
}

export const dynamicParams = false;

// Next.js 16 exposes `params` as a Promise; unwrap with `await`.
type Params = { params: Promise<{ view: string }> };

function metaFor(view: string): Metadata {
  // QR-type landings have their own content model.
  const qrContent = QR_LANDING_CONTENT[view];
  if (qrContent) {
    const title = qrContent.h1;
    const description = qrContent.metaDescription;
    return {
      title,
      description,
      alternates: { canonical: `/${view}` },
      openGraph: {
        title,
        description,
        url: `${BRAND.url}/${view}`,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
      },
    };
  }
  // Generic views (qr, barcode, bulk, dashboard, learn, about).
  const meta = ROUTE_META[view];
  if (!meta) return {};
  const robots = meta.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false };
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    robots,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BRAND.url}${meta.path}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { view } = await params;
  return metaFor(view);
}

export default async function ViewPage({ params }: Params) {
  const { view } = await params;

  let content: React.ReactNode = null;

  if (QR_TYPE_SLUGS.includes(view)) {
    const c = QR_LANDING_CONTENT[view];
    content = (
      <>
        <QrTypeLanding slug={view} />
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <QrWorkspace initialType={c.typeId} />
        </div>
      </>
    );
  } else if (view === "qr") {
    content = (
      <>
        <QrLanding />
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <QrWorkspace />
        </div>
      </>
    );
  } else if (view === "barcode") {
    content = (
      <>
        <BarcodeLanding />
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <BarcodeWorkspace />
        </div>
      </>
    );
  } else if (view === "bulk") {
    content = <BulkWorkspace />;
  } else if (view === "dashboard") {
    content = <Dashboard />;
  } else if (view === "learn") {
    content = <LearnPage />;
  } else if (view === "about") {
    content = <Homepage />;
  } else {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {content}
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}
