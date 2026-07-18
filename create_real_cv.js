import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText('Jean Dupont\njean.dupont@email.com\n0612345678\n\nExpériences\nDéveloppeur Web chez Google\n2020-2023\n\nFormation\nMaster Informatique\n\nCompétences\nReact, Node.js', {
    x: 50,
    y: 700,
    size: 12
  });
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('test_cv_real.pdf', pdfBytes);
}

createPdf().catch(console.error);
