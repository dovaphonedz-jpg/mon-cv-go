import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';
import { jobModelsData } from '../src/data/jobModelsData.js';
import { getLocalizedJobModel } from '../src/data/getLocalizedJobModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

// Define page translations for core routes
const pageTranslations = {
  fr: {
    '': {
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
    'create': {
      title: 'Créateur de CV en Ligne Gratuit (PDF & ATS) | Mon CV Go',
      description: 'Éditeur de CV en ligne 100% gratuit sans inscription. Choisissez votre modèle, remplissez vos informations et téléchargez votre CV en PDF HD.',
      h1: 'Créateur de CV Gratuit en Ligne',
      content: `
        <h1>Créateur de CV Gratuit en Ligne</h1>
        <p>Remplissez vos informations personnelles, vos expériences professionnelles, votre formation et vos compétences. Notre assistant calculera en direct votre score d'optimisation ATS.</p>
      `
    },
    'studio-photo': {
      title: 'Studio Photo CV IA : Détourage Gratuit & Fond Studio | Mon CV Go',
      description: 'Studio Photo CV propulsé par l\'IA. Supprimez le fond de votre photo en 1 clic, appliquez un fond studio professionnel et injectez-la sur votre CV.',
      h1: 'Studio Photo CV par IA Gratuit',
      content: `
        <h1>Studio Photo CV par IA Gratuit</h1>
        <p>Détourez votre portrait en 1 clic grâce aux réseaux de neurones s'exécutant localement dans votre navigateur. Remplacement de fond studio blanc, gris ou bleu executive.</p>
      `
    },
    'portfolio': {
      title: 'Générateur de Portfolio en Ligne Gratuit | Mon CV Go',
      description: 'Créez un portfolio professionnel en ligne avec études de cas, captures de projets et liens GitHub/Figma. Export PDF et format web interactif.',
      h1: 'Créer un Portfolio Professionnel en Ligne',
      content: `
        <h1>Créer un Portfolio Professionnel en Ligne</h1>
        <p>Le portfolio est la preuve visuelle de vos compétences. Présentez vos réalisations majeures sous forme d'études de cas structurées (Contexte, Rôle, Solution, Résultats).</p>
      `
    },
    'lettre-motivation': {
      title: 'Générateur de Lettre de Motivation Gratuite | Mon CV Go',
      description: 'Rédigez une lettre de motivation percutante basée sur la méthode Vous-Moi-Nous. Mise en page assortie à votre CV et export PDF gratuit.',
      h1: 'Générateur de Lettre de Motivation Gratuite',
      content: `
        <h1>Générateur de Lettre de Motivation Gratuite</h1>
        <p>La lettre de motivation reste un atout majeur. Suivez notre méthode Vous-Moi-Nous pour captiver l'attention du recruteur et décrocher votre entretien.</p>
      `
    },
    'conseils-cv': {
      title: 'Conseils CV 2026 : Guide Ultime pour Réussir vos Candidatures | Mon CV Go',
      description: 'Découvrez nos conseils d\'experts RH pour rédiger un CV irréprochable. Méthodes, exemples concrets, astuces ATS et erreurs à éviter.',
      h1: 'Guide Ultime : Conseils CV et Recrutement 2026',
      content: `
        <h1>Guide Ultime : Conseils CV et Recrutement 2026</h1>
        <p>Un recruteur passe en moyenne 6 à 10 secondes sur un CV. Suivez notre guide étape par étape pour structurer vos expériences, choisir les bons mots-clés et réussir vos candidatures.</p>
      `
    },
    'blog': {
      title: 'Blog Carrière, CV & Emploi 2026 | Mon CV Go',
      description: 'Tous nos articles, guides pratiques et astuces recrutement pour vous accompagner dans votre recherche d\'emploi et l\'optimisation de votre CV.',
      h1: 'Blog Carrière, Conseils RH & Modèles de CV',
      content: `
        <h1>Blog Carrière, Conseils RH & Modèles de CV</h1>
        <p>Explorez nos articles rédigés par des experts du recrutement : conseils ATS, rédaction de lettre de motivation, guides pour le Canada ou la France, et astuces de personal branding.</p>
      `
    },
    'a-propos': {
      title: 'À Propos de Mon CV Go | Éditeur de CV Gratuit & Éthique',
      description: 'Découvrez l\'histoire et la mission de Mon CV Go : offrir une solution de création de CV 100% gratuite, sans inscription et respectueuse de vos données.',
      h1: 'À Propos de Mon CV Go',
      content: `
        <h1>À Propos de Mon CV Go</h1>
        <p>Mon CV Go est né d'un constat simple : la plupart des créateurs de CV en ligne attirent les candidats avec un faux service gratuit avant d'exiger une carte bancaire au moment du téléchargement.</p>
        <p>Notre engagement : un outil 100% gratuit, financé de manière transparente par la publicité, sans abonnement caché et fonctionnant localement dans votre navigateur.</p>
      `
    },
    'contact': {
      title: 'Nous Contacter | Mon CV Go',
      description: 'Une question, une suggestion ou un besoin d\'assistance ? Contactez l\'équipe de Mon CV Go.',
      h1: 'Contactez l\'Équipe Mon CV Go',
      content: `
        <h1>Contactez l'Équipe Mon CV Go</h1>
        <p>Nous sommes à votre écoute pour toute question relative à l'utilisation de notre créateur de CV, au Studio Photo ou à nos modèles de CV.</p>
      `
    },
    'mentions-legales': {
      title: 'Conditions Générales d\'Utilisation & Mentions Légales | Mon CV Go',
      description: 'Consultez les Conditions Générales d\'Utilisation (CGU) et mentions légales du site Mon CV Go.',
      h1: 'Conditions Générales d\'Utilisation & Mentions Légales',
      content: `
        <h1>Conditions Générales d'Utilisation & Mentions Légales</h1>
        <p>Le site Mon CV Go est un service en ligne gratuit permettant aux utilisateurs de créer, formater et télécharger des CV et lettres de motivation au format PDF.</p>
      `
    },
    'confidentialite': {
      title: 'Politique de Confidentialité & RGPD | Mon CV Go',
      description: 'Politique de confidentialité et protection des données personnelles sur Mon CV Go. Découvrez notre fonctionnement 100% local (Client-Side).',
      h1: 'Politique de Confidentialité et Protection des Données',
      content: `
        <h1>Politique de Confidentialité et Protection des Données</h1>
        <p>🔒 <strong>Traitement Local :</strong> Vos données ne quittent jamais votre appareil. L'ensemble du processus de création et d'export de votre CV est effectué localement dans votre navigateur.</p>
      `
    },
    'plan-du-site': {
      title: 'Plan du Site HTML | Mon CV Go',
      description: 'Accédez à l\'ensemble des pages, modèles de CV métiers, outils et articles de blog du site Mon CV Go.',
      h1: 'Plan du Site Mon CV Go',
      content: `
        <h1>Plan du Site Mon CV Go</h1>
        <p>Retrouvez la liste complète de nos outils de création de CV, guides de recrutement, modèles métiers et articles de blog.</p>
      `
    },
    'creer-cv-gratuit': {
      title: 'Créer un CV Gratuitement en Ligne (PDF & Word) | Mon CV Go',
      description: 'Créer un CV gratuitement en ligne en 2 minutes. Éditeur gratuit n°1 sans inscription, sans abonnement caché, compatible ATS avec téléchargement PDF instantané.',
      h1: 'Créer un CV Gratuitement en Ligne (2026)',
      content: `
        <h1>Créer un CV Gratuitement en Ligne (2026)</h1>
        <p>Découvrez l'éditeur n°1 gratuit pour créer et télécharger votre CV en PDF HD sans frais caché ni abonnement surprise.</p>
      `
    },
    'espace-emploi': {
      title: 'Espace Emploi & Candidatures | Mon CV Go',
      description: 'Explorez nos ressources pour optimiser vos candidatures, vous préparer aux entretiens et rechercher un emploi efficacement.',
      h1: 'Espace Emploi & Conseils Carrière',
      content: `
        <h1>Espace Emploi & Conseils Carrière</h1>
        <p>Conseils pratiques et outils pour réussir vos entretiens d'embauche, préparer votre CV et relancer les recruteurs.</p>
      `
    }
  },
  en: {
    '': {
      title: 'Mon CV GO 🟨 | Create a Free Resume Online | Professional Templates 2026',
      description: 'Easily and freely create your CV, cover letter, and portfolio online without registration. Professional templates and instant PDF download.',
      h1: 'Create a free PDF resume in less than 5 minutes',
      content: '<h1>Create a free PDF resume in less than 5 minutes</h1><p>Welcome to <strong>Mon CV Go</strong>, the 100% free online tool to create a professional CV, write your cover letters, and design your portfolio. No signup, instant PDF export, and ATS-optimized templates.</p>'
    },
    'create': {
      title: 'Free Online Resume Builder (PDF & ATS) | Mon CV Go',
      description: '100% free online resume editor without registration. Choose your template, fill in your info, and download your CV in HD PDF.',
      h1: 'Free Online Resume Builder',
      content: '<h1>Free Online Resume Builder</h1><p>Fill in your personal details, work experience, education, and skills. Our assistant calculates your ATS optimization score in real-time.</p>'
    },
    'studio-photo': {
      title: 'AI CV Photo Studio: Free Background Removal & Enhancement | Mon CV Go',
      description: 'AI-powered CV Photo Studio. Remove your photo background in 1 click, apply professional studio backdrops, and place it on your resume.',
      h1: 'Free AI CV Photo Studio',
      content: '<h1>Free AI CV Photo Studio</h1><p>Crop and clean your portrait in 1 click using neural networks running locally in your browser. White, gray, or executive blue studio backgrounds.</p>'
    },
    'portfolio': {
      title: 'Free Online Portfolio Builder | Mon CV Go',
      description: 'Create a professional online portfolio with case studies, project screenshots, and GitHub/Figma links. PDF export and web format.',
      h1: 'Create a Professional Portfolio Online',
      content: '<h1>Create a Professional Portfolio Online</h1><p>The portfolio is the visual proof of your skills. Present your achievements in structured case studies (Context, Role, Solution, Results).</p>'
    },
    'lettre-motivation': {
      title: 'Free Cover Letter Generator | Mon CV Go',
      description: 'Write a powerful cover letter based on the You-Me-Us method. Matching layout to your resume and free PDF download.',
      h1: 'Free Cover Letter Generator',
      content: '<h1>Free Cover Letter Generator</h1><p>The cover letter is a key asset. Follow our You-Me-Us method to capture the recruiter\'s attention and land your interview.</p>'
    },
    'conseils-cv': {
      title: 'Resume Tips 2026: Ultimate Guide to Job Applications | Mon CV Go',
      description: 'Discover expert HR advice to write an outstanding resume. Methods, concrete examples, ATS tips, and mistakes to avoid.',
      h1: 'Ultimate Guide: Resume and Recruitment Tips 2026',
      content: '<h1>Ultimate Guide: Resume and Recruitment Tips 2026</h1><p>A recruiter spends 6 to 10 seconds on average on a resume. Follow our step-by-step guide to structure your experience and select keywords.</p>'
    },
    'blog': {
      title: 'Career, Resume & Job Blog 2026 | Mon CV Go',
      description: 'Read our latest articles and tips to write a perfect resume, create a portfolio, and ace your job interviews.',
      h1: 'Career Blog, HR Advice & Resume Templates',
      content: '<h1>Career Blog, HR Advice & Resume Templates</h1><p>Explore articles written by recruitment experts: ATS advice, cover letter writing, international resumes, and personal branding.</p>'
    },
    'a-propos': {
      title: 'About Mon CV Go | Free & Ethical Resume Editor',
      description: 'Learn the story and mission of Mon CV Go: providing a 100% free resume builder, no registration, respecting your privacy.',
      h1: 'About Mon CV Go',
      content: '<h1>About Mon CV Go</h1><p>Our commitment: a 100% free tool, transparently funded by ads, with no hidden subscriptions, running locally in your browser.</p>'
    },
    'contact': {
      title: 'Contact Us | Mon CV Go',
      description: 'Have a question, suggestion, or need assistance? Contact the Mon CV Go team.',
      h1: 'Contact the Mon CV Go Team',
      content: '<h1>Contact the Mon CV Go Team</h1><p>We are here to help with any questions about our resume builder, photo studio, or templates.</p>'
    },
    'mentions-legales': {
      title: 'Terms of Use & Legal Mentions | Mon CV Go',
      description: 'Read the Terms of Use (CGU) and legal information of the Mon CV Go website.',
      h1: 'Terms of Use & Legal Mentions',
      content: '<h1>Terms of Use & Legal Mentions</h1><p>Mon CV Go is a free online service allowing users to create, format, and download resumes and cover letters in PDF.</p>'
    },
    'confidentialite': {
      title: 'Privacy Policy & GDPR | Mon CV Go',
      description: 'Privacy policy and data protection on Mon CV Go. Discover our 100% client-side local operation.',
      h1: 'Privacy Policy and Data Protection',
      content: '<h1>Privacy Policy and Data Protection</h1><p>🔒 <strong>Local Processing:</strong> Your data never leaves your device. The entire creation and export process is done locally in your browser.</p>'
    },
    'plan-du-site': {
      title: 'HTML Site Map | Mon CV Go',
      description: 'Access the complete list of pages, job resume templates, tools, and blog posts of Mon CV Go.',
      h1: 'Mon CV Go Site Map',
      content: '<h1>Mon CV Go Site Map</h1><p>Find the complete list of our resume builders, recruitment guides, job templates, and blog posts.</p>'
    },
    'creer-cv-gratuit': {
      title: 'Create a Resume Free Online (PDF & Word) | Mon CV Go',
      description: 'Create a resume for free online in 2 minutes. No registration, no hidden subscriptions, ATS-compatible, and instant PDF download.',
      h1: 'Create a Resume Free Online (2026)',
      content: '<h1>Create a Resume Free Online (2026)</h1><p>Discover the #1 free builder to create and download your resume in HD PDF without hidden fees or surprise subscriptions.</p>'
    },
    'espace-emploi': {
      title: 'Job Space & Applications Tracker | Mon CV Go',
      description: 'Explore our resources to optimize your applications, prepare for interviews, and search for jobs effectively.',
      h1: 'Job Space & Career Advice',
      content: '<h1>Job Space & Career Advice</h1><p>Practical tips and tools to succeed in job interviews, prepare your resume, and follow up with recruiters.</p>'
    }
  },
  de: {
    '': {
      title: 'Mon CV GO 🟨 | Lebenslauf kostenlos online erstellen | Professionelle Vorlagen 2026',
      description: 'Erstellen Sie einfach und kostenlos Ihren Lebenslauf, Ihr Anschreiben und Ihr Portfolio online ohne Registrierung. Professionelle Vorlagen und sofortiger PDF-Download.',
      h1: 'Lebenslauf kostenlos als PDF in weniger als 5 Minuten erstellen',
      content: '<h1>Lebenslauf kostenlos als PDF in weniger als 5 Minuten erstellen</h1><p>Willkommen bei <strong>Mon CV Go</strong>, dem 100 % kostenlosen Online-Tool zur Erstellung professioneller Lebensläufe, Anschreiben und Portfolios. Keine Anmeldung, sofortiger PDF-Export und ATS-optimierte Vorlagen.</p>'
    },
    'create': {
      title: 'Lebenslauf-Generator kostenlos (PDF & ATS) | Mon CV Go',
      description: '100 % kostenloser Online-Lebenslauf-Editor ohne Registrierung. Vorlage wählen, Daten eingeben und Lebenslauf als HD-PDF herunterladen.',
      h1: 'Kostenloser Lebenslauf-Generator',
      content: '<h1>Kostenloser Lebenslauf-Generator</h1><p>Geben Sie Ihre persönlichen Daten, Berufserfahrung, Ausbildung und Fähigkeiten ein. Unser Assistent berechnet Ihre ATS-Optimierung in Echtzeit.</p>'
    },
    'studio-photo': {
      title: 'KI-Bewerbungsfoto-Studio: Kostenlos freistellen & optimieren | Mon CV Go',
      description: 'KI-gestütztes Bewerbungsfoto-Studio. Hintergrund mit 1 Klick entfernen, professionelle Studio-Hintergründe anwenden und in den Lebenslauf einfügen.',
      h1: 'Kostenloses KI-Bewerbungsfoto-Studio',
      content: '<h1>Kostenloses KI-Bewerbungsfoto-Studio</h1><p>Optimieren und schneiden Sie Ihr Porträt mit 1 Klick frei dank lokaler KI im Browser. Weiße, graue oder blaue Hintergründe.</p>'
    },
    'portfolio': {
      title: 'Kostenloser Online-Portfolio-Baukasten | Mon CV Go',
      description: 'Erstellen Sie ein professionelles Online-Portfolio mit Fallstudien, Projekt-Screenshots und Links zu GitHub/Figma. PDF-Export und Web-Format.',
      h1: 'Professionelles Online-Portfolio erstellen',
      content: '<h1>Professionelles Online-Portfolio erstellen</h1><p>Das Portfolio ist der visuelle Beweis Ihrer Fähigkeiten. Präsentieren Sie Ihre Arbeiten in strukturierten Fallstudien.</p>'
    },
    'lettre-motivation': {
      title: 'Kostenloser Anschreiben-Generator | Mon CV Go',
      description: 'Verfassen Sie ein wirkungsvolles Anschreiben mit der Sie-Ich-Wir-Methode. Passendes Layout zum Lebenslauf und kostenloser PDF-Download.',
      h1: 'Kostenloser Anschreiben-Generator',
      content: '<h1>Kostenloser Anschreiben-Generator</h1><p>Das Anschreiben ist entscheidend. Nutzen Sie unsere Sie-Ich-Wir-Methode, um das Interesse der Personalverantwortlichen zu wecken.</p>'
    },
    'conseils-cv': {
      title: 'Lebenslauf-Tipps 2026: Der ultimative Bewerbungsratgeber | Mon CV Go',
      description: 'Entdecken Sie Experten-Tipps für einen perfekten Lebenslauf. Methoden, Beispiele, ATS-Tricks und Fehler, die Sie vermeiden sollten.',
      h1: 'Ultimativer Ratgeber: Lebenslauf und Bewerbungstipps 2026',
      content: '<h1>Ultimativer Ratgeber: Lebenslauf und Bewerbungstipps 2026</h1><p>Ein Lebenslauf wird in wenigen Sekunden gescannt. Nutzen Sie unsere Anleitung, um Ihre Erfahrungen und Fähigkeiten optimal darzustellen.</p>'
    },
    'blog': {
      title: 'Blog für Karriere, Lebenslauf & Jobs 2026 | Mon CV Go',
      description: 'Lesen Sie unsere neuesten Artikel und Tipps, um den perfekten Lebenslauf zu schreiben, ein Portfolio zu erstellen und Vorstellungsgespräche zu meistern.',
      h1: 'Karriere-Blog, HR-Tipps & Lebenslauf-Vorlagen',
      content: '<h1>Karriere-Blog, HR-Tipps & Lebenslauf-Vorlagen</h1><p>Erkunden Sie Artikel von Personalexperten: ATS-Optimierung, Anschreiben, internationale Bewerbungen und Personal Branding.</p>'
    },
    'a-propos': {
      title: 'Über Mon CV Go | Kostenloser & ethischer Lebenslauf-Editor',
      description: 'Erfahren Sie mehr über die Geschichte und Mission von Mon CV Go: 100 % kostenloser Editor, keine Registrierung, Datenschutz garantiert.',
      h1: 'Über Mon CV Go',
      content: '<h1>Über Mon CV Go</h1><p>Unser Versprechen: Ein kostenloses, werbefinanziertes Tool ohne versteckte Abonnements, das komplett lokal in Ihrem Browser läuft.</p>'
    },
    'contact': {
      title: 'Kontaktieren Sie uns | Mon CV Go',
      description: 'Haben Sie Fragen, Anregungen oder benötigen Sie Hilfe? Kontaktieren Sie das Team von Mon CV Go.',
      h1: 'Kontakt zum Mon CV Go Team',
      content: '<h1>Kontakt zum Mon CV Go Team</h1><p>Wir helfen Ihnen gerne bei Fragen zu unserem Editor, dem Fotostudio oder unseren Vorlagen.</p>'
    },
    'mentions-legales': {
      title: 'Nutzungsbedingungen & Impressum | Mon CV Go',
      description: 'Nutzungsbedingungen (CGU) und rechtliche Hinweise zur Website Mon CV Go.',
      h1: 'Nutzungsbedingungen & Impressum',
      content: '<h1>Nutzungsbedingungen & Impressum</h1><p>Mon CV Go ist ein kostenloser Online-Dienst zur Erstellung und zum Download von Lebensläufen und Anschreiben als PDF.</p>'
    },
    'confidentialite': {
      title: 'Datenschutzerklärung & DSGVO | Mon CV Go',
      description: 'Datenschutzerklärung und Schutz personenbezogener Daten auf Mon CV Go. Lokale Verarbeitung clientseitig.',
      h1: 'Datenschutzerklärung und Schutz personenbezogener Daten',
      content: '<h1>Datenschutzerklärung und Schutz personenbezogener Daten</h1><p>🔒 <strong>Lokale Verarbeitung:</strong> Ihre Daten bleiben auf Ihrem Gerät. Der gesamte Prozess läuft sicher in Ihrem Browser.</p>'
    },
    'plan-du-site': {
      title: 'HTML-Sitemap | Mon CV Go',
      description: 'Übersicht über alle Seiten, Lebenslauf-Vorlagen nach Berufen, Tools und Blog-Artikel von Mon CV Go.',
      h1: 'Mon CV Go Sitemap',
      content: '<h1>Mon CV Go Sitemap</h1><p>Hier finden Sie die Liste aller Lebenslauf-Generatoren, Bewerbungstipps und Blog-Artikel.</p>'
    },
    'creer-cv-gratuit': {
      title: 'Lebenslauf kostenlos online schreiben (PDF & Word) | Mon CV Go',
      description: 'Lebenslauf kostenlos online in 2 Minuten erstellen. Ohne Anmeldung, ohne versteckte Kosten, ATS-kompatibel und direkter PDF-Download.',
      h1: 'Lebenslauf kostenlos online erstellen (2026)',
      content: '<h1>Lebenslauf kostenlos online erstellen (2026)</h1><p>Entdecken Sie den besten kostenlosen Editor für Ihren Lebenslauf als HD-PDF, ganz ohne versteckte Abonnements oder Gebühren.</p>'
    },
    'espace-emploi': {
      title: 'Job-Bereich & Bewerbungs-Tracker | Mon CV Go',
      description: 'Nutzen Sie unsere Ressourcen, um Ihre Bewerbungen zu optimieren, Vorstellungsgespräche vorzubereiten und Jobs zu finden.',
      h1: 'Job-Bereich & Karriere-Tipps',
      content: '<h1>Job-Bereich & Karriere-Tipps</h1><p>Praktische Tipps und Tools für erfolgreiche Bewerbungsgespräche, Lebensläufe und Nachverfolgungen.</p>'
    }
  },
  ar: {
    '': {
      title: 'Mon CV GO 🟨 | إنشاء سيرة ذاتية مجاناً عبر الإنترنت | نماذج احترافية 2026',
      description: 'أنشئ سيرتك الذاتية ورسالة التغطية وملف أعمالك بسهولة ومجاناً عبر الإنترنت دون تسجيل. نماذج احترافية وتحميل PDF فوري.',
      h1: 'إنشاء سيرة ذاتية مجانية بصيغة PDF في أقل من 5 دقائق',
      content: '<h1>إنشاء سيرة ذاتية مجانية بصيغة PDF في أقل من 5 دقائق</h1><p>مرحباً بك في <strong>Mon CV Go</strong>، الأداة المجانية 100٪ لإنشاء سيرة ذاتية احترافية، كتابة رسائل التغطية وتصميم بورتفوليو. بدون تسجيل، تحميل فوري بصيغة PDF ونماذج متوافقة مع أنظمة ATS.</p>'
    },
    'create': {
      title: 'منشئ سيرة ذاتية مجاني عبر الإنترنت (PDF و ATS) | Mon CV Go',
      description: 'محرر سيرة ذاتية مجاني 100٪ عبر الإنترنت بدون تسجيل. اختر نموذجاً، املأ بياناتك وحمل سيرتك الذاتية بصيغة PDF عالية الدقة.',
      h1: 'منشئ سيرة ذاتية مجاني عبر الإنترنت',
      content: '<h1>منشئ سيرة ذاتية مجاني عبر الإنترنت</h1><p>املأ بياناتك الشخصية، خبراتك المهنية، تعليمك ومهاراتك. تقوم أداتنا بحساب نقاط تحسين ATS في الوقت الفعلي.</p>'
    },
    'studio-photo': {
      title: 'استوديو صور السيرة الذاتية بالذكاء الاصطناعي: إزالة الخلفية مجاناً | Mon CV Go',
      description: 'استوديو صور السيرة الذاتية بالذكاء الاصطناعي. إزالة خلفية صورتك بنقرة واحدة، وضع خلفية استوديو احترافية وإدراجها في سيرتك الذاتية.',
      h1: 'استوديو صور السيرة الذاتية بالذكاء الاصطناعي مجاناً',
      content: '<h1>استوديو صور السيرة الذاتية بالذكاء الاصطناعي مجاناً</h1><p>قم بقص صورتك وتعديلها بنقرة واحدة بفضل الذكاء الاصطناعي المحلي في متصفحك. خلفيات استوديو بيضاء، رمادية أو زرقاء.</p>'
    },
    'portfolio': {
      title: 'منشئ ملف أعمال (بورتفوليو) مجاني عبر الإنترنت | Mon CV Go',
      description: 'أنشئ ملف أعمال احترافي عبر الإنترنت مع دراسات حالة، لقطات للمشاريع وروابط GitHub/Figma. تصدير PDF وصيغة ويب تفاعلية.',
      h1: 'إنشاء ملف أعمال احترافي عبر الإنترنت',
      content: '<h1>إنشاء ملف أعمال احترافي عبر الإنترنت</h1><p>البورتفوليو هو الدليل المرئي لمهاراتك. اعرض مشاريعك في دراسات حالة مهيكلة.</p>'
    },
    'lettre-motivation': {
      title: 'مولد رسائل التغطية مجاناً | Mon CV Go',
      description: 'اكتب رسالة تغطية قوية بناءً على منهجية أنتم-أنا-نحن. تصميم متناسق مع سيرتك الذاتية وتحميل PDF مجاني.',
      h1: 'مولد رسائل التغطية مجاناً',
      content: '<h1>مولد رسائل التغطية مجاناً</h1><p>رسالة التغطية عنصر أساسي. اتبع منهجيتنا لجذب انتباه مسؤولي التوظيف والحصول على مقابلة عمل.</p>'
    },
    'conseils-cv': {
      title: 'نصائح السيرة الذاتية 2026: الدليل الشامل لطلبات التوظيف | Mon CV Go',
      description: 'اكتشف نصائح الخبراء لكتابة سيرة ذاتية مثالية. أساليب، أمثلة عملية، نصائح ATS وأخطاء يجب تجنبها.',
      h1: 'الدليل الشامل: نصائح السيرة الذاتية والتوظيف 2026',
      content: '<h1>الدليل الشامل: نصائح السيرة الذاتية والتوظيف 2026</h1><p>يقضي مسؤول التوظيف ثوانٍ معدودة في مراجعة السيرة الذاتية. اتبع دليلنا لتنسيق خبراتك ومهاراتك.</p>'
    },
    'blog': {
      title: 'مدونة الوظائف والسيرة الذاتية 2026 | Mon CV Go',
      description: 'اقرأ أحدث مقالاتنا ونصائحنا لكتابة سيرة ذاتية مثالية وإنشاء ملف أعمال واجتياز مقابلات العمل بنجاح.',
      h1: 'مدونة الوظائف، نصائح الموارد البشرية ونماذج السيرة الذاتية',
      content: '<h1>مدونة الوظائف، نصائح الموارد البشرية ونماذج السيرة الذاتية</h1><p>استكشف مقالات كتبها خبراء توظيف: نصائح ATS، رسائل التغطية، السير الذاتية الدولية والعلامة الشخصية.</p>'
    },
    'a-propos': {
      title: 'من نحن Mon CV Go | محرر سيرة ذاتية مجاني وأخلاقي',
      description: 'اكتشف قصة ومهمة Mon CV Go: تقديم أداة سيرة ذاتية مجانية 100٪ بدون تسجيل وتحترم خصوصيتك.',
      h1: 'من نحن Mon CV Go',
      content: '<h1>من نحن Mon CV Go</h1><p>التزامنا: أداة مجانية 100٪، ممولة بوضوح من الإعلانات، بدون اشتراكات مخفية، وتعمل محلياً في متصفحك.</p>'
    },
    'contact': {
      title: 'اتصل بنا | Mon CV Go',
      description: 'لديك سؤال، اقتراح أو تحتاج إلى مساعدة؟ اتصل بفريق Mon CV Go.',
      h1: 'اتصل بفريق Mon CV Go',
      content: '<h1>اتصل بفريق Mon CV Go</h1><p>نحن هنا لمساعدتك في أي استفسارات تخص منشئ السيرة الذاتية، استوديو الصور أو النماذج.</p>'
    },
    'mentions-legales': {
      title: 'شروط الاستخدام والإشعارات القانونية | Mon CV Go',
      description: 'اطلع على شروط الاستخدام (CGU) والإشعارات القانونية لموقع Mon CV Go.',
      h1: 'شروط الاستخدام والإشعارات القانونية',
      content: '<h1>شروط الاستخدام والإشعارات القانونية</h1><p>موقع Mon CV Go هو خدمة مجانية عبر الإنترنت تتيح للمستخدمين إنشاء وتنسيق وتحميل السير الذاتية ورسائل التغطية بصيغة PDF.</p>'
    },
    'confidentialite': {
      title: 'سياسة الخصوصية وحماية البيانات | Mon CV Go',
      description: 'سياسة الخصوصية وحماية البيانات الشخصية في Mon CV Go. تشغيل محلي 100٪ في المتصفح.',
      h1: 'سياسة الخصوصية وحماية البيانات الشخصية',
      content: '<h1>سياسة الخصوصية وحماية البيانات الشخصية</h1><p>🔒 <strong>معالجة محلية:</strong> لا تغادر بياناتك جهازك أبداً. تتم كامل العملية محلياً في متصفحك.</p>'
    },
    'plan-du-site': {
      title: 'خريطة الموقع HTML | Mon CV Go',
      description: 'تصفح قائمة الصفحات، نماذج السيرة الذاتية المهنية، الأدوات والمقالات في Mon CV Go.',
      h1: 'خريطة موقع Mon CV Go',
      content: '<h1>خريطة موقع Mon CV Go</h1><p>ابحث عن كافة أدوات إنشاء السيرة الذاتية، أدلة التوظيف والمقالات في موقعنا.</p>'
    },
    'creer-cv-gratuit': {
      title: 'إنشاء سيرة ذاتية مجانية عبر الإنترنت (PDF و Word) | Mon CV Go',
      description: 'أنشئ سيرتك الذاتية مجاناً عبر الإنترنت في دقيقتين. بدون تسجيل، بدون رسوم مخفية، متوافق مع ATS وتحميل PDF فوري.',
      h1: 'إنشاء سيرة ذاتية مجانية عبر الإنترنت (2026)',
      content: '<h1>إنشاء سيرة ذاتية مجانية عبر الإنترنت (2026)</h1><p>اكتشف المحرر المجاني الأفضل لإنشاء وتحميل سيرتك الذاتية بصيغة PDF عالية الدقة بدون أي رسوم مخفية.</p>'
    },
    'espace-emploi': {
      title: 'مساحة العمل والوظائف | Mon CV Go',
      description: 'استكشف مواردنا لتحسين طلبات التوظيف، الاستعداد للمقابلات والبحث عن وظائف بفعالية.',
      h1: 'مساحة العمل والوظائف والنصائح المهنية',
      content: '<h1>مساحة العمل والوظائف والنصائح المهنية</h1><p>نصائح عملية وأدوات لتجاوز مقابلات التوظيف بنجاح، إعداد سيرتك الذاتية ومتابعة طلباتك.</p>'
    }
  }
};

// Generate static routes configuration
const baseRoutes = [
  { path: '', key: '' },
  { path: 'create', key: 'create' },
  { path: 'studio-photo', key: 'studio-photo' },
  { path: 'portfolio', key: 'portfolio' },
  { path: 'lettre-motivation', key: 'lettre-motivation' },
  { path: 'conseils-cv', key: 'conseils-cv' },
  { path: 'blog', key: 'blog' },
  { path: 'a-propos', key: 'a-propos' },
  { path: 'contact', key: 'contact' },
  { path: 'mentions-legales', key: 'mentions-legales' },
  { path: 'confidentialite', key: 'confidentialite' },
  { path: 'plan-du-site', key: 'plan-du-site' },
  { path: 'creer-cv-gratuit', key: 'creer-cv-gratuit' },
  { path: 'espace-emploi', key: 'espace-emploi' }
];

const routes = [];
const languages = ['fr', 'en', 'de', 'ar'];

// 1. Process Core Static Routes for all languages
languages.forEach((lang) => {
  baseRoutes.forEach((route) => {
    let cleanPath = route.path;
    if (lang !== 'fr') {
      cleanPath = cleanPath === '' ? lang : `${lang}/${cleanPath}`;
    }
    
    const translateDb = pageTranslations[lang] || pageTranslations['fr'];
    const pageTranslation = translateDb[route.key] || pageTranslations['fr'][route.key];
    
    routes.push({
      path: cleanPath,
      title: pageTranslation.title,
      description: pageTranslation.description,
      h1: pageTranslation.h1,
      content: pageTranslation.content
    });
  });
});

// 2. Process Job Models Routes for all languages
Object.keys(jobModelsData).forEach((key) => {
  languages.forEach((lang) => {
    let cleanPath = key;
    if (lang !== 'fr') {
      cleanPath = `${lang}/${key}`;
    }
    
    const localized = getLocalizedJobModel(key, lang);
    
    // Build content dynamically
    const content = `
      <h1>${localized.h1}</h1>
      <p>${localized.intro}</p>
      <h2>1. Why use this template?</h2>
      <p>${localized.whyUse}</p>
      <h2>2. Skills included</h2>
      <p><strong>Hard Skills:</strong> ${(localized.hardSkills || []).join(', ')}</p>
      <p><strong>Soft Skills:</strong> ${(localized.softSkills || []).join(', ')}</p>
      <h2>3. Professional catchphrase</h2>
      <blockquote>${localized.sampleCatchphrase}</blockquote>
    `;
    
    routes.push({
      path: cleanPath,
      title: localized.seoTitle || `${localized.h1} | Mon CV Go`,
      description: localized.seoDesc || localized.intro.substring(0, 160),
      h1: localized.h1,
      content: content
    });
  });
});

// 3. Process Blog Posts Routes for all languages
languages.forEach((lang) => {
  const currentPosts = blogPosts[lang] || blogPosts['fr'];
  currentPosts.forEach((post) => {
    let cleanPath = `blog/${post.id}`;
    if (lang !== 'fr') {
      cleanPath = `${lang}/blog/${post.id}`;
    }
    
    routes.push({
      path: cleanPath,
      title: `${post.title} | Blog Mon CV Go`,
      description: post.excerpt,
      h1: post.title,
      content: `
        <article>
          <h1>${post.title}</h1>
          <div style="font-size:0.9rem;color:#666;margin-bottom:1rem;">${post.category} - ${post.date} - ${post.readTime}</div>
          <p><strong>${post.excerpt}</strong></p>
          ${post.content}
        </article>
      `
    });
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
  const canonicalUrl = cleanPath === '' || ['en', 'de', 'ar'].includes(cleanPath)
    ? `https://moncvgo.com/${cleanPath}`
    : `https://moncvgo.com/${cleanPath}`;

  // Find relative path for alternate hreflang tags
  // E.g. cleanPath 'en/create' -> relativePath '/create'
  // cleanPath 'create' -> relativePath '/create'
  const pathParts = cleanPath.split('/').filter(Boolean);
  let relativePath = '';
  if (pathParts.length > 0) {
    if (['en', 'de', 'ar'].includes(pathParts[0])) {
      relativePath = '/' + pathParts.slice(1).join('/');
    } else {
      relativePath = '/' + pathParts.join('/');
    }
  }
  if (relativePath === '/') relativePath = '';

  const altFr = `https://moncvgo.com${relativePath}`;
  const altEn = `https://moncvgo.com/en${relativePath}`;
  const altDe = `https://moncvgo.com/de${relativePath}`;
  const altAr = `https://moncvgo.com/ar${relativePath}`;

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

  // Inject or update Hreflang alternates
  const hreflangTags = `
    <link rel="alternate" hreflang="fr" href="${altFr}" />
    <link rel="alternate" hreflang="en" href="${altEn}" />
    <link rel="alternate" hreflang="de" href="${altDe}" />
    <link rel="alternate" hreflang="ar" href="${altAr}" />
    <link rel="alternate" hreflang="x-default" href="${altFr}" />
  `;

  // Remove existing links to prevent duplicates
  html = html.replace(/<link rel="alternate" hreflang=".*?" href=".*?"\s*\/?>/gi, '');
  html = html.replace('</head>', `${hreflangTags}\n</head>`);

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
