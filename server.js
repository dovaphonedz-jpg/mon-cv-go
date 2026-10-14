import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Explicitly serve SEO files for all domains (www and non-www) to prevent 301/SPA fallback
app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  const distPath = path.join(__dirname, 'dist', 'sitemap.xml');
  const publicPath = path.join(__dirname, 'public', 'sitemap.xml');
  if (fs.existsSync(distPath)) {
    return res.sendFile(distPath);
  }
  return res.sendFile(publicPath);
});

app.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const distPath = path.join(__dirname, 'dist', 'robots.txt');
  const publicPath = path.join(__dirname, 'public', 'robots.txt');
  if (fs.existsSync(distPath)) {
    return res.sendFile(distPath);
  }
  return res.sendFile(publicPath);
});

// Force HTTPS on Railway
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `https://${req.hostname}${req.url}`);
  }
  next();
});

// Redirect www to non-www to preserve paths (e.g. for ads.txt)
app.use((req, res, next) => {
  if (req.hostname.startsWith('www.')) {
    const nonWwwHostname = req.hostname.slice(4);
    return res.redirect(301, `https://${nonWwwHostname}${req.url}`);
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key_to_prevent_crash'
});

const systemInstruction = `Tu es un assistant de création de CV extrêmement précis.
Ta tâche est de lire le texte fourni par l'utilisateur (qui peut contenir son nom, prénom, parcours, formations, compétences) et de retourner UNIQUEMENT un objet JSON valide. 
NE RENVOIE AUCUN TEXTE AVANT OU APRÈS LE JSON.
Extrais toutes les informations pertinentes (Nom, Expériences, Écoles, Compétences) et invente intelligemment ce qui manque pour créer un profil réaliste.

Format JSON STRICT exigé :
{
  "cvData": {
    "personal": {
      "name": "Nom et prénom extraits",
      "title": "Métier extrait",
      "email": "email fictif",
      "phone": "téléphone fictif",
      "address": "ville fictive",
      "website": "",
      "photo": ""
    },
    "summary": "Résumé de profil accrocheur de 3 lignes max",
    "experiences": [
      {
        "title": "Titre du poste",
        "company": "Entreprise (extraite ou inventée)",
        "location": "Ville",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM",
        "current": false,
        "description": "Description détaillée en puces"
      }
    ],
    "education": [
      {
        "degree": "Diplôme",
        "school": "École (extraite ou inventée)",
        "location": "Ville",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM",
        "description": "Description détaillée"
      }
    ],
    "skills": [
      { "name": "Compétence extraite 1", "level": "Avancé" }
    ],
    "languages": [
      { "name": "Français", "level": "Langue maternelle" }
    ],
    "projects": []
  }
}`;



app.post('/api/generate', async (req, res) => {
  try {
    const { documentType, topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Le sujet (topic) est requis' });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key_to_prevent_crash') {
      return res.status(500).json({ error: "La clé API OpenAI est manquante ou invalide." });
    }

    if (documentType === 'cv') {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: `Texte de l'utilisateur : ${topic}` }
        ],
        temperature: 0.7,
      });

      let generatedContent = response.choices[0].message.content;
      generatedContent = generatedContent.replace(/```json/gi, '').replace(/```/g, '').trim();
      
      try {
        const jsonData = JSON.parse(generatedContent);
        return res.json(jsonData);
      } catch (e) {
        console.error("Failed to parse JSON from OpenAI:", generatedContent);
        return res.status(500).json({ error: "Le modèle n'a pas renvoyé un JSON valide." });
      }
    } else {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Agis comme un expert. Rédige un contenu accrocheur en lien avec la requête. Rendu direct sans introduction." },
          { role: "user", content: topic }
        ],
        temperature: 0.7,
      });
      return res.json({ text: response.choices[0].message.content.trim() });
    }

  } catch (error) {
    console.error('Erreur API OpenAI:', error.message);
    res.status(500).json({ error: error.message || "Erreur lors de la génération avec l'IA." });
  }
});

