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
  if (msg.match(/conseil|aide|astuce|recommandation|améliorer|ameliorer|quoi mettre|comment faire/)) {
    const tips = [
      "💡 **Conseil Pro :** La Règle des 6 secondes. Un recruteur scanne votre CV très vite. Mettez vos compétences les plus fortes en haut du document.",
      "💡 **Astuce ATS :** De nombreuses entreprises utilisent des logiciels pour filtrer les CV. Reprenez les mots-clés exacts de l'offre d'emploi dans votre section 'Compétences'.",
      "💡 **Conseil Contenu :** Ne listez pas simplement vos tâches, listez vos résultats ! Utilisez la méthode STAR (Situation, Tâche, Action, Résultat).",
      "💡 **Astuce Design :** Laissez de l'espace blanc ! Un CV trop chargé décourage la lecture. Nos modèles sont optimisés pour laisser votre texte respirer.",
      "💡 **Conseil Photo :** Si vous mettez une photo, choisissez un fond neutre et souriez légèrement. Pas de selfies, restez professionnel !",
      "💡 **Astuce Portfolio :** Si vous êtes dans le web, le design ou le marketing, accompagnez toujours votre CV d'un Portfolio en ligne. Cela fait une énorme différence.",
      "💡 **Verbes d'Action :** Commencez vos puces par des verbes forts : 'Piloté', 'Créé', 'Développé' plutôt que des formules passives comme 'J'ai été en charge de...'."
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    return {
      text: randomTip + "\n\n(Tapez **'conseil'** pour en voir un autre !)",
      actions: [
        { label: "Voir tous nos conseils détaillés 🚀", url: "/conseils-cv" }
      ]
    };
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
