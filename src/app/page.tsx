"use client";

import { useEffect } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Homepage } from "@/components/home/homepage";
import { QrLanding } from "@/components/home/qr-landing";
import { BarcodeLanding } from "@/components/home/barcode-landing";
import { LearnPage } from "@/components/home/learn-page";
import { QrWorkspace } from "@/components/qr/qr-workspace";
import { BarcodeWorkspace } from "@/components/barcode/barcode-workspace";
import { BulkWorkspace } from "@/components/bulk/bulk-workspace";
import { Dashboard } from "@/components/dashboard/dashboard";
import { AuthModal } from "@/components/auth/auth-modal";
import { useApp, initHashSync } from "@/lib/store";

export default function Home() {
  const view = useApp((s) => s.view);
  const setUser = useApp((s) => s.setUser);

  useEffect(() => {
    initHashSync();
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d?.user) setUser(d.user);
      })
      .catch(() => {});
  }, [setUser]);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {view === "home" && <Homepage />}

        {view === "qr" && (
          <>
            <QrLanding />
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
              <QrWorkspace />
            </div>
          </>
        )}

        {view === "barcode" && (
          <>
            <BarcodeLanding />
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
              <BarcodeWorkspace />
            </div>
          </>
        )}

        {view === "bulk" && <BulkWorkspace />}
        {view === "dashboard" && <Dashboard />}
        {view === "learn" && <LearnPage />}
        {view === "about" && <Homepage />}
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}
