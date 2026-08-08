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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
          <button 
            type="button"
            onClick={() => updateConfig('cvLang', 'de')}
            className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all ${
              config.cvLang === 'de' 
                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300 shadow-sm shadow-blue-500/20' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
            }`}
          >
            Deutsch
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2"><LayoutTemplate className="w-4 h-4" /> Modèles de CV Disponibles</span>
          <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-black px-2 py-0.5 rounded-full">{templates100.length} Modèles</span>
        </h2>
        
        {/* Visual Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 max-h-96 overflow-y-auto pr-1 p-1 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          {templates100.map(tpl => {
            const isSelected = config.template === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => updateConfig('template', tpl.id)}
                onMouseEnter={() => setHoveredTemplate(tpl)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onTouchStart={() => setHoveredTemplate(tpl)}
                onTouchEnd={() => setHoveredTemplate(null)}
                className={`relative flex flex-col justify-between p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                  isSelected 
                    ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/30 shadow-md scale-[1.02]' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {tpl.layout}
                    </span>
                    {isSelected && <span className="text-blue-500 font-black text-xs">✓</span>}
                  </div>
                  
                  {/* Mini Preview Box */}
                  <div className="relative aspect-[3/4] w-full bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-2.5 flex items-center justify-center">
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 origin-top scale-[0.15] pointer-events-none bg-white shadow-sm"
                      style={{ width: '794px', height: '1123px' }}
                    >
                      <TemplateModern cvData={demoData[config.cvLang || 'fr']} config={{...config, template: tpl.id}} />
                    </div>
                  </div>

                  <h4 className="text-xs font-black tracking-tight leading-tight text-slate-800 dark:text-slate-100">{tpl.name}</h4>
                </div>
                
                <div className="mt-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-700/50">
                  <span>PDF HD</span>
                  <span className="text-blue-500 group-hover:underline font-extrabold">Aperçu →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Floating Preview Window on Hover */}
        {hoveredTemplate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none md:inset-auto md:bottom-6 md:right-6 md:bg-transparent md:backdrop-blur-none md:z-[100]">
            <div className="w-[280px] h-[400px] md:w-[320px] md:h-[450px] flex flex-col bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 pointer-events-none">
              <div className="bg-blue-600 text-white text-xs font-black uppercase tracking-wider px-3 py-2 text-center z-10 shrink-0 flex items-center justify-between">
                <span>Aperçu en direct</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">{hoveredTemplate.name}</span>
              </div>
              <div className="flex-grow bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden p-2">
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 bg-white origin-top shadow-lg"
                  style={{ width: '794px', height: '1123px', transform: 'scale(0.36)' }}
                >
                  <TemplateModern cvData={cvData?.personal?.name ? cvData : demoData[config.cvLang || 'fr']} config={{...config, template: hoveredTemplate.id}} />
                </div>
              </div>
            </div>
          </div>
        )}
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
