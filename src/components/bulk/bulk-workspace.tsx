"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import QRCodeStyling from "qr-code-styling";
import JsBarcode from "jsbarcode";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, FileArchive, FileText, Play, Square, Wand2, Layers } from "lucide-react";
import { BARCODE_FORMATS, validateFormat, type BarcodeFormat } from "@/lib/barcode/formats";
import { normalizeUrl } from "@/lib/qr/types";
import { DEFAULT_DESIGN } from "@/lib/qr/designer";
import { blobToDataUrl } from "@/lib/qr/export";
import { useApp } from "@/lib/store";

type CodeKind = "qr" | "barcode";
type BatchItem = { name: string; value: string; dataUrl?: string; error?: string };

const QR_BULK_MODES = [
  { id: "url", label: "URL / Website" },
  { id: "text", label: "Plain text" },
] as const;

export function BulkWorkspace() {
  const [kind, setKind] = useState<CodeKind>("qr");
  const [qrMode, setQrMode] = useState<"url" | "text">("url");
  const [barcodeFormat, setBarcodeFormat] = useState<BarcodeFormat>(BARCODE_FORMATS[0]);
  const [raw, setRaw] = useState("https://scanforge.app\nhttps://example.com\nhttps://openai.com");
  const [filenameCol, setFilenameCol] = useState("0");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [startAt, setStartAt] = useState(1);
  const [count, setCount] = useState(10);
  const [useSequential, setUseSequential] = useState(false);
  const [items, setItems] = useState<BatchItem[]>([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const cancelRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const registerGeneration = useApp((s) => s.registerGeneration);
  const openSignup = useApp((s) => s.openSignup);

  const rows = useSequential
    ? Array.from({ length: count }, (_, i) => `${prefix}${startAt + i}${suffix}`)
    : raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  const onCsv = (file?: File) => {
    if (!file) return;
    Papa.parse<string[]>(file, {
      complete: (res) => {
        const dataRows = (res.data as string[][]).filter((r) => r && r.some((c) => c?.trim()));
        const lines = dataRows.map((r) => r[parseInt(filenameCol, 10) || 0] || "");
        setRaw(lines.join("\n"));
        toast.success(`Imported ${lines.length} rows from CSV`);
      },
    });
  };

  const generateBatch = async (): Promise<BatchItem[]> => {
    const out: BatchItem[] = [];
    for (let i = 0; i < rows.length; i++) {
      if (cancelRef.current) break;
      const value = rows[i];
      const name = `${prefix || "code"}-${String(i + 1).padStart(String(rows.length).length, "0")}`;
      try {
        let dataUrl = "";
        if (kind === "qr") {
          const data = qrMode === "url" ? normalizeUrl(value) : value;
          const qr = new QRCodeStyling({
            data: data || " ",
            width: 300,
            height: 300,
            type: "svg",
            margin: DEFAULT_DESIGN.margin,
            qrOptions: { errorCorrectionLevel: "M" },
            dotsOptions: { type: "square", color: "#0f172a" },
            backgroundOptions: { color: "#ffffff" },
          });
          const blob = await qr.getRawData("png");
          dataUrl = await blobToDataUrl(blob as Blob);
        } else {
          const v = validateFormat(barcodeFormat, value);
          if (!v.ok) throw new Error(v.error);
          const canvas = document.createElement("canvas");
          let text = v.cleaned || value;
          if (barcodeFormat.id === "gs1-128") text = String.fromCharCode(241) + text.replace(/[()]/g, "");
          JsBarcode(canvas, text, {
            format: barcodeFormat.code,
            width: 2,
            height: 70,
            margin: 10,
            displayValue: true,
            fontSize: 13,
            lineColor: "#000000",
            background: "#ffffff",
          });
          dataUrl = canvas.toDataURL("image/png");
        }
        out.push({ name, value, dataUrl });
      } catch (e) {
        out.push({ name, value, error: e instanceof Error ? e.message : "failed" });
      }
      setProgress(Math.round(((i + 1) / rows.length) * 100));
      // Yield to the UI thread every few items so progress + cancel work.
      if (i % 5 === 0) await new Promise((r) => setTimeout(r, 0));
    }
    return out;
  };

  const onPreview = async () => {
    if (!rows.length) return toast.error("No rows to generate");
    setRunning(true);
    setProgress(0);
    cancelRef.current = false;
    setItems([]);
    const result = await generateBatch();
    setItems(result);
    setRunning(false);
    const ok = result.filter((r) => r.dataUrl).length;
    const bad = result.filter((r) => r.error).length;
    toast.success(`Generated ${ok} codes${bad ? ` · ${bad} invalid` : ""}`);
  };

  const onZipPng = async () => {
    let batch = items;
    if (!batch.length) {
      setRunning(true); setProgress(0); cancelRef.current = false;
      batch = await generateBatch();
      setItems(batch);
      setRunning(false);
    }
    const ok = batch.filter((r) => r.dataUrl);
    if (!ok.length) return toast.error("Nothing to export");
    const zip = new JSZip();
    for (const item of ok) {
      const base64 = item.dataUrl!.split(",")[1];
      zip.file(`${item.name}.png`, base64, { base64: true });
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "scanforge-batch-png.zip";
    a.click();
    URL.revokeObjectURL(url);
    const showPopup = registerGeneration();
    if (showPopup) setTimeout(() => openSignup(), 400);
    toast.success(`ZIP with ${ok.length} PNGs downloaded`);
  };

  const onLabelPdf = async () => {
    let batch = items;
    if (!batch.length) {
      setRunning(true); setProgress(0); cancelRef.current = false;
      batch = await generateBatch();
      setItems(batch);
      setRunning(false);
    }
    const ok = batch.filter((r) => r.dataUrl);
    if (!ok.length) return toast.error("Nothing to export");
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const cols = 3;
    const cellW = (pageW - 30) / cols;
    const cellH = 55;
    const rowsPerPage = Math.floor((pageH - 20) / cellH);
    const marginX = 15;
    const marginY = 12;
    ok.forEach((item, i) => {
      const idx = i % (cols * rowsPerPage);
      if (i > 0 && idx === 0) pdf.addPage();
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      const x = marginX + c * cellW;
      const y = marginY + r * cellH;
      const imgSize = 38;
      pdf.addImage(item.dataUrl!, "PNG", x + (cellW - imgSize) / 2, y, imgSize, imgSize);
      pdf.setFontSize(8);
      pdf.setTextColor(60);
      pdf.text(item.value.slice(0, 28), x + cellW / 2, y + imgSize + 5, { align: "center" });
    });
    pdf.save("scanforge-labels.pdf");
    const showPopup = registerGeneration();
    if (showPopup) setTimeout(() => openSignup(), 400);
    toast.success(`Label PDF with ${ok.length} codes downloaded`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Bulk Generator</h1>
        <p className="text-muted-foreground">Generate hundreds of QR codes or barcodes at once. CSV import, sequential numbers, ZIP &amp; label-sheet export — all processed in your browser.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(360px,520px)]">
        <Card className="p-5 space-y-5">
          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">Code type</Label>
            <div className="flex gap-2">
              <button onClick={() => setKind("qr")} className={`flex-1 rounded-lg border p-3 text-sm font-medium ${kind === "qr" ? "border-brand bg-brand/5" : "border-border"}`}>QR Code</button>
              <button onClick={() => setKind("barcode")} className={`flex-1 rounded-lg border p-3 text-sm font-medium ${kind === "barcode" ? "border-brand bg-brand/5" : "border-border"}`}>Barcode</button>
            </div>
            {kind === "qr" ? (
              <Select value={qrMode} onValueChange={(v) => setQrMode(v as "url" | "text")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{QR_BULK_MODES.map((m) => <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>)}</SelectContent>
              </Select>
            ) : (
              <Select value={barcodeFormat.id} onValueChange={(v) => setBarcodeFormat(BARCODE_FORMATS.find((f) => f.id === v)!)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{BARCODE_FORMATS.map((f) => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}</SelectContent>
              </Select>
            )}
          </div>

          <label className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium"><Wand2 className="h-4 w-4 text-brand" /> Sequential numbers</span>
            <Switch checked={useSequential} onCheckedChange={setUseSequential} />
          </label>

          {useSequential ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Prefix</Label><Input value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="SN-" /></div>
              <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Suffix</Label><Input value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder="-2026" /></div>
              <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Start at</Label><Input type="number" value={startAt} onChange={(e) => setStartAt(Number(e.target.value))} /></div>
              <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Count</Label><Input type="number" value={count} min={1} max={2000} onChange={(e) => setCount(Number(e.target.value))} /></div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">Paste rows (one record per line)</Label>
                <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}><Upload className="mr-1.5 h-3.5 w-3.5" /> CSV</Button>
                <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={(e) => onCsv(e.target.files?.[0])} />
              </div>
              <Textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={8} className="font-mono text-xs" />
              {kind === "qr" && qrMode === "url" && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Filename column (CSV):</span>
                  <Input value={filenameCol} onChange={(e) => setFilenameCol(e.target.value)} className="h-7 w-16 font-mono" />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary"><Layers className="mr-1 h-3 w-3" /> {rows.length} records</Badge>
            {running && <Badge variant="outline">Working… {progress}%</Badge>}
          </div>
          {running && <Progress value={progress} />}

          <div className="flex flex-wrap gap-2">
            <Button onClick={onPreview} disabled={running}><Play className="mr-2 h-4 w-4" /> Generate preview</Button>
            {running && <Button variant="outline" onClick={() => { cancelRef.current = true; }}><Square className="mr-2 h-4 w-4" /> Cancel</Button>}
            <Button variant="secondary" onClick={onZipPng} disabled={running}><FileArchive className="mr-2 h-4 w-4" /> ZIP (PNG)</Button>
            <Button variant="secondary" onClick={onLabelPdf} disabled={running}><FileText className="mr-2 h-4 w-4" /> Label PDF</Button>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Preview ({items.filter((i) => i.dataUrl).length}/{items.length})</h3>
          {items.length === 0 ? (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
              Generated codes will appear here
            </div>
          ) : (
            <div className="grid max-h-[520px] grid-cols-3 gap-2 overflow-y-auto scrollbar-thin">
              {items.map((it, i) => (
                <div key={i} className="rounded-md border border-border bg-white p-1.5 text-center">
                  {it.dataUrl ? (
                    <img src={it.dataUrl} alt={it.value} className="mx-auto h-16 w-16 object-contain" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center text-[10px] text-destructive">{it.error}</div>
                  )}
                  <p className="mt-1 truncate text-[10px] text-muted-foreground">{it.value}</p>
                </div>
              ))}
            </div>
          )}
          {items.some((i) => i.error) && (
            <p className="mt-3 text-[11px] text-muted-foreground">{items.filter((i) => i.error).length} invalid rows were skipped. Valid codes were still generated.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
