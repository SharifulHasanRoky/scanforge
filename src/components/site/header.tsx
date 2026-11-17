"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Github, QrCode, Barcode, Layers, LayoutDashboard, BookOpen, UserRound } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { NAV_ITEMS, type View } from "@/lib/brand";
import { useApp } from "@/lib/store";
import { useNav, pathToView } from "@/lib/nav";

export function Header() {
  const nav = useNav();
  const { user, openSignup } = useApp();
  const [open, setOpen] = useState(false);

  // Derive active view from the URL so highlighting works on every route.
  const currentView = pathToView(
    typeof window === "undefined" ? "/" : window.location.pathname
  );

  const go = (v: View) => {
    nav(v);
    setOpen(false);
  };

  const navIcon: Record<View, React.ComponentType<{ className?: string }>> = {
    home: QrCode, qr: QrCode, barcode: Barcode, bulk: Layers, dashboard: LayoutDashboard, learn: BookOpen, about: UserRound,
    "wifi-qr": QrCode, "vcard-qr": QrCode, "whatsapp-qr": QrCode,
    "email-qr": QrCode, "phone-qr": QrCode, "location-qr": QrCode,
    "text-qr": QrCode, "sms-qr": QrCode, "social-qr": QrCode,
    "event-qr": QrCode, "app-qr": QrCode,
  };

  const links = (
    <>
      {NAV_ITEMS.map((item) => {
        const Icon = navIcon[item.view];
        return (
          <Link
            key={item.view}
            href={item.view === "home" ? "/" : `/${item.view}`}
            onClick={() => setOpen(false)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              currentView === item.view ? "text-brand" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">{links}</nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button size="sm" onClick={() => go("dashboard")} className="hidden sm:inline-flex">
              <UserRound className="mr-1.5 h-4 w-4" /> {user.name.split(" ")[0]}
            </Button>
          ) : (
            <Button size="sm" variant="ghost" onClick={openSignup} className="hidden sm:inline-flex">
              Sign in
            </Button>
          )}
          <Button size="sm" onClick={() => go("qr")} className="hidden sm:inline-flex">Make a QR</Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="mt-2"><Logo /></div>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = navIcon[item.view];
                  return (
                    <Link
                      key={item.view}
                      href={item.view === "home" ? "/" : `/${item.view}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      <Icon className="h-4 w-4" /> {item.label}
                    </Link>
                  );
                })}
                <Button className="mt-4" onClick={() => go("qr")}>Make a QR</Button>
                {!user && <Button variant="outline" onClick={() => { openSignup(); setOpen(false); }}>Sign in</Button>}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
