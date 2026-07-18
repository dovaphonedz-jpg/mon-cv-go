async function check() {
  const res = await fetch('https://unpkg.com/pdfjs-dist@6.1.200/build/pdf.worker.mjs');
  console.log(res.status);
}
check();