app.post('/api/magic', async (req, res) => {
  try {
    const { prompt, type } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt requis' });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key_to_prevent_crash') {
      return res.status(500).json({ error: "La clé API OpenAI est manquante ou invalide." });
    }

    let systemMsg = "Tu es un expert en recrutement.";
    if (type === 'summary') {
      systemMsg = "Tu es un expert RH. Rédige un résumé de profil professionnel (Summary) très percutant de 3 à 4 phrases maximum pour un CV. Le texte doit mettre en valeur les compétences et l'expérience en fonction du métier donné. Ne mets pas d'introduction, renvoie juste le texte final.";
    } else if (type === 'experience') {
      systemMsg = "Tu es un expert RH. Rédige une description de poste en 3 à 4 puces (bullet points) percutantes pour un CV, basées sur le métier donné. Utilise des verbes d'action forts. Ne mets pas d'introduction, renvoie juste le texte final avec des tirets.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMsg },
        { role: "user", content: `Métier ou mots-clés : ${prompt}` }
      ],
      temperature: 0.7,
    });

    res.json({ text: response.choices[0].message.content.trim() });
    
  } catch (error) {
    console.error('Erreur API OpenAI Magic:', error.message);
    res.status(500).json({ error: error.message || "Erreur lors de la génération magique." });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'moncvgo@gmail.com',
      replyTo: email,
      subject: `Nouveau message de contact : ${subject || 'Sans objet'}`,
      text: `Vous avez reçu un nouveau message de contact.\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
      html: `<p>Vous avez reçu un nouveau message de contact.</p><p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Sujet:</strong> ${subject}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
});

// Trailing slash 301 normalization (e.g. /create/ -> /create, except root /)
app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1);
    return res.redirect(301, safePath + query);
  }
  next();
});

// Serve static frontend files (assets, images, scripts) without directory redirection to prevent trailing slash 301 loops
app.use(express.static(path.join(__dirname, 'dist'), { redirect: false, index: false }));

