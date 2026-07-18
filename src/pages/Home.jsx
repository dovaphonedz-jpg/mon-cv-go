import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, PenLine, Check, ArrowRight, Star, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import TemplateGallery from '../components/TemplateGallery';
import AdSenseUnit from '../components/AdSenseUnit';

export default function Home() {
  const { t } = useTranslation();

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
    <SEO title={t('home.seo_title')} description={t('home.seo_desc')} />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen overflow-hidden selection:bg-indigo-500/30">
      
      {/* HERO SECTION - Neo-Brutalist & Vibrant */}
      <section className="relative pt-24 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-slate-100 dark:bg-slate-900 brutal-border border-b-8" id="accueil">
        
        {/* Playful Asymmetric Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-48 -left-24 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-24 left-1/2 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Dynamic CV Background (Original Clean Version) */}
        <div className="absolute inset-0 z-0 opacity-60 dark:opacity-30 pointer-events-none flex gap-6 px-4 transform -rotate-6 scale-110 -translate-y-24 -translate-x-12 sm:-translate-x-4">
          {/* Column 1 - Scrolling Down */}
          <div className="flex flex-col gap-6 animate-scroll-down w-1/3 max-w-[300px]">
            <img src="/mockup1.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/mockup2.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/mockup3.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/mockup1.png" alt="" className="w-full rounded-lg shadow-lg" />
          </div>
          {/* Column 2 - Scrolling Up */}
          <div className="flex flex-col gap-6 animate-scroll-up w-1/3 max-w-[300px] mt-24">
            <img src="/mockup4.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/mockup5.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/mockup6.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/mockup4.png" alt="" className="w-full rounded-lg shadow-lg" />
          </div>
          {/* Column 3 - Scrolling Down */}
          <div className="hidden sm:flex flex-col gap-6 animate-scroll-down w-1/3 max-w-[300px]">
            <img src="/executive_slate_preview.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/reference_preview.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/new_flow_preview.png" alt="" className="w-full rounded-lg shadow-lg" />
            <img src="/executive_slate_preview.png" alt="" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-yellow-50/40 via-yellow-50/80 to-yellow-50 dark:from-slate-900/60 dark:via-slate-900/90 dark:to-slate-900"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 bg-white dark:bg-slate-800 brutal-border brutal-shadow text-slate-900 dark:text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-6 sm:mb-8 transform -rotate-2">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink-500 animate-pulse"></span>
              {t('home.badge')}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.95] sm:leading-[0.9] mb-6 sm:mb-8">
              {t('home.title_1')}<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-sm">{t('home.title_highlight')}</span> <br className="hidden sm:block" />{t('home.title_2')}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-2xl md:text-3xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10 sm:mb-12 font-bold leading-snug">
              {t('home.subtitle')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link to="/create" className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-yellow-400 dark:bg-yellow-400 text-slate-900 font-black uppercase tracking-widest text-lg sm:text-xl brutal-border brutal-shadow transition-smooth brutal-hover brutal-active flex items-center justify-center gap-3 transform rotate-1">
                <FilePlus2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                {t('home.btn_create')}
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-cyan-400 dark:bg-cyan-400 text-slate-900 font-black uppercase tracking-widest text-lg sm:text-xl brutal-border brutal-shadow transition-smooth brutal-hover brutal-active flex items-center justify-center gap-3 transform -rotate-1">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                {t('home.btn_portfolio')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AdSenseUnit />

      {/* INFINITE SCROLLING MARQUEE */}
      <div className="w-full bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 items-center px-8 rtl:flex-row-reverse"
        >
          {/* Repeat multiple times for continuous scrolling */}
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">{t('home.marquee_1')}</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">{t('home.marquee_2')}</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{t('home.marquee_3')}</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">{t('home.marquee_4')}</span>
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{t('home.why_title')}</h2>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.why_p1') }}></p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">{t('home.news_title')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{t('home.news_p1')}</p>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 mb-6">
              <li className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-slate-900 dark:text-white">{t('home.news_ai_title')}</strong>{t('home.news_ai_desc')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-slate-900 dark:text-white">{t('home.news_ats_title')}</strong>{t('home.news_ats_desc')}
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">{t('home.ats_title')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.ats_p1') }}></p>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 my-10">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('home.pillars_title')}</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400 list-disc ltr:pl-6 rtl:pr-6">
                <li><strong className="font-bold">{t('home.pillar_1_title')}</strong>{t('home.pillar_1_desc')}</li>
                <li><strong className="font-bold">{t('home.pillar_2_title')}</strong>{t('home.pillar_2_desc')}</li>
                <li><strong className="font-bold">{t('home.pillar_3_title')}</strong>{t('home.pillar_3_desc')}</li>
              </ul>
            </div>

            <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-20 mb-8 uppercase tracking-tighter">{t('home.more_title')}</h3>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-6 font-bold" dangerouslySetInnerHTML={{ __html: t('home.more_p1') }}></p>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-16 font-bold">{t('home.more_p2')}</p>

            {/* Brutalist Asymmetric Grid */}
            <div className="grid lg:grid-cols-3 gap-10 mt-12 mb-32 text-left">
              
              <motion.div 
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="p-8 bg-pink-400 brutal-border brutal-shadow text-slate-900 transform -rotate-3 hover:rotate-0 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-white brutal-border brutal-shadow flex items-center justify-center mb-8 transform rotate-6">
                  <FilePlus2 className="w-8 h-8 text-slate-900" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{t('home.step_1_title')}</h3>
                <p className="font-bold text-lg leading-snug">{t('home.step_1_desc')}</p>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                initial={{ opacity: 0, y: 50, rotate: 10 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                className="p-8 bg-yellow-400 brutal-border brutal-shadow text-slate-900 transform rotate-2 hover:rotate-0 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-white brutal-border brutal-shadow flex items-center justify-center mb-8 transform -rotate-6">
                  <Check className="w-8 h-8 text-slate-900" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{t('home.step_2_title')}</h3>
                <p className="font-bold text-lg leading-snug">{t('home.step_2_desc')}</p>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
                className="p-8 bg-cyan-400 brutal-border brutal-shadow text-slate-900 transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-white brutal-border brutal-shadow flex items-center justify-center mb-8 transform rotate-3">
                  <Briefcase className="w-8 h-8 text-slate-900" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{t('home.step_3_title')}</h3>
                <p className="font-bold text-lg leading-snug">{t('home.step_3_desc')}</p>
              </motion.div>

            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">{t('home.portfolio_title')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.portfolio_p1') }}></p>

            <div className="mt-12 text-center">
              <Link to="/conseils-cv" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                {t('home.link_tips')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
