import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, PenLine, Check, ArrowRight, Star, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

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
    <>
    <SEO title="Accueil" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen overflow-hidden selection:bg-indigo-500/30">
      
      {/* HERO SECTION - Modern & Animated */}
      <section className="relative pt-20 pb-24 sm:pt-32 sm:pb-40" id="accueil">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-emerald-500/20 to-teal-400/20 blur-[120px]"
          />
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Création de CV professionnel</span> gratuit, décrochez le job de vos rêves.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Créez un CV clair, une lettre de motivation, et un Portfolio visuel premium prêts à envoyer en quelques minutes. Choisissez votre modèle, remplissez vos infos et exportez en PDF.
              </motion.p>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/create" className="group relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FilePlus2 className="w-5 h-5 relative z-10 group-hover:text-white" />
                  <span className="relative z-10 group-hover:text-white">Créer mon CV</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolio" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-700 transition-all hover:scale-105 hover:shadow-indigo-500/20">
                  <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Créer un Portfolio
                </Link>
                <Link to="/lettre-motivation" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-105">
                  <PenLine className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                  Lettre de motivation
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> Export PDF HD</span>
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> 100 Modèles Pros</span>
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> 100% Sécurisé</span>
              </motion.div>
            </motion.div>

            {/* Right Content - Animated Mockup Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring' }}
              className="hidden lg:block relative z-10 perspective-1000"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-400 blur-3xl opacity-30 dark:opacity-20 rounded-full"></div>
                
                {/* Main Mockup */}
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 p-3 rounded-3xl shadow-2xl transform rotate-y-[-10deg] rotate-x-[5deg]">
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <span className="bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">En direct</span>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <img src="/executive_slate_preview.png" alt="Aperçu du CV" width="600" height="848" loading="lazy" className="w-full h-auto rounded-2xl shadow-inner border border-slate-200/50 dark:border-slate-800/50 object-cover" style={{ maxHeight: '600px' }} />
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Check className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Export réussi</p>
                    <p className="text-xs text-slate-500">PDF Haute Définition</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* INFINITE SCROLLING MARQUEE */}
      <div className="w-full bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 items-center px-8"
        >
          {/* Repeat multiple times for continuous scrolling */}
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">100+ MODÈLES PROS</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">DESIGN PREMIUM</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">PORTFOLIO INTÉGRÉ</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">EXPORT PDF HD</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* GALERIE SECTION */}
      <section id="modeles-galerie" className="relative py-32 bg-slate-50 dark:bg-[#0B1120]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-blue-500/5 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Notre Galerie</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Des designs approuvés par les experts.</h2>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed">Faites forte impression. Nos modèles sont modernes, épurés et optimisés pour capter l'attention des recruteurs.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { img: "mockup1.png", title: "CV Tech & Startup", tag: "CV" },
              { img: "mockup2.png", title: "CV Corporate", tag: "CV" },
              { img: "mockup4.png", title: "Portfolio Dark Grille", tag: "Nouveau" },
              { img: "mockup3.png", title: "CV Créatif", tag: "CV" },
              { img: "mockup5.png", title: "Portfolio Dev Minimal", tag: "Portfolio" },
              { img: "mockup6.png", title: "Lettre de motivation Pro", tag: "Lettre" }
            ].map((mockup, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200, damping: 20 }}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-4"
              >
                <div className="absolute top-5 left-5 z-20">
                  <span className="bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                    {mockup.tag}
                  </span>
                </div>
                
                <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img src={`/${mockup.img}`} alt={mockup.title} width="400" height="566" loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="p-8 text-center bg-white dark:bg-slate-900 relative z-20">
                  <h3 className="font-bold text-2xl text-slate-900 dark:text-white">{mockup.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
