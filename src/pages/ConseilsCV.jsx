import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

export default function ConseilsCV() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'fr';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const CATEGORIES = [
    { id: 'all', label: 'Tous les conseils', icon: Sparkles },
    { id: 'structure', label: 'Créer un CV & Structure', icon: FilePlus2, link: '/modele-cv-gratuit' },
    { id: 'debutant', label: 'CV Débutant & Sans Expérience', icon: GraduationCap, link: '/cv-debutant' },
    { id: 'etudiant', label: 'CV Étudiant & Stage', icon: BookOpen, link: '/cv-etudiant' },
    { id: 'ingenieur', label: 'CV Ingénieur & Technique', icon: Award, link: '/cv-ingenieur' },
    { id: 'informatique', label: 'CV Informatique & Dev', icon: Code, link: '/cv-informatique' },
    { id: 'ats', label: 'Logiciels ATS & Mots-clés', icon: ShieldCheck, link: '/cv-ats' },
    { id: 'lettre', label: 'Lettre de Motivation', icon: PenLine, link: '/lettre-motivation' }
  ];

  const breadcrumbs = [
    { name: 'Accueil', url: 'https://moncvgo.com/' },
    { name: 'Conseils CV', url: 'https://moncvgo.com/conseils-cv' }
  ];

  const adviceSections = [
    {
      category: 'structure',
      badge: 'Bases & Méthode',
      title: 'Comment faire un CV professionnel en 2026 : La méthode étape par étape',
      intro: 'Un recruteur passe en moyenne entre 6 et 10 secondes sur une première lecture. Votre document doit respecter une hiérarchie visuelle irréprochable et contenir les informations essentielles sans fioritures inutiles.',
      dos: [
        'Organiser le CV en rubriques claires : En-tête, Accroche, Expériences, Formations, Compétences, Langues.',
        'Limiter votre document à une seule page pour les profils ayant moins de 10 ans d\'expérience.',
        'Télécharger au format PDF pour conserver une mise en page parfaite sur tout appareil.',
        'Utiliser des polices modernes et lisibles (Inter, Roboto, Arial) avec une taille de 10 à 12pt pour le texte courant.'
      ],
      donts: [
        'Utiliser plus de 2 couleurs différentes ou des polices exotiques illisibles.',
        'Mettre des jauges de compétences en pourcentage sans valeur normative.',
        'Envoyer un fichier Word modifiable qui risque de se décaler.',
        'Oublier de relire le document à tête reposée pour traquer la moindre faute d\'orthographe.'
      ],
      cta: { label: 'Créer mon CV maintenant', url: '/create' }
    },
    {
      category: 'accroche',
      badge: 'Impact Immédiat',
      title: 'Rédiger une phrase d\'accroche percutante et captivante',
      intro: 'Le résumé de profil (ou phrase d\'accroche) est le premier texte lu après votre nom. Situé sous votre titre de métier, il synthétise en 3 à 4 lignes votre valeur ajoutée, votre spécialité et vos objectifs.',
      dos: [
        'Commencer par votre titre de poste et vos années d\'expérience.',
        'Mentionner vos spécialisations clés ou votre secteur de prédilection.',
        'Citer une réussite concrète ou un résultat marquant chiffré.',
        'Préciser ce que vous recherchez et ce que vous apportez à l\'entreprise.'
      ],
      donts: [
        'Utiliser des formules creuses comme "Très motivé et dynamique, je cherche un emploi".',
        'Rédiger un pavé de plus de 5 lignes qui alourdit l\'en-tête.',
        'Oublier de personnaliser l\'accroche en fonction de l\'offre postulée.'
      ],
      cta: { label: 'Voir des exemples d\'accroches', url: '/exemple-cv' }
    },
    {
      category: 'experience',
      badge: 'Preuve par les Faits',
      title: 'Expériences professionnelles : La méthode CAR (Contexte - Action - Résultat)',
      intro: 'Les recruteurs ne cherchent pas à lire une simple fiche de poste recopiée. Ils veulent comprendre quel a été votre impact réel. Chaque puce de votre CV doit démontrer une valeur créée.',
      dos: [
        'Utiliser la formule : Verbe d\'action fort + Tâche précise + Résultat mesuré.',
        'Quantifier avec des chiffres : pourcentages d\'amélioration, chiffre d\'affaires généré, budget géré, équipe encadrée.',
        'Ordonner vos expériences par ordre anti-chronologique strict (la plus récente en haut).',
        'Indiquer clairement les technologies, outils ou méthodes utilisés pour chaque projet.'
      ],
      donts: [
        'Lister passivement des tâches quotidiennes ("Répondre au téléphone", "Faire des réunions").',
        'Laisser des trous inexpliqués de plusieurs années sans justification claire.',
        'Utiliser le pronom "Je" dans les listes à puces.'
      ],
      cta: { label: 'Modèles de CV Gratuits', url: '/modele-cv-gratuit' }
    },
    {
      category: 'competences',
      badge: 'Hard & Soft Skills',
      title: 'Compétences : Trouver le juste équilibre entre Hard Skills et Soft Skills',
      intro: 'Les compétences techniques (Hard Skills) permettent de passer les premiers filtres de sélection, tandis que les compétences comportementales (Soft Skills) vous font réussir l\'entretien d\'embauche.',
      dos: [
        'Séparer distinctement les compétences techniques (outils, langages, normes) des qualités relationnelles.',
        'Adapter vos compétences aux exigences spécifiques de l\'offre d\'emploi.',
        'Préciser votre niveau sur les logiciels clés (Notions, Intermédiaire, Avancé, Expert).',
        'Illustrer vos soft skills par des exemples concrets lors de l\'entretien.'
      ],
      donts: [
        'Aligner 40 mots-clés sans hiérarchie ni cohérence avec le poste.',
        'Déclarer être "Expert" sur un outil que vous n\'avez utilisé qu\'une seule fois.',
        'Négliger les soft skills indispensables comme l\'adaptabilité, la communication et l\'esprit d\'équipe.'
      ],
      cta: { label: 'Optimiser mes compétences ATS', url: '/cv-ats' }
    },
    {
      category: 'ats',
      badge: 'Technologie RH',
      title: 'Optimisation ATS : Comment franchir les logiciels de tri automatique',
      intro: 'Plus de 80% des grandes entreprises filtrent les candidatures via des logiciels ATS. Si votre CV n\'est pas lisible par ces robots, il sera rejeté avant d\'arriver sur le bureau du recruteur.',
      dos: [
        'Reprendre les termes exacts et mots-clés mentionnés dans l\'annonce.',
        'Utiliser des titres de sections universels (Expérience professionnelle, Formation, Compétences).',
        'Tester votre score de complétude avec notre jauge de Score ATS en direct sur MonCVGo.',
        'Générer un PDF vectoriel propre sans texte incrusté dans des images.'
      ],
      donts: [
        'Mettre des mots-clés en texte blanc caché (sanctionné immédiatement par les algorithmes).',
        'Placer des données capitales exclusivement dans des en-têtes ou pieds de page.',
        'Utiliser des tableaux imbriqués ou des colonnes graphiques complexes non reconnues.'
      ],
      cta: { label: 'Guide complet CV ATS', url: '/cv-ats' }
    },
    {
      category: 'debutant',
      badge: 'Jeunes & Sans Expérience',
      title: 'Réussir son CV quand on est débutant ou sans expérience préalable',
      intro: 'Tout le monde commence un jour. Même sans un long historique professionnel, vos études, vos projets associatifs, vos stages et vos centres d\'intérêt témoignent de votre sérieux et de votre dynamisme.',
      dos: [
        'Placer la rubrique Formations et Projets académiques en haut du document.',
        'Détailler vos projets d\'école, mémoires, exposés ou réalisations associatives.',
        'Mettre en avant les compétences acquises lors de jobs étudiants (sens du service, ponctualité, rigueur).',
        'Soigner particulièrement l\'accroche et joindre une lettre de motivation personnalisée.'
      ],
      donts: [
        'Laisser le CV à moitié vide : comblez avec vos compétences informatiques, linguistiques et centres d\'intérêt précis.',
        'Inventer des expériences factices qui vous mettront en difficulté lors de l\'entretien.',
        'Minimiser vos stages de découverte.'
      ],
      cta: { label: 'Guide CV Sans Expérience', url: '/cv-sans-experience' }
    },
    {
      category: 'lettre',
      badge: 'Candidature Complète',
      title: 'Comment rédiger une lettre de motivation qui donne envie de lire votre CV',
      intro: 'La lettre de motivation apporte le contexte humain, explique vos motivations profondes et montre votre compréhension des enjeux de l\'entreprise convoitée.',
      dos: [
        'Structurer la lettre selon le schéma classique "Vous - Moi - Nous".',
        'Montrer que vous vous êtes renseigné sur l\'entreprise, ses valeurs et ses projets récents.',
        'Rester concis et percutant : une seule page de 3 à 4 paragraphes bien aérés.',
        'Terminer par une proposition d\'entretien dynamique.'
      ],
      donts: [
        'Répéter mot pour mot le contenu de votre CV.',
        'Utiliser une lettre type impersonnelle sans changer le nom de l\'entreprise.',
        'Faire une lettre trop longue qui décourage la lecture.'
      ],
      cta: { label: 'Générateur de Lettre de Motivation', url: '/lettre-motivation' }
    },
    {
      category: 'erreurs',
      badge: 'Checklist Finale',
      title: 'Les 7 erreurs fatales à éliminer avant d\'envoyer votre candidature',
      intro: 'Faites une vérification minutieuse avant chaque envoi. Une simple erreur d\'inattention peut réduire à néant des heures de travail.',
      dos: [
        'Vérifier que votre numéro de téléphone et votre adresse email sont 100% exacts.',
        'Vérifier que les dates d\'expériences sont cohérentes et sans chevauchement illogique.',
        'Exporter au nom de fichier clair : "CV_Prenom_Nom_Poste.pdf".',
        'Faire relire par une tierce personne pour traquer les coquilles.'
      ],
      donts: [
        'Nommer votre fichier "CV_version_finale_def_2.pdf".',
        'Mettre une photo de mauvaise qualité, sombre ou prise en soirée.',
        'Envoyer la même candidature à 50 entreprises sans adaptation.'
      ],
      cta: { label: 'Créer mon CV parfait', url: '/create' }
    }
  ];

  const glossaryTerms = [
    { term: "ATS (Applicant Tracking System)", def: "Logiciel de gestion et de tri automatique des candidatures utilisé par les services RH pour filtrer les CV selon des mots-clés spécifiques." },
    { term: "Hard Skills", def: "Compétences techniques professionnelles acquises par la formation ou l'expérience (ex: programmation, comptabilité, CAO, langues)." },
    { term: "Soft Skills", def: "Compétences comportementales et relationnelles (ex: esprit d'équipe, intelligence émotionnelle, adaptabilité, leadership)." },
    { term: "Méthode CAR", def: "Technique de rédaction (Contexte, Action, Résultat) permettant de prouver l'impact de vos réalisations avec des données chiffrées." },
    { term: "Accroche / Profil", def: "Court paragraphe de 3 à 4 lignes situé sous l'en-tête résumant votre proposition de valeur pour le poste ciblé." },
    { term: "Portfolio", def: "Présentation visuelle de vos réalisations concrètes (projets web, maquettes, plans, articles) pour appuyer votre CV." }
  ];

  const filteredSections = selectedCategory === 'all' 
    ? adviceSections 
    : adviceSections.filter(s => s.category === selectedCategory || selectedCategory === 'all');

  return (
    <>
      <SEO 
        title="Conseils CV : Exemples et Astuces pour Réussir son CV | Mon CV Go" 
        description="Conseils d'experts pour réussir votre CV professionnel : structure idéale, optimisation ATS, compétences, accroches percutantes et modèles gratuits." 
        url="https://moncvgo.com/conseils-cv"
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-500 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">Conseils CV</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-6 sm:p-10 md:p-12 mb-10 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border mb-6 transform -rotate-1">
              <BookOpen className="w-4 h-4 text-slate-900" />
              Guide Éditorial Recrutement 2026
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
              Conseils CV : réussir son CV professionnel
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
              Découvrez les meilleures pratiques et astuces de recruteurs pour concevoir un Curriculum Vitae qui attire l'attention, passe les filtres ATS et débouche sur des entretiens d'embauche.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/create" className="px-6 py-3.5 bg-yellow-400 text-slate-900 font-black uppercase text-xs sm:text-sm tracking-wider brutal-border brutal-shadow brutal-hover flex items-center gap-2 transform -rotate-1">
                <FilePlus2 className="w-4 h-4" />
                Créer mon CV gratuitement
              </Link>
              <Link to="/modele-cv-gratuit" className="px-6 py-3.5 bg-cyan-400 text-slate-900 font-black uppercase text-xs sm:text-sm tracking-wider brutal-border brutal-shadow brutal-hover flex items-center gap-2 transform rotate-1">
                <Layers className="w-4 h-4" />
                Voir les modèles de CV
              </Link>
            </div>
          </div>

          <AdSenseUnit />

          {/* Category Navigation Pills */}
          <div className="my-10 bg-white dark:bg-slate-900 p-4 sm:p-6 brutal-border brutal-shadow">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-pink-500" />
              Explorer les catégories de conseils :
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
                    <Link to={sec.cta.url} className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      {sec.cta.label} <ArrowRight className="w-3 h-3" />
                    </Link>
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
                      À FAIRE (Bonnes Pratiques)
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
                      À ÉVITER (Erreurs Fréquentes)
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
                Guides spécialisés par profil et situation
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-center max-w-2xl mx-auto mb-8 text-sm sm:text-base">
                Chaque profil possède ses spécificités. Consultez nos dossiers complets rédigés pour vous guider pas à pas :
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'CV Ingénieur & Technique', url: '/cv-ingenieur', desc: 'Structure et réalisations CAR pour ingénieurs confirmés' },
                  { label: 'CV Ingénieur Débutant', url: '/cv-ingenieur-debutant', desc: 'Valoriser son PFE, ses stages et son diplôme CTI' },
                  { label: 'CV Étudiant & Alternance', url: '/cv-etudiant', desc: 'Modèles pour stages, alternances et jobs d\'été' },
                  { label: 'CV Sans Expérience', url: '/cv-sans-experience', desc: 'Miser sur les compétences transversales et le potentiel' },
                  { label: 'CV Débutant / Premier Emploi', url: '/cv-debutant', desc: 'Conseils pour réussir son entrée sur le marché du travail' },
                  { label: 'CV Compatible ATS', url: '/cv-ats', desc: 'Passez les filtres des logiciels de recrutement RH' },
                  { label: 'Exemples de CV Gratuits', url: '/exemple-cv', desc: 'Plus de 50 modèles professionnels à télécharger' },
                  { label: 'Modèles de CV PDF Gratuits', url: '/modele-cv-gratuit', desc: 'Designs épurés, modernes et exécutifs 100% gratuits' },
                  { label: 'CV Informatique & Dev', url: '/cv-informatique', desc: 'Stack technique, dépôts GitHub et projets web' },
                  { label: 'CV Professionnel de Référence', url: '/cv-professionnel', desc: 'Les normes 2026 pour un CV validé par les recruteurs' },
                  { label: 'Générateur Lettre de Motivation', url: '/lettre-motivation', desc: 'Rédigez une lettre de candidature percutante' },
                  { label: 'Studio Photo CV IA', url: '/studio-photo', desc: 'Détourez et améliorez votre photo de profil gratuitement' }
                ].map((g, gi) => (
                  <Link
                    key={gi}
                    to={g.url}
                    className="p-4 bg-slate-50 dark:bg-slate-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-slate-900 group transition-all brutal-border"
                  >
                    <h3 className="font-black text-sm uppercase mb-1 text-slate-900 dark:text-white group-hover:text-slate-900 flex items-center justify-between">
                      <span>{g.label}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-800 font-medium">
                      {g.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Glossary Section */}
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-10 brutal-border brutal-shadow mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2 text-center">
              Le Glossaire du Chercheur d'Emploi
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center font-bold text-sm max-w-xl mx-auto mb-8">
              Les termes clés du recrutement moderne expliqués simplement.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {glossaryTerms.map((term, ti) => (
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
              Partagez ces conseils avec vos contacts en recherche d'emploi
            </h3>
            <SocialShare url="https://moncvgo.com/conseils-cv" title="Conseils CV : réussir son CV professionnel | Mon CV Go" />
          </div>

        </div>
      </div>
    </>
  );
}
