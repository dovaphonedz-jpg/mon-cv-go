import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FilePlus2, Briefcase, PenLine, BookOpen, Zap, Info, Mail, ShieldCheck, FileText, LayoutGrid, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function PlanDuSite() {
  const { t } = useTranslation();

  const pagesList = [
    {
      category: t('sitemap.cat_tools', "Principaux Outils de Candidature"),
      icon: FilePlus2,
      color: "bg-yellow-400",
      links: [
        { path: "/", label: t('nav.home', "Accueil Mon CV Go"), desc: t('sitemap.desc_home', "Créateur de CV gratuit en ligne n°1") },
        { path: "/create", label: t('nav.create_cv', "Créer un CV Gratuit en Ligne"), desc: t('sitemap.desc_create', "Éditeur de CV interactif avec jauge d'optimisation ATS") },
        { path: "/studio-photo", label: t('footer_section.photo_studio', "Studio Photo CV & Détourage IA"), desc: t('sitemap.desc_photo', "Détourage IA 1-clic, retouche studio, cadres corporate") },
        { path: "/portfolio", label: t('nav.create_portfolio', "Créer un Portfolio Professionnel"), desc: t('sitemap.desc_portfolio', "Générateur de portfolio web pour présenter vos projets") },
        { path: "/lettre-motivation", label: t('nav.cover_letter', "Générateur de Lettre de Motivation"), desc: t('sitemap.desc_letter', "Modèles et rédaction assistée pour vos lettres de candidature") },
        { path: "/espace-emploi", label: t('nav.job_space', "Espace Emploi & Recrutement"), desc: t('sitemap.desc_jobs', "Recherche d'offres d'emploi et opportunités de carrière") },
      ]
    },
    {
      category: t('sitemap.cat_models', "Modèles de CV Gratuits par Métier"),
      icon: LayoutGrid,
      color: "bg-cyan-400",
      links: [
        { path: "/modele-cv-comptable-word", label: t('footer_section.tpl_comptable', "Modèle CV Comptable"), desc: t('sitemap.desc_comptable', "Exemple et modèle optimisé pour comptables") },
        { path: "/modele-cv-ingenieur", label: t('footer_section.tpl_ingenieur', "Modèle CV Ingénieur"), desc: t('sitemap.desc_ingenieur', "CV technique pour ingénieurs informatique et civil") },
        { path: "/modele-cv-debutant", label: t('footer_section.tpl_debutant', "Modèle CV Débutant"), desc: t('sitemap.desc_debutant', "CV axé sur les compétences pour premier emploi") },
        { path: "/modele-cv-etudiant", label: t('footer_section.tpl_etudiant', "Modèle CV Étudiant"), desc: t('sitemap.desc_etudiant', "Modèle idéal pour stages, alternances et jobs d'été") },
        { path: "/modele-cv-commercial", label: t('footer_section.tpl_commercial', "Modèle CV Commercial"), desc: t('sitemap.desc_commercial', "Valorisez vos résultats de vente et votre portefeuille client") },
        { path: "/modele-cv-developpeur", label: t('footer_section.tpl_developpeur', "Modèle CV Développeur Web"), desc: t('sitemap.desc_developpeur', "CV optimisé pour profils tech, full-stack et dev") },
        { path: "/modele-cv-designer", label: t('footer_section.tpl_designer', "Modèle CV Designer"), desc: t('sitemap.desc_designer', "Présentation visuelle pour UI/UX designers et graphistes") },
        { path: "/modele-cv-infirmiere", label: t('footer_section.tpl_infirmiere', "Modèle CV Infirmière"), desc: t('sitemap.desc_infirmiere', "CV optimisé pour infirmiers et personnels de santé") },
        { path: "/modele-cv-restauration", label: t('footer_section.tpl_restauration', "Modèle CV Restauration"), desc: t('sitemap.desc_restauration', "Modèle dynamique pour serveurs, cuisiniers et hôtellerie") },
        { path: "/modele-cv-chauffeur-livreur", label: t('footer_section.tpl_chauffeur', "Modèle CV Chauffeur"), desc: t('sitemap.desc_chauffeur', "CV efficace pour chauffeurs livreurs et logistique") },
        { path: "/modele-cv-secretaire", label: t('footer_section.tpl_secretaire', "Modèle CV Secrétaire"), desc: t('sitemap.desc_secretaire', "Présentation claire pour secrétaires et assistants") },
        { path: "/modele-cv-vendeur", label: t('footer_section.tpl_vendeur', "Modèle CV Vendeur"), desc: t('sitemap.desc_vendeur', "Valorisez vos compétences en vente et conseil client") },
        
        { path: "/creer-cv-gratuit", label: t('modele_page.cta_create', "Créer un CV Gratuitement"), desc: t('sitemap.desc_creer_cv', "Guide et éditeur rapide pour créer votre CV en ligne") },
        { path: "/faire-cv-gratuit", label: "Faire un CV Gratuitement", desc: t('sitemap.desc_faire_cv', "Méthode pas à pas pour faire un CV gratuit et efficace") },
        { path: "/cv-gratuit-en-ligne", label: "CV Gratuit en Ligne", desc: t('sitemap.desc_cv_en_ligne', "Générateur de CV en ligne sans inscription préalable") },
        { path: "/modeles-cv-gratuits", label: t('footer_section.resume_templates', "Modèles de CV Gratuits"), desc: t('sitemap.desc_modeles_gratuits', "Collection complète de modèles de CV gratuits") },
        { path: "/cv-professionnel-gratuit", label: "CV Professionnel Gratuit", desc: t('sitemap.desc_cv_pro', "Modèle certifié professionnel conforme aux attentes recruteurs") },
        { path: "/cv-etudiant-gratuit", label: "CV Étudiant Gratuit", desc: t('sitemap.desc_cv_etudiant_gratuit', "Exemples pour stage, alternance et premier emploi") },
        { path: "/cv-sans-experience", label: "CV Sans Expérience", desc: t('sitemap.desc_sans_exp', "Valorisez vos compétences et formations sans expérience") },
        { path: "/exemples-cv", label: "Exemples de CV", desc: t('sitemap.desc_exemples', "Inspirations et exemples de CV réels remplis par métier") },
      ]
    },
    {
      category: t('sitemap.cat_resources', "Ressources & Guides Candidature"),
      icon: BookOpen,
      color: "bg-pink-400",
      links: [
        { path: "/conseils-cv", label: t('nav.cv_tips', "Guide & Conseils CV 2026"), desc: t('sitemap.desc_tips', "Toutes les astuces pour réussir son CV et passer les filtres ATS") },
        { path: "/blog", label: "Blog & Actualités Emploi", desc: t('sitemap.desc_blog', "Articles, tendances RH et conseils pour votre recherche d'emploi") },
      ]
    },
    {
      category: t('sitemap.cat_legal', "Informations Légales & Contact"),
      icon: ShieldCheck,
      color: "bg-emerald-400",
      links: [
        { path: "/a-propos", label: t('nav.about', "À propos de Mon CV Go"), desc: t('sitemap.desc_about', "Notre mission : rendre la création de CV accessible et 100% gratuite") },
        { path: "/contact", label: t('nav.contact', "Nous Contacter"), desc: t('sitemap.desc_contact', "Formulaire de contact et assistance utilisateurs") },
        { path: "/mentions-legales", label: t('footer.terms', "Mentions Légales"), desc: t('sitemap.desc_legal', "Conditions d'utilisation et informations d'éditeur") },
        { path: "/confidentialite", label: t('footer.privacy', "Politique de Confidentialité"), desc: t('sitemap.desc_privacy', "Engagement RGPD et protection de vos données personnelles") },
      ]
    }
  ];

  return (
    <>
      <SEO 
        title={t('sitemap.seo_title', "Plan du site | Mon CV Go")} 
        description={t('sitemap.seo_desc', "Accédez à toutes les pages et ressources de Mon CV Go : modèles de CV gratuits par métier, éditeur en ligne, conseils RH et actualités emploi.")} 
        url="https://moncvgo.com/plan-du-site" 
      />

      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-8 md:p-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border mb-6 transform -rotate-1">
              <Zap className="w-4 h-4 text-slate-900" />
              {t('sitemap.badge', 'Navigation Globale & Maillage Sémantique')}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 leading-tight">
              {t('sitemap.h1', 'Plan du site (HTML Sitemap)')}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed max-w-3xl">
              {t('sitemap.subtitle', 'Retrouvez l\'ensemble de nos outils de création de candidature, modèles de CV métiers optimisés ATS, guides de rédaction et informations juridiques.')}
            </p>
          </div>

          <div className="space-y-12">
            {pagesList.map((section, idx) => {
              const IconComp = section.icon;
              return (
                <section key={idx} className="bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-900 dark:border-slate-800">
                    <div className={`p-3 ${section.color} text-slate-900 font-black brutal-border`}>
                      <IconComp className="w-6 h-6" strokeWidth={3} />
                    </div>
                    <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight">
                      {section.category}
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.links.map((item, i) => (
                      <Link 
                        key={i} 
                        to={item.path} 
                        className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-yellow-400 dark:hover:border-yellow-400 hover:shadow-md transition-all group"
                      >
                        <div className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 mb-1 flex items-center gap-1.5">
                          <span>{item.label}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-snug">
                          {item.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
