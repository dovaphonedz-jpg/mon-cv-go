---
name: google-ads-sea
description: Guide et méthodologie Google Ads / SEA (Search Engine Advertising) basés sur l'expertise de Sébastien Rech ("17 minutes pour comprendre Google Ads"). Couvre le système d'enchères (Ad Rank & Quality Score), les types de campagnes (Search, Display, Shopping, Performance Max, YouTube), les types de correspondance de mots-clés, le tracking des conversions et l'optimisation des pages d'atterrissage. À utiliser pour concevoir, structurer, auditer ou optimiser des campagnes de publicité Google Ads.
---

# Guide Complet Google Ads & SEA (Méthodologie Sébastien Rech)

Synthèse de la formation et masterclass de Sébastien Rech sur la maîtrise de la plateforme publicitaire **Google Ads** et du référencement payant (SEA).

---

## 1. Fonctionnement du Système d'Enchères & Ad Rank

Contrairement aux idées reçues, payer le plus cher ne garantit pas la 1ère position sur Google. La position et le coût par clic réel (CPC) dépendent du **Ad Rank** :

$$\text{Ad Rank} = \text{Enchère (CPC Max)} \times \text{Quality Score (Niveau de Qualité)}$$

### Les 3 Composantes du Quality Score (Note sur 10) :
1. **Taux de clic attendu (CTR attendu)** : Probabilité qu'un utilisateur clique sur l'annonce.
2. **Pertinence de l'annonce** : Adéquation exacte entre la requête recherchée et le texte de l'annonce.
3. **Expérience sur la page de destination (Landing Page)** : Vitesse de chargement, clarté, pertinence du contenu et UX mobile.

> 💡 **Levier stratégique** : Un excellent Quality Score (8 à 10/10) permet de payer ses clics **moins cher** que ses concurrents tout en apparaissant au-dessus d'eux.

---

## 2. Les 5 Grands Formats de Campagnes Google Ads

```
                           +------------------------+
                           |   CAMPAGNES GOOGLE ADS |
                           +------------------------+
              /             /           |            \             \
   +------------+    +------------+ +-------+    +-----------+ +------------+
   |   SEARCH   |    |  DISPLAY   | |PMAX   |    | SHOPPING  | | YOUTUBE    |
   | (Recherche)|    | (Bannières)| |(IA 360)|    |(E-commerce)| | (Vidéos)   |
   +------------+    +------------+ +-------+    +-----------+ +------------+
```

1. **Réseau de Recherche (Search)** : Anonyme et ultra-intentionniste. Ciblage par mots-clés au moment exact où l'utilisateur exprime un besoin.
2. **Display** : Bannières visuelles diffusées sur des millions de sites partenaires (notoriété, retargeting / remarquetage).
3. **Performance Max (PMax)** : Campagne automatisée par l'IA de Google qui diffuse simultanément sur Search, Display, YouTube, Gmail et Maps.
4. **Google Shopping** : Fiches produits visuelles (image + prix + marque) directement dans les résultats de recherche (indispensable pour l'E-commerce).
5. **YouTube Ads** : Format vidéo in-stream ou in-feed pour la considération et la conversion visuelle.

---

## 3. Stratégie de Mots-Clés & Type de Correspondance

| Type de Correspondance | Syntaxe | Description & Usage |
| :--- | :--- | :--- |
| **Exact** | `[mot-clé]` | Déclenchement uniquement si la requête a le même sens exact. **Contrôle maximal, trafic hyper-qualifié.** |
| **Expression** | `"mot-clé"` | Déclenchement si la requête inclut le terme ou une variante proche. **Bon équilibre volume/qualité.** |
| **Large (*Broad*)** | `mot-clé` | Déclenchement sur des synonymes et recherches associées par l'IA. **Grand volume, mais nécessite un gros ciblage par mots-clés négatifs.** |

### ⛔ Mots-Clés Négatifs (Impératif Anti-Gaspillage)
Il faut obligatoirement ajouter une liste de mots-clés négatifs pour exclure le trafic non rentable (ex: *gratuit, pas cher, pdf, avis, stage, emploi, formation*).

---

## 4. Les 3 Piliers d'une Campagne Google Ads Rentable

1. **Tracking Parfait des Conversions (Le Cerveau)** :
   - Installer **Google Tag Manager (GTM)** et la balise de conversion Google Ads.
   - Ne jamais lancer de campagne en enchères automatisées (*Maximiser les conversions / ROAS ciblé*) sans avoir au moins 30 conversions/mois enregistrées proprement.

2. **Alignement Triangulaire (Mot-clé ➔ Annonce ➔ Landing Page)** :
   - Si l'utilisateur tape *"modèle CV développeur"*, l'annonce doit afficher *"Modèles de CV Développeur"* et la Landing Page doit amener directement sur les modèles développeur (pas la homepage générique).

3. **Optimisation Continu & A/B Testing** :
   - Tester au moins 2 à 3 annonces textuelles par groupe d'annonces.
   - Analyser les requêtes réelles (*Termes de recherche*) pour exclure le gaspillage et ajouter de nouveaux mots-clés performants.

---

## 5. Erreurs Classiques à Éviter

- 🛑 **Lancer une campagne sans tracking de conversion fonctionnel.**
- 🛑 **Laisser le réseau Display coché par défaut dans une campagne Search.**
- 🛑 **Utiliser uniquement le ciblage Large sans mots-clés négatifs.**
- 🛑 **Renvoyer le trafic publicitaire payant sur la Page d'Accueil générique au lieu d'une Landing Page dédiée.**
- 🛑 **Ne pas surveiller le rapport sur les termes de recherche réels.**
