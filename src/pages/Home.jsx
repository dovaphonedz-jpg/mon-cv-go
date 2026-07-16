import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, PenLine, Check, ArrowRight, Star, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import TemplateGallery from '../components/TemplateGallery';
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
    <SEO title="Créer un CV Gratuit en Ligne | Modèles Professionnels" description="Créez votre CV professionnel en ligne gratuitement. Choisissez parmi nos modèles de CV premium, exportez en PDF Haute Qualité et décrochez plus d'entretiens." />
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
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider border border-indigo-200 dark:border-indigo-500/30 mb-6 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                100% GRATUIT, SANS INSCRIPTION
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Créez le <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">CV parfait</span> en moins de 5 minutes.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Démarquez-vous avec des modèles professionnels et modernes. Obtenez un Score ATS de 100% grâce à notre jauge en direct et exportez en PDF Haute Qualité gratuitement.
              </motion.p>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/create" className="group relative overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FilePlus2 className="w-5 h-5 relative z-10 group-hover:text-white" />
                  <span className="relative z-10 group-hover:text-white">Créer mon CV maintenant</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolio" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-700 transition-all hover:scale-105 hover:shadow-indigo-500/20">
                  <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Créer un Portfolio
                </Link>
                <Link to="/lettre-motivation" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-105">
                  <PenLine className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                  Lettre de motivation
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> Export PDF HD</span>
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> 100 Modèles Pros</span>
                <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-amber-500 bg-amber-100 dark:bg-amber-900/30 rounded-full p-1" /> Magie IA Intégrée</span>
                <span className="flex items-center gap-2"><Star className="w-5 h-5 text-purple-500 bg-purple-100 dark:bg-purple-900/30 rounded-full p-1" /> Score ATS en Direct</span>
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
                  <img src="/executive_slate_preview.png" alt="Aperçu du CV" className="w-full h-auto rounded-2xl shadow-inner border border-slate-200/50 dark:border-slate-800/50 object-cover" style={{ maxHeight: '600px' }} />
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
              <span className="text-xl font-black text-slate-300 dark:text-slate-700 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">✨ RÉDACTION IA</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">🎯 SCORE ATS 100%</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">EXPORT PDF HD</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* GALERIE SECTION */}
      <TemplateGallery />

      {/* SEO & CONTENT SECTION (Crucial for AdSense & Google Ranking) */}
      <section className="bg-white dark:bg-slate-900 py-24 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate dark:prose-invert mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Pourquoi choisir Mon CV Go pour créer un CV gratuit en ligne ?</h2>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              La recherche d'emploi est une étape cruciale dans la vie de tout professionnel. Que vous soyez un jeune diplômé à la recherche de votre premier poste, ou un cadre expérimenté souhaitant donner un nouvel élan à votre carrière, <strong>votre Curriculum Vitae (CV) est votre passeport pour l'entretien</strong>. Mon CV Go a été pensé et développé pour vous offrir la meilleure expérience de création de CV gratuit en ligne.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Nouveautés : Génération IA & Score ATS Intégrés</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Pour vous donner un avantage déloyal face aux autres candidats, Mon CV Go intègre désormais deux fonctionnalités de pointe :
            </p>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 mb-6">
              <li className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-slate-900 dark:text-white">La Magie IA (Génération de contenu) :</strong> Vous manquez d'inspiration ? Cliquez sur le bouton "Magie IA" et laissez notre intelligence artificielle rédiger à votre place un résumé de profil percutant ou des descriptions d'expériences parfaitement formulées avec des verbes d'action.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-slate-900 dark:text-white">La Jauge de Score ATS en direct :</strong> Découvrez instantanément l'efficacité de votre CV ! Notre jauge calcule votre score en temps réel et vous donne des recommandations précises (ajouter des compétences, allonger la description, etc.) pour vous assurer de passer les filtres des logiciels de recrutement (Applicant Tracking Systems).
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">L'importance d'un modèle de CV moderne et optimisé ATS</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Aujourd'hui, la majorité des grandes entreprises et cabinets de recrutement utilisent des logiciels de suivi de candidatures, appelés <strong>ATS (Applicant Tracking Systems)</strong>. Ces logiciels scannent automatiquement votre document à la recherche de mots-clés spécifiques avant même qu'un recruteur humain ne pose les yeux dessus. Nos modèles de CV ont été conçus non seulement pour être esthétiquement parfaits, mais surtout pour être lisibles et compréhensibles par ces algorithmes.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 my-10">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Nos 3 piliers pour un CV réussi :</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400 list-disc pl-6">
                <li><strong>La clarté visuelle :</strong> Une hiérarchie de l'information respectée avec des polices professionnelles qui guident l'œil du recruteur vers vos compétences clés.</li>
                <li><strong>La pertinence du contenu :</strong> Des rubriques bien définies (Profil, Expériences, Formations, Compétences) que vous pouvez facilement personnaliser et ordonner.</li>
                <li><strong>L'export PDF Haute Qualité :</strong> Contrairement au format Word, l'export PDF garantit que votre mise en page restera exactement la même, quel que soit l'ordinateur ou le smartphone utilisé par le recruteur.</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Plus qu'un simple générateur de CV en ligne</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Nous savons que le CV seul ne suffit parfois pas. C'est pourquoi Mon CV Go intègre également un module de création de <strong>Lettre de Motivation</strong> et un outil novateur pour générer un <strong>Portfolio visuel</strong>. Pour les métiers du web, du design, de l'architecture ou de la communication, pouvoir montrer ses réalisations concrètes en un clic est un avantage indéniable.
            </p>

            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Toutes vos données restent privées et sécurisées. La génération de votre document se fait directement dans votre navigateur web, ce qui garantit que vos informations personnelles ne sont pas stockées sur des serveurs tiers de manière non sécurisée. C'est l'engagement de Mon CV Go : vous fournir un service gratuit, rapide et respectueux de votre vie privée.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Comment créer un CV professionnel en 3 étapes simples ?</h3>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold rounded-full flex items-center justify-center text-xl mb-4">1</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Choisissez un modèle</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Explorez notre galerie de designs professionnels et sélectionnez celui qui correspond à votre secteur d'activité.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold rounded-full flex items-center justify-center text-xl mb-4">2</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Remplissez vos infos</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Ajoutez vos expériences, diplômes et compétences via notre interface simple. Observez l'aperçu se mettre à jour en temps réel.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold rounded-full flex items-center justify-center text-xl mb-4">3</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Téléchargez en PDF</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Un clic suffit pour obtenir votre document final en PDF Haute Définition, prêt à être envoyé aux recruteurs.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">L'avantage d'un Portfolio en ligne</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              De plus en plus de recruteurs recherchent des preuves visuelles de vos compétences. Un CV classique est essentiel, mais un <strong>Portfolio</strong> fait la différence. Notre outil exclusif vous permet de transformer vos projets en un site de présentation élégant sous format PDF. C'est l'arme secrète des designers, développeurs, architectes et professionnels du marketing pour illustrer concrètement leur valeur ajoutée.
            </p>

            <div className="mt-12 text-center">
              <Link to="/conseils-cv" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                Découvrez tous nos conseils d'experts pour rédiger un CV parfait &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
