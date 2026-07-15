import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('dialog', async dialog => {
    console.log('DIALOG:', dialog.message());
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:5173/create', { waitUntil: 'networkidle2', timeout: 15000 });
    console.log("Page loaded. Clicking Word export button...");
    
    await page.evaluate(() => {
      const btn = document.querySelector('button[title="Exporter en Word"]');
      if (btn) btn.click();
      else console.log("Word button not found!");
    });
    
    console.log("Button clicked. Waiting for 3 seconds...");
    await new Promise(r => setTimeout(r, 3000));
  } catch (err) {
    console.error("Test failed:", err.message);
  }
  
  await browser.close();
})();
