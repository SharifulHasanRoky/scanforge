"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QRCodeStyling } from "qr-code-styling";
import jsQR from "jsqr";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Download, FileImage, FileText, Printer, Save, ShieldCheck, AlertTriangle, CheckCircle2, Type as TypeIcon } from "lucide-react";
import { QR_TYPES, contrastRatio, type QrTypeId } from "@/lib/qr/types";
import { DEFAULT_DESIGN, type QrDesign } from "@/lib/qr/designer";
import { QrPreview } from "@/components/qr/qr-preview";
import { QrContentForm } from "@/components/qr/qr-content-form";
import { QrDesignPanel } from "@/components/qr/qr-design-panel";
import { downloadQrPng, downloadQrSvg, downloadQrPdf, blobToDataUrl, printCode } from "@/lib/qr/export";
import { useApp } from "@/lib/store";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Link: TypeIcon, Type: TypeIcon, Wifi: TypeIcon, Contact: TypeIcon, Mail: TypeIcon,
  Phone: TypeIcon, MessageSquare: TypeIcon, MessageCircle: TypeIcon, MapPin: TypeIcon,
  Share2: TypeIcon, Calendar: TypeIcon, Smartphone: TypeIcon,
};

export function QrWorkspace() {
  const [type, setType] = useState<QrTypeId>("url");
  const [design, setDesign] = useState<QrDesign>(DEFAULT_DESIGN);
  const [data, setData] = useState("");
  const [name, setName] = useState("URL QR");
  const [filename, setFilename] = useState("scanforge-qr");
  const [validation, setValidation] = useState<{ contrast: number; ok: boolean; decoded: boolean; checking: boolean }>({
    contrast: 0,
    ok: false,
    decoded: false,
    checking: false,
  });
  const qrRef = useRef<QRCodeStyling | null>(null);

  const registerGeneration = useApp((s) => s.registerGeneration);
  const openSignup = useApp((s) => s.openSignup);
  const addGuestCode = useApp((s) => s.addGuestCode);
  const user = useApp((s) => s.user);
  const loadRequest = useApp((s) => s.loadRequest);
  const setLoadRequest = useApp((s) => s.setLoadRequest);
  const [seed, setSeed] = useState<{ content: string; nonce: number } | null>(null);

  // Reopen a saved QR code: switch to the right type and seed the content.
  useEffect(() => {
    if (loadRequest?.kind !== "qr") return;
    const isUrl = /^https?:\/\//i.test(loadRequest.content);
    setType(isUrl ? "url" : "text");
    if (loadRequest.design) {
      setDesign({ ...DEFAULT_DESIGN, ...(loadRequest.design as Partial<typeof DEFAULT_DESIGN>) });
    }
    setSeed({ content: loadRequest.content, nonce: Date.now() });
    setLoadRequest(null);
  }, [loadRequest, setLoadRequest]);

  const onData = useCallback((d: string, n: string) => {
    setData(d);
    setName(n);
    setFilename(n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "scanforge-qr");
  }, []);

  // Contrast validation (cheap, runs on every change).
  useEffect(() => {
    const ratio = contrastRatio(design.fgColor, design.bgColor);
    setValidation((v) => ({ ...v, contrast: ratio, ok: ratio >= 3 }));
  }, [design.fgColor, design.bgColor]);

  // Decode validation (heavier) — debounced. Renders the current QR to an
  // offscreen canvas and tries to read it back with jsQR. Only claims a code is
  // scannable when this actually succeeds.
  useEffect(() => {
    if (!data || !qrRef.current) return;
    setValidation((v) => ({ ...v, checking: true }));
    const handle = setTimeout(async () => {
      try {
        const blob = await qrRef.current!.getRawData("png");
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          setValidation((v) => ({ ...v, decoded: !!code, checking: false }));
          URL.revokeObjectURL(url);
        };
        img.onerror = () => setValidation((v) => ({ ...v, checking: false }));
        img.src = url;
      } catch {
        setValidation((v) => ({ ...v, checking: false }));
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [data, design]);

  const countGeneration = useCallback(() => {
    const showPopup = registerGeneration();
    addGuestCode({
      id: crypto.randomUUID(),
      kind: "qr",
      name,
      typeLabel: QR_TYPES.find((t) => t.id === type)?.label || "QR",
      content: data,
      design: design as unknown as Record<string, unknown>,
      createdAt: Date.now(),
    });
    if (showPopup) {
      setTimeout(() => openSignup(), 400);
    }
  }, [registerGeneration, addGuestCode, name, type, data, design, openSignup]);

  const onDownloadPng = async () => {
    if (!qrRef.current || !data) return toast.error("Add some content first");
    await downloadQrPng(qrRef.current, filename);
    toast.success("PNG downloaded");
    countGeneration();
  };
  const onDownloadSvg = async () => {
    if (!qrRef.current || !data) return toast.error("Add some content first");
    await downloadQrSvg(qrRef.current, filename);
    toast.success("SVG downloaded");
    countGeneration();
  };
  const onDownloadPdf = async () => {
    if (!qrRef.current || !data) return toast.error("Add some content first");
    await downloadQrPdf(qrRef.current, filename, name);
    toast.success("PDF downloaded");
    countGeneration();
  };
  const onPrint = async () => {
    if (!qrRef.current || !data) return toast.error("Add some content first");
    const blob = await qrRef.current.getRawData("png");
    const dataUrl = await blobToDataUrl(blob);
    printCode(dataUrl, 80, name);
    countGeneration();
  };

  const onSave = async () => {
    if (!user) return openSignup();
    try {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "qr",
          name,
          typeLabel: QR_TYPES.find((t) => t.id === type)?.label || "QR",
          content: data,
          design,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Saved to your dashboard");
    } catch {
      toast.error("Could not save — please sign in again");
    }
  };

  const activeType = QR_TYPES.find((t) => t.id === type)!;

  const status = useMemo(() => {
    if (!data) return { label: "Waiting for content", tone: "muted" as const };
    if (validation.checking) return { label: "Verifying scannability…", tone: "muted" as const };
    if (!validation.ok) return { label: "Low contrast — may not scan", tone: "warn" as const };
    if (validation.decoded) return { label: "Decoded successfully ✓", tone: "ok" as const };
    return { label: "Ready — run a scan test before print", tone: "muted" as const };
  }, [data, validation]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">QR Code Generator</h1>
        <p className="text-muted-foreground">12 content types · custom designer · logo · PNG / SVG / PDF · 100% free, no watermark.</p>
      </div>

      {/* QR type selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {QR_TYPES.map((t) => {
          const Icon = ICONS[t.icon] || TypeIcon;
          const active = t.id === type;
          return (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                active ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card hover:border-brand/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.short}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(320px,420px)_1fr]">
        {/* LEFT: content */}
        <Card className="order-1 p-5 lg:order-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">{activeType.label}</h2>
              <p className="text-xs text-muted-foreground">{activeType.desc}</p>
            </div>
            <Badge variant="secondary" className="capitalize">{activeType.short}</Badge>
          </div>
          <QrContentForm type={type} onData={onData} seed={seed} />
        </Card>

        {/* CENTER: preview + download */}
        <Card className="order-3 p-5 lg:order-2">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
              <QrPreview data={data} design={design} size={280} onReady={(qr) => (qrRef.current = qr)} />
            </div>
            <div className="flex w-full items-center justify-center gap-2">
              {status.tone === "ok" && <CheckCircle2 className="h-4 w-4 text-brand" />}
              {status.tone === "warn" && <AlertTriangle className="h-4 w-4 text-highlight" />}
              {status.tone === "muted" && <ShieldCheck className="h-4 w-4 text-muted-foreground" />}
              <span className={`text-xs font-medium ${status.tone === "ok" ? "text-brand" : status.tone === "warn" ? "text-highlight" : "text-muted-foreground"}`}>
                {status.label}
              </span>
            </div>
            <div className="w-full space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Filename</Label>
              <Input value={filename} onChange={(e) => setFilename(e.target.value)} className="text-sm" />
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
              <Button onClick={onDownloadPng} className="col-span-2"><FileImage className="mr-2 h-4 w-4" /> Download PNG</Button>
              <Button variant="outline" onClick={onDownloadSvg}><Download className="mr-2 h-4 w-4" /> SVG</Button>
              <Button variant="outline" onClick={onDownloadPdf}><FileText className="mr-2 h-4 w-4" /> PDF</Button>
              <Button variant="outline" onClick={onPrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
              <Button variant="secondary" onClick={onSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
            </div>
          </div>
        </Card>

        {/* RIGHT: designer */}
        <Card className="order-2 p-5 lg:order-3">
          <Tabs defaultValue="design">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="design" className="mt-4">
              <QrDesignPanel design={design} setDesign={setDesign} />
            </TabsContent>
            <TabsContent value="advanced" className="mt-4 space-y-3 text-xs text-muted-foreground">
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="font-medium text-foreground">Scan reliability checks</p>
                <ul className="mt-2 space-y-1.5">
                  <li>Contrast ratio: <b>{validation.contrast.toFixed(2)}:1</b> {validation.ok ? "✓" : "✗ (need ≥ 3:1)"}</li>
                  <li>Decode test (jsQR): {validation.checking ? "…" : validation.decoded ? "passed ✓" : "not decoded yet"}</li>
                  <li>Error correction: <b className="capitalize">{design.errorCorrection}</b></li>
                  <li>Quiet zone: <b>{design.margin}</b> modules (min 4 recommended)</li>
                </ul>
              </div>
              <p>This is a <b>static</b> QR — the destination is encoded directly. It never expires on our side and needs no account, redirect server or database.</p>
              <p>If a logo reduces scannability, raise error correction to <b>Q</b> or <b>H</b> and keep the logo under ~30% of the code area.</p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
