import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FilePlus2, Briefcase, CheckCircle2, Zap, Sparkles, Star, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AppleStyleHero3D({ t }) {
  const containerRef = useRef(null);

  // Mouse parallax motion values for Apple/Stripe style 3D depth
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 25 });

  // 3D rotations for the entire showcase stage
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  
  // Parallax offsets for layered depth (Stripe/Apple effect)
  const layer1X = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);
  const layer1Y = useTransform(mouseY, [-0.5, 0.5], [-25, 25]);

  const layer2X = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const layer2Y = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  const glowX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden bg-slate-900 dark:bg-slate-950 text-white brutal-border border-b-8 select-none"
      style={{ perspective: 1200 }}
      id="accueil"
    >
      {/* Dynamic Glowing Radial Background (Apple Style) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen transition-opacity"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(236, 72, 153, 0.4) 0%, rgba(99, 102, 241, 0.5) 35%, rgba(15, 23, 42, 0.95) 70%)`
        }}
      />

      {/* Decorative Floating Mesh Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute top-48 -left-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800/80 border border-slate-700 brutal-border brutal-shadow text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-6 transform -rotate-1 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <span>{t ? t('home.badge') : '✨ NOUVELLE VERSION 2026 • GÉNÉRATEUR CV PRO'}</span>
              </motion.div>
              
              {/* Main Headline */}
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.05] mb-6">
                {t ? t('home.title_1') : 'CRÉEZ VOTRE CV'}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-sm">
                  {t ? t('home.title_highlight') : 'EN 2 MINUTES'}
                </span> <br />
                {t ? t('home.title_2') : 'GRATUITEMENT'}
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                variants={itemVariants} 
                className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-10 font-bold leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t ? t('home.subtitle') : 'Des modèles modernes prêts à l\'emploi, optimisation IA et exportation instantanée PDF & DOCX.' }}
              >
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link 
                  to="/create" 
                  className="w-full sm:w-auto px-8 py-5 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest text-lg sm:text-xl brutal-border brutal-shadow transition-smooth brutal-hover brutal-active flex items-center justify-center gap-3 transform rotate-1"
                >
                  <FilePlus2 className="w-6 h-6" strokeWidth={3} />
                  {t ? t('home.btn_create') : 'CRÉER MON CV'}
                </Link>
                
                <Link 
                  to="/portfolio" 
                  className="w-full sm:w-auto px-8 py-5 bg-cyan-400 text-slate-900 font-black uppercase tracking-widest text-lg sm:text-xl brutal-border brutal-shadow transition-smooth brutal-hover brutal-active flex items-center justify-center gap-3 transform -rotate-1"
                >
                  <Briefcase className="w-6 h-6" strokeWidth={3} />
                  {t ? t('home.btn_portfolio') : 'PORTFOLIO WEB'}
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-slate-300">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> +50,000 CV créés</span>
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9/5 Avis Utilisateurs</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-400" /> 100% Gratuit & Confidentialité</span>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Column: APPLE / STRIPE STYLE 3D PARALLAX SHOWCASE */}
          <div className="lg:col-span-5 w-full relative flex justify-center items-center py-6">
            
            <motion.div 
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="relative w-full max-w-lg h-[420px] sm:h-[480px] flex justify-center items-center"
            >
              
              {/* Pedestal Ambient Glow Ring */}
              <div className="absolute bottom-2 w-72 sm:w-96 h-16 bg-gradient-to-r from-pink-500/30 via-purple-500/40 to-cyan-500/30 rounded-[100%] blur-xl animate-pulse pointer-events-none" />

              {/* BACK LAYER CARD (CV Mockup 3) */}
              <motion.div 
                style={{
                  x: layer2X,
                  y: layer2Y,
                  transform: "translateZ(10px) rotate(-12deg) scale(0.88)"
                }}
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 left-2 sm:left-6 w-56 sm:w-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-slate-900/90 backdrop-blur-md opacity-85 hover:opacity-100 transition-opacity"
              >
                <img src="/mockup3.webp" alt="CV Template Modern" className="w-full h-auto object-cover rounded-xl" />
              </motion.div>

              {/* MIDDLE LAYER CARD (CV Mockup 2) */}
              <motion.div 
                style={{
                  x: layer1X,
                  y: layer1Y,
                  transform: "translateZ(40px) rotate(8deg) scale(0.94)"
                }}
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-6 right-2 sm:right-6 w-56 sm:w-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-400/50 bg-slate-900/95 backdrop-blur-md"
              >
                <img src="/mockup2.webp" alt="CV Template Executive" className="w-full h-auto object-cover rounded-xl" />
              </motion.div>

              {/* FOREGROUND HERO CARD (Main Interactive CV Mockup 1) */}
              <motion.div 
                style={{
                  transform: "translateZ(80px) rotate(-2deg)"
                }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.06, rotate: 0 }}
                className="relative z-20 w-64 sm:w-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 p-2 brutal-border brutal-shadow hover:border-pink-500 transition-colors cursor-pointer group"
              >
                <img 
                  src="/mockup1.webp" 
                  alt="CV Template MonCVGo Premium" 
                  className="w-full h-auto object-cover rounded-xl shadow-lg group-hover:scale-102 transition-transform duration-500" 
                />

                {/* Floating Interactive Badge on Main Card */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-pink-300/40">
                  <Sparkles className="w-3 h-3" />
                  <span>Modèle Préféré</span>
                </div>
              </motion.div>

              {/* Floating Pill Badge Top-Left */}
              <motion.div 
                style={{ transform: "translateZ(95px)" }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 left-0 sm:left-4 bg-slate-900/95 border border-emerald-400/60 text-emerald-300 font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 backdrop-blur-md"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Export PDF & DOCX</span>
              </motion.div>

              {/* Floating Pill Badge Bottom-Left */}
              <motion.div 
                style={{ transform: "translateZ(105px)" }}
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -bottom-2 left-4 sm:left-10 bg-slate-900/95 border border-yellow-400/60 text-yellow-300 font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 backdrop-blur-md"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>100% Compatible ATS</span>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
