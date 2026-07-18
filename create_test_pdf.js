import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText('Test CV Content Name Email Phone Skills JavaScript React Node', {
    x: 50,
    y: 700,
    size: 20
  });
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('test_cv.pdf', pdfBytes);
}

createPdf().catch(console.error);
