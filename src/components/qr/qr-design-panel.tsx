"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, RotateCcw, Sparkles } from "lucide-react";
import { DESIGN_PRESETS, DEFAULT_DESIGN, type QrDesign, type DotType, type CornerSquareType, type CornerDotType, type Ecc } from "@/lib/qr/designer";
import { fileToDataUrl } from "@/lib/qr/export";

type Props = {
  design: QrDesign;
  setDesign: (d: QrDesign) => void;
};

function MiniLabel({ children }: { children: React.ReactNode }) {
  return <Label className="text-xs font-medium text-muted-foreground">{children}</Label>;
}

const PATTERNS: { value: DotType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy R." },
  { value: "extra-rounded", label: "Extra R." },
];
const CORNER_SQUARE: { value: CornerSquareType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
  { value: "extra-rounded", label: "Rounded" },
];
const CORNER_DOT: { value: CornerDotType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
];
const ECC: { value: Ecc; label: string }[] = [
  { value: "L", label: "L · 7%" },
  { value: "M", label: "M · 15%" },
  { value: "Q", label: "Q · 25%" },
  { value: "H", label: "H · 30%" },
];

export function QrDesignPanel({ design, setDesign }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onLogo = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await fileToDataUrl(file);
    setDesign({ ...design, logo: { ...design.logo, dataUrl } });
  };

  return (
    <div className="space-y-5">
      <div>
        <MiniLabel>Design presets</MiniLabel>
        <div className="mt-2 flex flex-wrap gap-2">
          {DESIGN_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setDesign({ ...p.design, logo: design.logo })}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:border-brand hover:text-brand transition-colors"
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() => setDesign({ ...DEFAULT_DESIGN })}
            className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <MiniLabel>Foreground</MiniLabel>
          <div className="flex items-center gap-2">
            <input type="color" value={design.fgColor} onChange={(e) => setDesign({ ...design, fgColor: e.target.value })} className="h-9 w-10 cursor-pointer rounded border border-border bg-transparent" />
            <Input value={design.fgColor} onChange={(e) => setDesign({ ...design, fgColor: e.target.value })} className="font-mono text-xs" />
          </div>
        </div>
        <div className="space-y-1.5">
          <MiniLabel>Background</MiniLabel>
          <div className="flex items-center gap-2">
            <input type="color" value={design.bgColor} onChange={(e) => setDesign({ ...design, bgColor: e.target.value })} className="h-9 w-10 cursor-pointer rounded border border-border bg-transparent" />
            <Input value={design.bgColor} onChange={(e) => setDesign({ ...design, bgColor: e.target.value })} className="font-mono text-xs" />
          </div>
        </div>
      </div>

      <label className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium"><Sparkles className="h-4 w-4 text-highlight" /> Gradient fill</span>
        <Switch checked={design.gradient.enabled} onCheckedChange={(v) => setDesign({ ...design, gradient: { ...design.gradient, enabled: v } })} />
      </label>
      {design.gradient.enabled && (
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <MiniLabel>From</MiniLabel>
            <input type="color" value={design.gradient.from} onChange={(e) => setDesign({ ...design, gradient: { ...design.gradient, from: e.target.value } })} className="h-9 w-full cursor-pointer rounded border border-border bg-transparent" />
          </div>
          <div className="space-y-1.5">
            <MiniLabel>To</MiniLabel>
            <input type="color" value={design.gradient.to} onChange={(e) => setDesign({ ...design, gradient: { ...design.gradient, to: e.target.value } })} className="h-9 w-full cursor-pointer rounded border border-border bg-transparent" />
          </div>
          <div className="space-y-1.5">
            <MiniLabel>Angle</MiniLabel>
            <Input type="number" min={0} max={360} value={design.gradient.rotation} onChange={(e) => setDesign({ ...design, gradient: { ...design.gradient, rotation: Number(e.target.value) } })} />
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <MiniLabel>Dot pattern</MiniLabel>
        <Select value={design.dots} onValueChange={(v) => setDesign({ ...design, dots: v as DotType })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{PATTERNS.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <MiniLabel>Eye frame</MiniLabel>
          <Select value={design.cornersSquare} onValueChange={(v) => setDesign({ ...design, cornersSquare: v as CornerSquareType })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{CORNER_SQUARE.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <MiniLabel>Eye dot</MiniLabel>
          <Select value={design.cornersDot} onValueChange={(v) => setDesign({ ...design, cornersDot: v as CornerDotType })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{CORNER_DOT.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <MiniLabel>Error correction</MiniLabel>
          <Select value={design.errorCorrection} onValueChange={(v) => setDesign({ ...design, errorCorrection: v as Ecc })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{ECC.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <MiniLabel>Quiet zone: {design.margin} modules</MiniLabel>
          <Slider value={[design.margin]} min={0} max={10} step={1} onValueChange={(v) => setDesign({ ...design, margin: v[0] })} />
        </div>
      </div>

      <div className="space-y-2">
        <MiniLabel>Logo</MiniLabel>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onLogo(e.target.files?.[0])} />
        {design.logo.dataUrl ? (
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2">
            <img src={design.logo.dataUrl} alt="logo" className="h-10 w-10 rounded object-contain" />
            <div className="flex-1 space-y-1">
              <Slider value={[Math.round(design.logo.size * 100)]} min={10} max={40} step={1} onValueChange={(v) => setDesign({ ...design, logo: { ...design.logo, size: v[0] / 100 } })} />
              <p className="text-[11px] text-muted-foreground">Logo size {Math.round(design.logo.size * 100)}%</p>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setDesign({ ...design, logo: { ...design.logo, dataUrl: null } })}><X className="h-4 w-4" /></Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full" onClick={() => fileRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload logo (PNG/JPG/SVG)
          </Button>
        )}
        <p className="text-[11px] text-muted-foreground">When a logo is added we recommend raising error correction to <b>Q</b> or <b>H</b> so the code stays scannable.</p>
      </div>
    </div>
  );
}
