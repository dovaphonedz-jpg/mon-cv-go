import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../../context/ResumeContext';
import { templates100, demoData } from '../../utils/cvData';
import { Palette, Type, LayoutTemplate, Languages, AlignLeft, Minimize2 } from 'lucide-react';
import TemplateModern from '../cv-templates/TemplateModern';

export default function StyleForm() {
  const { t } = useTranslation();
  const { config, updateConfig, cvData } = useResume();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Group templates by layout for the select dropdown
  const groupedTemplates = templates100.reduce((acc, template) => {
    if (!acc[template.layout]) acc[template.layout] = [];
    acc[template.layout].push(template);
    return acc;
  }, {});

  const layoutNames = {
    glassmorphism: "🔥 Ultra-Moderne : Glassmorphism",
    neon: "🔥 Ultra-Moderne : Cyberpunk Neon",
    neobrutalism: "🔥 Ultra-Moderne : Néo-Brutalisme",
    "dark-minimal": "🔥 Ultra-Moderne : Dark Minimal",
    typographic: "🔥 Ultra-Moderne : Typographique",
    minimalist: "Minimaliste",
    classic: "Classique",
    creative: "Créatif",
    grid: "Design Grille",
    executive: "Exécutif",
    banner: "Bannière",
    elegant: "Élégant Serif",
    modern: "Moderne",
    timeline: "Chronologique",
    sidebarRight: "Sidebar Droite",
    split: "50/50 Split",
    centered: "Centré",
    compact: "Ultra-Compact",
    portfolio: "Portfolio",
    corporate: "Corporate",
    startup: "Startup",
    academic: "Académique",
    infographic: "Infographie",
    gradient: "Gradient",
    hybrid: "Hybride"
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
        <div className="flex gap-3 items-center relative">
          <div className="relative flex-grow" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            >
              <span className="truncate">
                {templates100.find(t => t.id === config.template)?.name || 'Sélectionnez un modèle'}
              </span>
              <svg className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-80 overflow-y-auto">
                {Object.keys(groupedTemplates).map(layout => (
                  <div key={layout} className="py-1">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                      {layoutNames[layout] || layout}
                    </div>
                    {groupedTemplates[layout].map(tpl => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => { updateConfig('template', tpl.id); setIsDropdownOpen(false); }}
                        onMouseEnter={() => setHoveredTemplate(tpl)}
                        onMouseLeave={() => setHoveredTemplate(null)}
                        onTouchStart={() => setHoveredTemplate(tpl)}
                        onTouchEnd={() => setHoveredTemplate(null)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${config.template === tpl.id ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        {tpl.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Fenêtre volante d'aperçu détaillé au survol d'une option */}
          {hoveredTemplate && isDropdownOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none md:inset-auto md:bottom-6 md:left-6 md:bg-transparent md:backdrop-blur-none md:z-[100]">
              <div className="w-[280px] h-[400px] md:w-[300px] md:h-[420px] flex flex-col bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 pointer-events-none">
              <div className="bg-blue-500 text-white text-xs font-bold px-3 py-2 text-center z-10 shrink-0">
                Aperçu : {hoveredTemplate.name}
              </div>
              <div className="flex-grow bg-slate-50 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 bg-white origin-top-left hidden md:block"
                    style={{ width: '794px', height: '1123px', transform: 'scale(0.35)' }}
                  >
                    <TemplateModern cvData={demoData[config.cvLang || 'fr']} config={{...config, template: hoveredTemplate.id}} />
                  </div>
                  <div 
                    className="absolute top-0 left-0 bg-white origin-top-left md:hidden"
                    style={{ width: '794px', height: '1123px', transform: 'scale(0.35)' }}
                  >
                    <TemplateModern cvData={demoData[config.cvLang || 'fr']} config={{...config, template: hoveredTemplate.id}} />
                  </div>
              </div>
            </div>
            </div>
          )}
          
          {/* Miniature visuelle du modèle */}
          {(() => {
            const currentTpl = templates100.find(t => t.id === config.template) || templates100[0];
            const L = currentTpl.layout;
            return (
              <div className="w-12 h-14 shrink-0 bg-white border-2 border-slate-200 dark:border-slate-600 rounded-md shadow-sm overflow-hidden flex flex-col" title={`Aperçu: ${L}`}>
                {L === 'sidebarRight' && (
                  <div className="flex w-full h-full"><div className="w-2/3 h-full bg-slate-100 p-1"><div className="w-full h-1 bg-slate-300 mb-1 rounded-sm"/><div className="w-1/2 h-1 bg-slate-200 rounded-sm"/></div><div className="w-1/3 h-full bg-slate-300"></div></div>
                )}
                {L === 'creative' && (
                  <div className="flex w-full h-full"><div className="w-1/3 h-full bg-slate-300"></div><div className="w-2/3 h-full bg-slate-100 p-1"><div className="w-full h-1 bg-slate-300 mb-1 rounded-sm"/><div className="w-1/2 h-1 bg-slate-200 rounded-sm"/></div></div>
                )}
                {L === 'split' && (
                  <div className="flex w-full h-full"><div className="w-1/2 h-full bg-slate-300 p-1"></div><div className="w-1/2 h-full bg-slate-100 p-1"><div className="w-full h-1 bg-slate-200 mb-1"></div></div></div>
                )}
                {L === 'banner' && (
                  <div className="w-full h-full flex flex-col"><div className="w-full h-4 bg-slate-300"></div><div className="w-full flex-grow bg-slate-100 p-1"><div className="w-3/4 h-1 bg-slate-200 mb-1"></div></div></div>
                )}
                {L === 'centered' && (
                  <div className="w-full h-full flex flex-col items-center p-1 bg-slate-100"><div className="w-6 h-1 bg-slate-300 rounded-sm mb-1"></div><div className="w-10 h-0.5 bg-slate-200 rounded-sm mb-1"></div><div className="w-full h-0.5 bg-slate-200 mt-1"></div></div>
                )}
                {['glassmorphism', 'neon', 'neobrutalism', 'dark-minimal', 'modern', 'minimalist', 'classic', 'typographic'].includes(L) && (
                  <div className="w-full h-full flex flex-col p-1 bg-slate-100"><div className="w-6 h-2 bg-slate-300 mb-1 rounded-sm"></div><div className="w-full h-0.5 bg-slate-200 mb-1"></div><div className="w-3/4 h-0.5 bg-slate-200 mb-1"></div><div className="w-full h-0.5 bg-slate-200"></div></div>
                )}
                {/* Fallback */}
                {!['sidebarRight', 'creative', 'split', 'banner', 'centered', 'glassmorphism', 'neon', 'neobrutalism', 'dark-minimal', 'modern', 'minimalist', 'classic', 'typographic'].includes(L) && (
                  <div className="w-full h-full flex flex-col p-1 bg-slate-100"><div className="w-1/2 h-2 bg-slate-300 mb-1"></div><div className="w-full flex-grow bg-slate-200"></div></div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Ajustement automatique 1 Page */}
      <section>
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2 mb-1">
              <Minimize2 className="w-4 h-4" /> Ajustement 1 Page (Auto-Fit)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ajuste automatiquement la taille du texte et des espaces pour faire tenir tout le CV sur une seule page A4.
            </p>
          </div>
          <button
            type="button"
            onClick={() => updateConfig('autoFit', config.autoFit === false ? true : false)}
            className={`px-3 py-2 shrink-0 rounded-xl text-xs font-bold transition-all border ${
              config.autoFit !== false
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-400 dark:text-emerald-300 shadow-sm'
                : 'bg-white border-slate-300 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
            }`}
          >
            {config.autoFit !== false ? 'Activé ✨' : 'Désactivé'}
          </button>
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
