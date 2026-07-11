import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, PenLine, Check, ArrowRight, Star, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
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

  return (
    <div className="bg-slate-50 dark:bg-[#0F172A] min-h-screen overflow-hidden selection:bg-blue-500/30">
      
      {/* HERO SECTION - Glassmorphism & SaaS Vibes */}
      <section className="relative pt-20 pb-24 sm:pt-32 sm:pb-40" id="accueil">
        {/* Background glow effects */}
        <div className="absolute top-0 inset-x-0 h-[500px] overflow-hidden -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 dark:bg-blue-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wider border border-blue-200 dark:border-blue-800 mb-6">
                <Star className="w-3.5 h-3.5" />
                100% Gratuit · Sans Inscription
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Décrochez le job de vos rêves avec un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">CV parfait</span> et un Portfolio impactant.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Créez un CV clair, une lettre de motivation, et un Portfolio visuel premium prêts à envoyer en quelques minutes. Choisissez votre modèle, remplissez vos infos et exportez en PDF.
              </motion.p>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/create" className="group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1">
                  <FilePlus2 className="w-5 h-5" />
                  Créer mon CV
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolio" className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1">
                  <Briefcase className="w-5 h-5" />
                  Créer un Portfolio
                </Link>
                <Link to="/lettre-motivation" className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-1">
                  <PenLine className="w-5 h-5" />
                  Lettre de motivation
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> Export PDF HD</span>
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> 100 Modèles Pros</span>
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> 100% Sécurisé</span>
              </motion.div>
            </motion.div>

            {/* Right Content - Glassmorphism Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              className="hidden lg:block relative z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-400 blur-2xl opacity-20 dark:opacity-10 rounded-[3rem]"></div>
              <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 p-4 rounded-[2rem] shadow-2xl">
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                  <span className="bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md">Aperçu en direct</span>
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center backdrop-blur-md">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <img src="/executive_slate_preview.png" alt="Aperçu du CV" className="w-full h-auto rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-800/50" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* GALERIE SECTION */}
      <section id="modeles-galerie" className="py-24 bg-white dark:bg-[#0B1120] border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Démarquez-vous avec nos modèles</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Des designs approuvés par les recruteurs. Modernes, épurés et conçus pour mettre en valeur votre parcours.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "mockup1.png", title: "Modèle Tech & Startup", tag: "Populaire" },
              { img: "mockup2.png", title: "Modèle Corporate", tag: "Classique" },
              { img: "mockup3.png", title: "Modèle Créatif", tag: "Design" }
            ].map((mockup, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {mockup.tag}
                  </span>
                </div>
                <div className="aspect-[3/4] overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img src={`/${mockup.img}`} alt={mockup.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{mockup.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
