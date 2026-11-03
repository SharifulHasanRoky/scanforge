"use client";

import { Logo } from "@/components/site/logo";
import { BRAND, NAV_ITEMS, PLATFORM_FACTS } from "@/lib/brand";
import { useApp } from "@/lib/store";
import { Heart } from "lucide-react";

export function Footer() {
  const setView = useApp((s) => s.setView);
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{BRAND.promise}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            The world&apos;s free QR code &amp; barcode workspace. Free forever. No forced watermarks. No daily generation quotas.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Tools</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_ITEMS.map((n) => (
              <li key={n.view}>
                <button onClick={() => setView(n.view)} className="text-muted-foreground hover:text-brand">{n.label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {PLATFORM_FACTS.map((f) => (
              <li key={f.label} className="flex justify-between gap-2">
                <span>{f.label}</span>
                <span className="font-medium text-foreground">{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {BRAND.name}. Built for everyone, free forever.</p>
          <p className="inline-flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-highlight text-highlight" /> for a frictionless web
          </p>
        </div>
      </div>
    </footer>
  );
}
