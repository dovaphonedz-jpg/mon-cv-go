import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

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

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for React Router (Single Page Application)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend Express en cours d'exécution sur le port ${port}`);
});
