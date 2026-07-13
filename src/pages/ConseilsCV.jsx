import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, AlertTriangle, Target, Search, Edit3 } from 'lucide-react';
import SEO from '../components/SEO';

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
    }
  ];

  return (
    <>
    <SEO title="Conseils CV" description="Découvrez nos meilleures pratiques pour créer un CV qui attire l'œil des recruteurs." url="https://www.moncvgo.com/conseils-cv" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wider border border-blue-200 dark:border-blue-800 mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Guide Pratique
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Conseils pour un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">CV impactant</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez nos meilleures pratiques pour créer un CV qui attire l'œil des recruteurs et passe les filtres des logiciels ATS (Applicant Tracking Systems).
          </p>
        </motion.div>
      </section>

      {/* Content Grid */}
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
              className="bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/30"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner">
                  {section.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{section.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* DOS */}
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-900/30">
                      <h3 className="font-bold text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> À FAIRE
                      </h3>
                      <ul className="space-y-2">
                        {section.dos.map((item, i) => (
                          <li key={i} className="text-sm text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DONTS */}
                    <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-4 border border-red-100 dark:border-red-900/30">
                      <h3 className="font-bold text-red-800 dark:text-red-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> À ÉVITER
                      </h3>
                      <ul className="space-y-2">
                        {section.donts.map((item, i) => (
                          <li key={i} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span> {item}
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
