import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

console.log('🔍 Running Automated Verification Suite on Build Artifacts...');

let errors = 0;

// 1. Check ads.txt
const adsTxtPath = path.join(distDir, 'ads.txt');
if (fs.existsSync(adsTxtPath)) {
  const content = fs.readFileSync(adsTxtPath, 'utf-8');
  if (content.includes('pub-8616442521163368')) {
    console.log('✅ dist/ads.txt is present and contains correct Publisher ID.');
  } else {
    console.error('❌ dist/ads.txt is missing correct Publisher ID.');
    errors++;
  }
} else {
  console.error('❌ dist/ads.txt does not exist.');
  errors++;
}

// 2. Check sitemap.xml
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  console.log('✅ dist/sitemap.xml is present.');
} else {
  console.error('❌ dist/sitemap.xml does not exist.');
  errors++;
}

// 3. Check robots.txt
const robotsPath = path.join(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('✅ dist/robots.txt is present.');
} else {
  console.error('❌ dist/robots.txt does not exist.');
  errors++;
}

// 4. Sample check pre-rendered static HTML routes
const routesToCheck = [
  '',
  'create',
  'studio-photo',
  'portfolio',
  'lettre-motivation',
  'conseils-cv',
  'blog',
  'a-propos',
  'contact',
  'mentions-legales',
  'confidentialite',
  'plan-du-site',
  'creer-cv-gratuit',
  'modele-cv-comptable-word',
  'modele-cv-developpeur',
  'blog/studio-photo-cv-intelligence-artificielle-detourage-gratuit',
  'blog/erreurs-a-eviter-sur-un-cv'
];

routesToCheck.forEach((route) => {
  const filePath = route === '' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Route missing static HTML: dist/${route}/index.html`);
    errors++;
    return;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Check Title
  if (!/<title>.+?<\/title>/i.test(html)) {
    console.error(`❌ Route dist/${route}/index.html is missing a valid <title>.`);
    errors++;
  }

  // Check Meta Description
  if (!/<meta name="description" content=".+?"/i.test(html)) {
    console.error(`❌ Route dist/${route}/index.html is missing a valid meta description.`);
    errors++;
  }

  // Check static content inside #root (No-JS test)
  if (!/<div id="root">[\s\S]+?<h1>[\s\S]+?<\/div>/i.test(html)) {
    console.error(`❌ Route dist/${route}/index.html does not contain pre-rendered static text inside #root.`);
    errors++;
  } else {
    console.log(`✅ Verified static HTML & No-JS content for: dist/${route}/index.html`);
  }
});

if (errors === 0) {
  console.log('\n🎉 ALL AUTOMATED TESTS PASSED SUCCESSFULLY! The build is 100% compliant and ready for deployment.');
  process.exit(0);
} else {
  console.error(`\n❌ VERIFICATION FAILED with ${errors} error(s).`);
  process.exit(1);
}
