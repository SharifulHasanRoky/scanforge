"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { View } from "@/lib/brand";

export type GuestCode = {
  id: string;
  kind: "qr" | "barcode";
  name: string;
  typeLabel: string;
  content: string;
  design?: Record<string, unknown>;
  createdAt: number;
};

type AppState = {
  view: View;
  setView: (v: View) => void;

  // Generation counter — first 3 successful generations need no signup.
  genCount: number;
  popupDismissed: boolean;
  signupOpen: boolean;
  openSignup: () => void;
  closeSignup: () => void;
  dismissPopup: () => void;
  registerGeneration: () => boolean; // returns true if popup should be shown

  // Guest codes (recent, local-only until account is created)
  guestCodes: GuestCode[];
  addGuestCode: (code: GuestCode) => void;
  clearGuestCodes: () => void;

  // Auth
  user: { id: string; name: string; email: string; phone?: string } | null;
  setUser: (u: AppState["user"]) => void;
  logout: () => void;

  // Reopen a saved code in an editor
  loadRequest: { kind: "qr" | "barcode"; content: string; design?: Record<string, unknown>; name?: string } | null;
  setLoadRequest: (r: AppState["loadRequest"]) => void;
};

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      view: "home",
      setView: (v) => {
        set({ view: v });
        if (typeof window !== "undefined") {
          window.location.hash = v === "home" ? "" : `#${v}`;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },

      genCount: 0,
      popupDismissed: false,
      signupOpen: false,
      openSignup: () => set({ signupOpen: true }),
      closeSignup: () => set({ signupOpen: false }),
      dismissPopup: () => set({ popupDismissed: true }),
      registerGeneration: () => {
        const next = get().genCount + 1;
        set({ genCount: next });
        // Show popup only the first time we cross 3 and it hasn't been dismissed.
        if (next === 3 && !get().popupDismissed && !get().user) {
          return true;
        }
        return false;
      },

      guestCodes: [],
      addGuestCode: (code) =>
        set((s) => ({
          guestCodes: [code, ...s.guestCodes].slice(0, 24),
        })),
      clearGuestCodes: () => set({ guestCodes: [] }),

      user: null,
      setUser: (u) => set({ user: u }),
      logout: () => set({ user: null }),

      loadRequest: null,
      setLoadRequest: (r) => set({ loadRequest: r }),
    }),
    {
      name: "scanforge-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        genCount: s.genCount,
        popupDismissed: s.popupDismissed,
        guestCodes: s.guestCodes,
        user: s.user,
        view: s.view,
      }),
    }
  )
);

// Keep the store in sync with the URL hash so deep-links and back/forward work.
export function initHashSync() {
  if (typeof window === "undefined") return;
  const apply = () => {
    const raw = window.location.hash.replace(/^#/, "").trim();
    const valid: View[] = [
      "home",
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
    ];
    const view = (valid as string[]).includes(raw) ? (raw as View) : "home";
    if (useApp.getState().view !== view) {
      useApp.setState({ view });
    }
  };
  apply();
  window.addEventListener("hashchange", apply);
}
