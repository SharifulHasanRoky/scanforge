"use client";

// Navigation helper. Replaces the old hash-based `setView` from the store
// with real App Router path navigation so every view has its own URL.
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { View } from "@/lib/brand";

// Hash view IDs that map to dedicated /slug routes (not /qr or /barcode).
const QR_TYPE_SLUGS: View[] = [
  "wifi-qr",
  "vcard-qr",
  "whatsapp-qr",
  "email-qr",
  "phone-qr",
  "location-qr",
  "text-qr",
  "sms-qr",
  "social-qr",
  "event-qr",
  "app-qr",
];

// Map a View to its URL path.
export function viewToPath(view: View): string {
  if (view === "home") return "/";
  if (QR_TYPE_SLUGS.includes(view)) return `/${view}`;
  return `/${view}`;
}

// Map a URL pathname back to a View (for active-nav highlighting).
export function pathToView(pathname: string): View {
  const v = pathname.replace(/^\/+/, "").split("/")[0] || "home";
  return v as View;
}

// Hook returning a `go(view)` function that does client-side navigation
// and scrolls to the top. Drop-in replacement for the old `setView`.
export function useNav() {
  const router = useRouter();
  return useCallback(
    (view: View) => {
      const path = viewToPath(view);
      router.push(path);
      // Defer the scroll so the new page has time to render.
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    },
    [router]
  );
}

// Hook returning the current View derived from the URL pathname.
export function useCurrentView(): View {
  const pathname = usePathname();
  return pathToView(pathname ?? "/");
}
