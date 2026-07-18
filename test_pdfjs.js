import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist';

// Minimal polyfill for DOMMatrix
global.DOMMatrix = class DOMMatrix {
  constructor() {
    this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
  }
};
global.Path2D = class Path2D {};

async function test() {
  try {
    const buffer = fs.readFileSync('test_cv.pdf');
    const data = new Uint8Array(buffer);
    
    // Disable worker for node.js test
    pdfjsLib.GlobalWorkerOptions.workerSrc = '';
    const loadingTask = pdfjsLib.getDocument({
      data: data,
      standardFontDataUrl: 'node_modules/pdfjs-dist/standard_fonts/',
      disableWorker: true
    });
    
    const pdf = await loadingTask.promise;
    console.log('Number of pages:', pdf.numPages);
    
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map(s => s.str || '').join(' ') + '\n';
    }
    console.log('Extracted Text:', text);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

test();
