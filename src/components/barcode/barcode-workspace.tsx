"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import bwipjs from "bwip-js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileImage, FileText, Printer, Save, Download, CheckCircle2, AlertTriangle, Barcode as BarcodeIcon } from "lucide-react";
import {
  BARCODE_FORMATS,
  DEFAULT_BARCODE_STYLE,
  validateFormat,
  type BarcodeFormat,
  type BarcodeStyle,
} from "@/lib/barcode/formats";
import { downloadCanvasPng, downloadCanvasSvg, downloadCanvasPdf, printCode } from "@/lib/qr/export";
import { useApp } from "@/lib/store";

export function BarcodeWorkspace() {
  const [format, setFormat] = useState<BarcodeFormat>(BARCODE_FORMATS[0]);
  const [value, setValue] = useState("ScanForge-001");
  const [style, setStyle] = useState<BarcodeStyle>(DEFAULT_BARCODE_STYLE);
  const [filename, setFilename] = useState("scanforge-barcode");
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const registerGeneration = useApp((s) => s.registerGeneration);
  const openSignup = useApp((s) => s.openSignup);
  const addGuestCode = useApp((s) => s.addGuestCode);
  const user = useApp((s) => s.user);
  const loadRequest = useApp((s) => s.loadRequest);
  const setLoadRequest = useApp((s) => s.setLoadRequest);

  // Reopen a saved barcode.
  useEffect(() => {
    if (loadRequest?.kind !== "barcode") return;
    setValue(loadRequest.content);
    if (loadRequest.design) {
      setStyle((s) => ({ ...s, ...(loadRequest.design as Partial<BarcodeStyle>) }));
    }
    setLoadRequest(null);
  }, [loadRequest, setLoadRequest]);

  const validation = useMemo(() => validateFormat(format, value), [format, value]);

  useEffect(() => {
    setError(null);
    setRendered(false);
    if (!validation.ok || !canvasRef.current) return;
    const canvas = canvasRef.current;
    try {
      if (format.engine === "jsbarcode") {
        let text = validation.cleaned || value;
        if (format.id === "gs1-128") {
          // FNC1 prefix + parenthesised AIs flattened to digits/text.
          text = String.fromCharCode(241) + text.replace(/[()]/g, "");
        }
        JsBarcode(canvas, text, {
          format: format.code,
          width: style.width,
          height: style.height,
          margin: style.margin,
          displayValue: style.showText,
          font: "monospace",
          fontSize: style.fontSize,
          textMargin: 2,
          lineColor: style.fgColor,
          background: style.bgColor,
        });
      } else {
        // bwip-js for 2D matrix codes
        bwipjs.toCanvas(canvas, {
          bcid: format.code,
          text: validation.cleaned || value,
          scale: style.scale,
          height: 10,
          paddingwidth: style.margin,
          paddingheight: style.margin,
          barcolor: style.fgColor,
          backgroundcolor: style.bgColor,
          includetext: false,
        });
      }
      setRendered(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not render this value.");
      setRendered(false);
    }
  }, [format, value, style, validation]);

  const countGeneration = () => {
    const showPopup = registerGeneration();
    addGuestCode({
      id: crypto.randomUUID(),
      kind: "barcode",
      name: value,
      typeLabel: format.label,
      content: value,
      createdAt: Date.now(),
    });
    if (showPopup) setTimeout(() => openSignup(), 400);
  };

  const ensureRendered = () => {
    if (!rendered || !canvasRef.current) {
      toast.error(error || "Fix the input before downloading");
      return false;
    }
    return true;
  };

  const onPng = () => {
    if (!ensureRendered()) return;
    downloadCanvasPng(canvasRef.current!, filename);
    toast.success("PNG downloaded");
    countGeneration();
  };
  const onSvg = () => {
    if (!ensureRendered()) return;
    if (format.engine === "jsbarcode") {
      // Render a fresh SVG element for true vector output.
      const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let text = validation.cleaned || value;
      if (format.id === "gs1-128") text = String.fromCharCode(241) + text.replace(/[()]/g, "");
      try {
        JsBarcode(svgEl, text, {
          format: format.code,
          width: style.width,
          height: style.height,
          margin: style.margin,
          displayValue: style.showText,
          fontSize: style.fontSize,
          lineColor: style.fgColor,
          background: style.bgColor,
        });
        const svgString = new XMLSerializer().serializeToString(svgEl);
        downloadCanvasSvg(svgString, filename);
        toast.success("SVG downloaded");
        countGeneration();
      } catch {
        toast.error("Could not generate SVG");
      }
    } else {
      // 2D codes: embed PNG inside an SVG container.
      const dataUrl = canvasRef.current!.toDataURL("image/png");
      const size = canvasRef.current!.width;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${canvasRef.current!.height}" viewBox="0 0 ${size} ${canvasRef.current!.height}"><image href="${dataUrl}" width="${size}" height="${canvasRef.current!.height}"/></svg>`;
      downloadCanvasSvg(svg, filename);
      toast.success("SVG downloaded");
      countGeneration();
    }
  };
  const onPdf = () => {
    if (!ensureRendered()) return;
    downloadCanvasPdf(canvasRef.current!, filename, `${format.label} · ${value}`);
    toast.success("PDF downloaded");
    countGeneration();
  };
  const onPrint = () => {
    if (!ensureRendered()) return;
    printCode(canvasRef.current!.toDataURL("image/png"), 70, `${format.label} · ${value}`);
    countGeneration();
  };

  const onSave = async () => {
    if (!user) return openSignup();
    try {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "barcode", name: value, typeLabel: format.label, content: value, design: style }),
      });
      if (!res.ok) throw new Error();
      toast.success("Saved to your dashboard");
    } catch {
      toast.error("Could not save — please sign in again");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Barcode Generator</h2>
        <p className="text-muted-foreground">15 formats · retail, industrial & 2D · live validation · PNG / SVG / PDF · free, no watermark.</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {BARCODE_FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => { setFormat(f); setValue(f.placeholder); setFilename(`scanforge-${f.id}`); }}
            className={`rounded-lg border p-3 text-left transition-colors ${
              f.id === format.id ? "border-brand bg-brand/5" : "border-border bg-card hover:border-brand/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{f.label}</span>
              {f.twoD ? <Badge variant="secondary" className="text-[10px]">2D</Badge> : <BarcodeIcon className="h-3.5 w-3.5 text-muted-foreground" />}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">{f.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(360px,520px)]">
        <Card className="p-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">{format.label} — value</Label>
              <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={format.placeholder} className="font-mono text-sm" />
              <p className="text-[11px] text-muted-foreground">{format.desc}</p>
            </div>

            <div className={`flex items-center gap-2 rounded-md border p-2.5 text-xs ${
              error ? "border-destructive/30 bg-destructive/5 text-destructive"
              : validation.ok ? "border-brand/30 bg-brand/5 text-brand"
              : "border-border bg-muted/40 text-muted-foreground"
            }`}>
              {error || !validation.ok ? <AlertTriangle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
              <span>{error || validation.error || (validation.ok ? "Valid input — barcode ready." : "Enter a value.")}</span>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <h3 className="text-sm font-semibold">Style</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">{format.twoD ? "Scale (px)" : "Bar width"}</Label>
                  <Slider value={[format.twoD ? style.scale : style.width]} min={format.twoD ? 1 : 1} max={format.twoD ? 8 : 6} step={1} onValueChange={(v) => setStyle({ ...style, ...(format.twoD ? { scale: v[0] } : { width: v[0] }) })} />
                </div>
                {!format.twoD && (
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Bar height: {style.height}px</Label>
                    <Slider value={[style.height]} min={30} max={200} step={5} onValueChange={(v) => setStyle({ ...style, height: v[0] })} />
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Margin: {style.margin}px</Label>
                  <Slider value={[style.margin]} min={0} max={40} step={1} onValueChange={(v) => setStyle({ ...style, margin: v[0] })} />
                </div>
                {!format.twoD && (
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Font: {style.fontSize}px</Label>
                    <Slider value={[style.fontSize]} min={8} max={24} step={1} onValueChange={(v) => setStyle({ ...style, fontSize: v[0] })} />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Bars</Label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={style.fgColor} onChange={(e) => setStyle({ ...style, fgColor: e.target.value })} className="h-9 w-10 cursor-pointer rounded border border-border" />
                    <Input value={style.fgColor} onChange={(e) => setStyle({ ...style, fgColor: e.target.value })} className="font-mono text-xs" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Background</Label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={style.bgColor} onChange={(e) => setStyle({ ...style, bgColor: e.target.value })} className="h-9 w-10 cursor-pointer rounded border border-border" />
                    <Input value={style.bgColor} onChange={(e) => setStyle({ ...style, bgColor: e.target.value })} className="font-mono text-xs" />
                  </div>
                </div>
              </div>
              {!format.twoD && (
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={style.showText} onCheckedChange={(v) => setStyle({ ...style, showText: v })} />
                  Show human-readable text
                </label>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex flex-col items-center gap-4">
            <div className="flex w-full items-center justify-center overflow-auto rounded-xl border border-border bg-white p-4">
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
            <div className="w-full space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Filename</Label>
              <Input value={filename} onChange={(e) => setFilename(e.target.value)} className="text-sm" />
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
              <Button onClick={onPng} className="col-span-2"><FileImage className="mr-2 h-4 w-4" /> Download PNG</Button>
              <Button variant="outline" onClick={onSvg}><Download className="mr-2 h-4 w-4" /> SVG</Button>
              <Button variant="outline" onClick={onPdf}><FileText className="mr-2 h-4 w-4" /> PDF</Button>
              <Button variant="outline" onClick={onPrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
              <Button variant="secondary" onClick={onSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Generating a barcode image does <b>not</b> register a real GS1-issued GTIN, UPC or EAN. Provide identifiers you are authorised to use.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
