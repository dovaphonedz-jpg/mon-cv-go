import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, Home, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Introuvable (404) | Mon CV Go" 
        description="Oups ! La page que vous recherchez n'existe pas ou a été déplacée. Retrouvez tous nos outils pour créer votre CV gratuit en ligne." 
        url="https://moncvgo.com/404" 
        noindex={true}
      />
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-[#0B1120] px-4 py-16">
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 brutal-border brutal-shadow p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="w-24 h-24 bg-pink-400 text-slate-900 brutal-border brutal-shadow mx-auto flex items-center justify-center font-black text-4xl mb-6 transform -rotate-6">
            404
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-slate-900 dark:text-white mb-4">
            Page Introuvable
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 font-bold text-base sm:text-lg mb-8 leading-relaxed">
            La page que vous essayez d'atteindre n'existe pas ou a changé d'adresse. Pas d'inquiétude, vous pouvez retourner à l'accueil ou commencer votre CV dès maintenant !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/create" 
              className="px-6 py-3.5 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest text-sm brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-2"
            >
              <FilePlus2 className="w-4 h-4" />
              Créer mon CV gratuit
            </Link>
            <Link 
              to="/" 
              className="px-6 py-3.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm brutal-border brutal-shadow brutal-hover flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500">
            Besoin d'aide ? Consultez nos <Link to="/conseils-cv" className="text-cyan-500 underline">Conseils CV</Link> ou notre <Link to="/plan-du-site" className="text-cyan-500 underline">Plan du site</Link>.
          </div>
        </div>
      </div>
    </>
  );
}
