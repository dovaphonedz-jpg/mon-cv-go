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
      title: "La Règle d'Or : Clarté et Concision",
      icon: <Target className="w-6 h-6 text-blue-500" />,
      content: "Un recruteur passe en moyenne 6 secondes sur un CV. Allez à l'essentiel. Utilisez des listes à puces, des phrases courtes et mettez en gras les mots-clés de votre secteur.",
      dos: ["Limiter le CV à une ou deux pages", "Mettre les expériences les plus récentes en premier"],
      donts: ["Faire de longs paragraphes narratifs", "Ajouter des informations obsolètes (> 10 ans)"]
    },
    {
      title: "Adaptez votre CV à l'offre",
      icon: <Search className="w-6 h-6 text-emerald-500" />,
      content: "Il vaut mieux avoir 3 CVs très ciblés que 50 envois du même CV générique. Reprenez le vocabulaire de l'offre d'emploi dans votre section Compétences.",
      dos: ["Créer un titre de CV qui correspond au poste visé", "Mettre en avant les compétences demandées"],
      donts: ["Envoyer exactement le même document partout", "Mentir sur vos compétences pour correspondre"]
    },
    {
      title: "Le fond avant la forme, mais...",
      icon: <Edit3 className="w-6 h-6 text-indigo-500" />,
      content: "Un beau design ne sauvera pas un profil vide, mais un profil solide avec un mauvais design (illisibilité, couleurs agressives) finira à la corbeille. Utilisez MonCVGo pour garantir l'aspect pro.",
      dos: ["Choisir des polices professionnelles (Inter, Roboto)", "Garder beaucoup d'espaces blancs (respiration)"],
      donts: ["Utiliser plus de 2 couleurs différentes", "Mettre des jauges de compétences (ex: 4/5 en Anglais)"]
    }
  ];

  return (
    <>
    <SEO title="Conseils CV" description="Découvrez nos meilleures pratiques pour créer un CV qui attire l'œil des recruteurs." url="https://mon-cv-go.com/conseils-cv" />
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
