import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, PenLine, Check, ArrowRight, Star, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import TemplateGallery from '../components/TemplateGallery';
import AdSenseUnit from '../components/AdSenseUnit';
import CleanHeroNoAnimation from '../components/CleanHeroNoAnimation';

export default function Home() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } }
  };

  return (
    <>
    <SEO title={t('home.seo_title')} description={t('home.seo_desc')} url="https://moncvgo.com/" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen overflow-hidden selection:bg-indigo-500/30">
      
      {/* HERO SECTION - Clean Layout with Beautiful Particle Grid Background without right-side animation box */}
      <CleanHeroNoAnimation t={t} />

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

      {/* ESPACE EMPLOI PROMO SECTION — Promote new feature & drive traffic */}
      <section className="bg-slate-900 border-y-8 border-slate-900 py-20 overflow-hidden relative" id="espace-emploi">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-400 text-slate-900 font-black uppercase tracking-widest text-xs brutal-border brutal-shadow transform rotate-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></span>
              NOUVEAU
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-6">
              {t('home.job_space_title') || '🚀 Espace Emploi'}
            </h2>
            <p className="text-xl text-slate-300 font-bold max-w-2xl mx-auto leading-relaxed">
              {t('home.job_space_desc') || 'Suivez vos candidatures, analysez des offres d\'emploi et calculez votre salaire. Tout en un seul endroit.'}
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { emoji: '📋', title: t('home.job_space_feat_1') || 'Tracker Kanban', desc: 'Suivez toutes vos candidatures avec des colonnes visuelles : En attente, Envoyé, Entretien, Offre, Refusé.' },
              { emoji: '🔍', title: t('home.job_space_feat_2') || 'Analyse d\'Offres', desc: 'Collez une offre d\'emploi et obtenez une analyse des compétences requises + score de compatibilité avec votre profil.' },
              { emoji: '💰', title: t('home.job_space_feat_3') || 'Calculateur Salaire', desc: 'Estimez votre salaire selon votre métier, votre niveau d\'expérience et votre ville grâce à nos données de marché.' },
            ].map((feat, i) => (
              <div key={i} className="bg-white brutal-border brutal-shadow p-6 transform hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">{feat.emoji}</div>
                <h3 className="text-slate-900 font-black text-lg uppercase tracking-tight mb-3">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/espace-emploi" className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest text-lg brutal-border brutal-shadow transition-smooth brutal-hover brutal-active transform -rotate-1">
              <Briefcase className="w-6 h-6" strokeWidth={3} />
              {t('home.job_space_btn') || 'Explorer l\'Espace Emploi'}
              <ArrowRight className="w-6 h-6" strokeWidth={3} />
            </Link>
            <p className="text-slate-500 text-sm mt-4 font-bold">100% gratuit · Aucune inscription requise</p>
          </div>
        </div>
      </section>

      {/* SEO & CONTENT SECTION (Crucial for AdSense & Google Ranking) */}
      <section className="bg-white dark:bg-slate-900 py-24 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate dark:prose-invert mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{t('home.why_title')}</h2>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.why_p1') }}></p>
            
            <div className="bg-green-300 dark:bg-green-800 p-6 sm:p-8 border-4 border-slate-900 dark:border-white my-10 brutal-shadow transform -rotate-1">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 font-black text-lg text-slate-900 dark:text-white">
                  <span className="text-2xl drop-shadow-sm">✅</span> {t('home.why_list_1') || 'Gratuit'}
                </div>
                <div className="flex items-center gap-3 font-black text-lg text-slate-900 dark:text-white">
                  <span className="text-2xl drop-shadow-sm">✅</span> {t('home.why_list_2') || 'Sans inscription'}
                </div>
                <div className="flex items-center gap-3 font-black text-lg text-slate-900 dark:text-white">
                  <span className="text-2xl drop-shadow-sm">✅</span> {t('home.why_list_3') || 'Compatible ATS'}
                </div>
                <div className="flex items-center gap-3 font-black text-lg text-slate-900 dark:text-white">
                  <span className="text-2xl drop-shadow-sm">✅</span> {t('home.why_list_4') || 'Téléchargement PDF'}
                </div>
                <div className="flex items-center gap-3 font-black text-lg text-slate-900 dark:text-white">
                  <span className="text-2xl drop-shadow-sm">✅</span> {t('home.why_list_5') || 'Modèles modernes'}
                </div>
                <div className="flex items-center gap-3 font-black text-lg text-slate-900 dark:text-white">
                  <span className="text-2xl drop-shadow-sm">✅</span> {t('home.why_list_6') || 'Rapide'}
                </div>
              </div>
            </div>

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

            {/* Guide SEO Étendu */}
            <div className="my-16 border-t border-slate-200 dark:border-slate-800 pt-16">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter">{t('home.guide_title')}</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('home.guide_1_title')}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{t('home.guide_1_desc')}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('home.guide_2_title')}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{t('home.guide_2_desc')}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('home.guide_3_title')}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{t('home.guide_3_desc')}</p>
                </div>
              </div>
            </div>

            {/* Secteurs SEO */}
            <div className="my-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-100 dark:border-slate-700">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter">{t('home.sectors_title')}</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">{t('home.sector_1_title')}</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t('home.sector_1_desc')}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-2">{t('home.sector_2_title')}</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t('home.sector_2_desc')}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">{t('home.sector_3_title')}</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t('home.sector_3_desc')}</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">{t('home.portfolio_title')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.portfolio_p1') }}></p>

            <div className="mt-12 text-center">
              <Link to="/conseils-cv" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                {t('home.link_tips')}
              </Link>
            </div>

            {/* FAQ Section pour AdSense (Contenu riche) */}
            <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10 text-center uppercase tracking-tighter">
                {t('home.faq_title') || "Questions Fréquentes (FAQ)"}
              </h3>
              
              <div className="space-y-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {t('home.faq_1_q') || "Est-ce que la création de CV est vraiment 100% gratuite ?"}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.faq_1_a') || "Oui, absolument. Contrairement à de nombreux sites qui vous demandent de payer à la dernière étape de téléchargement, Mon CV Go est un service entièrement gratuit, soutenu par la publicité. Vous pouvez générer, modifier et télécharger autant de CV que vous le souhaitez sans jamais avoir à sortir votre carte bancaire."}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {t('home.faq_2_q') || "Qu'est-ce qu'un système ATS et pourquoi mon score est-il important ?"}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.faq_2_a') || "Un ATS (Applicant Tracking System) est un logiciel utilisé par les recruteurs pour trier automatiquement les CV reçus. Si votre CV n'est pas optimisé pour ces logiciels (mauvais mots-clés, structure complexe, format non lisible), il sera rejeté avant même d'être lu par un humain. Notre jauge de Score ATS vous garantit que votre CV respecte tous les critères techniques requis."}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {t('home.faq_3_q') || "Mes données personnelles sont-elles en sécurité ?"}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.faq_3_a') || "La protection de votre vie privée est notre priorité absolue. Nous avons conçu Mon CV Go pour fonctionner localement dans votre navigateur. Cela signifie que toutes les informations que vous saisissez (nom, adresse, expériences) ne quittent jamais votre ordinateur et ne sont pas stockées sur nos serveurs."}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {t('home.faq_4_q') || "Quel format de téléchargement privilégier pour mon CV ?"}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.faq_4_a') || "Nous recommandons toujours le format PDF. Ce format garantit que la mise en page, les polices et le design global de votre document resteront exactement les mêmes, quel que soit l'appareil (ordinateur, tablette, smartphone) ou le système d'exploitation utilisé par le recruteur pour l'ouvrir."}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {t('home.faq_5_q')}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.faq_5_a')}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {t('home.faq_6_q')}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.faq_6_a')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
