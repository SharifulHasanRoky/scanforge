"use client";

// Runs once per route mount:
// 1. Fetches the current user (if any) and pushes them into the store so
//    every page can render the right header / dashboard state.
// 2. Backward-compat: redirects old hash URLs (`/#wifi-qr`) to their new
//    path-based equivalents (`/wifi-qr`) so existing links / shares keep
//    working after the App Router migration.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import type { View } from "@/lib/brand";

const HASH_VIEW_REDIRECTS: View[] = [
  "qr",
  "barcode",
  "bulk",
  "dashboard",
  "learn",
  "about",
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
  "ean-13-barcode",
  "upc-a-barcode",
  "code-128-barcode",
];

export function BootProvider({ children }: { children?: React.ReactNode }) {
  const setUser = useApp((s) => s.setUser);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d?.user) setUser(d.user);
      })
      .catch(() => {});

    // Redirect legacy #hash URLs to the new path-based routes. Only fires
    // once on initial load — running it on every hashchange would fight
    // users who deliberately add a hash anchor (e.g. #how-to).
    const raw = window.location.hash.replace(/^#/, "").trim();
    if (raw && (HASH_VIEW_REDIRECTS as string[]).includes(raw)) {
      const target = `/${raw}`;
      window.history.replaceState(null, "", target);
      router.replace(target);
    }
  }, [setUser, router]);

  return <>{children}</>;
}
