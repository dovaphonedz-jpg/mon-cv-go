import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../../context/ResumeContext';
import { portfolioTemplates } from '../../utils/cvData';
import { Palette, Type, LayoutTemplate, Languages, AlignLeft } from 'lucide-react';

export default function PortfolioStyleForm() {
  const { t } = useTranslation();
  const { config, updateConfig } = useResume();

  // Group templates by layout for the select dropdown
  const groupedTemplates = portfolioTemplates.reduce((acc, template) => {
    if (!acc[template.layout]) acc[template.layout] = [];
    acc[template.layout].push(template);
    return acc;
  }, {});

  const layoutNames = {
    grid: "Grille Créative",
    terminal: "Terminal (MacOS)",
    masonry: "Développeur (Tech Minimal)",
    web: "Moderne (Web Layout)"
  };

  const colors = [
    { id: 'slate', hex: '#64748b' },
    { id: 'gray', hex: '#6b7280' },
    { id: 'zinc', hex: '#71717a' },
    { id: 'neutral', hex: '#737373' },
    { id: 'stone', hex: '#78716c' },
    { id: 'red', hex: '#ef4444' },
    { id: 'orange', hex: '#f97316' },
    { id: 'amber', hex: '#f59e0b' },
    { id: 'yellow', hex: '#eab308' },
    { id: 'lime', hex: '#84cc16' },
    { id: 'green', hex: '#22c55e' },
    { id: 'emerald', hex: '#10b981' },
    { id: 'teal', hex: '#14b8a6' },
    { id: 'cyan', hex: '#06b6d4' },
    { id: 'sky', hex: '#0ea5e9' },
    { id: 'blue', hex: '#3b82f6' },
    { id: 'indigo', hex: '#6366f1' },
    { id: 'violet', hex: '#8b5cf6' },
    { id: 'purple', hex: '#a855f7' },
    { id: 'fuchsia', hex: '#d946ef' },
    { id: 'pink', hex: '#ec4899' },
    { id: 'rose', hex: '#f43f5e' }
  ];

  const fonts = [
    { id: 'inter', name: 'Inter (Moderne)' },
    { id: 'roboto', name: 'Roboto (Classique)' },
    { id: 'poppins', name: 'Poppins (Arrondi)' },
    { id: 'montserrat', name: 'Montserrat (Géo)' },
    { id: 'cairo', name: 'Cairo (Arabe/Latin)' },
    { id: 'tajawal', name: 'Tajawal (Arabe Moderne)' },
    { id: 'playfair', name: 'Playfair Display (Serif)' },
    { id: 'lora', name: 'Lora (Serif Élégant)' },
    { id: 'fira-code', name: 'Fira Code (Tech/Mono)' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Langue du CV */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
          <Languages className="w-4 h-4" /> {t('forms.style.cv_lang')}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <button 
            type="button"
            onClick={() => updateConfig('cvLang', 'fr')}
            className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all ${
              config.cvLang === 'fr' 
                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300 shadow-sm shadow-blue-500/20' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
            }`}
          >
            Français
          </button>
          <button 
            type="button"
            onClick={() => updateConfig('cvLang', 'en')}
            className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all ${
              config.cvLang === 'en' 
                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300 shadow-sm shadow-blue-500/20' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
            }`}
          >
            English
          </button>
          <button 
            type="button"
            onClick={() => updateConfig('cvLang', 'ar')}
            className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all ${
              config.cvLang === 'ar' 
                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300 shadow-sm shadow-blue-500/20' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
            }`}
          >
            العربية (RTL)
          </button>
        </div>
        {config.cvLang === 'ar' && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
            L'aperçu et le PDF seront générés de droite à gauche (RTL) pour l'Arabe.
          </p>
        )}
      </section>

      {/* Sélection du Modèle */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4" /> Modèle du CV
        </h2>
        <div className="relative">
          <select 
            value={config.template} 
            onChange={(e) => updateConfig('template', e.target.value)}
            className="w-full appearance-none rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
          >
            {Object.keys(groupedTemplates).map(layout => (
              <optgroup key={layout} label={layoutNames[layout] || layout}>
                {groupedTemplates[layout].map(tpl => (
                  <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </section>

      <div className="grid sm:grid-cols-2 gap-8">
        {/* Couleur d'accent */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Couleur d'accent
          </h2>
          <div className="flex flex-wrap gap-2">
            {colors.map(c => (
              <button
                key={c.id}
                onClick={() => updateConfig('color', c.id)}
                className={`w-8 h-8 rounded-full transition-transform ${config.color === c.id ? 'scale-125 ring-2 ring-offset-2 ring-blue-500 ring-offset-white dark:ring-offset-slate-900' : 'hover:scale-110'}`}
                style={{ backgroundColor: c.hex }}
                title={c.id}
                type="button"
              />
            ))}
          </div>
        </section>

        {/* Typographie */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
            <Type className="w-4 h-4" /> Typographie
          </h2>
          <div className="relative">
            <select 
              value={config.font} 
              onChange={(e) => updateConfig('font', e.target.value)}
              className="w-full appearance-none rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            >
              {fonts.map(font => (
                <option key={font.id} value={font.id}>{font.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </section>
      </div>

      {/* Espacement */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
          <AlignLeft className="w-4 h-4" /> Espacement
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {['compact', 'normal', 'generous'].map(space => (
            <button
              key={space}
              type="button"
              onClick={() => updateConfig('spacing', space)}
              className={`py-2 px-2 rounded-xl text-sm font-bold border transition-all ${
                config.spacing === space 
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              {space.charAt(0).toUpperCase() + space.slice(1)}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
