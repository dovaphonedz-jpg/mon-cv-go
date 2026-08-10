import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FilePlus2, Check, ArrowRight, HelpCircle, ChevronDown, Award, Lightbulb, UserCheck, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';
import { jobModelsData } from '../data/jobModelsData';

export default function ModelePage() {
  const location = useLocation();
  const path = location.pathname.substring(1); // Enlève le '/' initial
  const model = jobModelsData[path] || jobModelsData['modele-cv-debutant']; // Fallback
  const [openFaq, setOpenFaq] = useState(null);

  const breadcrumbs = [
    { name: 'Accueil', url: 'https://moncvgo.com/' },
    { name: 'Plan du site', url: 'https://moncvgo.com/plan-du-site' },
    { name: model.jobTitle, url: `https://moncvgo.com/${path}` }
  ];

  return (
    <>
      <SEO 
        title={model.seoTitle} 
        description={model.seoDesc} 
        url={`https://moncvgo.com/${path}`}
        faqItems={model.faq}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-500 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/plan-du-site" className="hover:text-cyan-500 transition-colors">Modèles de CV</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{model.jobTitle}</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-8 md:p-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border mb-6 transform -rotate-1">
              <Sparkles className="w-4 h-4 text-slate-900" />
              Modèle de CV Métier 2026
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 leading-tight">
              {model.h1}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed mb-8 max-w-3xl">
              {model.intro}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={`/create?preset=${path}`} 
                className="px-8 py-4 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest text-base brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-3 transform -rotate-1"
              >
                <FilePlus2 className="w-5 h-5" strokeWidth={3} />
                Créer ce CV gratuitement (PDF)
              </Link>
              <a 
                href="#details" 
                className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-base brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Lire le guide métier
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8" id="details">
            
            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-10">
              
              {/* Section 1: Pourquoi utiliser ce modèle ? */}
              <section className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow">
                <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-500" strokeWidth={2.5} />
                  1. Pourquoi utiliser ce modèle de CV {model.jobTitle} ?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {model.whyUse}
                </p>
              </section>

              {/* Section 2: Pour quels profils est-il adapté ? */}
              <section className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow">
                <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-cyan-500" strokeWidth={2.5} />
                  2. À qui s'adresse ce modèle de CV ?
                </h2>
                <ul className="space-y-3">
                  {model.targetProfiles.map((profile, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{profile}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 3: Compétences clés (Hard & Soft Skills) */}
              <section className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow">
                <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-pink-500" strokeWidth={2.5} />
                  3. Compétences indispensables pour {model.jobTitle}
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 uppercase text-xs tracking-wider bg-pink-100 dark:bg-pink-900/30 px-3 py-1 inline-block brutal-border">
                    Hard Skills (Compétences Techniques)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {model.hardSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg border border-slate-200 dark:border-slate-700">
                        ⚡ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 uppercase text-xs tracking-wider bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 inline-block brutal-border">
                    Soft Skills (Qualités Comportementales)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {model.softSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-lg border border-emerald-200 dark:border-emerald-800">
                        ⭐ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 4: Informations essentielles à inclure */}
              <section className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow">
                <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">
                  4. Les rubriques obligatoires sur votre CV
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {model.essentialSections.map((item, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-slate-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Exemple d'accroche professionnelle */}
              <section className="bg-slate-900 text-white p-8 brutal-border brutal-shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
                <h2 className="text-2xl font-black uppercase mb-4 text-yellow-400 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  5. Exemple d'accroche (Résumé de Profil)
                </h2>
                <p className="text-slate-300 text-sm mb-4 font-bold">
                  Voici un exemple de phrase d'accroche optimisée que vous pouvez personnaliser directement sur Mon CV Go :
                </p>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 text-slate-200 font-medium italic text-base leading-relaxed">
                  {model.sampleCatchphrase}
                </div>
              </section>

              {/* Section 6: Conseils Expériences & Méthode CAR */}
              <section className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow space-y-4">
                <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">
                  6. Conseils pour vos Expériences & Formations
                </h2>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="font-black text-blue-900 dark:text-blue-300 text-sm uppercase mb-1">💡 Expériences professionnelles</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{model.experienceAdvice}</p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="font-black text-purple-900 dark:text-purple-300 text-sm uppercase mb-1">🎓 Formations & Diplômes</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{model.educationAdvice}</p>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <h3 className="font-black text-emerald-900 dark:text-emerald-300 text-sm uppercase mb-1">🤖 Optimisation ATS (Logiciels RH)</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{model.atsAdvice}</p>
                </div>
              </section>

              {/* Section 7: Astuces de succès */}
              <section className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow">
                <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">
                  7. Astuces d'expert pour réussir votre candidature
                </h2>
                <ul className="space-y-3">
                  {model.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                      <ShieldCheck className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 8: FAQ spécifique au métier */}
              <section className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow">
                <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-pink-500" />
                  8. Questions Fréquentes ({model.jobTitle})
                </h2>

                <div className="space-y-4">
                  {model.faq.map((item, i) => (
                    <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-5 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="text-base">{item.q}</span>
                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180 text-cyan-500' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Share */}
              <div className="bg-white dark:bg-slate-900 p-6 brutal-border brutal-shadow flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4">Partager ce modèle avec un collègue</h3>
                <SocialShare url={`https://moncvgo.com/${path}`} title={model.seoTitle} />
              </div>

            </div>

            {/* Sticky Sidebar CTA */}
            <div className="md:col-span-1">
              <div className="bg-yellow-400 brutal-border brutal-shadow-lg p-6 text-slate-900 sticky top-24 transform rotate-1">
                <div className="w-12 h-12 bg-white brutal-border flex items-center justify-center mb-4 transform -rotate-3">
                  <FilePlus2 className="w-6 h-6 text-slate-900" strokeWidth={3} />
                </div>
                
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                  Créer votre CV {model.jobTitle}
                </h3>
                
                <p className="font-bold text-sm mb-6 leading-snug text-slate-800">
                  Générez un CV conforme aux normes RH 2026 en 5 minutes. Téléchargement immédiat au format PDF Haute Définition.
                </p>

                <ul className="space-y-2 mb-6 text-xs font-black uppercase tracking-wider">
                  <li className="flex items-center gap-2">✓ 100% Gratuit</li>
                  <li className="flex items-center gap-2">✓ Sans Inscription</li>
                  <li className="flex items-center gap-2">✓ Compatible ATS</li>
                  <li className="flex items-center gap-2">✓ Export PDF HD</li>
                </ul>

                <Link 
                  to={`/create?preset=${path}`} 
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm rounded-none brutal-border flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  Générer mon CV <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </>
  );
}
