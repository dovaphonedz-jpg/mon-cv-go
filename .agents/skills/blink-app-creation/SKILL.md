---
name: blink-app-creation
description: Méthodologie complète pour repérer, analyser et concevoir des applications mobiles à fort potentiel sur Blink.new (basée sur l'analyse Sensor Tower, la génération de Master Prompts IA et l'itération ciblée). À utiliser pour concevoir des prototypes mobiles, rédiger des Master Prompts Blink.new, analyser la concurrence mobile ou structurer le lancement d'une app SaaS mobile.
---

# Méthodologie Blink.new - Création d'Apps Mobiles à Fort Potentiel

Cette méthode permet d'identifier des concepts d'applications mobiles déjà validés à l'international (via Sensor Tower), de les analyser et de générer un **Master Prompt** optimisé pour les construire rapidement sur **Blink.new**.

---

## 🚀 Le Workflow en 5 Étapes

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│  1. Idéation & Bench    │ ──> │   2. Analyse Critique   │ ──> │ 3. Master Prompt (IA)   │
│   (Sensor Tower US/WW)  │     │ (Bugs, Avis, Prix, UX)  │     │  (Cahier des charges)  │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                                                                             │
┌─────────────────────────┐     ┌─────────────────────────┐                  │
│ 5. Itérations Ciblées   │ <── │ 4. Build sur Blink.new  │ <────────────────┘
│  (Scope restreint/page) │     │  (Prompt App Mobile)    │
└─────────────────────────┘     └─────────────────────────┘
```

---

## 1. Recherche & Identification d'Idée (Sensor Tower)

1. Naviguer sur [Sensor Tower App Store Intelligence](https://app.sensortower.com/).
2. Découvrir les applications générant déjà du volume de téléchargements et de revenus à l'étranger (notamment aux États-Unis).
3. Sélectionner une application selon ces critères :
   - **Simple à comprendre** et au concept clair.
   - **Performante à l'international** (revenus/téléchargements prouvés).
   - **Inexistante en France** OU avec des équivalents français **médiocres, inachevés ou mal notés**.
4. *Objectif* : Ne pas copier à l'identique, mais **reprendre le concept validé** et l'adapter/l'améliorer spécifiquement pour le marché français.

---

## 2. Analyse Approfondie du Modèle & des Opportunités

Rédiger une fiche synthétique reprenant :
- **Problème principal** résolu par l'app.
- **Fonctionnalités clés** (MVP vs secondaires).
- **Modèle économique & Prix** (Freemium, abonnement mensuel/annuel, Achat unique).
- **Avis négatifs & Frustrations** (1 à 3 étoiles Store) : repérer les bugs récurrents, fonctionnalités réclamées et éléments UX décevants.
- **Axes d'amélioration** : UX simplifiée, design moderne, intégration de fonctionnalités clés manquantes, localisation culturelle française.

---

## 3. Génération du Master Prompt (Prompt Engineering)

Utiliser une IA (ex: ChatGPT / Claude) pour structurer le Master Prompt prêt pour Blink.new avec la trame suivante :

```text
Je souhaite créer une application mobile inspirée de cette application : [Nom de l'application + Lien Store/Sensor Tower].

Analyse son concept, ses fonctionnalités et son modèle économique.

Crée ensuite un Master Prompt complet pour Blink.new afin de développer une version améliorée, originale et adaptée au marché français.

L’application doit avoir une identité visuelle différente, être simple à utiliser et résoudre les principaux problèmes remontés dans les avis utilisateurs suivants : [Insérer synthèse des avis négatifs].

Décris précisément :
1. L'identité visuelle et le design system (couleurs, typographies, style moderne UI/UX).
2. La structure des pages et le parcours utilisateur (Onboarding, Dashboard, Feature principale, Réglages).
3. Les fonctionnalités principales du MVP.
4. Le modèle économique et l'écran de paywall / abonnement.

Le résultat doit être un Master Prompt unique et directement copiable dans Blink.new.
```

> **Astuce Pro** : Fournir des captures d'écran clés de l'application concurrente pour permettre à l'IA d'analyser le design et le flow UX précis.

---

## 4. Génération du Projet sur Blink.new

1. Se connecter sur [Blink.new](https://blink.new).
2. Créer un **Nouveau Projet**.
3. Sélectionner le type de projet : **Application mobile**.
4. Coller l'intégralité du **Master Prompt** généré à l'étape 3.
5. Lancer la génération initiale.

---

## 5. Tests et Améliorations Itératives (Prompting Ciblé)

Pour préserver la cohérence du code et éviter de casser les fonctionnalités existantes :

1. **Priorité MVP** : Valider d'abord le fonctionnement parfait de la fonctionnalité principale.
2. **Méthode du prompt ultra-ciblé** : Ne jamais envoyer de demandes vagues comme *"Améliore mon application"*.
3. **Formule d'itération stricte à utiliser sur Blink** :

```text
Sur la page [nom de la page], modifie uniquement [élément précis à modifier]. Ne change rien au reste de l'application.
```

4. Ajouter les fonctionnalités secondaires uniquement après stabilisation du cœur de l'application.
