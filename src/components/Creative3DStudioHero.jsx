import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, FilePlus2, Briefcase, CheckCircle2, Zap, Eye, RefreshCw, Wand2, Layers, Cpu, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Creative3DStudioHero({ t }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [typedTitle, setTypedTitle] = useState('');

  // Parallax motion springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const logoRotateZ = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const glowX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);

  // Canvas particle field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? '#facc15' : '#ec4899',
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.7 + 0.3
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

  const templates = [
    { id: 'modern', name: 'Design Moderne', color: 'from-pink-500 to-purple-600', img: '/mockup1.webp' },
    { id: 'executive', name: 'Cadre & Électron', color: 'from-cyan-500 to-blue-600', img: '/executive_slate_preview.webp' },
    { id: 'creative', name: 'Créatif Studio', color: 'from-yellow-400 to-amber-500', img: '/new_flow_preview.webp' }
  ];

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
      className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white select-none brutal-border border-b-8 shadow-2xl"
      style={{ perspective: 1200 }}
      id="accueil"
    >
      {/* Canvas Interactive Particle Field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Dynamic Laser Spotlight */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen transition-opacity"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(250, 204, 21, 0.45) 0%, rgba(236, 72, 153, 0.4) 30%, rgba(59, 130, 246, 0.3) 60%, transparent 80%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              
              {/* Neo-Brutalist Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 border-2 border-yellow-400 brutal-border brutal-shadow text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-6 transform -rotate-1 backdrop-blur-md">
                <Wand2 className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>STUDIO DE CRÉATION 3D & IA • MONCVGO</span>
              </motion.div>
              
              {/* Main Animated Title */}
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.05] mb-6">
                CRÉEZ VOTRE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 drop-shadow-[0_4px_12px_rgba(250,204,21,0.3)]">
                  CV PARFAIT
                </span> <br />
                EN 2 MINUTES.
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                variants={itemVariants} 
                className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 font-bold leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t ? t('home.subtitle') : 'Des modèles modernes prêts à l\'emploi, optimisation IA et exportation instantanée PDF & DOCX.' }}
              >
              </motion.p>

              {/* Interactive 3D Template Selector Tabs */}
              <motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-yellow-400" /> Styles 3D :
                </span>
                {templates.map(tmpl => (
                  <button
                    key={tmpl.id}
                    onClick={() => setActiveTemplate(tmpl.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                      activeTemplate === tmpl.id 
                        ? 'bg-gradient-to-r ' + tmpl.color + ' text-white border-white shadow-lg scale-105' 
                        : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span>{tmpl.name}</span>
                  </button>
                ))}
              </motion.div>
              
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
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-slate-300">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Gratuit & Illimité</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-300" /> Compatible ATS</span>
                <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-pink-400" /> Optimisation IA Gemini</span>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Column: CREATIVE 3D KINETIC HOLOGRAM SHOWCASE */}
          <div className="lg:col-span-5 w-full relative flex justify-center items-center py-4">
            
            <motion.div 
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              onClick={triggerConfetti}
              className="relative w-full max-w-md bg-slate-950/90 rounded-3xl p-6 sm:p-8 border-4 border-yellow-400/60 shadow-2xl shadow-yellow-500/20 backdrop-blur-xl flex flex-col items-center group cursor-pointer"
            >
              {/* Glowing Floor Hologram Ring */}
              <div className="absolute -bottom-8 w-72 sm:w-96 h-16 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 rounded-[100%] blur-xl opacity-90 animate-pulse pointer-events-none" />

              {/* Central 3D Floating Logo Core */}
              <motion.div 
                style={{
                  rotateZ: logoRotateZ,
                  transform: "translateZ(80px)"
                }}
                animate={{ y: [-12, 12, -12], scale: [1, 1.04, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-full mb-6 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-yellow-400 shadow-2xl flex flex-col items-center justify-center group-hover:border-yellow-300 transition-colors brutal-shadow"
              >
                <img 
                  src="/logo-brutal.png" 
                  alt="MonCVGo Logo 3D" 
                  className="w-full max-w-[240px] h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(250,204,21,0.4)] group-hover:scale-105 transition-transform duration-500"
                />

                <div className="mt-3 px-3 py-1 bg-yellow-400 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-full flex items-center gap-1.5 border border-slate-950">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hologramme 3D Actif</span>
                </div>
              </motion.div>

              {/* Dynamic Live 3D Template Hologram Preview */}
              <div className="relative z-10 w-full h-44 rounded-xl overflow-hidden border-2 border-slate-800 bg-slate-900/90 p-2 shadow-inner">
                <AnimatePresence mode="wait">
                  {templates.map(tmpl => tmpl.id === activeTemplate && (
                    <motion.div
                      key={tmpl.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-lg"
                    >
                      <img src={tmpl.img} alt={tmpl.name} className="w-full h-full object-cover rounded-lg opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                        <span className="text-xs font-black text-yellow-300 uppercase tracking-wider bg-slate-950/80 px-3 py-1 rounded-md border border-yellow-400/40">
                          {tmpl.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Floating 3D Badge 1 */}
              <motion.div 
                style={{ transform: "translateZ(100px)" }}
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 sm:-left-5 bg-slate-950 border-2 border-emerald-400 text-emerald-300 text-xs font-black px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% ATS Ready</span>
              </motion.div>

              {/* Floating 3D Badge 2 */}
              <motion.div 
                style={{ transform: "translateZ(105px)" }}
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute top-4 -right-3 sm:-right-5 bg-slate-950 border-2 border-pink-400 text-pink-300 text-xs font-black px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-pink-400" />
                <span>Export PDF Instant</span>
              </motion.div>

              {/* Trigger Confetti Button */}
              <motion.button 
                onClick={triggerConfetti}
                style={{ transform: "translateZ(110px)" }}
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 hover:scale-110 transition-transform cursor-pointer border-2 border-yellow-200"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Tester la Magie 3D ! ✨</span>
              </motion.button>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
