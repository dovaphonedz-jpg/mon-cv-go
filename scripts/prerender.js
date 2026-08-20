import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';
import { jobModelsData } from '../src/data/jobModelsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

// Define all routes to pre-render
const routes = [
  {
    path: '',
    title: 'Mon CV GO 🟨 | Créer un CV Gratuit en Ligne | Modèles Professionnels 2026',
    description: 'Créez facilement et gratuitement votre CV, lettre de motivation et portfolio en ligne sans inscription. Modèles professionnels et export PDF instantané.',
    h1: 'Créer un CV gratuit en PDF en moins de 5 minutes',
    content: `
      <h1>Créer un CV gratuit en PDF en moins de 5 minutes</h1>
      <p>Bienvenue sur <strong>Mon CV Go</strong>, l'outil en ligne 100% gratuit pour créer un CV professionnel, rédiger vos lettres de motivation et concevoir votre portfolio en ligne. Sans inscription, export PDF instantané et modèles optimisés pour les logiciels RH (ATS).</p>
      <h2>Pourquoi l'optimisation ATS est-elle vitale pour votre CV ?</h2>
      <p>L'Applicant Tracking System (ATS) est un logiciel utilisé par plus de 80% des entreprises pour filtrer les candidatures. Nos templates sont conçus avec une structure sémantique claire pour maximiser vos chances d'entretien.</p>
    `
  },
  {
    path: 'create',
    title: 'Créateur de CV en Ligne Gratuit (PDF & ATS) | Mon CV Go',
    description: 'Éditeur de CV en ligne 100% gratuit sans inscription. Choisissez votre modèle, remplissez vos informations et téléchargez votre CV en PDF HD.',
    h1: 'Créateur de CV Gratuit en Ligne',
    content: `
      <h1>Créateur de CV Gratuit en Ligne</h1>
      <p>Remplissez vos informations personnelles, vos expériences professionnelles, votre formation et vos compétences. Notre assistant calculera en direct votre score d'optimisation ATS.</p>
    `
  },
  {
    path: 'studio-photo',
    title: 'Studio Photo CV IA : Détourage Gratuit & Fond Studio | Mon CV Go',
    description: 'Studio Photo CV propulsé par l\'IA. Supprimez le fond de votre photo en 1 clic, appliquez un fond studio professionnel et injectez-la sur votre CV.',
    h1: 'Studio Photo CV par IA Gratuit',
    content: `
      <h1>Studio Photo CV par IA Gratuit</h1>
      <p>Détourez votre portrait en 1 clic grâce aux réseaux de neurones s'exécutant localement dans votre navigateur. Remplacement de fond studio blanc, gris ou bleu executive.</p>
    `
  },
  {
    path: 'portfolio',
    title: 'Générateur de Portfolio en Ligne Gratuit | Mon CV Go',
    description: 'Créez un portfolio professionnel en ligne avec études de cas, captures de projets et liens GitHub/Figma. Export PDF et format web interactif.',
    h1: 'Créer un Portfolio Professionnel en Ligne',
    content: `
      <h1>Créer un Portfolio Professionnel en Ligne</h1>
      <p>Le portfolio est la preuve visuelle de vos compétences. Présentez vos réalisations majeures sous forme d'études de cas structurées (Contexte, Rôle, Solution, Résultats).</p>
    `
  },
  {
    path: 'lettre-motivation',
    title: 'Générateur de Lettre de Motivation Gratuite | Mon CV Go',
    description: 'Rédigez une lettre de motivation percutante basée sur la méthode Vous-Moi-Nous. Mise en page assortie à votre CV et export PDF gratuit.',
    h1: 'Générateur de Lettre de Motivation Gratuite',
    content: `
      <h1>Générateur de Lettre de Motivation Gratuite</h1>
      <p>La lettre de motivation reste un atout majeur. Suivez notre méthode Vous-Moi-Nous pour captiver l'attention du recruteur et décrocher votre entretien.</p>
    `
  },
  {
    path: 'conseils-cv',
    title: 'Conseils CV 2026 : Guide Ultime pour Réussir vos Candidatures | Mon CV Go',
    description: 'Découvrez nos conseils d\'experts RH pour rédiger un CV irréprochable. Méthodes, exemples concrets, astuces ATS et erreurs à éviter.',
    h1: 'Guide Ultime : Conseils CV et Recrutement 2026',
    content: `
      <h1>Guide Ultime : Conseils CV et Recrutement 2026</h1>
      <p>Un recruteur passe en moyenne 6 à 10 secondes sur un CV. Suivez notre guide étape par étape pour structurer vos expériences, choisir les bons mots-clés et réussir vos candidatures.</p>
    `
  },
  {
    path: 'blog',
    title: 'Blog Carrière, CV & Emploi 2026 | Mon CV Go',
    description: 'Tous nos articles, guides pratiques et astuces recrutement pour vous accompagner dans votre recherche d\'emploi et l\'optimisation de votre CV.',
    h1: 'Blog Carrière, Conseils RH & Modèles de CV',
    content: `
      <h1>Blog Carrière, Conseils RH & Modèles de CV</h1>
      <p>Explorez nos articles rédigés par des experts du recrutement : conseils ATS, rédaction de lettre de motivation, guides pour le Canada ou la France, et astuces de personal branding.</p>
    `
  },
  {
    path: 'a-propos',
    title: 'À Propos de Mon CV Go | Éditeur de CV Gratuit & Éthique',
    description: 'Découvrez l\'histoire et la mission de Mon CV Go : offrir une solution de création de CV 100% gratuite, sans inscription et respectueuse de vos données.',
    h1: 'À Propos de Mon CV Go',
    content: `
      <h1>À Propos de Mon CV Go</h1>
      <p>Mon CV Go est né d'un constat simple : la plupart des créateurs de CV en ligne attirent les candidats avec un faux service gratuit avant d'exiger une carte bancaire au moment du téléchargement.</p>
      <p>Notre engagement : un outil 100% gratuit, financé de manière transparente par la publicité, sans abonnement caché et fonctionnant localement dans votre navigateur.</p>
    `
  },
  {
    path: 'contact',
    title: 'Nous Contacter | Mon CV Go',
    description: 'Une question, une suggestion ou un besoin d\'assistance ? Contactez l\'équipe de Mon CV Go.',
    h1: 'Contactez l\'Équipe Mon CV Go',
    content: `
      <h1>Contactez l'Équipe Mon CV Go</h1>
      <p>Nous sommes à votre écoute pour toute question relative à l'utilisation de notre créateur de CV, au Studio Photo ou à nos modèles de CV.</p>
    `
  },
  {
    path: 'mentions-legales',
    title: 'Conditions Générales d\'Utilisation & Mentions Légales | Mon CV Go',
    description: 'Consultez les Conditions Générales d\'Utilisation (CGU) et mentions légales du site Mon CV Go.',
    h1: 'Conditions Générales d\'Utilisation & Mentions Légales',
    content: `
      <h1>Conditions Générales d'Utilisation & Mentions Légales</h1>
      <p>Le site Mon CV Go est un service en ligne gratuit permettant aux utilisateurs de créer, formater et télécharger des CV et lettres de motivation au format PDF.</p>
      <h2>1. Accès et Disponibilité</h2>
      <p>Le service est accessible gratuitement à tout utilisateur. Le financement est assuré par l'affichage d'encarts publicitaires gérés par Google AdSense.</p>
      <h2>2. Propriété Intellectuelle</h2>
      <p>Les modèles et éléments graphiques sont la propriété exclusive de l'éditeur et sont concédés pour un usage strictement personnel et non commercial.</p>
    `
  },
  {
    path: 'confidentialite',
    title: 'Politique de Confidentialité & RGPD | Mon CV Go',
    description: 'Politique de confidentialité et protection des données personnelles sur Mon CV Go. Découvrez notre fonctionnement 100% local (Client-Side).',
    h1: 'Politique de Confidentialité et Protection des Données',
    content: `
      <h1>Politique de Confidentialité et Protection des Données</h1>
      <p>🔒 <strong>Traitement Local :</strong> Vos données ne quittent jamais votre appareil. L'ensemble du processus de création et d'export de votre CV est effectué localement dans votre navigateur.</p>
      <h2>Utilisation des Cookies et Google AdSense</h2>
      <p>Conformément au RGPD, nous utilisons des cookies techniques essentiels et des cookies publicitaires gérés par Google AdSense pour afficher des annonces pertinentes.</p>
    `
  },
  {
    path: 'plan-du-site',
    title: 'Plan du Site HTML | Mon CV Go',
    description: 'Accédez à l\'ensemble des pages, modèles de CV métiers, outils et articles de blog du site Mon CV Go.',
    h1: 'Plan du Site Mon CV Go',
    content: `
      <h1>Plan du Site Mon CV Go</h1>
      <p>Retrouvez la liste complète de nos outils de création de CV, guides de recrutement, modèles métiers et articles de blog.</p>
    `
  },
  {
    path: 'creer-cv-gratuit',
    title: 'Créer un CV Gratuitement en Ligne (PDF & Word) | Mon CV Go',
    description: 'Créer un CV gratuitement en ligne en 2 minutes. Éditeur gratuit n°1 sans inscription, sans abonnement caché, compatible ATS avec téléchargement PDF instantané.',
    h1: 'Créer un CV Gratuitement en Ligne (2026)',
    content: `
      <h1>Créer un CV Gratuitement en Ligne (2026)</h1>
      <p>Découvrez l'éditeur n°1 gratuit pour créer et télécharger votre CV en PDF HD sans frais caché ni abonnement surprise.</p>
    `
  },
  {
    path: 'espace-emploi',
    title: 'Espace Emploi & Candidatures | Mon CV Go',
    description: 'Explorez nos ressources pour optimiser vos candidatures, vous préparer aux entretiens et rechercher un emploi efficacement.',
    h1: 'Espace Emploi & Conseils Carrière',
    content: `
      <h1>Espace Emploi & Conseils Carrière</h1>
      <p>Conseils pratiques et outils pour réussir vos entretiens d'embauche, préparer votre CV et relancer les recruteurs.</p>
    `
  }
];

