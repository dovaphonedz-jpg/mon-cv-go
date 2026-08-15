import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, FilePlus2, Briefcase, CheckCircle2, Zap, FileText, Award, ShieldCheck, Star, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Clean3DHeroShowcase({ t }) {
  const containerRef = useRef(null);

  // Parallax motion springs for smooth 3D tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  
  const charTranslateX = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const charTranslateY = useTransform(mouseY, [-0.5, 0.5], [-18, 18]);

  const glowX = useTransform(mouseX, [-0.5, 0.5], ['15%', '85%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['15%', '85%']);

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

  const triggerConfetti = (e) => {
    e.stopPropagation();
    confetti({
      particleCount: 120,
      spread: 85,
      origin: { y: 0.5 }
    });
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
      className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-950 to-slate-950 text-white select-none brutal-border border-b-8 select-none"
      style={{ perspective: 1200 }}
      id="accueil"
    >
      {/* Dynamic Ambient Background Spotlight */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen transition-opacity"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(59, 130, 246, 0.95) 0%, rgba(236, 72, 153, 0.5) 40%, rgba(15, 23, 42, 0.98) 75%)`
        }}
      />

      {/* Decorative Ambient Mesh Grid & Glow Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/25 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-80 h-80 bg-pink-500/25 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-blue-400/40 rounded-full brutal-shadow text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-6 backdrop-blur-md transform -rotate-1">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                <span>{t ? t('home.badge') : '🚀 CRÉATEUR DE CV PRO & IA'}</span>
              </motion.div>
              
              {/* Main Headline */}
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.05] mb-6 drop-shadow-lg">
                {t ? t('home.title_1') : 'CRÉEZ VOTRE CV'}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 drop-shadow-md">
                  {t ? t('home.title_highlight') : 'EN 2 MINUTES'}
                </span> <br />
                {t ? t('home.title_2') : 'GRATUITEMENT'}
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                variants={itemVariants} 
                className="text-lg sm:text-xl md:text-2xl text-blue-100/90 max-w-2xl mx-auto lg:mx-0 mb-10 font-bold leading-relaxed drop-shadow"
                dangerouslySetInnerHTML={{ __html: t ? t('home.subtitle') : 'Des modèles modernes prêts à l\'emploi, optimisation IA et exportation instantanée PDF & DOCX.' }}
              >
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link 
                  to="/create" 
                  className="w-full sm:w-auto px-8 py-5 bg-yellow-400 text-slate-950 font-black uppercase tracking-widest text-lg sm:text-xl brutal-border brutal-shadow transition-smooth hover:bg-yellow-300 active:scale-95 flex items-center justify-center gap-3 transform rotate-1 shadow-2xl"
                >
                  <FilePlus2 className="w-6 h-6" strokeWidth={3} />
                  {t ? t('home.btn_create') : 'CRÉER MON CV'}
                </Link>
                
                <Link 
                  to="/portfolio" 
                  className="w-full sm:w-auto px-8 py-5 bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-lg sm:text-xl brutal-border brutal-shadow transition-smooth hover:bg-cyan-300 active:scale-95 flex items-center justify-center gap-3 transform -rotate-1 shadow-2xl"
                >
                  <Briefcase className="w-6 h-6" strokeWidth={3} />
                  {t ? t('home.btn_portfolio') : 'PORTFOLIO WEB'}
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-blue-200/90">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Gratuit & Illimité</span>
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 4.9/5 satisfaction</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-300" /> Format PDF & DOCX</span>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Column: 3D CHARACTER HOLDING CV WITH FLOATING BADGES (NO BOX) */}
          <div className="lg:col-span-5 w-full relative flex justify-center items-center py-6">
            
            <motion.div 
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              onClick={triggerConfetti}
              className="relative w-full max-w-md h-[400px] sm:h-[460px] flex justify-center items-center cursor-pointer group"
            >
              
              {/* Floor Spotlight Glow Ring beneath 3D Character */}
              <div className="absolute bottom-2 w-72 sm:w-96 h-16 bg-gradient-to-r from-cyan-400/40 via-yellow-400/50 to-pink-500/40 rounded-[100%] blur-xl opacity-90 animate-pulse pointer-events-none" />

              {/* 3D CHARACTER HOLDING CV (FLOATING FREELY - NO BOX) */}
              <motion.div
                style={{
                  x: charTranslateX,
                  y: charTranslateY,
                  transform: "translateZ(75px)"
                }}
                animate={{ 
                  y: [-14, 14, -14],
                  rotateZ: [-2, 2, -2],
                  scale: [1, 1.04, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ scale: 1.08 }}
                className="relative z-10 w-72 sm:w-88 h-72 sm:h-88 rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400/70 p-2 bg-slate-950/70 backdrop-blur-md group-hover:border-yellow-300 transition-colors shadow-cyan-500/30"
              >
                <img 
                  src="/hero-3d-avatar.jpg" 
                  alt="Personnage 3D Tenant un CV MonCVGo" 
                  className="w-full h-full object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Yellow Badge Seal on Image */}
                <div className="absolute top-4 left-4 bg-yellow-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-lg border-2 border-slate-950 brutal-shadow flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>CV Pro En Main</span>
                </div>
              </motion.div>

              {/* Orbiting Floating Skill Badge 1 (Top Left) */}
              <motion.div 
                style={{ transform: "translateZ(95px)" }}
                animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-2 -left-4 sm:-left-10 bg-slate-950/95 border-2 border-emerald-400 text-emerald-300 text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 backdrop-blur-md"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Compatible ATS</span>
              </motion.div>

              {/* Orbiting Floating Skill Badge 2 (Top Right) */}
              <motion.div 
                style={{ transform: "translateZ(100px)" }}
                animate={{ y: [8, -8, 8], rotate: [2, -2, 2] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-8 -right-4 sm:-right-10 bg-slate-950/95 border-2 border-pink-400 text-pink-300 text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 backdrop-blur-md"
              >
                <Cpu className="w-4 h-4 text-pink-400" />
                <span>Génération IA 2026</span>
              </motion.div>

              {/* Orbiting Floating Skill Badge 3 (Bottom Left) */}
              <motion.div 
                style={{ transform: "translateZ(105px)" }}
                animate={{ y: [-6, 6, -6], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-6 -left-4 sm:-left-8 bg-slate-950/95 border-2 border-cyan-400 text-cyan-300 text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 backdrop-blur-md"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Export PDF & DOCX</span>
              </motion.div>

              {/* Interactive Confetti Button (Bottom Right) */}
              <motion.button 
                onClick={triggerConfetti}
                style={{ transform: "translateZ(110px)" }}
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 hover:scale-110 transition-transform cursor-pointer border-2 border-yellow-200"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Fêter avec confettis ! ✨</span>
              </motion.button>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
