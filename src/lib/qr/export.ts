// Download / print helpers for generated QR codes and barcodes.
// QR export uses the qr-code-styling instance; barcode export uses a canvas.
import { jsPDF } from "jspdf";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadQrPng(
  qr: { getRawData: (t: "png") => Promise<Blob> },
  filename: string
) {
  const blob = await qr.getRawData("png");
  triggerDownload(blob, filename.endsWith(".png") ? filename : `${filename}.png`);
}

export async function downloadQrSvg(
  qr: { getRawData: (t: "svg") => Promise<Blob> },
  filename: string
) {
  const blob = await qr.getRawData("svg");
  triggerDownload(blob, filename.endsWith(".svg") ? filename : `${filename}.svg`);
}

export async function downloadQrPdf(
  qr: { getRawData: (t: "png") => Promise<Blob> },
  filename: string,
  label?: string
) {
  const png = await qr.getRawData("png");
  const dataUrl = await blobToDataUrl(png);
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const imgSize = 120;
  const x = (pageW - imgSize) / 2;
  const y = 40;
  pdf.addImage(dataUrl, "PNG", x, y, imgSize, imgSize);
  if (label) {
    pdf.setFontSize(14);
    pdf.text(label, pageW / 2, y + imgSize + 14, { align: "center" });
  }
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  pdf.text("Generated with ScanForge — free QR & barcode workspace", pageW / 2, pdf.internal.pageSize.getHeight() - 14, {
    align: "center",
  });
  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}

export function downloadCanvasPng(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (blob) triggerDownload(blob, filename.endsWith(".png") ? filename : `${filename}.png`);
  }, "image/png");
}

export function downloadCanvasSvg(svgString: string, filename: string) {
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  triggerDownload(blob, filename.endsWith(".svg") ? filename : `${filename}.svg`);
}

export function downloadCanvasPdf(canvas: HTMLCanvasElement, filename: string, label?: string) {
  const dataUrl = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const ratio = canvas.height / canvas.width;
  const imgSize = 120;
  const x = (pageW - imgSize) / 2;
  const y = 40;
  pdf.addImage(dataUrl, "PNG", x, y, imgSize, imgSize * ratio);
  if (label) {
    pdf.setFontSize(14);
    pdf.text(label, pageW / 2, y + imgSize * ratio + 14, { align: "center" });
  }
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  pdf.text("Generated with ScanForge — free QR & barcode workspace", pageW / 2, pdf.internal.pageSize.getHeight() - 14, {
    align: "center",
  });
  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}

export async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

export async function fileToDataUrl(file: File): Promise<string> {
  return blobToDataUrl(file);
}

// Print a single code centered on an A4 page (opens print dialog).
export function printCode(dataUrl: string, sizeMm = 80, label?: string) {
  const w = window.open("", "_blank", "width=480,height=680");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><title>Print — ScanForge</title>
  <style>
    @page { size: A4; margin: 18mm; }
    html,body{margin:0;font-family:system-ui,sans-serif;color:#0f172a;}
    .wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;text-align:center;}
    img{width:${sizeMm}mm;height:${sizeMm}mm;object-fit:contain;}
    .label{margin-top:8mm;font-size:14px;font-weight:600;}
    .foot{position:fixed;bottom:8mm;left:0;right:0;text-align:center;font-size:10px;color:#94a3b8;}
  </style></head><body>
  <div class="wrap"><img src="${dataUrl}" alt="code"/>${label ? `<div class="label">${label}</div>` : ""}</div>
  <div class="foot">Generated with ScanForge</div>
  </body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => {
    w.print();
  }, 400);
}
