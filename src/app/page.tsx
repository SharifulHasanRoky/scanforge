import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Homepage } from "@/components/home/homepage";
import { AuthModal } from "@/components/auth/auth-modal";
import { HOME_ROUTE } from "@/lib/seo/routes";
import { BootProvider } from "@/components/site/boot-provider";

export const metadata: Metadata = {
  title: HOME_ROUTE.title,
  description: HOME_ROUTE.description,
  alternates: { canonical: HOME_ROUTE.path },
  openGraph: {
    title: `${BRAND.name} — ${BRAND.headline}`,
    description: BRAND.subheadline,
    url: BRAND.url,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: HOME_ROUTE.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Free QR Code & Barcode Generator`,
    description: BRAND.subheadline,
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <BootProvider />
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Homepage />
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}
