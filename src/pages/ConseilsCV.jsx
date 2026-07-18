import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, AlertTriangle, Target, Search, Edit3, Zap, Briefcase, Award } from 'lucide-react';
import SEO from '../components/SEO';
import AdSenseUnit from '../components/AdSenseUnit';

export default function ConseilsCV() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const adviceSections = [
    {
      title: "La Règle d'Or : Clarté et Concision avant tout",
      icon: <Target className="w-6 h-6 text-blue-500" />,
      content: "Un recruteur passe en moyenne 6 à 10 secondes sur un CV lors de la première sélection. Il est donc crucial d'aller à l'essentiel immédiatement. Utilisez des listes à puces pour détailler vos missions, privilégiez des phrases courtes et percutantes, et mettez en gras les mots-clés de votre secteur d'activité. La structure de votre document doit guider l'œil du lecteur du haut (votre profil et vos compétences clés) vers le bas (vos expériences détaillées). Évitez le jargon interne à vos anciennes entreprises qui pourrait ne pas être compris par un recruteur externe.",
      dos: ["Limiter le CV à une ou deux pages maximum", "Mettre les expériences les plus récentes en premier (anti-chronologique)", "Quantifier vos résultats (ex: +20% de ventes, équipe de 5 personnes)"],
      donts: ["Faire de longs paragraphes narratifs ou autobiographiques", "Ajouter des informations obsolètes ou peu pertinentes (> 10-15 ans)", "Mettre une photo de vacances ou mal éclairée"]
    },
    {
      title: "L'importance cruciale d'adapter votre CV à l'offre",
      icon: <Search className="w-6 h-6 text-emerald-500" />,
      content: "C'est l'erreur numéro un des candidats : envoyer exactement le même CV à 50 entreprises différentes. Il vaut mille fois mieux envoyer 5 CVs ultra-ciblés que 50 CVs génériques. Prenez le temps de lire l'offre d'emploi en détail, repérez le vocabulaire utilisé, les compétences techniques (hard skills) et comportementales (soft skills) exigées. Ensuite, réintégrez ces mêmes mots-clés dans votre propre document. Cela augmentera non seulement vos chances de retenir l'attention du recruteur, mais c'est également indispensable pour passer les filtres des logiciels de recrutement (ATS) qui scannent automatiquement les CVs.",
      dos: ["Créer un titre de CV qui correspond très exactement au poste visé", "Mettre en avant les compétences spécifiques demandées par l'annonce", "Ajuster l'accroche (profil) pour chaque candidature"],
      donts: ["Envoyer un document générique intitulé 'CV_2024.pdf'", "Mentir sur vos compétences simplement pour 'matcher' l'offre", "Oublier de relire et laisser le nom d'une autre entreprise dans la lettre"]
    },
    {
      title: "Le design : Le fond avant la forme, mais la forme compte",
      icon: <Edit3 className="w-6 h-6 text-indigo-500" />,
      content: "Ne nous y trompons pas : un design magnifique ne sauvera jamais un profil vide d'expérience ou ne correspondant pas au poste. Cependant, à compétences égales, un CV clair, aéré, moderne et professionnel fera toujours la différence. Un mauvais design (textes illisibles, couleurs agressives, marges inexistantes) donne une impression de négligence et peut envoyer votre candidature directement à la corbeille. C'est précisément pour cela que Mon CV Go existe : nous gérons la complexité du design et de la mise en page pour que vous puissiez vous concentrer à 100% sur le contenu. Nos modèles sont testés et approuvés par des professionnels des ressources humaines.",
      dos: ["Choisir des polices professionnelles et modernes (Inter, Roboto, sans-serif)", "Garder beaucoup d'espaces blancs pour laisser le document 'respirer'", "Aligner parfaitement les dates et les lieux pour une lecture fluide"],
      donts: ["Utiliser plus de 2 ou 3 couleurs différentes sur le même document", "Mettre des jauges de compétences subjectives (ex: 4/5 en Anglais ou 80% en Photoshop)", "Utiliser des polices fantaisistes (Comic Sans MS, Papyrus)"]
    },
    {
      title: "Les Soft Skills : Votre atout secret en 2024",
      icon: <CheckCircle className="w-6 h-6 text-purple-500" />,
      content: "Les compétences techniques (hard skills) prouvent que vous savez faire le travail, mais ce sont les compétences comportementales (soft skills) qui prouvent que vous êtes la personne avec qui l'équipe a envie de travailler. L'intelligence émotionnelle, la capacité à résoudre des problèmes complexes, l'adaptabilité, l'esprit d'équipe et la communication sont aujourd'hui au moins aussi recherchés que les diplômes. Ne vous contentez pas de lister 'Esprit d'équipe' : prouvez-le dans la description de vos expériences (ex: 'Coordination d'une équipe transverse de 5 personnes'). Les soft skills font la différence lors de la sélection finale.",
      dos: ["Illustrer vos soft skills par des exemples concrets dans vos expériences", "Demander des recommandations LinkedIn pour valider ces compétences", "Préparer des anecdotes pour l'entretien prouvant ces qualités"],
      donts: ["Lister des mots à la mode sans aucun contexte ('Agile', 'Synergie')", "Confondre traits de personnalité (être souriant) et soft skills (négociation)", "Négliger ces compétences pour des postes très techniques"]
    },
    {
      title: "Réalisations vs Tâches : Prouvez votre valeur",
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      content: "La plupart des candidats se contentent de lister les tâches qu'ils ont effectuées (ex: 'Gestion des réseaux sociaux'). C'est une erreur. Le recruteur sait déjà en quoi consiste votre métier. Ce qu'il veut savoir, c'est si vous le faites BIEN. Transformez vos listes de tâches en listes de réalisations en utilisant la méthode STAR (Situation, Tâche, Action, Résultat). Au lieu de 'Gestion des réseaux', écrivez 'Augmentation de la communauté de 40% en 6 mois via une nouvelle stratégie de contenu'. Les chiffres parlent beaucoup plus fort que les mots.",
      dos: ["Utiliser des données chiffrées (CA généré, temps gagné, budget géré)", "Mentionner les objectifs atteints ou dépassés", "Préciser l'envergure des projets (budget, taille de l'équipe)"],
      donts: ["Faire un 'copier-coller' de votre fiche de poste", "Être flou (ex: 'bons résultats', 'beaucoup de clients')", "S'attribuer le travail des autres"]
    },
    {
      title: "L'impact psychologique des verbes d'action",
      icon: <Zap className="w-6 h-6 text-fuchsia-500" />,
      content: "Les mots que vous choisissez influencent inconsciemment la perception du recruteur. Évitez les formules passives comme 'J'étais en charge de...' ou 'Responsable de...'. Préférez toujours commencer vos puces par un verbe d'action fort et dynamique : 'Piloté', 'Créé', 'Développé', 'Optimisé', 'Négocié', 'Restructuré'. Ces verbes donnent immédiatement une impression de leadership et d'initiative. Ils transforment un profil passif (exécutant) en un profil proactif (moteur de l'entreprise).",
      dos: ["Commencer chaque point de vos expériences par un verbe d'action au participe passé ou à l'infinitif", "Varier le vocabulaire pour ne pas répéter le même verbe", "Utiliser des mots forts (Orchestré, Propulsé, Rationalisé)"],
      donts: ["Utiliser le pronom 'Je' (ex: 'J'ai fait')", "Employer des verbes faibles (Fait, Aidé, Essayé)", "Mélanger les temps verbaux (passé / présent) sans logique"]
    },
    {
      title: "Le Portfolio : Le 'Game Changer' absolu",
      icon: <Briefcase className="w-6 h-6 text-orange-500" />,
      content: "Un CV dit ce que vous savez faire. Un Portfolio le prouve. Pour les métiers du design, du développement, du marketing, de l'architecture ou de la rédaction, ne pas avoir de portfolio est un immense désavantage. Même si vous n'êtes pas dans le domaine créatif, documenter vos projets réussis (graphiques, rapports publics, présentations) dans un document annexe ou un lien web est une arme redoutable. Mon CV Go vous permet justement de générer un Portfolio élégant en quelques clics, ne passez pas à côté de cette opportunité.",
      dos: ["Insérer un lien cliquable vers votre Portfolio directement dans l'en-tête du CV", "Sélectionner vos 3 ou 4 meilleurs projets uniquement (la qualité prime sur la quantité)", "Expliquer brièvement votre rôle exact dans chaque projet du portfolio"],
      donts: ["Ajouter un lien mort ou privé nécessitant un mot de passe", "Mettre des projets scolaires basiques si vous avez déjà de l'expérience professionnelle", "Laisser le recruteur chercher votre travail sur Google"]
    }
  ];

  return (
    <>
    <SEO title="Conseils CV : Comment Rédiger un Curriculum Vitae Parfait" description="Découvrez nos conseils d'experts pour rédiger un CV impactant. Apprenez à optimiser votre Curriculum Vitae pour les recruteurs et les logiciels ATS." url="https://www.moncvgo.com/conseils-cv" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] relative overflow-hidden pb-20">
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Header */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border brutal-shadow mb-6 transform -rotate-2">
            <BookOpen className="w-4 h-4 text-slate-900" />
            Guide Pratique
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
            Conseils pour rédiger un <span className="bg-cyan-400 text-slate-900 px-3 py-1 ml-2 brutal-border transform rotate-2 inline-block">CV impactant</span>
          </h1>
          <p className="mt-8 text-xl text-slate-700 dark:text-slate-300 font-bold max-w-2xl mx-auto">
            Découvrez nos meilleures pratiques pour créer un CV qui attire l'œil des recruteurs et passe les filtres des logiciels ATS (Applicant Tracking Systems).
          </p>
        </motion.div>
      </section>

      <AdSenseUnit />

      {/* Main Content - Tips */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8"
        >
          {adviceSections.map((section, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className={`bg-white dark:bg-slate-900 p-6 sm:p-8 brutal-border brutal-shadow-lg transition-smooth brutal-hover ${idx % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'}`}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className={`w-16 h-16 shrink-0 flex items-center justify-center brutal-border brutal-shadow transform -rotate-3 ${idx % 3 === 0 ? 'bg-pink-400' : idx % 3 === 1 ? 'bg-yellow-400' : 'bg-cyan-400'}`}>
                  {React.cloneElement(section.icon, { className: "w-8 h-8 text-slate-900", strokeWidth: 2.5 })}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-3">{section.title}</h2>
                  <p className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed mb-6">
                    {section.content}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mt-4">
                    {/* DOS */}
                    <div className="bg-cyan-400 brutal-border p-5 text-slate-900 transform rotate-1">
                      <h3 className="font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" strokeWidth={3} /> À FAIRE
                      </h3>
                      <ul className="space-y-3">
                        {section.dos.map((item, i) => (
                          <li key={i} className="text-sm font-bold flex items-start gap-2">
                            <span className="w-2 h-2 brutal-border bg-white mt-1.5 shrink-0"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DONTS */}
                    <div className="bg-pink-400 brutal-border p-5 text-slate-900 transform -rotate-1">
                      <h3 className="font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" strokeWidth={3} /> À ÉVITER
                      </h3>
                      <ul className="space-y-3">
                        {section.donts.map((item, i) => (
                          <li key={i} className="text-sm font-bold flex items-start gap-2">
                            <span className="w-2 h-2 brutal-border bg-white mt-1.5 shrink-0"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
    </>
  );
}