// Add Job Models Routes
Object.keys(jobModelsData).forEach((key) => {
  const model = jobModelsData[key];
  routes.push({
    path: key,
    title: model.seoTitle || `${model.h1} | Mon CV Go`,
    description: model.seoDesc || model.intro.substring(0, 160),
    h1: model.h1,
    content: `
      <h1>${model.h1}</h1>
      <p>${model.intro}</p>
      <h2>1. Pourquoi utiliser ce modèle de CV ${model.jobTitle} ?</h2>
      <p>${model.whyUse}</p>
      <h2>2. Compétences indispensables</h2>
      <p><strong>Hard Skills :</strong> ${(model.hardSkills || []).join(', ')}</p>
      <p><strong>Soft Skills :</strong> ${(model.softSkills || []).join(', ')}</p>
      <h2>3. Exemple d'accroche professionnelle</h2>
      <blockquote>${model.sampleCatchphrase}</blockquote>
    `
  });
});

// Add Blog Posts Routes
blogPosts.fr.forEach((post) => {
  routes.push({
    path: `blog/${post.id}`,
    title: `${post.title} | Blog Mon CV Go`,
    description: post.excerpt,
    h1: post.title,
    content: `
      <article>
        <h1>${post.title}</h1>
        <div style="font-size:0.9rem;color:#666;margin-bottom:1rem;">${post.category} - Publié le ${post.date} - Lecture : ${post.readTime}</div>
        <p><strong>${post.excerpt}</strong></p>
        ${post.content}
      </article>
    `
  });
});

