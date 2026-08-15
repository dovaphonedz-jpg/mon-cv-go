import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FilePlus2, Briefcase, Check, Zap, Cpu, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CleanHeroNoAnimation({ t }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Smooth mouse tracking for ambient light spotlight & 3D parallax tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);

  const glowX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);

  // Particle Canvas Background
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
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#facc15' : '#ec4899',
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      alpha: Math.random() * 0.6 + 0.3
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
        ctx.shadowBlur = 8;
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
      particleCount: 110,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-14 pb-12 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white select-none brutal-border border-b-8 shadow-2xl"
      style={{ perspective: 1200 }}
      id="accueil"
    >
      {/* Particle Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Ambient Spotlight */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-75 mix-blend-screen transition-opacity"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(250, 204, 21, 0.45) 0%, rgba(236, 72, 153, 0.35) 30%, rgba(59, 130, 246, 0.25) 60%, transparent 80%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              
              {/* Main Headline */}
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[1.08] sm:leading-[1.05] mb-4 sm:mb-6">
                CRÉEZ VOTRE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 drop-shadow-[0_4px_12px_rgba(250,204,21,0.3)]">
                  CV PARFAIT
                </span> <br />
                EN 2 MINUTES.
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                variants={itemVariants} 
                className="text-base sm:text-xl md:text-2xl text-slate-300 mb-6 sm:mb-8 font-bold leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Créez un CV professionnel gratuitement.
              </motion.p>

              {/* Bullet Point Features */}
              <motion.ul variants={itemVariants} className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 text-slate-200 font-bold text-sm sm:text-base md:text-lg max-w-lg mx-auto lg:mx-0">
                <li className="flex items-center gap-2.5 sm:gap-3 justify-center lg:justify-start">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 stroke-[3] shrink-0" />
                  <span>Plus de 50 modèles modernes.</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3 justify-center lg:justify-start">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 stroke-[3] shrink-0" />
                  <span>Téléchargement PDF.</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3 justify-center lg:justify-start">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 stroke-[3] shrink-0" />
                  <span>Compatible ATS.</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3 justify-center lg:justify-start">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 stroke-[3] shrink-0" />
                  <span>Sans inscription.</span>
                </li>
              </motion.ul>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center lg:justify-start items-center mb-8 sm:mb-10">
                <Link 
                  to="/create" 
                  className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-5 bg-yellow-400 text-slate-950 font-black uppercase tracking-widest text-base sm:text-lg md:text-xl brutal-border brutal-shadow transition-smooth hover:bg-yellow-300 active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 transform rotate-1 shadow-2xl"
                >
                  <FilePlus2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                  CRÉER MON CV GRATUITEMENT
                </Link>
                
                <Link 
                  to="/portfolio" 
                  className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-5 bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-base sm:text-lg md:text-xl brutal-border brutal-shadow transition-smooth hover:bg-cyan-300 active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 transform -rotate-1 shadow-2xl"
                >
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                  CRÉER UN PORTFOLIO
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-slate-300">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400 shrink-0" /> 100% Gratuit & Illimité</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" /> Compatible ATS</span>
                <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-pink-400 shrink-0" /> Optimisation IA Gemini</span>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Column: Floating Signature Yellow GO Badge (Clickable Link to /create) */}
          <div className="lg:col-span-5 w-full flex justify-center items-center relative py-4 sm:py-6">
            <Link to="/create" onClick={triggerConfetti} className="group relative flex flex-col items-center justify-center cursor-pointer">
              <motion.div 
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d"
                }}
                className="relative flex flex-col items-center justify-center cursor-pointer"
              >
                {/* Floor Spotlight Glow under floating GO badge */}
                <div className="absolute -bottom-6 w-56 sm:w-80 h-14 bg-gradient-to-r from-yellow-400/40 via-amber-400/50 to-pink-500/40 rounded-[100%] blur-xl opacity-90 animate-pulse pointer-events-none" />

                {/* The Signature GO Yellow Badge (Floating Freely, Link to /create) */}
                <motion.div
                  animate={{ 
                    y: [-12, 12, -12],
                    rotateZ: [2, 5, 2],
                    scale: [1, 1.04, 1]
                  }}
                  transition={{ 
                    duration: 3.6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ scale: 1.12, rotateZ: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 bg-yellow-400 text-slate-950 font-black text-5xl sm:text-7xl lg:text-8xl px-6 sm:px-10 lg:px-12 py-4 sm:py-6 lg:py-8 rounded-2xl brutal-border shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-[10px_10px_0px_0px_rgba(250,204,21,1)] transition-all transform rotate-3 flex items-center justify-center tracking-tighter cursor-pointer select-none"
                >
                  GO
                  
                  {/* Glossy Reflection Highlight */}
                  <div className="absolute top-2 right-3 sm:right-4 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white/40 rounded-full blur-[1px]" />
                </motion.div>

                {/* Floating Micro Badge under GO */}
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-4 sm:mt-6 px-3.5 py-1.5 bg-slate-900/90 border border-yellow-400/60 text-yellow-300 font-bold text-[11px] sm:text-xs rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cliquez pour Créer votre CV ! 🚀</span>
                </motion.div>

              </motion.div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
