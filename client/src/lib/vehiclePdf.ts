import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import type { Vehicle } from "@/lib/stock";

const navy = "#0a1728";
const red = "#d92f3d";
const muted = "#667585";
const line = "#dce5ea";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function addWrapped(doc: jsPDF, text: string, x: number, y: number, width: number, size = 10, color = muted) {
  doc.setFontSize(size);
  doc.setTextColor(color);
  const lines = doc.splitTextToSize(text, width) as string[];
  doc.text(lines, x, y);
  return y + lines.length * (size + 4);
}

async function imageToJpeg(src: string) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    if (typeof createImageBitmap === "function") {
      const bitmap = await createImageBitmap(blob);
      const canvas = document.createElement("canvas");
      const ratio = Math.min(1, 1200 / bitmap.width);
      canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
      canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
      canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      return canvas.toDataURL("image/jpeg", 0.86);
    }
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function downloadVehicleOverview(vehicle: Vehicle) {
  const listingUrl = `${window.location.origin}/inventory/${vehicle.id}`;
  const [mainImage, qrCode] = await Promise.all([
    imageToJpeg(vehicle.image),
    QRCode.toDataURL(listingUrl, { margin: 1, width: 256, color: { dark: navy, light: "#ffffff" } }).catch(() => null),
  ]);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 42;
  let y = 54;

  doc.setFillColor(navy);
  doc.rect(0, 0, pageWidth, 92, "F");
  doc.setTextColor("#ffffff");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ZARA", margin, 42);
  doc.setTextColor("#f05a62");
  doc.text(" CARS", margin + 49, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor("#b9c8d4");
  doc.text("Vehicle overview · Kenya", margin, 62);
  doc.text(vehicle.stockNo, pageWidth - margin, 42, { align: "right" });
  doc.text("zara-cars.co.ke", pageWidth - margin, 62, { align: "right" });

  y = 132;
  const imageX = pageWidth - margin - 220;
  const imageY = 118;
  doc.setFillColor("#edf3f6");
  doc.roundedRect(imageX, imageY, 220, 142, 12, 12, "F");
  if (mainImage) {
    doc.addImage(mainImage, "JPEG", imageX + 5, imageY + 5, 210, 132, undefined, "FAST");
  } else {
    doc.setTextColor(muted);
    doc.setFontSize(9);
    doc.text("Vehicle image unavailable", imageX + 110, imageY + 74, { align: "center" });
  }
  doc.setTextColor(red);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("LIVE STOCK / VEHICLE OVERVIEW", margin, y);
  y += 30;
  doc.setTextColor(navy);
  doc.setFontSize(26);
  doc.text(`${vehicle.year} ${vehicle.make}`, margin, y);
  y += 30;
  doc.setTextColor(red);
  doc.text(vehicle.model, margin, y);
  y += 18;
  y = addWrapped(doc, `${vehicle.trim} · ${vehicle.color} · ${vehicle.location}`, margin, y + 12, imageX - margin - 18, 10, muted);

  y = Math.max(y + 18, imageY + 164);
  doc.setFillColor("#edf3f6");
  doc.roundedRect(margin, y, pageWidth - margin * 2, 76, 12, 12, "F");
  doc.setTextColor(muted);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("DRIVE-AWAY PRICE", margin + 18, y + 22);
  doc.setTextColor(navy);
  doc.setFontSize(20);
  doc.text(`KES ${vehicle.price.toLocaleString()}`, margin + 18, y + 49);
  doc.setTextColor(muted);
  doc.setFontSize(9);
  doc.text(vehicle.status, pageWidth - margin - 18, y + 30, { align: "right" });
  doc.text(`KES ${vehicle.monthly.toLocaleString()} / month estimate`, pageWidth - margin - 18, y + 49, { align: "right" });

  y += 110;
  doc.setTextColor(navy);
  doc.setFontSize(13);
  doc.text("Vehicle specifications", margin, y);
  y += 18;
  doc.setDrawColor(line);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  const specs = [
    ["Mileage", `${vehicle.mileage.toLocaleString()} km`],
    ["Engine", vehicle.engine],
    ["Fuel", vehicle.fuel],
    ["Transmission", vehicle.transmission],
    ["Body type", vehicle.body],
    ["Location", vehicle.location],
    ...Object.entries(vehicle.specs).slice(0, 6),
  ];
  specs.forEach(([label, value], index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + column * ((pageWidth - margin * 2) / 2);
    const rowY = y + row * 39;
    doc.setTextColor(muted);
    doc.setFontSize(8);
    doc.text(String(label).toUpperCase(), x, rowY);
    doc.setTextColor(navy);
    doc.setFontSize(10);
    doc.text(String(value), x, rowY + 15);
  });
  y += Math.ceil(specs.length / 2) * 39 + 12;

  doc.setTextColor(navy);
  doc.setFontSize(13);
  doc.text("Key features", margin, y);
  y += 18;
  y = addWrapped(doc, vehicle.features.join("  ·  "), margin, y, pageWidth - margin * 2, 10, muted);

  y += 24;
  doc.setFillColor("#f8e3e5");
  doc.roundedRect(margin, y, pageWidth - margin * 2, 92, 12, 12, "F");
  doc.setTextColor(red);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Arrange a viewing", margin + 18, y + 23);
  doc.setTextColor(navy);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Zara Cars Kenya  ·  +254 700 000 000  ·  hello@zaracars.co.ke", margin + 18, y + 42);
  doc.text(`${vehicle.location}  ·  Nairobi viewings by appointment  ·  WhatsApp available`, margin + 18, y + 59);
  doc.setTextColor(muted);
  doc.setFontSize(7);
  doc.text("Scan to open this listing", pageWidth - margin - 51, y + 83, { align: "center" });
  if (qrCode) doc.addImage(qrCode, "PNG", pageWidth - margin - 83, y + 9, 64, 64, undefined, "FAST");

  doc.setDrawColor(line);
  doc.line(margin, 770, pageWidth - margin, 770);
  doc.setTextColor(muted);
  doc.setFontSize(8);
  doc.text(`Prepared ${new Date().toLocaleDateString("en-KE")} · Prices and availability subject to confirmation.`, margin, 790);
  doc.save(`${slugify(`${vehicle.year}-${vehicle.make}-${vehicle.model}`)}-zara-cars-overview.pdf`);
}
