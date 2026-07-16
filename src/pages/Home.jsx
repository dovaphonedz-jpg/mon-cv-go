import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, PenLine, Check, ArrowRight, Star, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import TemplateGallery from '../components/TemplateGallery';

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
              className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left rtl:lg:text-right"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider border border-indigo-200 dark:border-indigo-500/30 mb-6 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                {t('home.badge')}
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {t('home.title_1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">{t('home.title_highlight')}</span>{t('home.title_2')}
              </motion.h1>
              
              <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('home.subtitle')}
              </motion.p>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start rtl:lg:justify-start">
                <Link to="/create" className="group relative overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FilePlus2 className="w-5 h-5 relative z-10 group-hover:text-white" />
                  <span className="relative z-10 group-hover:text-white">{t('home.btn_create')}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white rtl:-scale-x-100 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolio" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-700 transition-all hover:scale-105 hover:shadow-indigo-500/20">
                  <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {t('home.btn_portfolio')}
                </Link>
                <Link to="/lettre-motivation" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-105">
                  <PenLine className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                  {t('home.btn_letter')}
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> {t('home.feat_pdf')}</span>
                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1" /> {t('home.feat_templates')}</span>
                <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-amber-500 bg-amber-100 dark:bg-amber-900/30 rounded-full p-1" /> {t('home.feat_ai')}</span>
                <span className="flex items-center gap-2"><Star className="w-5 h-5 text-purple-500 bg-purple-100 dark:bg-purple-900/30 rounded-full p-1" /> {t('home.feat_ats')}</span>
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
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 p-3 rounded-3xl shadow-2xl transform rtl:rotate-y-[10deg] ltr:rotate-y-[-10deg] rotate-x-[5deg]">
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <span className="bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">{t('home.live')}</span>
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
                  className="absolute -bottom-10 rtl:-right-10 ltr:-left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Check className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{t('home.export_success')}</p>
                    <p className="text-xs text-slate-500">{t('home.export_pdf_hd')}</p>
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

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">{t('home.more_title')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.more_p1') }}></p>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{t('home.more_p2')}</p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">{t('home.steps_title')}</h3>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold rounded-full flex items-center justify-center text-xl mb-4">1</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t('home.step_1_title')}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t('home.step_1_desc')}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold rounded-full flex items-center justify-center text-xl mb-4">2</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t('home.step_2_title')}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t('home.step_2_desc')}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold rounded-full flex items-center justify-center text-xl mb-4">3</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t('home.step_3_title')}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t('home.step_3_desc')}</p>
              </div>
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
