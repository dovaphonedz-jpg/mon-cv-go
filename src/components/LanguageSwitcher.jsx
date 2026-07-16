import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="relative group inline-block z-50">
      <button className="flex items-center gap-2 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Changer de langue">
        <Globe className="w-5 h-5" />
        <span className="text-sm font-semibold uppercase">{i18n.language.substring(0, 2)}</span>
      </button>
      
      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
        <div className="py-2">
          <button
            onClick={() => changeLanguage('fr')}
            className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${i18n.language === 'fr' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
          >
            Français
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${i18n.language === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${i18n.language === 'ar' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
          >
            العربية
          </button>
        </div>
      </div>
    </div>
  );
}