// Comprehensive SEO Metadata Map for Server-Side Pre-Rendering / Crawler Injection
const SEO_ROUTES_MAP = {
  '/': {
    title: 'Créer un CV Gratuit en PDF | Mon CV Go',
    description: 'Créez facilement et gratuitement votre CV en ligne et téléchargez-le en PDF en moins de 5 minutes. Modèles modernes, compatible ATS, sans inscription.',
    url: 'https://moncvgo.com/'
  },
  '/create': {
    title: 'Créateur de CV Gratuit en Ligne | Mon CV Go',
    description: 'Créez votre CV gratuitement en ligne avec notre outil intuitif. Modèles professionnels, personnalisation facile, vérification score ATS et téléchargement PDF instantané sans inscription.',
    url: 'https://moncvgo.com/create'
  },
  '/studio-photo': {
    title: 'Photo CV Professionnelle Gratuite | Mon CV Go',
    description: 'Créez une photo de CV professionnelle gratuitement : suppression d\'arrière-plan par IA en 1 clic, recadrage format passeport, filtres studio et conseils pour vos candidatures et LinkedIn.',
    url: 'https://moncvgo.com/studio-photo'
  },
  '/portfolio': {
    title: 'Créer un Portfolio Gratuit en Ligne | Mon CV Go',
    description: 'Créez un portfolio en ligne gratuitement pour mettre en valeur vos projets, compétences et réalisations. Idéal pour étudiants, freelances et professionnels.',
    url: 'https://moncvgo.com/portfolio'
  },
  '/lettre-motivation': {
    title: 'Lettre de Motivation Gratuite | Créer en Ligne | Mon CV Go',
    description: 'Créez une lettre de motivation gratuite et percutante en ligne. Modèles prêts à l\'emploi, assistant de rédaction et téléchargement PDF instantané sans inscription.',
    url: 'https://moncvgo.com/lettre-motivation'
  },
  '/conseils-cv': {
    title: 'Conseils CV : Exemples et Astuces pour Réussir son CV | Mon CV Go',
    description: 'Conseils d\'experts pour réussir votre CV professionnel : structure idéale, optimisation ATS, compétences, accroches percutantes et modèles gratuits.',
    url: 'https://moncvgo.com/conseils-cv'
  },
  '/espace-emploi': {
    title: 'Espace Emploi : Suivre ses Candidatures | Mon CV Go',
    description: 'Suivez vos candidatures avec un tableau Kanban interactif, analysez des offres d\'emploi, calculez votre salaire et optimisez votre CV gratuitement.',
    url: 'https://moncvgo.com/espace-emploi'
  },
  '/plan-du-site': {
    title: 'Plan du Site HTML | Mon CV Go - Navigation Complète',
    description: 'Consultez l\'ensemble des pages, outils, modèles de CV et ressources de Mon CV Go sur notre plan du site HTML pour une navigation simple et rapide.',
    url: 'https://moncvgo.com/plan-du-site'
  },
  '/cv-ingenieur': {
    title: 'CV Ingénieur : Modèle, Exemple et Conseils | Mon CV Go',
    description: 'Créez un CV d\'ingénieur percutant et professionnel. Modèle gratuit optimisé ATS, exemples d\'accroches, compétences techniques et conseils de recrutement.',
    url: 'https://moncvgo.com/cv-ingenieur'
  },
  '/cv-ingenieur-debutant': {
    title: 'CV Ingénieur Débutant : Exemple et Conseils | Mon CV Go',
    description: 'Modèle de CV pour jeune ingénieur diplômé et débutant. Conseils d\'experts pour valoriser vos stages, projets d\'études, PFE et décrocher votre premier CDI.',
    url: 'https://moncvgo.com/cv-ingenieur-debutant'
  },
  '/cv-etudiant': {
    title: 'CV Étudiant : Modèle Gratuit, Exemples et Conseils | Mon CV Go',
    description: 'Modèle de CV étudiant gratuit à télécharger en PDF. Idéal pour stage, alternance, job d\'été ou premier emploi étudiant. Conseils et exemples prêts à remplir.',
    url: 'https://moncvgo.com/cv-etudiant'
  },
  '/cv-sans-experience': {
    title: 'CV Sans Expérience : Modèle et Conseils | Mon CV Go',
    description: 'Comment faire un CV quand on n\'a pas d\'expérience ? Guide complet, modèle gratuit et astuces pour décrocher un entretien sans historique professionnel.',
    url: 'https://moncvgo.com/cv-sans-experience'
  },
  '/cv-debutant': {
    title: 'CV Débutant : Modèle Gratuit et Conseils | Mon CV Go',
    description: 'Créez votre CV débutant facilement. Modèle gratuit prêt à l\'emploi, exemples concrets pour premier emploi et astuces de recruteurs pour faire la différence.',
    url: 'https://moncvgo.com/cv-debutant'
  },
  '/cv-ats': {
    title: 'CV Compatible ATS : Guide et Modèles | Mon CV Go',
    description: 'Comment créer un CV compatible avec les logiciels ATS de recrutement ? Conseils d\'experts, jauge de score en direct et modèles 100% optimisés.',
    url: 'https://moncvgo.com/cv-ats'
  },
  '/exemple-cv': {
    title: 'Exemples de CV Gratuits : Modèles à Télécharger | Mon CV Go',
    description: 'Consultez des dizaines d\'exemples de CV gratuits rédigés par des experts. Exemples pour débutants, cadres, étudiants, ingénieurs et reconversions.',
    url: 'https://moncvgo.com/exemple-cv'
  },
  '/modele-cv-gratuit': {
    title: 'Modèles de CV Gratuits en Ligne | Mon CV Go',
    description: 'Téléchargez les meilleurs modèles de CV gratuits en ligne. Designs professionnels, épurés, modernes et compatibles ATS. Export PDF instantané.',
    url: 'https://moncvgo.com/modele-cv-gratuit'
  },
  '/cv-informatique': {
    title: 'CV Informatique : Modèle et Conseils Développeur | Mon CV Go',
    description: 'Créez un CV informatique percutant : développeur web, full-stack, DevOps, data engineer. Modèle gratuit optimisé pour les recruteurs tech et ESN.',
    url: 'https://moncvgo.com/cv-informatique'
  },
  '/cv-professionnel': {
    title: 'CV Professionnel : Modèles et Conseils de Recruteurs | Mon CV Go',
    description: 'Comment faire un CV professionnel irréprochable ? Découvrez nos modèles certifiés par des experts en recrutement, conseils de mise en page et export PDF gratuit.',
    url: 'https://moncvgo.com/cv-professionnel'
  },
  '/alternative-gratuite-zety': {
    title: 'Alternative Gratuite à Zety (100% Sans Carte Bancaire) | Mon CV Go',
    description: 'Découvrez la meilleure alternative gratuite à Zety. Créez et téléchargez votre CV en PDF sans abonnement caché, sans filigrane et sans renseigner votre carte bancaire.',
    url: 'https://moncvgo.com/alternative-gratuite-zety'
  },
  '/cv-ats-score-gratuit': {
    title: 'Score CV ATS Gratuit : Testez votre CV en Ligne | Mon CV Go',
    description: 'Testez gratuitement la compatibilité de votre CV avec les logiciels ATS de recrutement. Score en direct, mots-clés manquants et optimisation instantanée.',
    url: 'https://moncvgo.com/cv-ats-score-gratuit'
  },
  '/modele-cv-comptable-word': {
    title: 'Modèle de CV Comptable Gratuit | Mon CV Go',
    description: 'Téléchargez notre modèle de CV comptable gratuit au format PDF et Word. Structure professionnelle optimisée ATS avec exemples de compétences et accroches.',
    url: 'https://moncvgo.com/modele-cv-comptable-word'
  },
  '/modele-cv-ingenieur': {
    title: 'Modèle de CV Ingénieur Gratuit | Mon CV Go',
    description: 'Créez un CV d\'ingénieur percutant et professionnel. Modèle gratuit optimisé ATS pour ingénieurs informatique, mécanique, BTP et génie civil.',
    url: 'https://moncvgo.com/modele-cv-ingenieur'
  },
  '/modele-cv-debutant': {
    title: 'Modèle de CV Débutant / Sans Expérience | Mon CV Go',
    description: 'Modèle de CV gratuit pour débutants et personnes sans expérience. Mettez en avant vos compétences, votre formation et votre potentiel.',
    url: 'https://moncvgo.com/modele-cv-debutant'
  },
  '/modele-cv-etudiant': {
    title: 'Modèle de CV Étudiant Gratuit | Mon CV Go',
    description: 'Modèle de CV étudiant gratuit pour stage, alternance et job d\'été. Structure moderne valorisant les formations et projets académiques.',
    url: 'https://moncvgo.com/modele-cv-etudiant'
  },
  '/modele-cv-commercial': {
    title: 'Modèle de CV Commercial Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour commercial, technico-commercial et responsable des ventes. Valorisez votre portefeuille client et vos réussites.',
    url: 'https://moncvgo.com/modele-cv-commercial'
  },
  '/modele-cv-developpeur': {
    title: 'Modèle de CV Développeur Web Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour développeur web, full-stack, frontend et backend. Mettez en avant votre stack technique et vos projets GitHub.',
    url: 'https://moncvgo.com/modele-cv-developpeur'
  },
  '/modele-cv-designer': {
    title: 'Modèle de CV Designer & UI/UX Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour graphiste, designer UI/UX et directeur artistique. Présentation visuelle élégante pour mettre en valeur votre portfolio.',
    url: 'https://moncvgo.com/modele-cv-designer'
  },
  '/modele-cv-infirmiere': {
    title: 'Modèle de CV Infirmière & Soignant Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour infirmiers, aides-soignants et professionnels de santé. Structure conforme aux exigences hospitalières et cliniques.',
    url: 'https://moncvgo.com/modele-cv-infirmiere'
  },
  '/modele-cv-restauration': {
    title: 'Modèle de CV Restauration & Hôtellerie Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour serveur, cuisinier, barman et métiers de l\'hôtellerie-restauration. Valorisez votre dynamisme et sens du service.',
    url: 'https://moncvgo.com/modele-cv-restauration'
  },
  '/modele-cv-chauffeur-livreur': {
    title: 'Modèle de CV Chauffeur Livreur Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour chauffeur livreur, coursier et conducteur routier. Mettez en avant vos permis, votre ponctualité et votre rigueur.',
    url: 'https://moncvgo.com/modele-cv-chauffeur-livreur'
  },
  '/modele-cv-secretaire': {
    title: 'Modèle de CV Secrétaire & Assistant Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour secrétaire administrative, assistante de direction et secrétaire médicale. Valorisez vos compétences bureautiques.',
    url: 'https://moncvgo.com/modele-cv-secretaire'
  },
  '/modele-cv-vendeur': {
    title: 'Modèle de CV Vendeur Gratuit | Mon CV Go',
    description: 'Modèle de CV gratuit pour vendeur en magasin, hôte de caisse et conseiller de vente. Valorisez votre relationnel client et dynamisme.',
    url: 'https://moncvgo.com/modele-cv-vendeur'
  },
  '/blog': {
    title: 'Blog Emploi : Conseils CV et Lettre de Motivation | Mon CV Go',
    description: 'Lisez nos derniers articles et astuces pour rédiger un CV parfait, créer un portfolio et réussir vos entretiens d\'embauche.',
    url: 'https://moncvgo.com/blog'
  },
  '/a-propos': {
    title: 'À Propos de Mon CV Go | Générateur de CV Gratuit',
    description: 'Découvrez l\'histoire et la mission de Mon CV Go, la plateforme gratuite pour créer son CV, sa lettre de motivation et son portfolio sans inscription.',
    url: 'https://moncvgo.com/a-propos'
  },
  '/contact': {
    title: 'Contactez l\'Équipe Mon CV Go | Support & Assistance',
    description: 'Contactez l\'équipe Mon CV Go pour toute question, suggestion ou demande d\'assistance sur la création de votre CV en ligne.',
    url: 'https://moncvgo.com/contact'
  },
  '/mentions-legales': {
    title: 'Mentions Légales | Mon CV Go',
    description: 'Mentions légales, conditions d\'utilisation et informations relatives à l\'éditeur du site Mon CV Go.',
    url: 'https://moncvgo.com/mentions-legales'
  },
  '/confidentialite': {
    title: 'Politique de Confidentialité | Mon CV Go',
    description: 'Découvrez notre engagement strict pour la confidentialité de vos données personnelles. 100% privé, traitement local dans le navigateur.',
    url: 'https://moncvgo.com/confidentialite'
  }
};

