export const getBotResponse = (message) => {
  const msg = message.toLowerCase();
  
  // Salutations
  if (msg.match(/bonjour|salut|coucou|hello|hi|hey/)) {
    return "Bonjour ! 👋 Je suis l'assistant intelligent de MonCVGo. Comment puis-je vous aider avec votre CV ou votre lettre de motivation aujourd'hui ?";
  }
  
  // Questions sur le téléchargement / PDF
  if (msg.match(/télécharger|telecharger|pdf|imprimer|enregistrer|sauvegarder|export/)) {
    return "Pour télécharger votre CV en PDF, allez sur la page 'Créer mon CV' et cliquez sur le bouton bleu **'Télécharger PDF'** au-dessus de l'aperçu. Astuce : Si le PDF est vide, assurez-vous d'avoir rempli quelques informations d'abord !";
  }
  
  // Questions sur la photo
  if (msg.match(/photo|image|profil/)) {
    return "Vous pouvez ajouter une photo dans la section **'Infos Personnelles'**. Cliquez sur 'Choisir un fichier' pour télécharger votre portrait. La photo s'adaptera automatiquement au design du CV !";
  }

  // Questions sur les modèles / designs
  if (msg.match(/modèle|modele|design|couleur|style|apparence/)) {
    return "Nous avons des dizaines de modèles ! Allez dans la section **'Modèle & Style'** (étape 1). Je vous recommande particulièrement la catégorie '🔥 Ultra-Moderne' pour des designs comme 'Silicon Valley' (Glassmorphism) ou 'Tokyo Neo'.";
  }

  // Questions sur la lettre de motivation
  if (msg.match(/lettre|motivation|lm/)) {
    return "Nous avons un générateur de lettre de motivation intégré ! Cliquez sur **'Lettre de motivation'** dans le menu principal en haut. Vous y trouverez des modèles de paragraphes rédigés par des experts RH.";
  }

  // Questions sur l'import / données perdues
  if (msg.match(/importer|perdu|effacé|récupérer|json/)) {
    return "Si vous aviez sauvegardé votre CV avec le bouton 'Sauvegarder', vous avez un fichier .json sur votre ordinateur. Cliquez sur **'Importer'** sur la page de création pour charger ce fichier et retrouver toutes vos données !";
  }

  // Questions sur l'expérience ou l'éducation
  if (msg.match(/expérience|experience|job|travail|emploi|éducation|etude|école|diplome/)) {
    return "Pour ajouter une expérience ou une formation, allez dans les étapes correspondantes de l'éditeur et cliquez sur le bouton **'+ Ajouter'**. Vous pouvez y détailler vos missions, c'est ce qui intéresse le plus les recruteurs !";
  }

  // Questions sur le prix
  if (msg.match(/prix|payant|gratuit|abonnement|carte|payer/)) {
    return "MonCVGo est **100% gratuit et sans inscription**. Nous nous finançons uniquement grâce à la publicité affichée sur le site. Vous pouvez générer autant de PDF que vous le souhaitez ! 🎉";
  }
  
  // Conseils généraux sur le CV
  if (msg.match(/conseil|aide|astuce|comment faire|quoi mettre|compétence/)) {
    return "Mon meilleur conseil : restez concis ! Un recruteur passe en moyenne 6 secondes sur un CV. Utilisez la section **'Résumé'** pour mettre en valeur votre profil en 2 phrases choc, et listez uniquement les expériences pertinentes pour le poste visé.";
  }

  // Question de qui est le bot
  if (msg.match(/qui es[ -]?tu|t'es qui|robot|bot|ia/)) {
    return "Je suis l'assistant virtuel IA de MonCVGo, programmé pour vous guider dans la création du CV parfait ! 🤖✨";
  }

  // Fallback (réponse par défaut)
  const fallbacks = [
    "C'est une excellente question ! Pour l'instant, je suis surtout calé sur le fonctionnement de notre éditeur de CV. Pouvez-vous reformuler avec des mots comme 'modèle', 'photo', 'PDF' ou 'expérience' ?",
    "Je ne suis pas sûr de comprendre. Si vous cherchez de l'aide sur la création de votre CV, essayez de cliquer sur le bouton 'Exemple' en haut de l'éditeur pour voir comment remplir les champs !",
    "Hmm, bonne remarque. N'oubliez pas que vous pouvez trouver plein d'astuces dans notre section 'Conseils CV' dans le menu principal !",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
