import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
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

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "La clé API OpenAI n'est pas configurée correctement." });
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
      
      // Clean up markdown block if present
      generatedContent = generatedContent.replace(/```json/gi, '').replace(/```/g, '').trim();
      
      try {
        const jsonData = JSON.parse(generatedContent);
        return res.json(jsonData);
      } catch (e) {
        console.error("Failed to parse JSON from OpenAI:", generatedContent);
        return res.status(500).json({ error: "Le modèle n'a pas renvoyé un JSON valide." });
      }
    } else {
      // Fallback for letters and portfolio
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Agis comme un expert. Rédige un contenu accrocheur en lien avec la requête. Rendu direct sans introduction." },
          { role: "user", content: topic }
        ],
        temperature: 0.7,
      });
      return res.json({ text: response.choices[0].message.content });
    }

  } catch (error) {
    console.error('Erreur API OpenAI:', error);
    res.status(500).json({ error: error.message || "Erreur lors de la génération avec l'IA." });
  }
});

app.listen(port, () => {
  console.log(`Backend Express (OpenAI) en cours d'exécution sur le port ${port}`);
});