// Fallback for React Router (SPA) with full Static Pre-Render serving and Meta Tag Injection
app.get(/(.*)/, (req, res) => {
  const reqPath = req.path;
  const cleanPath = reqPath.replace(/^\/+/, '').replace(/\/+$/, '');
  const distDir = path.join(__dirname, 'dist');

  // 1. Priority: Serve prerendered static HTML if it exists in dist/ (generated by prerender.js)
  if (fs.existsSync(distDir)) {
    let targetFile = null;
    if (cleanPath !== '') {
      const subDirHtml = path.join(distDir, cleanPath, 'index.html');
      if (fs.existsSync(subDirHtml)) {
        targetFile = subDirHtml;
      } else {
        const flatHtml = path.join(distDir, `${cleanPath}.html`);
        if (fs.existsSync(flatHtml)) {
          targetFile = flatHtml;
        }
      }
    } else {
      const rootHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(rootHtml)) {
        targetFile = rootHtml;
      }
    }

    if (targetFile) {
      return res.status(200).type('html').send(fs.readFileSync(targetFile, 'utf8'));
    }
  }

  // 2. Secondary fallback: index.html with dynamic SEO metadata replacement
  const distHtmlPath = path.join(distDir, 'index.html');
  const fallbackHtmlPath = path.join(__dirname, 'index.html');
  const htmlFile = fs.existsSync(distHtmlPath) ? distHtmlPath : fallbackHtmlPath;

  if (!fs.existsSync(htmlFile)) {
    return res.status(404).send('Not Found');
  }

  const meta = SEO_ROUTES_MAP[reqPath];
  let html = fs.readFileSync(htmlFile, 'utf8');

  if (meta) {
    html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
    html = html.replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${meta.description}">`);
    html = html.replace(/<link rel="canonical" href=".*?"\/?>/i, `<link rel="canonical" href="${meta.url}">`);
    html = html.replace(/<meta property="og:title" content=".*?"\/?>/i, `<meta property="og:title" content="${meta.title}">`);
    html = html.replace(/<meta property="og:description" content=".*?"\/?>/i, `<meta property="og:description" content="${meta.description}">`);
    html = html.replace(/<meta property="og:url" content=".*?"\/?>/i, `<meta property="og:url" content="${meta.url}">`);
    return res.status(200).send(html);
  }

  return res.status(404).send(html);
});

app.listen(port, () => {
  console.log(`Backend Express en cours d'exécution sur le port ${port}`);
});
