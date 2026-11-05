import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { BRAND } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: "Free QR Code & Barcode Generator Online — ScanForge",
    template: "%s · ScanForge",
  },
  description:
    "Free QR code generator and barcode generator online. Create custom QR codes with logo, generate EAN/UPC/Code 128 barcodes, bulk generate from CSV, download PNG/SVG/PDF. No signup, no watermark, no daily limits.",
  keywords: [
    "qr code generator",
    "free qr code generator",
    "barcode generator",
    "qr code maker",
    "create qr code",
    "qr code generator with logo",
    "custom qr code",
    "url to qr code",
    "bulk qr code generator",
    "ean barcode generator",
    "upc barcode generator",
    "code 128 barcode generator",
    "datamatrix generator",
    "qr code generator online",
    "best free qr code generator",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  applicationName: BRAND.name,
  icons: {
    icon: "/logo.svg",
  },
  manifest: undefined,
  openGraph: {
    title: `${BRAND.name} — ${BRAND.headline}`,
    description: BRAND.subheadline,
    url: BRAND.url,
    siteName: BRAND.name,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ScanForge — Free QR Code & Barcode Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Free QR Code & Barcode Generator`,
    description: BRAND.subheadline,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
