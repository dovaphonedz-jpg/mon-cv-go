import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('moncvgo_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('moncvgo_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-start sm:items-center">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 hidden sm:block">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Nous respectons votre vie privée</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Nous utilisons des cookies et d'autres technologies de suivi (comme Google AdSense) pour améliorer votre expérience de navigation sur notre site, afficher des publicités personnalisées et analyser le trafic. En cliquant sur "Accepter", vous consentez à l'utilisation de ces cookies. 
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">En savoir plus</Link>.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto shrink-0">
          <button 
            onClick={() => setShow(false)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition-colors"
          >
            Refuser
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all"
          >
            Accepter
          </button>
        </div>
        
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 sm:hidden">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
