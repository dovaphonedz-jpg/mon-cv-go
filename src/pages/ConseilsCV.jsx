import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LocalizedLink from '../components/LocalizedLink';
import { 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  Search, 
  Edit3, 
  Zap, 
  Briefcase, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  FilePlus2, 
  GraduationCap, 
  ShieldCheck, 
  Code, 
  PenLine, 
  Camera 
} from 'lucide-react';
import SEO from '../components/SEO';
import AdSenseUnit from '../components/AdSenseUnit';
import SocialShare from '../components/SocialShare';
import { useTranslation } from 'react-i18next';
import { getLocalizedConseilsCV } from '../data/conseilsCVData';

export default function ConseilsCV() {
  const { i18n } = useTranslation();
  
  // Resolve current language from URL priority
  const detectLang = () => {
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (['en', 'de', 'ar'].includes(parts[0])) return parts[0];
    }
    return (i18n.language || 'fr').substring(0, 2).toLowerCase();
  };
  const lang = detectLang();
  const data = getLocalizedConseilsCV(lang);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const CATEGORY_ICONS = {
    all: Sparkles,
    structure: FilePlus2,
    debutant: GraduationCap,
    etudiant: BookOpen,
    ingenieur: Award,
    informatique: Code,
    ats: ShieldCheck,
    lettre: PenLine
  };

  const CATEGORIES = [
    { id: 'all', label: data.categories.all, icon: CATEGORY_ICONS.all },
    { id: 'structure', label: data.categories.structure, icon: CATEGORY_ICONS.structure },
    { id: 'debutant', label: data.categories.debutant, icon: CATEGORY_ICONS.debutant },
    { id: 'etudiant', label: data.categories.etudiant, icon: CATEGORY_ICONS.etudiant },
    { id: 'ingenieur', label: data.categories.ingenieur, icon: CATEGORY_ICONS.ingenieur },
    { id: 'informatique', label: data.categories.informatique, icon: CATEGORY_ICONS.informatique },
    { id: 'ats', label: data.categories.ats, icon: CATEGORY_ICONS.ats },
    { id: 'lettre', label: data.categories.lettre, icon: CATEGORY_ICONS.lettre }
  ];

  const currentUrl = lang === 'fr' 
    ? 'https://moncvgo.com/conseils-cv' 
    : `https://moncvgo.com/${lang}/conseils-cv`;

  const homeUrl = lang === 'fr' 
    ? 'https://moncvgo.com/' 
    : `https://moncvgo.com/${lang}`;

  const homeName = lang === 'en' ? 'Home' : lang === 'de' ? 'Startseite' : lang === 'ar' ? 'الرئيسية' : 'Accueil';
  const pageName = lang === 'en' ? 'Resume Tips' : lang === 'de' ? 'Lebenslauf-Tipps' : lang === 'ar' ? 'نصائح السيرة الذاتية' : 'Conseils CV';

  const breadcrumbs = [
    { name: homeName, url: homeUrl },
    { name: pageName, url: currentUrl }
  ];

  const filteredSections = selectedCategory === 'all' 
    ? data.adviceSections 
    : data.adviceSections.filter(s => s.category === selectedCategory || selectedCategory === 'all');

  return (
    <>
      <SEO 
        title={data.seoTitle} 
        description={data.seoDesc} 
        url={currentUrl}
        breadcrumbs={breadcrumbs}
      />

      <div className={`bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-12 pb-20 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
            <LocalizedLink to="/" className="hover:text-cyan-500 transition-colors">{homeName}</LocalizedLink>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{pageName}</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-6 sm:p-10 md:p-12 mb-10 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border mb-6 transform -rotate-1">
              <BookOpen className="w-4 h-4 text-slate-900" />
              {data.badge}
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
              {data.h1}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
              {data.intro}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <LocalizedLink to="/create" className="px-6 py-3.5 bg-yellow-400 text-slate-900 font-black uppercase text-xs sm:text-sm tracking-wider brutal-border brutal-shadow brutal-hover flex items-center gap-2 transform -rotate-1">
                <FilePlus2 className="w-4 h-4" />
                {data.ctaCreate}
              </LocalizedLink>
              <LocalizedLink to="/modele-cv-gratuit" className="px-6 py-3.5 bg-cyan-400 text-slate-900 font-black uppercase text-xs sm:text-sm tracking-wider brutal-border brutal-shadow brutal-hover flex items-center gap-2 transform rotate-1">
                <Layers className="w-4 h-4" />
                {data.ctaTemplates}
              </LocalizedLink>
            </div>
          </div>

          <AdSenseUnit />

          {/* Category Navigation Pills */}
          <div className="my-10 bg-white dark:bg-slate-900 p-4 sm:p-6 brutal-border brutal-shadow">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-pink-500" />
              {data.categoryTitle}
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 sm:px-4 py-2 text-xs font-black uppercase tracking-wider brutal-border transition-all flex items-center gap-2 ${
                      isSelected 
                        ? 'bg-yellow-400 text-slate-900 brutal-shadow transform -translate-y-0.5' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Guides Grid */}
          <div className="grid gap-8">
            {filteredSections.map((sec, idx) => (
              <article key={idx} className="bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-10 brutal-border brutal-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 font-black text-xs uppercase tracking-wider rounded">
                    {sec.badge}
                  </span>
                  {sec.cta && (
                    <LocalizedLink to={sec.cta.url} className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      {sec.cta.label} <ArrowRight className="w-3 h-3" />
                    </LocalizedLink>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4">
                  {sec.title}
                </h2>

                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-6">
                  {sec.intro}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                  {/* DO's */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 brutal-border border-emerald-500">
                    <h3 className="text-sm font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                      {data.doLabel}
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                      {sec.dos.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-black mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DONT's */}
                  <div className="bg-rose-50 dark:bg-rose-950/30 p-5 brutal-border border-rose-500">
                    <h3 className="text-sm font-black uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-rose-600" strokeWidth={3} />
                      {data.dontLabel}
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                      {sec.donts.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-600 font-black mt-0.5">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Specialized Pages Hub Section */}
          <section className="my-16 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 p-1 brutal-border brutal-shadow">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 dark:text-white mb-4 text-center">
                {data.hubTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-center max-w-2xl mx-auto mb-8 text-sm sm:text-base">
                {data.hubSubtitle}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: lang === 'en' ? 'Engineering Resume' : lang === 'de' ? 'Lebenslauf Ingenieur' : lang === 'ar' ? 'سيرة ذاتية للمهندس' : 'CV Ingénieur & Technique', url: '/cv-ingenieur' },
                  { label: lang === 'en' ? 'Junior Engineer Resume' : lang === 'de' ? 'Jungingenieur Lebenslauf' : lang === 'ar' ? 'سيرة ذاتية لمهندس مبتدئ' : 'CV Ingénieur Débutant', url: '/cv-ingenieur-debutant' },
                  { label: lang === 'en' ? 'Student Resume' : lang === 'de' ? 'Studenten-Lebenslauf' : lang === 'ar' ? 'سيرة ذاتية للطلاب' : 'CV Étudiant & Alternance', url: '/cv-etudiant' },
                  { label: lang === 'en' ? 'Resume With No Experience' : lang === 'de' ? 'Lebenslauf Ohne Erfahrung' : lang === 'ar' ? 'سيرة ذاتية بدون خبرة' : 'CV Sans Expérience', url: '/cv-sans-experience' },
                  { label: lang === 'en' ? 'Entry-Level Resume' : lang === 'de' ? 'Lebenslauf Berufsanfänger' : lang === 'ar' ? 'سيرة ذاتية للمبتدئين' : 'CV Débutant / Premier Emploi', url: '/cv-debutant' },
                  { label: lang === 'en' ? 'ATS-Friendly Resume' : lang === 'de' ? 'ATS-Lebenslauf' : lang === 'ar' ? 'سيرة ذاتية متوافقة مع ATS' : 'CV Compatible ATS', url: '/cv-ats' },
                  { label: lang === 'en' ? 'Free Resume Examples' : lang === 'de' ? 'Kostenlose Muster' : lang === 'ar' ? 'أمثلة سيرة ذاتية مجانية' : 'Exemples de CV Gratuits', url: '/exemple-cv' },
                  { label: lang === 'en' ? 'Free PDF Templates' : lang === 'de' ? 'PDF-Vorlagen' : lang === 'ar' ? 'نماذج PDF مجانية' : 'Modèles de CV PDF Gratuits', url: '/modele-cv-gratuit' },
                  { label: lang === 'en' ? 'IT & Developer Resume' : lang === 'de' ? 'IT & Entwickler Lebenslauf' : lang === 'ar' ? 'سيرة ذاتية لمطوري البرمجيات' : 'CV Informatique & Dev', url: '/cv-informatique' },
                  { label: lang === 'en' ? 'Professional Resume' : lang === 'de' ? 'Professioneller Lebenslauf' : lang === 'ar' ? 'سيرة ذاتية احترافية' : 'CV Professionnel de Référence', url: '/cv-professionnel' },
                  { label: lang === 'en' ? 'Cover Letter Builder' : lang === 'de' ? 'Anschreiben-Generator' : lang === 'ar' ? 'منشئ رسائل التغطية' : 'Générateur Lettre de Motivation', url: '/lettre-motivation' },
                  { label: lang === 'en' ? 'AI Photo Studio' : lang === 'de' ? 'KI Foto-Studio' : lang === 'ar' ? 'استوديو الصور بالذكاء الاصطناعي' : 'Studio Photo CV IA', url: '/studio-photo' }
                ].map((g, gi) => (
                  <LocalizedLink
                    key={gi}
                    to={g.url}
                    className="p-4 bg-slate-50 dark:bg-slate-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-slate-900 group transition-all brutal-border"
                  >
                    <h3 className="font-black text-sm uppercase mb-1 text-slate-900 dark:text-white group-hover:text-slate-900 flex items-center justify-between">
                      <span>{g.label}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                  </LocalizedLink>
                ))}
              </div>
            </div>
          </section>

          {/* Glossary Section */}
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-10 brutal-border brutal-shadow mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2 text-center">
              {data.glossaryTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center font-bold text-sm max-w-xl mx-auto mb-8">
              {data.glossarySubtitle}
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.glossaryTerms.map((term, ti) => (
                <div key={ti} className="bg-slate-50 dark:bg-slate-800/70 p-4 brutal-border">
                  <h3 className="font-black text-sm text-cyan-600 dark:text-cyan-400 uppercase mb-2">
                    {term.term}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {term.def}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Social Share */}
          <div className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4">
              {data.shareTitle}
            </h3>
            <SocialShare url={currentUrl} title={`${data.h1} | Mon CV Go`} />
          </div>

        </div>
      </div>
    </>
  );
}
