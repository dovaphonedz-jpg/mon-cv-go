---
name: photo-cv-resizer
description: Traitement d'image, recadrage pro, redimensionnement sans perte de qualité, filtres, suppression/remplacement de fond studio, détourage net et conception UI responsive mobile (basé sur les techniques Photoshop, PhotoWorks, Yalafa & Cédric Design). À utiliser lorsque l'utilisateur veut recadrer, ajuster le ratio, modifier la lumière, appliquer des filtres/flou d'arrière-plan, changer le fond d'une photo de CV ou adapter l'interface aux écrans mobiles/tablettes.
---

# 📸 Skill: Traitement, Filtres, Fond Studio & Design Responsive Mobile pour Photo CV

Ce skill définit la méthodologie globale pour traiter, recadrer, appliquer des filtres, remplacer le fond d'une photo de CV par un arrière-plan studio professionnel, et **garantir un design UI 100% Responsive Multi-Écran (Mobile, Tablette, Desktop)** d'après la méthodologie CSS Media Queries de Cédric Design.

---

## 📱 1. Principes du Responsive Design & Breakpoints (Méthode Cédric Design)

1. **Breakpoints CSS Standard** :
   * `sm`: `@media (min-width: 640px)` (Smartphones larges)
   * `md`: `@media (min-width: 768px)` (Tablettes & Écrans mobiles horizontaux)
   * `lg`: `@media (min-width: 1024px)` (Laptops & Écrans PC)
   * `xl`: `@media (min-width: 1280px)` (Grands Écrans 4K)
2. **Touch Events & Fluidité Mobile** :
   * Support complet des gestes tactiles (`onTouchStart`, `onTouchMove`, `onTouchEnd`) pour le glissement et le recadrage sur écran smartphone.
   * Adaptabilité automatique du Canvas et des vignettes de filtres sur petit écran sans débordement (`w-full max-w-md mx-auto`).

---

## 🎯 2. Principes de Recadrage & Proportions (Aspect Ratios)

1. **Ratio Carré (1:1)** : Format standard pour les badges et photos de CV intégrées dans des cadres ronds ou carrés.
2. **Ratio Passeport / Officiel (3.5 x 4.5)** : Format d’identité officiel pour CV européens et candidatures formelles.
3. **Maintien du Ratio sans Déformation** : Ne jamais étirer ni déformer les pixels d’origine (`object-fit: cover` + Canvas HD).

---

## 🎨 3. Remplacement de Fond Studio & Détourage (Technique Yalafa)

1. **Séparation du Sujet & Arrière-plan (Masking)** :
   * Détection des contours du sujet (visage/épaules).
   * **Adoucissement des contours (Feathering / Smooth Edges)** : Application d'un rayon de lissage de 1-2px pour éliminer l'effet "découpé aux ciseaux".
2. **Fonds de Studio Pro Disponibles** :
   * **Studio Blanc Pur / Gris Minimalist** (Recommandé pour la finance et le droit).
   * **Dégradé Bleu Pro / Indigo Executive** (Recommandé pour l'ingénierie et la tech).
   * **Fond Flouté Bureau / Open Space** (Recommandé pour le commerce et les RH).
3. **Harmonisation des Couleurs (Color Matching)** :
   * Ajustement de la température de couleur du sujet pour s'accorder au ton du nouveau fond.
   * Ajout d'une **ombre portée subtile (Natural Drop Shadow)** sous le menton/tenue.

---

## 🎭 4. Catalogue de Filtres & Réglage d'Intensité (0% - 100%)

* **Catégorie "Populaire / Studio Pro"** : Éclairage neutre et contraste équilibré (`brightness(105%) contrast(105%)`).
* **Catégorie "Vintage / Classic"** : Tons chauds et doux (`sepia(20%) contrast(105%)`).
* **Catégorie "N&B Exécutif"** : Noir & Blanc haute précision (`grayscale(100%) contrast(115%)`).
* **Catégorie "Flou d'Arrière-Plan (Bokeh)"** : Détachement du visage du fond (`backdrop-filter: blur(4px)` / Masque Canvas).
* **Curseur d'Intensité (Opacity / Mix-Blend)** : Réglage fluide de 0 à 100%.

---

## 📐 5. Algorithme d'Export Canvas HD & Layout Responsive (JavaScript)

```javascript
export function processCVPhotoWithBackground(imageElement, cropArea, options = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const targetWidth = options.width || 600;
  const targetHeight = options.height || 600;
  
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 1. Dessin du fond studio sélectionné
  if (options.bgType === 'gradient-blue') {
    const grad = ctx.createLinearGradient(0, 0, 0, targetHeight);
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (options.bgType === 'white-studio') {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }
  
  // 2. Application des filtres sur le sujet
  const intensity = (options.intensity !== undefined ? options.intensity : 100) / 100;
  const brightness = 100 + ((options.brightness || 100) - 100) * intensity;
  const contrast = 100 + ((options.contrast || 100) - 100) * intensity;
  const grayscale = (options.grayscale ? 100 : 0) * intensity;
  
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
  
  // 3. Dessin du sujet avec le recadrage
  ctx.drawImage(
    imageElement,
    cropArea.x, cropArea.y, cropArea.width, cropArea.height,
    0, 0, targetWidth, targetHeight
  );
  
  return canvas.toDataURL('image/webp', 0.95);
}
```

---

## 🚀 6. Application Pratique
Utiliser cette méthodologie pour alimenter le composant **Studio Photo CV** du site avec un design 100% responsive sur mobile, recadrage tactile 1-Clic, remplacement de fond studio, curseur d'intensité et sélection de filtres artistiques pro.
