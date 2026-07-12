import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Heart, ShieldCheck, Zap, Users } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
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

  const features = [
    {
      title: "100% Gratuit",
      description: "Pas d'abonnement caché, pas de filigrane. Vous générez, vous téléchargez. C'est aussi simple que ça.",
      icon: <Heart className="w-6 h-6 text-rose-500" />
    },
    {
      title: "Confidentialité Absolue",
      description: "Vos données restent dans votre navigateur. Rien n'est envoyé sur nos serveurs. Vous êtes seul maître de vos informations.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Technologie de Pointe",
      description: "Construit avec les dernières technologies web (React, Tailwind) pour vous offrir une expérience fluide, rapide et sans bugs.",
      icon: <Code2 className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Génération Instantanée",
      description: "Pas de temps d'attente. Votre document est généré en direct à chaque modification que vous apportez.",
      icon: <Zap className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <>
    <SEO title="À Propos" description="Découvrez l'histoire de Mon CV Go, le générateur de CV gratuit et respectueux de la vie privée." url="https://mon-cv-go.com/a-propos" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] relative overflow-hidden pb-24">
      
      {/* Decorative background glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-28 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider border border-emerald-200 dark:border-emerald-800 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Notre Mission
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Réinventer la création de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">votre carrière</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Nous croyons que chaque talent mérite d'être mis en lumière sans avoir à payer des abonnements exorbitants. Mon CV Go a été conçu pour démocratiser l'accès à des outils professionnels de candidature.
          </p>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Story / About Team */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 sm:p-12 text-center text-white shadow-2xl overflow-hidden relative"
        >
          {/* Decorative rings */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 border-[40px] border-white/5 rounded-full blur-[2px]"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 border-[50px] border-white/5 rounded-full blur-[2px]"></div>
          
          <Users className="w-12 h-12 text-blue-200 mx-auto mb-6 relative z-10" />
          <h2 className="text-3xl font-extrabold mb-6 relative z-10">L'histoire du projet</h2>
          <p className="text-blue-100 leading-relaxed text-lg relative z-10 max-w-2xl mx-auto">
            Mon CV Go est né d'un constat simple : il est difficile de trouver un outil de création de CV qui soit à la fois totalement gratuit, respectueux de la vie privée, et offrant un rendu véritablement premium. Ce projet open-source vise à combler ce vide en offrant un standard de qualité élevé, accessible à tous.
          </p>
        </motion.div>
      </section>

    </div>
    </>
  );
}