let preRenderCount = 0;

routes.forEach((route) => {
  const cleanPath = route.path.replace(/^\//, '');
  const targetDir = cleanPath === '' ? distDir : path.join(distDir, cleanPath);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFilePath = cleanPath === '' ? path.join(distDir, 'index.html') : path.join(targetDir, 'index.html');
  const canonicalUrl = `https://moncvgo.com/${cleanPath}`;

  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${escapeHtml(route.title)}</title>`);
  
  // Replace or inject Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?"\s*\/?>/gi, `<meta name="description" content="${escapeHtml(route.description)}">`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(route.description)}">\n</head>`);
  }

  // Replace or inject Canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/gi, `<link rel="canonical" href="${canonicalUrl}">`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}">\n</head>`);
  }

  // Inject OpenGraph meta tags
  const ogTags = `
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
  `;
  html = html.replace('</head>', `${ogTags}\n</head>`);

  // Replace root div content for static pre-rendering
  const rootReplacement = `
    <div id="root">
      <div style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: 'Inter', sans-serif; line-height: 1.8; color: #333;">
        ${route.content}
      </div>
    </div>
  `;
  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/gi, `${rootReplacement}\n  </body>`);

  fs.writeFileSync(targetFilePath, html, 'utf-8');
  preRenderCount++;
});

console.log(`✅ Pre-rendering complete: ${preRenderCount} static HTML pages generated in dist/`);

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
