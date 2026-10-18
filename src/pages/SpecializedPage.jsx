import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FilePlus2, 
  Check, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  Award, 
  Lightbulb, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  AlertTriangle, 
  Briefcase, 
  Camera, 
  PenLine, 
  Layers 
} from 'lucide-react';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';
import AdSenseUnit from '../components/AdSenseUnit';
import { useTranslation } from 'react-i18next';
import { specializedPagesData, getLocalizedSpecializedPage } from '../data/specializedPagesData';

export default function SpecializedPage() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  // Strip leading slash and language prefix if present
  const rawPath = location.pathname.replace(/^\/+/, '');
  const pathParts = rawPath.split('/');
  const langInPath = ['en', 'de', 'ar'].includes(pathParts[0]) ? pathParts[0] : null;
  const currentLang = langInPath || (i18n.language || 'fr').substring(0, 2);
  const slug = ['en', 'de', 'ar', 'fr'].includes(pathParts[0]) ? pathParts.slice(1).join('/') : rawPath;
  const data = getLocalizedSpecializedPage(slug, currentLang);
  const [openFaq, setOpenFaq] = useState(null);

  const langPrefix = currentLang === 'fr' ? '' : `/${currentLang}`;
  const breadcrumbs = [
    { name: t('nav.home', 'Accueil'), url: `https://moncvgo.com${langPrefix || '/'}` },
    { name: t('nav.cv_tips', 'Conseils CV'), url: `https://moncvgo.com${langPrefix}/conseils-cv` },
    { name: data.h1, url: `https://moncvgo.com${langPrefix}/${data.slug}` }
  ];

  return (
    <>
      <SEO 
        title={data.seoTitle} 
        description={data.seoDesc} 
        url={`https://moncvgo.com${langPrefix}/${data.slug}`}
        faqItems={data.faq}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-12 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-500 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/conseils-cv" className="hover:text-cyan-500 transition-colors">Conseils CV</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white line-clamp-1">{data.badge || data.h1}</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-6 sm:p-10 md:p-12 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border mb-6 transform -rotate-1">
              <Sparkles className="w-4 h-4 text-slate-900" />
              {data.badge}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 leading-tight">
              {data.h1}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-bold leading-relaxed mb-8 max-w-3xl">
              {data.intro}
            </p>

            {/* Quick Stats Grid */}
            {data.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                {data.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-100 dark:bg-slate-800 p-3.5 brutal-border">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{stat.label}</div>
                    <div className="text-sm font-black text-slate-900 dark:text-white mt-1">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={`/create?preset=${data.presetKey}`} 
                className="px-6 sm:px-8 py-4 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest text-sm sm:text-base brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-3 transform -rotate-1"
              >
                <FilePlus2 className="w-5 h-5" strokeWidth={3} />
                Créer ce CV gratuitement (PDF)
              </Link>
              <a 
                href="#guide-complet" 
                className="px-6 sm:px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm sm:text-base brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Lire les conseils d'experts
              </a>
            </div>
          </div>

          <AdSenseUnit />

          {/* Main Grid Content */}
          <div className="grid md:grid-cols-3 gap-8 mt-10" id="guide-complet">
            
            {/* Main Column */}
            <div className="md:col-span-2 space-y-10">
              
              {/* Sections List */}
              {data.sections && data.sections.map((section, idx) => (
                <section key={idx} className="bg-white dark:bg-slate-900 p-6 sm:p-8 brutal-border brutal-shadow">
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-500 shrink-0" strokeWidth={2.5} />
                    <span>{section.title}</span>
                  </h2>

                  {section.content && (
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-4">
                      {section.content}
                    </p>
                  )}

                  {section.bullets && (
                    <ul className="space-y-2.5 mb-4">
                      {section.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium text-sm">
                          <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.hardSkills && (
                    <div className="mt-4 mb-4">
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-cyan-500" /> Compétences Techniques (Hard Skills)
                      </h3>
                      <div className="grid sm:grid-cols-1 gap-2">
                        {section.hardSkills.map((hs, hsi) => (
                          <div key={hsi} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                            {hs}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.softSkills && (
                    <div className="mt-4 mb-4">
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-pink-500" /> Qualités Humaines (Soft Skills)
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {section.softSkills.map((ss, ssi) => (
                          <div key={ssi} className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg border border-pink-200 dark:border-pink-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                            ★ {ss}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.examples && (
                    <div className="mt-4 space-y-3">
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                        Exemples concrets de réalisations formulées :
                      </h3>
                      {section.examples.map((ex, exi) => (
                        <div key={exi} className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic">
                          {ex}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.quote && (
                    <blockquote className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-sm font-medium text-slate-800 dark:text-slate-200 italic my-2">
                      {section.quote}
                    </blockquote>
                  )}
                </section>
              ))}

              {/* Erreurs à éviter */}
              {data.mistakesToAvoid && (
                <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 brutal-border brutal-shadow">
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-red-600 dark:text-red-400 mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6" strokeWidth={2.5} />
                    Pièges et erreurs à éviter absolument
                  </h2>
                  <ul className="space-y-3">
                    {data.mistakesToAvoid.map((mistake, mi) => (
                      <li key={mi} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium text-sm">
                        <span className="text-red-500 font-black text-base shrink-0">✕</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ Accordion */}
              {data.faq && data.faq.length > 0 && (
                <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 brutal-border brutal-shadow">
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-pink-500" strokeWidth={2.5} />
                    Foire Aux Questions (FAQ)
                  </h2>
                  <div className="space-y-4">
                    {data.faq.map((item, index) => (
                      <div key={index} className="border-2 border-slate-900 dark:border-slate-700">
                        <button
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full text-left p-4 bg-slate-100 dark:bg-slate-800 font-bold text-sm sm:text-base text-slate-900 dark:text-white flex justify-between items-center gap-2"
                          aria-expanded={openFaq === index}
                        >
                          <span>{item.q}</span>
                          <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaq === index && (
                          <div className="p-4 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed border-t-2 border-slate-900 dark:border-slate-700">
                            {item.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom CTA Card */}
              <div className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 p-1 brutal-border brutal-shadow">
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 text-center">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 dark:text-white mb-3">
                    Prêt à créer votre CV {data.badge} ?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base mb-6 max-w-xl mx-auto">
                    Utilisez notre outil 100% gratuit, sans inscription et téléchargez directement votre document en PDF Haute Définition.
                  </p>
                  <Link 
                    to={`/create?preset=${data.presetKey}`} 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest text-base brutal-border brutal-shadow brutal-hover"
                  >
                    <FilePlus2 className="w-5 h-5" strokeWidth={3} />
                    Créer mon CV maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              
              {/* Box 1: Action Principale */}
              <div className="bg-yellow-400 p-6 brutal-border brutal-shadow">
                <h3 className="text-xl font-black uppercase text-slate-900 mb-2">
                  Créer ce CV en ligne
                </h3>
                <p className="text-slate-900 font-bold text-xs leading-relaxed mb-4">
                  Remplissez vos coordonnées, suivez votre score ATS et exportez en PDF instantanément.
                </p>
                <Link 
                  to={`/create?preset=${data.presetKey}`} 
                  className="w-full py-3 bg-white text-slate-900 font-black uppercase tracking-wider text-xs brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-2"
                >
                  <FilePlus2 className="w-4 h-4" />
                  Ouvrir dans l'éditeur
                </Link>
              </div>

              {/* Box 2: Suite d'outils MonCVGo */}
              <div className="bg-white dark:bg-slate-900 p-6 brutal-border brutal-shadow">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-500" /> Autres outils MonCVGo
                </h3>
                <ul className="space-y-3 text-xs font-bold">
                  <li>
                    <Link to="/lettre-motivation" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors">
                      <PenLine className="w-4 h-4 text-pink-500" />
                      Créer une lettre de motivation
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      Créer un portfolio en ligne
                    </Link>
                  </li>
                  <li>
                    <Link to="/studio-photo" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors">
                      <Camera className="w-4 h-4 text-yellow-500" />
                      Photo CV professionnelle gratuite
                    </Link>
                  </li>
                  <li>
                    <Link to="/cv-ats" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Optimiser pour les robots ATS
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Box 3: Guides Associés */}
              {data.relatedPages && (
                <div className="bg-white dark:bg-slate-900 p-6 brutal-border brutal-shadow">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" /> Pages et guides connexes
                  </h3>
                  <div className="flex flex-col gap-2">
                    {data.relatedPages.map((rp, rpi) => (
                      <Link 
                        key={rpi} 
                        to={rp.url} 
                        className="p-2.5 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-yellow-400 hover:text-slate-900 transition-colors flex items-center justify-between group"
                      >
                        <span>{rp.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Partage Social */}
              <div className="bg-white dark:bg-slate-900 p-6 brutal-border brutal-shadow">
                <SocialShare 
                  title={data.h1} 
                  url={`https://moncvgo.com/${data.slug}`} 
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
