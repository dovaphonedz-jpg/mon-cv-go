const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    console.log("Navigating to http://localhost:5173/");
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    
    // Wait a bit for everything to load and animations to settle
    await new Promise(r => setTimeout(r, 2000));
    
    const outPath = 'C:/Users/Dovakin/.gemini/antigravity-ide/brain/78cf2515-42be-4db9-a710-99fba2f5aede/screenshot.png';
    await page.screenshot({ path: outPath });
    
    await browser.close();
    console.log('Screenshot saved to ' + outPath);
  } catch (error) {
    console.error("Error taking screenshot:", error);
  }
})();
