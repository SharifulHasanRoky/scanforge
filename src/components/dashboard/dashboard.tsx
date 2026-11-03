"use client";

import { useCallback, useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import JsBarcode from "jsbarcode";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { QrCode, Barcode, Trash2, FolderKanban, LogOut, UserCog, Clock, Save, Copy } from "lucide-react";
import { useApp } from "@/lib/store";
import { DEFAULT_DESIGN } from "@/lib/qr/designer";
import { blobToDataUrl } from "@/lib/qr/export";

type SavedCode = {
  id: string;
  kind: string;
  name: string;
  typeLabel: string;
  content: string;
  design: string;
  createdAt: string;
  project?: { name: string } | null;
};

export function Dashboard() {
  const { user, openSignup, setView, guestCodes, addGuestCode, logout, setLoadRequest } = useApp();
  const [codes, setCodes] = useState<SavedCode[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCodes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/codes");
      const data = await res.json();
      setCodes(data.codes || []);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const onDelete = async (id: string) => {
    await fetch(`/api/codes/${id}`, { method: "DELETE" });
    setCodes((c) => c.filter((x) => x.id !== id));
    toast.success("Deleted");
  };

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    toast.success("Signed out");
    setView("home");
  };

  const onDeleteAccount = async () => {
    if (!confirm("Delete your account and all saved codes? This cannot be undone.")) return;
    const res = await fetch("/api/auth/delete", { method: "POST" });
    if (res.ok) {
      logout();
      toast.success("Account deleted");
      setView("home");
    } else {
      toast.error("Could not delete account");
    }
  };

  const saveGuestToAccount = async (g: typeof guestCodes[number]) => {
    try {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: g.kind, name: g.name, typeLabel: g.typeLabel, content: g.content, design: g.design }),
      });
      if (!res.ok) throw new Error();
      toast.success("Saved to your account");
      fetchCodes();
    } catch {
      toast.error("Could not save");
    }
  };

  const copyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  const reopen = (c: SavedCode) => {
    setLoadRequest({ kind: c.kind as "qr" | "barcode", content: c.content, design: JSON.parse(c.design || "{}"), name: c.name });
    setView(c.kind === "qr" ? "qr" : "barcode");
  };

  const qrCodes = codes.filter((c) => c.kind === "qr");
  const barcodes = codes.filter((c) => c.kind === "barcode");

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl py-10">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold">Your dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to save, organise and re-open your QR codes and barcodes. Generation always stays free — an account is purely for saving.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={openSignup}>Sign in / Create account</Button>
            <Button variant="outline" onClick={() => setView("qr")}>Keep generating free</Button>
          </div>
          {guestCodes.length > 0 && (
            <div className="mt-8 text-left">
              <h2 className="text-sm font-semibold">Codes from this session ({guestCodes.length})</h2>
              <p className="mt-1 text-xs text-muted-foreground">These are stored only in your browser. Sign in to keep them in your account.</p>
              <div className="mt-3 grid gap-2">
                {guestCodes.slice(0, 6).map((g) => (
                  <div key={g.id} className="flex items-center justify-between rounded-md border border-border p-2 text-sm">
                    <div className="truncate"><Badge variant="outline" className="mr-2 capitalize">{g.kind}</Badge>{g.name}</div>
                    <Button size="sm" variant="ghost" onClick={() => copyContent(g.content)}><Copy className="h-3.5 w-3.5" /></Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome, {user.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Manage your saved QR codes, barcodes and account.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5"><QrCode className="h-6 w-6 text-brand" /><p className="mt-2 text-2xl font-bold">{qrCodes.length}</p><p className="text-xs text-muted-foreground">Saved QR codes</p></Card>
        <Card className="p-5"><Barcode className="h-6 w-6 text-highlight" /><p className="mt-2 text-2xl font-bold">{barcodes.length}</p><p className="text-xs text-muted-foreground">Saved barcodes</p></Card>
        <Card className="p-5"><Clock className="h-6 w-6 text-muted-foreground" /><p className="mt-2 text-2xl font-bold">{guestCodes.length}</p><p className="text-xs text-muted-foreground">Codes this session</p></Card>
      </div>

      <Tabs defaultValue="qr">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="qr">My QR Codes</TabsTrigger>
          <TabsTrigger value="barcode">My Barcodes</TabsTrigger>
          <TabsTrigger value="guest">Session</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="qr" className="mt-4">
          <CodeGrid codes={qrCodes} loading={loading} onCopy={copyContent} onReopen={reopen} onDelete={onDelete} />
        </TabsContent>
        <TabsContent value="barcode" className="mt-4">
          <CodeGrid codes={barcodes} loading={loading} onCopy={copyContent} onReopen={reopen} onDelete={onDelete} />
        </TabsContent>

        <TabsContent value="guest" className="mt-4">
          {guestCodes.length === 0 ? (
            <Empty icon={Clock} text="No codes generated this session yet." />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {guestCodes.map((g) => (
                <Card key={g.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">{g.kind}</Badge>
                    <span className="text-[11px] text-muted-foreground">{new Date(g.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium">{g.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{g.content}</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => saveGuestToAccount(g)}><Save className="mr-1.5 h-3.5 w-3.5" /> Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => copyContent(g.content)}><Copy className="h-3.5 w-3.5" /></Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="account" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <div className="flex items-center gap-2"><UserCog className="h-5 w-5 text-brand" /><h3 className="font-semibold">Profile</h3></div>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="text-xs text-muted-foreground">Full name</dt><dd className="font-medium">{user.name}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Email</dt><dd className="font-medium">{user.email}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Phone</dt><dd className="font-medium">{user.phone || "—"}</dd></div>
              </dl>
              <p className="mt-3 text-[11px] text-muted-foreground">Email and phone are not marked as verified — ScanForge does not perform verification.</p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2"><FolderKanban className="h-5 w-5 text-highlight" /><h3 className="font-semibold">Account actions</h3></div>
              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={onLogout}><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={onDeleteAccount}><Trash2 className="mr-2 h-4 w-4" /> Delete account &amp; all data</Button>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">Deleting your account removes all saved codes, projects and folders. Generation stays free and unlimited either way.</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Empty({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 p-10 text-center text-muted-foreground">
      <Icon className="h-8 w-8" />
      <p className="text-sm">{text}</p>
    </Card>
  );
}

function CodeGrid({
  codes, loading, onCopy, onReopen, onDelete,
}: {
  codes: SavedCode[];
  loading: boolean;
  onCopy: (t: string) => void;
  onReopen: (c: SavedCode) => void;
  onDelete: (id: string) => void;
}) {
  if (loading) return <Empty icon={Clock} text="Loading your saved codes…" />;
  if (codes.length === 0) return <Empty icon={Save} text="No saved codes yet. Generate one and click Save." />;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {codes.map((c) => (
        <Card key={c.id} className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.typeLabel} · {new Date(c.createdAt).toLocaleDateString()}</p>
            </div>
            <Badge variant="outline" className="capitalize shrink-0">{c.kind}</Badge>
          </div>
          <div className="mt-3 flex justify-center rounded-md border border-border bg-white p-2">
            <Thumbnail code={c} />
          </div>
          <p className="mt-2 truncate text-[11px] text-muted-foreground">{c.content}</p>
          <div className="mt-3 flex gap-1.5">
            <Button size="sm" variant="outline" className="flex-1" onClick={() => onReopen(c)}>Open</Button>
            <Button size="sm" variant="ghost" onClick={() => onCopy(c.content)}><Copy className="h-3.5 w-3.5" /></Button>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Thumbnail({ code }: { code: SavedCode }) {
  const ref = useCallback(async (el: HTMLDivElement | null) => {
    if (!el) return;
    el.innerHTML = "";
    try {
      if (code.kind === "qr") {
        const design = { ...DEFAULT_DESIGN, ...(JSON.parse(code.design || "{}") as object) };
        const qr = new QRCodeStyling({
          data: code.content || " ",
          width: 120,
          height: 120,
          type: "svg",
          margin: 2,
          dotsOptions: { type: "square", color: design.fgColor || "#0f172a" },
          backgroundOptions: { color: design.bgColor || "#ffffff" },
        });
        const blob = await qr.getRawData("png");
        const url = await blobToDataUrl(blob as Blob);
        const img = document.createElement("img");
        img.src = url;
        img.className = "h-24 w-24 object-contain";
        el.appendChild(img);
      } else {
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, code.content, { format: "CODE128", width: 1.5, height: 50, margin: 4, displayValue: false });
        canvas.className = "h-16 w-auto max-w-full";
        el.appendChild(canvas);
      }
    } catch {
      el.textContent = "preview";
    }
  }, [code]);
  return <div ref={ref} className="flex h-24 items-center justify-center" />;
}
