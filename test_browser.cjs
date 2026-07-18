const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));
  page.on('dialog', async dialog => {
    console.log('BROWSER ALERT:', dialog.message());
    await dialog.accept();
  });

  await page.goto('http://localhost:5173/create');
  
  const fileInput = await page.$('input[type=file]');
  await fileInput.uploadFile('test_cv_real.pdf');
  
  await new Promise(r => setTimeout(r, 2000)); // wait for parsing
  
  const data = await page.evaluate(() => localStorage.getItem('moncvgo_data'));
  console.log('EXTRACTED DATA:', data);
  
  await browser.close();
})();
