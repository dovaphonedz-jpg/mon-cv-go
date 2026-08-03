import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FilePlus2, Check, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';

const modelesData = {
  'modele-cv-comptable-word': {
    title: 'Modèle de CV Comptable Word & PDF',
    description: 'Découvrez notre modèle de CV gratuit pour comptable, expert-comptable et aide-comptable. Optimisé pour les recruteurs et les logiciels ATS.',
    content: 'En tant que comptable, votre CV doit refléter votre rigueur, votre précision et votre maîtrise des outils financiers. Ce modèle de CV est spécialement conçu pour mettre en valeur vos compétences en comptabilité générale, analytique, ainsi que votre maîtrise des logiciels (Excel, Sage, Cegid).',
    keywords: 'CV comptable, modèle CV comptable gratuit, CV expert-comptable, CV aide-comptable Word, télécharger CV comptable'
  },
  'modele-cv-ingenieur': {
    title: 'Modèle de CV Ingénieur',
    description: 'Créez un CV d\'ingénieur percutant. Modèle gratuit adapté pour ingénieurs informatiques, mécaniques, civils ou généralistes.',
    content: 'Un bon CV d\'ingénieur doit mettre en avant vos compétences techniques (hard skills), vos projets significatifs et votre capacité à résoudre des problèmes complexes. Notre modèle vous aide à structurer clairement votre parcours, de votre formation d\'ingénieur à vos expériences pratiques.',
    keywords: 'CV ingénieur, modèle CV ingénieur, CV ingénieur informatique, CV ingénieur mécanique, exemple CV ingénieur'
  },
  'modele-cv-debutant': {
    title: 'Modèle de CV Débutant / Sans Expérience',
    description: 'Premier emploi ? Utilisez notre modèle de CV pour débutant. Valorisez votre formation, vos soft skills et vos petits boulots.',
    content: 'Rédiger un CV sans expérience professionnelle solide peut sembler difficile. Ce modèle est pensé pour les jeunes diplômés ou les personnes cherchant leur premier emploi. Il met l\'accent sur votre formation, vos projets personnels, vos activités bénévoles et vos compétences interpersonnelles (soft skills).',
    keywords: 'CV débutant, modèle CV sans expérience, premier CV, CV jeune diplômé, exemple CV étudiant'
  },
  'modele-cv-etudiant': {
    title: 'Modèle de CV Étudiant (Job étudiant, Stage)',
    description: 'Le modèle idéal pour trouver un stage, une alternance ou un job étudiant. Structure simple, moderne et efficace.',
    content: 'Ce modèle de CV est parfaitement adapté aux étudiants à la recherche d\'un stage, d\'un job d\'été ou d\'une alternance. Mettez en valeur votre parcours académique, vos centres d\'intérêt pertinents et votre motivation à apprendre sur le terrain.',
    keywords: 'CV étudiant, modèle CV stage, CV job étudiant, CV alternance, créer CV étudiant'
  },
  'modele-cv-commercial': {
    title: 'Modèle de CV Commercial & Vente',
    description: 'Modèle de CV pour commerciaux, vendeurs et technico-commerciaux. Mettez en avant vos résultats et vos compétences en négociation.',
    content: 'Pour un poste de commercial, votre CV doit démontrer votre dynamisme, votre force de persuasion et vos résultats concrets (chiffre d\'affaires, objectifs atteints). Utilisez ce modèle pour structurer vos succès et prouver votre capacité à développer un portefeuille client.',
    keywords: 'CV commercial, modèle CV vente, CV technico-commercial, CV vendeur, exemple CV commercial'
  }
};

export default function ModelePage() {
  const location = useLocation();
  const path = location.pathname.substring(1); // Enlève le '/' initial
  const model = modelesData[path] || modelesData['modele-cv-debutant']; // Fallback

  return (
    <>
      <SEO title={`${model.title} | Mon CV Go`} description={model.description} />
      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white dark:bg-slate-900 brutal-border brutal-shadow p-8 md:p-12 mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
              {model.title}
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 font-bold mb-8 leading-relaxed">
              {model.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/create" className="px-8 py-4 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-2 transform -rotate-1">
                <FilePlus2 className="w-5 h-5" strokeWidth={3} />
                Créer ce CV
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 prose prose-lg prose-slate dark:prose-invert">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Pourquoi choisir ce modèle ?</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{model.content}</p>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Caractéristiques :</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Check className="text-green-500 w-5 h-5" /> 100% Gratuit et sans inscription</li>
                <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Check className="text-green-500 w-5 h-5" /> Optimisé pour les ATS (logiciels RH)</li>
                <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Check className="text-green-500 w-5 h-5" /> Téléchargement immédiat en PDF</li>
                <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Check className="text-green-500 w-5 h-5" /> Design moderne et professionnel</li>
              </ul>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Partagez ce modèle</h3>
                <SocialShare url={`https://www.moncvgo.com/${path}`} title={model.title} />
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded-xl border border-pink-200 dark:border-pink-800 sticky top-28">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Prêt à décrocher des entretiens ?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Ne perdez plus de temps sur Word. Remplissez vos informations en 5 minutes et téléchargez un CV parfait.</p>
                <Link to="/create" className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                  Commencer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
