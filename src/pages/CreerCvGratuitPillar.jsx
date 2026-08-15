import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FilePlus2, Check, ArrowRight, ShieldCheck, Sparkles, Zap, Star, 
  HelpCircle, ChevronDown, Award, Heart, Cpu, FileText, CheckCircle2, 
  XCircle, Lock, Download, MousePointer, Layers
} from 'lucide-react';
import SEO from '../components/SEO';
import TemplateGallery from '../components/TemplateGallery';
import AdSenseUnit from '../components/AdSenseUnit';

export default function CreerCvGratuitPillar() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const breadcrumbs = [
    { name: t('nav.home'), url: 'https://moncvgo.com/' },
    { name: t('nav.cv_tips', 'Plan du site'), url: 'https://moncvgo.com/plan-du-site' },
    { name: t('pillar_creer_cv.badge', 'Créer un CV Gratuitement'), url: 'https://moncvgo.com/creer-cv-gratuit' }
  ];

  const faqItems = [
    {
      q: t('pillar_creer_cv.faq_q1', 'Créer un CV sur MonCVGo est-il vraiment 100% gratuit ?'),
      a: t('pillar_creer_cv.faq_a1', 'Oui, l\'utilisation de notre éditeur en ligne et le téléchargement de votre CV au format PDF haute définition sont entièrement gratuits, illimités et sans aucun frais caché ni abonnement automatique.')
    },
    {
      q: t('pillar_creer_cv.faq_q2', 'Faut-il créer un compte ou entrer sa carte bancaire ?'),
      a: t('pillar_creer_cv.faq_a2', 'Absolument pas. Vous pouvez créer et télécharger votre CV sans inscription, sans donner votre adresse e-mail et sans renseigner aucune carte bancaire.')
    },
    {
      q: t('pillar_creer_cv.faq_q3', 'Mon CV PDF comporte-t-il des filigranes ou des publicités ?'),
      a: t('pillar_creer_cv.faq_a3', 'Non, le document PDF généré est totalement professionnel, propre et net, sans aucun logo ni filigrane MonCVGo.')
    },
    {
      q: t('pillar_creer_cv.faq_q4', 'Comment garantissez-vous la compatibilité avec les logiciels ATS ?'),
      a: t('pillar_creer_cv.faq_a4', 'Nos modèles utilisent une structure de texte vectorielle séquentielle HTML/PDF standard. Les mots-clés de votre profil sont lus et analysés sans aucune erreur par les robots de recrutement ATS.')
    },
    {
      q: t('pillar_creer_cv.faq_q5', 'Puis-je modifier mon CV après téléchargement ?'),
      a: t('pillar_creer_cv.faq_a5', 'Oui ! Vos données sont automatiquement conservées dans le stockage local de votre navigateur. Vous pouvez revenir sur le site à tout moment pour mettre à jour vos informations ou changer de modèle en 1 clic.')
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <SEO 
        title="Créer un CV Gratuitement en Ligne (PDF & Word) | Mon CV Go"
        description="Créer un CV gratuitement en ligne en 2 minutes. Éditeur gratuit n°1 sans inscription, sans abonnement caché, compatible ATS avec téléchargement PDF instantané."
        url="https://moncvgo.com/creer-cv-gratuit"
        faqItems={faqItems}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Schema.org WebApplication Structured Data for Google Rich Snippet */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "MonCVGo - Free Resume Builder",
          "url": "https://moncvgo.com/creer-cv-gratuit",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "EUR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "52400"
          }
        })}
      </script>

      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-20 pb-20">
        
        {/* HERO PILLAR HEADER */}
        <section className="relative bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white pt-12 pb-16 border-b-8 brutal-border overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Breadcrumbs Navigation */}
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
              <Link to="/" className="hover:text-yellow-400 transition-colors">{t('nav.home')}</Link>
              <span>/</span>
              <span className="text-white">{t('pillar_creer_cv.badge', 'Créer un CV Gratuitement')}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest brutal-border mb-6 transform -rotate-1">
                <Sparkles className="w-4 h-4 text-slate-950" />
                {t('pillar_creer_cv.badge')}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-tight">
                {t('pillar_creer_cv.h1_1')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300">
                  {t('pillar_creer_cv.h1_highlight')}
                </span>
                {t('pillar_creer_cv.h1_2')}
              </h1>

              <p className="text-lg sm:text-2xl text-slate-300 font-bold leading-relaxed mb-8">
                {t('pillar_creer_cv.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link 
                  to="/create" 
                  className="px-8 py-5 bg-yellow-400 text-slate-950 font-black uppercase tracking-widest text-lg sm:text-xl brutal-border brutal-shadow hover:bg-yellow-300 transition-all flex items-center justify-center gap-3 transform rotate-1 shadow-2xl"
                >
                  <FilePlus2 className="w-6 h-6" strokeWidth={3} />
                  {t('pillar_creer_cv.cta')}
                </Link>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs sm:text-sm font-bold text-slate-300">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {t('pillar_creer_cv.guarantee_0')}</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {t('pillar_creer_cv.guarantee_1')}</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {t('pillar_creer_cv.guarantee_2')}</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {t('pillar_creer_cv.guarantee_3')}</div>
              </div>

            </div>
          </div>
        </section>

        {/* COMPARATIVE TABLE: MONCVGO VS OTHER PAID EDITORS */}
        <section className="py-16 bg-white dark:bg-slate-900 border-b-4 border-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                {t('pillar_creer_cv.why_title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-bold">
                {t('pillar_creer_cv.why_desc')}
              </p>
            </div>

            <div className="overflow-x-auto brutal-border brutal-shadow bg-slate-50 dark:bg-slate-950">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs sm:text-sm uppercase font-black">
                    <th className="p-4 sm:p-5 border-r border-slate-800">{t('pillar_creer_cv.table_col_1')}</th>
                    <th className="p-4 sm:p-5 bg-yellow-400 text-slate-950 border-r border-yellow-500 font-black text-sm sm:text-base">
                      {t('pillar_creer_cv.table_col_2')}
                    </th>
                    <th className="p-4 sm:p-5 text-slate-300">{t('pillar_creer_cv.table_col_3')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <tr>
                    <td className="p-4 sm:p-5 font-extrabold">{t('pillar_creer_cv.table_pdf')}</td>
                    <td className="p-4 sm:p-5 bg-yellow-400/20 text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {t('pillar_creer_cv.table_pdf_free')}
                    </td>
                    <td className="p-4 sm:p-5 text-red-500 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" /> {t('pillar_creer_cv.table_pdf_paid')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-extrabold">{t('pillar_creer_cv.table_account')}</td>
                    <td className="p-4 sm:p-5 bg-yellow-400/20 text-emerald-600 dark:text-emerald-400 font-black">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 inline mr-2" /> {t('pillar_creer_cv.table_account_no')}
                    </td>
                    <td className="p-4 sm:p-5 text-red-500">
                      <XCircle className="w-5 h-5 text-red-500 inline mr-2" /> {t('pillar_creer_cv.table_account_yes')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-extrabold">{t('pillar_creer_cv.table_card')}</td>
                    <td className="p-4 sm:p-5 bg-yellow-400/20 text-emerald-600 dark:text-emerald-400 font-black">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 inline mr-2" /> {t('pillar_creer_cv.table_card_no')}
                    </td>
                    <td className="p-4 sm:p-5 text-red-500">
                      <XCircle className="w-5 h-5 text-red-500 inline mr-2" /> {t('pillar_creer_cv.table_card_yes')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-extrabold">{t('pillar_creer_cv.table_watermark')}</td>
                    <td className="p-4 sm:p-5 bg-yellow-400/20 text-emerald-600 dark:text-emerald-400 font-black">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 inline mr-2" /> {t('pillar_creer_cv.table_watermark_no')}
                    </td>
                    <td className="p-4 sm:p-5 text-red-500">
                      <XCircle className="w-5 h-5 text-red-500 inline mr-2" /> {t('pillar_creer_cv.table_watermark_yes')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-extrabold">{t('pillar_creer_cv.table_ats')}</td>
                    <td className="p-4 sm:p-5 bg-yellow-400/20 text-emerald-600 dark:text-emerald-400 font-black">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 inline mr-2" /> {t('pillar_creer_cv.table_ats_yes')}
                    </td>
                    <td className="p-4 sm:p-5 text-yellow-600 dark:text-yellow-400">
                      {t('pillar_creer_cv.table_ats_no')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5 STEPS GUIDE TO CREATING A FREE CV */}
        <section className="py-16 bg-slate-100 dark:bg-slate-900 border-b-4 border-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                {t('pillar_creer_cv.steps_title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-bold">
                {t('pillar_creer_cv.steps_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white dark:bg-slate-950 p-6 brutal-border brutal-shadow relative">
                <div className="w-10 h-10 bg-yellow-400 text-slate-950 font-black text-xl flex items-center justify-center brutal-border mb-4">1</div>
                <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white mb-2">{t('pillar_creer_cv.step_1_title')}</h3>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('pillar_creer_cv.step_1_desc')}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-6 brutal-border brutal-shadow relative">
                <div className="w-10 h-10 bg-cyan-400 text-slate-950 font-black text-xl flex items-center justify-center brutal-border mb-4">2</div>
                <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white mb-2">{t('pillar_creer_cv.step_2_title')}</h3>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('pillar_creer_cv.step_2_desc')}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-6 brutal-border brutal-shadow relative">
                <div className="w-10 h-10 bg-pink-400 text-slate-950 font-black text-xl flex items-center justify-center brutal-border mb-4">3</div>
                <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white mb-2">{t('pillar_creer_cv.step_3_title')}</h3>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('pillar_creer_cv.step_3_desc')}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-6 brutal-border brutal-shadow relative">
                <div className="w-10 h-10 bg-purple-400 text-white font-black text-xl flex items-center justify-center brutal-border mb-4">4</div>
                <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white mb-2">{t('pillar_creer_cv.step_4_title')}</h3>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('pillar_creer_cv.step_4_desc')}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-6 brutal-border brutal-shadow relative md:col-span-2">
                <div className="w-10 h-10 bg-emerald-400 text-slate-950 font-black text-xl flex items-center justify-center brutal-border mb-4">5</div>
                <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white mb-2">{t('pillar_creer_cv.step_5_title')}</h3>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t('pillar_creer_cv.step_5_desc')}
                </p>
                <Link to="/create" className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider brutal-border">
                  <FilePlus2 className="w-4 h-4" /> {t('pillar_creer_cv.cta')}
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* TEMPLATES PREVIEW SHOWCASE */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                {t('pillar_creer_cv.gallery_title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-bold">
                {t('pillar_creer_cv.gallery_desc')}
              </p>
            </div>
            
            <TemplateGallery />
          </div>
        </section>

        <AdSenseUnit />

        {/* FAQ SECTION */}
        <section className="py-16 bg-white dark:bg-slate-900 border-t-4 border-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                {t('pillar_creer_cv.faq_title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-bold">
                {t('pillar_creer_cv.faq_desc')}
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950 brutal-border brutal-shadow overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(idx)} 
                    className="w-full p-5 text-left font-black text-slate-900 dark:text-white text-base sm:text-lg flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === idx ? 'transform rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA BOTTOM */}
            <div className="mt-16 text-center bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 p-8 sm:p-12 brutal-border brutal-shadow">
              <h3 className="text-2xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight mb-4">
                {t('pillar_creer_cv.cta_bottom_title')}
              </h3>
              <p className="text-base sm:text-lg text-slate-900 font-bold mb-8 max-w-2xl mx-auto">
                {t('pillar_creer_cv.cta_bottom_desc')}
              </p>
              <Link 
                to="/create" 
                className="inline-flex items-center gap-3 px-8 py-5 bg-slate-950 text-white font-black text-lg sm:text-xl uppercase tracking-widest brutal-border hover:bg-slate-800 transition-colors shadow-2xl"
              >
                <FilePlus2 className="w-6 h-6 text-yellow-400" />
                {t('pillar_creer_cv.cta_bottom_btn')}
              </Link>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
