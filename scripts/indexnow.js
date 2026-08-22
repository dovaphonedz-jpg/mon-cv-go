import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found.');
  process.exit(1);
}

const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
const urlMatches = sitemapXml.match(/<loc>(https:\/\/moncvgo\.com\/.*?)<\/loc>/g) || [];
const urlList = urlMatches.map(m => m.replace('<loc>', '').replace('</loc>', ''));

console.log(`Submitting ${urlList.length} URLs to IndexNow API (Bing, Yandex, Naver, Seznam)...`);

const payload = {
  host: 'moncvgo.com',
  key: 'moncvgo2026keyindexnow',
  keyLocation: 'https://moncvgo.com/moncvgo2026keyindexnow.txt',
  urlList: urlList
};

try {
  const response = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  console.log(`✅ IndexNow API Status: ${response.status} ${response.statusText}`);
  if (response.ok || response.status === 202) {
    console.log('🎉 IndexNow Submission Successful for all URLs!');
  } else {
    console.log('IndexNow returned status:', response.status);
  }
} catch (error) {
  console.error('IndexNow submission error:', error.message);
}
