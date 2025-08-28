import { useCallback } from "react";
import { Screenshot } from "../types";
import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  PageBreak,
} from "docx";
import { saveAs } from "file-saver";

export const useExport = () => {
  // ======================= PDF Export =======================
  const generatePdf = useCallback(
    async (screenshots: Screenshot[], setName: string) => {
      const doc = new jsPDF({ orientation: "p", unit: "px", format: "a4" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;

      for (let i = 0; i < screenshots.length; i++) {
        if (i > 0) doc.addPage();

        const screenshot = screenshots[i];
        const img = new Image();
        img.src = screenshot.imageDataUrl;
        await new Promise((resolve) => (img.onload = resolve));

        const ratio = img.width / img.height;
        let finalWidth = pageWidth - margin * 2;
        let finalHeight = finalWidth / ratio;

        if (finalHeight > pageHeight - margin * 2) {
          finalHeight = pageHeight - margin * 2;
          finalWidth = finalHeight * ratio;
        }

        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        doc.addImage(img, "PNG", x, y, finalWidth, finalHeight);

        if (screenshot.ocrText) {
          doc.text(screenshot.ocrText, margin, pageHeight - margin, {
            maxWidth: pageWidth - margin * 2,
          });
        }
      }

      doc.save(`${setName}.pdf`);
    },
    []
  );

  // ======================= DOCX Export =======================
  const generateDocx = useCallback(
    async (screenshots: Screenshot[], setName: string) => {
      // helper: base64 -> Uint8Array
      function base64ToUint8Array(base64: string) {
        const binaryString = atob(base64.split(",")[1]);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      }

      const imageRuns = screenshots.map((screenshot, idx) => {
        const uint8Array = base64ToUint8Array(screenshot.imageDataUrl);

        return [
          new Paragraph({
            children: [
              new ImageRun({
                data: uint8Array,
                transformation: { width: 550, height: 300 },
                type: "image/png", // Add the type
                fallback: "fallback.png" // Add a fallback image
              }),
            ],
          }),
          new Paragraph({
            text: `OCR Text: ${screenshot.ocrText || "N/A"}`,
          }),
          ...(idx < screenshots.length - 1
            ? [new Paragraph({ children: [new PageBreak()] })]
            : []),
        ];
      });

      const doc = new Document({
        sections: [{ properties: {}, children: imageRuns.flat() }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${setName}.docx`);
    },
    []
  );

  return { generatePdf, generateDocx };
};
