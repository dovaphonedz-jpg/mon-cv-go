import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, Briefcase, PenLine, BookOpen, Zap, Info, Mail, ShieldCheck, FileText, LayoutGrid, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function PlanDuSite() {
  const pagesList = [
    {
      category: "Principaux Outils de Candidature",
      icon: FilePlus2,
      color: "bg-yellow-400",
      links: [
        { path: "/", label: "Accueil Mon CV Go", desc: "Créateur de CV gratuit en ligne n°1 en France" },
        { path: "/create", label: "Créer un CV Gratuit en Ligne", desc: "Éditeur de CV interactif avec jauge d'optimisation ATS" },
        { path: "/studio-photo", label: "Studio Photo CV & Détourage IA", desc: "Détourage IA 1-clic, retouche studio, cadres corporate et découpage passeport" },
        { path: "/portfolio", label: "Créer un Portfolio Professionnel", desc: "Générateur de portfolio web pour présenter vos projets" },
        { path: "/lettre-motivation", label: "Générateur de Lettre de Motivation", desc: "Modèles et rédaction assistée pour vos lettres de candidature" },
        { path: "/espace-emploi", label: "Espace Emploi & Recrutement", desc: "Recherche d'offres d'emploi et opportunités de carrière" },
      ]
    },
    {
      category: "Modèles de CV Gratuits par Métier",
      icon: LayoutGrid,
      color: "bg-cyan-400",
      links: [
        { path: "/modele-cv-comptable-word", label: "Modèle CV Comptable", desc: "Exemple et modèle optimisé pour comptables et aides-comptables" },
        { path: "/modele-cv-ingenieur", label: "Modèle CV Ingénieur", desc: "CV technique pour ingénieurs informatique, mécanique et civil" },
        { path: "/modele-cv-debutant", label: "Modèle CV Débutant / Sans Expérience", desc: "CV axé sur les compétences et la formation pour premier emploi" },
        { path: "/modele-cv-etudiant", label: "Modèle CV Étudiant", desc: "Modèle idéal pour stages, alternances et jobs d'été" },
        { path: "/modele-cv-commercial", label: "Modèle CV Commercial & Vente", desc: "Valorisez vos résultats de vente et votre portefeuille client" },
        { path: "/modele-cv-developpeur", label: "Modèle CV Développeur Web", desc: "CV optimisé pour profils tech, full-stack et ingénieurs dev" },
        { path: "/modele-cv-designer", label: "Modèle CV Designer & Créatif", desc: "Présentation visuelle pour UI/UX designers et graphistes" },
        { path: "/modele-cv-infirmiere", label: "Modèle CV Infirmière & Santé", desc: "CV optimisé pour infirmiers, aides-soignants et personnels de santé" },
        { path: "/modele-cv-restauration", label: "Modèle CV Restauration & Serveur", desc: "Modèle dynamique pour serveurs, cuisiniers et métiers de l'hôtellerie" },
        { path: "/modele-cv-chauffeur-livreur", label: "Modèle CV Chauffeur & Logistique", desc: "CV efficace pour chauffeurs livreurs, manutentionnaires et préparateurs" },
        { path: "/modele-cv-secretaire", label: "Modèle CV Secrétaire & Assistant", desc: "Présentation claire pour secrétaires et assistants administratifs" },
        { path: "/modele-cv-vendeur", label: "Modèle CV Vendeur & Caisse", desc: "Valorisez vos compétences en vente, encaissement et conseil client" },
      ]
    },
    {
      category: "Ressources & Guides Candidature",
      icon: BookOpen,
      color: "bg-pink-400",
      links: [
        { path: "/conseils-cv", label: "Guide & Conseils CV 2026", desc: "Toutes les astuces pour réussir son CV et passer les filtres ATS" },
        { path: "/blog", label: "Blog & Actualités Emploi", desc: "Articles, tendances RH et conseils pour votre recherche d'emploi" },
      ]
    },
    {
      category: "Informations Légales & Contact",
      icon: ShieldCheck,
      color: "bg-emerald-400",
      links: [
        { path: "/a-propos", label: "À propos de Mon CV Go", desc: "Notre mission : rendre la création de CV accessible et 100% gratuite" },
        { path: "/contact", label: "Nous Contacter", desc: "Formulaire de contact et assistance utilisateurs" },
        { path: "/mentions-legales", label: "Mentions Légales", desc: "Conditions d'utilisation et informations d'éditeur" },
        { path: "/confidentialite", label: "Politique de Confidentialité", desc: "Engagement RGPD et protection de vos données personnelles" },
      ]
    }
  ];

  const breadcrumbs = [
    { name: "Accueil", url: "https://moncvgo.com/" },
    { name: "Plan du site", url: "https://moncvgo.com/plan-du-site" }
  ];

  return (
    <>
      <SEO 
        title="Plan du Site HTML | Mon CV Go - Navigation Complète" 
        description="Consultez l'ensemble des pages, outils, modèles de CV et ressources de Mon CV Go sur notre plan du site HTML pour une navigation simple et rapide."
        url="https://moncvgo.com/plan-du-site"
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-8 md:p-12 mb-12 transform -rotate-1">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 flex items-center gap-3">
              <FileText className="w-10 h-10 text-cyan-500" strokeWidth={3} />
              Plan du Site Mon CV Go
            </h1>
            <p className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 max-w-3xl">
              Retrouvez l'accès direct et immédiat à toutes les sections de notre plateforme : générateurs de CV, modèles de candidature, espace emploi et guides pratiques.
            </p>
          </div>

          {/* Grid Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {pagesList.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 ${cat.color} text-slate-900 brutal-border brutal-shadow font-black`}>
                        <Icon className="w-6 h-6" strokeWidth={3} />
                      </div>
                      <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        {cat.category}
                      </h2>
                    </div>

                    <ul className="space-y-4">
                      {cat.links.map((item, lIdx) => (
                        <li key={lIdx} className="border-b border-slate-200 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                          <Link 
                            to={item.path} 
                            className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0" />
                            {item.label}
                          </Link>
                          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-6 mt-0.5">
                            {item.desc}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
