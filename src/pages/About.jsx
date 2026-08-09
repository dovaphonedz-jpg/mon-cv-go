import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Heart, ShieldCheck, Zap, Users, MessageSquare, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function About() {
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

  const features = [
    {
      title: t('about.feat_1_title'),
      description: t('about.feat_1_desc'),
      icon: <Heart className="w-6 h-6 text-rose-500" />
    },
    {
      title: t('about.feat_2_title'),
      description: t('about.feat_2_desc'),
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
    },
    {
      title: t('about.feat_3_title'),
      description: t('about.feat_3_desc'),
      icon: <Code2 className="w-6 h-6 text-blue-500" />
    },
    {
      title: t('about.feat_4_title'),
      description: t('about.feat_4_desc'),
      icon: <Zap className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <>
    <SEO title={t('about.seo_title')} description={t('about.seo_desc')} url="https://moncvgo.com/a-propos" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] relative overflow-hidden pb-24">
      
      {/* Decorative background glow */}
      <div className="absolute top-[-10%] rtl:-left-[5%] ltr:-right-[5%] w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] rtl:-right-[5%] ltr:-left-[5%] w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-28 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border brutal-shadow mb-6 transform -rotate-2">
            <Sparkles className="w-4 h-4 text-slate-900" />
            {t('about.badge')}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-6">
            {t('about.title_1')}<span className="bg-cyan-400 text-slate-900 px-3 py-1 ml-2 brutal-border transform rotate-2 inline-block">{t('about.title_highlight')}</span>
          </h1>
          <p className="mt-8 text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed max-w-2xl mx-auto">
            {t('about.p1')}
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
              className={`p-8 brutal-border brutal-shadow transition-smooth brutal-hover text-slate-900 ${
                idx % 4 === 0 ? 'bg-yellow-400 transform -rotate-1' :
                idx % 4 === 1 ? 'bg-cyan-400 transform rotate-2' :
                idx % 4 === 2 ? 'bg-pink-400 transform -rotate-2' :
                'bg-white transform rotate-1'
              }`}
            >
              <div className="w-16 h-16 bg-white brutal-border brutal-shadow flex items-center justify-center mb-6 transform -rotate-3">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{feature.title}</h3>
              <p className="font-bold leading-relaxed text-sm text-slate-800">
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
          className="bg-slate-900 brutal-border brutal-shadow-lg p-8 sm:p-12 text-center text-white relative transform rotate-1"
        >
          {/* Decorative blocks */}
          <div className="absolute top-0 rtl:left-0 ltr:right-0 w-32 h-32 bg-yellow-400 brutal-border -mt-10 -mr-10 transform rotate-12 z-0"></div>
          <div className="absolute bottom-0 rtl:right-0 ltr:left-0 w-24 h-24 bg-pink-400 brutal-border -mb-8 -ml-8 transform -rotate-6 z-0"></div>
          
          <div className="w-20 h-20 bg-cyan-400 brutal-border brutal-shadow flex items-center justify-center mx-auto mb-8 relative z-10 transform -rotate-3">
            <Users className="w-10 h-10 text-slate-900" strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tight mb-6 relative z-10">{t('about.story_title')}</h2>
          <p className="text-slate-300 font-bold leading-relaxed text-xl relative z-10 max-w-2xl mx-auto">
            {t('about.story_p1')}
          </p>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border brutal-shadow mb-6 transform rotate-2">
            <MessageSquare className="w-4 h-4 text-slate-900" />
            {t('about.testimonials_title', 'Témoignages')}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: 1, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
            { num: 2, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
            { num: 3, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" }
          ].map(({num, img}) => (
            <motion.div 
              key={num}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`bg-white dark:bg-slate-800 p-8 brutal-border brutal-shadow-lg transform transition-transform hover:-translate-y-2 ${
                num === 1 ? '-rotate-1' : num === 2 ? 'rotate-2' : '-rotate-2'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden brutal-border flex-shrink-0">
                  <img src={img} alt={t(`about.test_${num}_name`)} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{t(`about.test_${num}_name`)}</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t(`about.test_${num}_role`)}</p>
                  <div className="flex gap-1 text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                "{t(`about.test_${num}_text`)}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
    </>
  );
}
