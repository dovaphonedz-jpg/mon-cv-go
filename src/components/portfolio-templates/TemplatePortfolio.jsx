import React from 'react';
import { portfolioTemplates, translations } from '../../utils/cvData';

export default function TemplatePortfolio({ cvData, config }) {
  const { personal, summary, projects = [], skills, languages } = cvData;
  const { color, font, fontSize, template } = config;

  const activeTemplate = portfolioTemplates.find(t => t.id === template) || portfolioTemplates[0];
  const { layout } = activeTemplate;
  const t = translations[config.cvLang || 'fr'];

  const fontClass = `font-${font}`;
  
  // Tailwind color mappings
  const colorMap = {
    slate: '#64748b', gray: '#6b7280', zinc: '#71717a', neutral: '#737373', stone: '#78716c',
    red: '#ef4444', orange: '#f97316', amber: '#f59e0b', yellow: '#eab308', lime: '#84cc16',
    green: '#22c55e', emerald: '#10b981', teal: '#14b8a6', cyan: '#06b6d4', sky: '#0ea5e9',
    blue: '#3b82f6', indigo: '#6366f1', violet: '#8b5cf6', purple: '#a855f7', fuchsia: '#d946ef',
    pink: '#ec4899', rose: '#f43f5e'
  };
  const themeColor = colorMap[color] || '#3b82f6';

  const getScale = () => fontSize === 'small' ? '0.9em' : fontSize === 'large' ? '1.1em' : '1em';

  // HELPER COMPONENTS
  const SafeText = ({ text }) => text ? <>{text}</> : null;

  // LAYOUT 1: GRID (Bento Dark Grille)
  if (layout === 'grid') {
    const isCompact = projects.length > 2;

    return (
      <div className={`cv-page ${fontClass} bg-[#0a0f1c] text-slate-300 relative w-full h-full min-h-[297mm] box-border p-6 transition-all duration-300 flex flex-col`} style={{ fontSize: getScale() }}>
        
        {/* BENTO GRID CONTAINER */}
        <div className="grid grid-cols-3 gap-4 max-w-full mx-auto content-start flex-grow w-full">
          
          {/* 1. HERO PROFILE (Spans 2 columns) */}
          <div className="col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-800 flex flex-row items-center gap-6 shadow-xl group hover:border-[var(--theme-color)] transition-all duration-500 hover:shadow-[0_0_20px_-5px_var(--theme-color)]" style={{ '--theme-color': themeColor }}>
            {personal.photo ? (
              <img src={personal.photo} alt={personal.name} className="w-24 h-24 rounded-2xl object-cover shadow-2xl border border-slate-700 flex-shrink-0" />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center text-slate-500">
                <span className="text-3xl font-bold">{personal.name?.charAt(0)}</span>
              </div>
            )}
            <div className="text-left flex-grow overflow-hidden">
              <div className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full mb-2 border border-emerald-500/20">
                ● Disponible
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1 text-white truncate w-full">{personal.name}</h1>
              <h2 className="text-lg font-medium truncate w-full" style={{ color: themeColor }}>{personal.title}</h2>
            </div>
          </div>

          {/* 2. CONTACT INFO (Spans 1 column) */}
          <div className="col-span-1 bg-slate-900/50 backdrop-blur-sm rounded-3xl p-5 border border-slate-800 flex flex-col justify-center gap-3 shadow-xl group hover:border-[var(--theme-color)] transition-all duration-500 hover:shadow-[0_0_20px_-5px_var(--theme-color)]" style={{ '--theme-color': themeColor }}>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contact</h3>
            {personal.email && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-800 flex-shrink-0" style={{ color: themeColor }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="truncate">{personal.email}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-800 flex-shrink-0" style={{ color: themeColor }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="truncate">{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-800 flex-shrink-0" style={{ color: themeColor }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <span className="truncate">{personal.website}</span>
              </div>
            )}
          </div>

          {/* 3. SUMMARY & SKILLS */}
          {summary && (
            <div className="col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-[var(--theme-color)] transition-all duration-500 hover:shadow-[0_0_20px_-5px_var(--theme-color)]" style={{ '--theme-color': themeColor }}>
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-500" style={{ backgroundColor: themeColor }}></div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">À Propos</h3>
              <p className="text-slate-300 leading-relaxed relative z-10 text-sm">{summary}</p>
            </div>
          )}
          
          {skills.length > 0 && (
            <div className={`col-span-1 bg-slate-900/50 backdrop-blur-sm rounded-3xl p-5 border border-slate-800 shadow-xl group hover:border-[var(--theme-color)] transition-all duration-500 hover:shadow-[0_0_20px_-5px_var(--theme-color)] ${!summary ? 'col-span-3' : ''}`} style={{ '--theme-color': themeColor }}>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{t.skills}</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 font-medium text-xs flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: themeColor }}></div>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 4. PROJECTS (Dynamic Grid) */}
          {projects.length > 0 && (
            <div className="col-span-3 mt-2">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-1 rounded-full" style={{ backgroundColor: themeColor }}></span>
                {t.projects}
              </h3>
              <div className={`grid ${isCompact ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {projects.map((proj, idx) => (
                  <div key={idx} className={`bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 flex flex-col h-full group shadow-xl transition-all duration-500 hover:border-[var(--theme-color)] hover:shadow-[0_0_20px_-5px_var(--theme-color)] ${isCompact ? 'p-4' : 'p-5'}`} style={{ '--theme-color': themeColor }}>
                    {proj.image && (
                      <div className={`w-full ${isCompact ? 'h-24' : 'h-36'} mb-3 rounded-xl overflow-hidden relative`}>
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <h4 className={`${isCompact ? 'text-base' : 'text-lg'} font-bold text-white mb-1 group-hover:text-[var(--theme-color)] transition-colors truncate w-full`} style={{ '--theme-color': themeColor }}>{proj.title}</h4>
                    {proj.techStack && (
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: themeColor }}>
                        {proj.techStack}
                      </div>
                    )}
                    <p className={`text-slate-400 ${isCompact ? 'text-[10px]' : 'text-xs'} leading-relaxed mb-4 flex-grow ${isCompact ? 'line-clamp-2' : 'line-clamp-3'}`}>{proj.description}</p>
                    {proj.link && (
                      <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors mt-auto w-max">
                        Voir le projet 
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 flex justify-between items-center text-slate-500 text-[10px] w-full">
          <p>© {new Date().getFullYear()} {personal.name || 'Portfolio'}. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            <span>Propulsé par</span>
            <span className="font-bold text-slate-400">MonCvGo</span>
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 2: TERMINAL (Mac OS Hacker) & MASONRY (Tech Minimal)
  if (layout === 'masonry' || layout === 'terminal') {
    const isCompact = projects.length > 2;

    return (
      <div className={`cv-page ${fontClass} bg-slate-950 text-slate-300 relative w-full h-full min-h-[297mm] box-border p-8 transition-all duration-300 flex flex-col overflow-hidden`} style={{ fontSize: getScale() }}>
        
        {/* Glowing Background Orbs (Like Homepage) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--theme-color)] opacity-[0.15] blur-[100px] pointer-events-none" style={{ '--theme-color': themeColor }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--theme-color)] opacity-[0.1] blur-[100px] pointer-events-none" style={{ '--theme-color': themeColor }}></div>

        {/* Mac OS Window Header (Terminal Only) */}
        {layout === 'terminal' && (
          <div className="flex justify-between items-center mb-8 relative z-10 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-xl px-4 py-2.5 shadow-lg">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-inner"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-inner"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-inner"></div>
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }}></span>
              Terminal — {personal.name?.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}
            </div>
            <div className="w-12"></div> {/* Spacer for centering */}
          </div>
        )}

        <div className="flex-grow max-w-full mx-auto w-full relative z-10">
          {/* HERO SECTION */}
          <div className="border-b border-slate-800/80 pb-6 mb-6">
            <div className="flex items-start gap-6">
              {personal.photo && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-[var(--theme-color)] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl" style={{ '--theme-color': themeColor }}></div>
                  <img src={personal.photo} alt={personal.name} className="w-24 h-24 rounded-xl object-cover border border-slate-700 group-hover:border-[var(--theme-color)] grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10" style={{ '--theme-color': themeColor }} />
                </div>
              )}
              <div className="flex-grow">
                <h1 className="text-4xl font-black tracking-tighter text-white mb-1 flex items-center gap-3">
                  <span className="text-[var(--theme-color)]">#</span>
                  {personal.name}
                </h1>
                <h2 className="text-xl font-mono mb-3" style={{ color: themeColor }}>
                  {personal.title} <span className="animate-[pulse_1s_ease-in-out_infinite]">_</span>
                </h2>
                
                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                  {personal.email && (
                    <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {personal.email}
                    </span>
                  )}
                  {personal.website && (
                    <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      {personal.website}
                    </span>
                  )}
                  {personal.location && (
                    <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {personal.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {summary && (
              <div className="mt-5 text-slate-400 text-sm leading-relaxed border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <span className="font-mono text-[10px] uppercase tracking-widest block mb-1 opacity-60 text-slate-500">// {t.profile}</span>
                <p>{summary}</p>
              </div>
            )}
          </div>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest block mb-3 opacity-60 text-slate-500">// {t.skills}</span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded hover:border-[var(--theme-color)] text-slate-300 font-mono text-xs transition-colors cursor-default" style={{ '--theme-color': themeColor }}>
                    <span className="opacity-50 mr-1.5">{'<'}</span>
                    {skill.name}
                    <span className="opacity-50 ml-1.5">{'/>'}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest block mb-4 opacity-60 text-slate-500">// {t.projects}</span>
              <div className={`grid ${isCompact ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {projects.map((proj, idx) => (
                  <div key={idx} className={`bg-slate-900/40 border border-slate-800/80 rounded-xl relative overflow-hidden group hover:border-[var(--theme-color)] transition-all duration-300 hover:shadow-[0_4px_20px_-10px_var(--theme-color)] flex flex-col ${isCompact ? 'p-3.5' : 'p-5'}`} style={{ '--theme-color': themeColor }}>
                    
                    {/* glowing left indicator */}
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-slate-800 group-hover:bg-[var(--theme-color)] transition-colors duration-300" style={{ '--theme-color': themeColor }}></div>
                    
                    {proj.image && (
                      <div className={`w-full ${isCompact ? 'h-20' : 'h-32'} rounded-lg overflow-hidden mb-3 border border-slate-800/50 relative`}>
                         <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                         <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-500" />
                      </div>
                    )}
                    
                    <h4 className={`${isCompact ? 'text-sm' : 'text-lg'} font-bold text-slate-100 mb-1 group-hover:text-[var(--theme-color)] transition-colors flex items-center justify-between`} style={{ '--theme-color': themeColor }}>
                      <span className="truncate pr-2">{proj.title}</span>
                      {proj.link && (
                        <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[var(--theme-color)] transition-colors flex-shrink-0" style={{ '--theme-color': themeColor }}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      )}
                    </h4>
                    
                    {proj.techStack && (
                      <div className="font-mono text-[9px] uppercase tracking-wider mb-2 opacity-80" style={{ color: themeColor }}>
                        {proj.techStack}
                      </div>
                    )}
                    
                    <p className={`text-slate-400 ${isCompact ? 'text-[10px]' : 'text-xs'} leading-relaxed flex-grow ${isCompact ? 'line-clamp-2' : 'line-clamp-3'}`}>
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-8 pt-4 border-t border-slate-800/50 flex justify-between items-center text-slate-600 font-mono text-[9px] uppercase tracking-wider w-full relative z-10">
          <p>const year = {new Date().getFullYear()}; /* {personal.name || 'Portfolio'} */</p>
          <div className="flex items-center gap-1">
            <span>return</span>
            <span className="font-bold text-[var(--theme-color)]" style={{ '--theme-color': themeColor }}>"MonCvGo"</span>
            <span>;</span>
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 3: WEB (Modern Web Layout)
  // Default fallback
  return (
    <div className={`cv-page ${fontClass} bg-slate-50 text-slate-800 relative w-full h-full min-h-[297mm] box-border p-0 transition-all duration-300 font-sans flex flex-col`} style={{ fontSize: getScale() }}>
      
      {/* FAKE NAVBAR */}
      <div className="w-full py-2.5 px-6 flex justify-between items-center text-white shadow-sm relative z-20" style={{ backgroundColor: themeColor }}>
         <div className="font-extrabold text-base tracking-tight flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-white text-black flex items-center justify-center font-bold text-[10px]">{personal.name?.charAt(0) || 'P'}</div>
            {personal.name?.split(' ')[0]}<span className="opacity-70">.folio</span>
         </div>
         <div className="flex gap-3 text-[11px] font-semibold opacity-90">
            <span>À Propos</span>
            <span>Projets</span>
            <span>Compétences</span>
            <span className="bg-white text-slate-900 px-2 py-0.5 rounded-full">Contact</span>
         </div>
      </div>

      {/* HERO BANNER */}
      <div className="w-full pt-6 pb-12 px-6 text-white relative overflow-hidden" style={{ backgroundColor: themeColor }}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          {personal.photo && (
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-md transform scale-110"></div>
              <img src={personal.photo} alt={personal.name} className="relative w-20 h-20 rounded-full object-cover border-2 border-white shadow-lg" />
            </div>
          )}
          <div className="text-center sm:text-left flex-grow overflow-hidden">
            <div className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[9px] font-bold tracking-widest uppercase mb-1.5 border border-white/30">
              Disponible pour de nouveaux projets
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-tight truncate w-full">{personal.name}</h1>
            <h2 className="text-sm sm:text-base font-medium opacity-90 truncate w-full">{personal.title}</h2>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 relative z-20 -mt-6 flex-grow flex flex-col gap-5">
        
        {/* SUMMARY (Floating Card) */}
        {summary && (
          <div className="bg-white p-5 rounded-xl shadow-md shadow-slate-200/50 border border-slate-100 backdrop-blur-lg">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-1 h-4 rounded-full" style={{ backgroundColor: themeColor }}></div>
               <h3 className="text-base font-bold text-slate-800">À Propos de moi</h3>
            </div>
            <p className="text-slate-600 leading-snug text-xs">{summary}</p>
            
            <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100 flex-wrap">
               {personal.email && (
                 <div className="flex flex-col">
                   <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Email</span>
                   <span className="text-[11px] font-semibold text-slate-700">{personal.email}</span>
                 </div>
               )}
               {personal.phone && (
                 <div className="flex flex-col">
                   <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Téléphone</span>
                   <span className="text-[11px] font-semibold text-slate-700">{personal.phone}</span>
                 </div>
               )}
               {personal.address && (
                 <div className="flex flex-col">
                   <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Localisation</span>
                   <span className="text-[11px] font-semibold text-slate-700">{personal.address}</span>
                 </div>
               )}
            </div>
          </div>
        )}

        {/* PROJECTS GRID */}
        {projects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
               <div className="w-1 h-5 rounded-full" style={{ backgroundColor: themeColor }}></div>
               <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Portfolio & Projets</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm shadow-slate-200/40 border border-slate-100 flex flex-col overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300">
                  {proj.image && (
                    <div className="h-24 overflow-hidden relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-2 left-2 z-20 right-2">
                         <h4 className="text-sm font-bold text-white mb-0.5 truncate">{proj.title}</h4>
                         {proj.techStack && (
                           <div className="text-[9px] font-bold text-white/90 bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20 inline-block">{proj.techStack}</div>
                         )}
                      </div>
                    </div>
                  )}
                  <div className="p-3 flex-grow flex flex-col">
                    {!proj.image && (
                      <div className="mb-2">
                        <h4 className="text-base font-bold text-slate-900 mb-1 truncate">{proj.title}</h4>
                        {proj.techStack && (
                          <div className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded inline-block" style={{ color: themeColor }}>{proj.techStack}</div>
                        )}
                      </div>
                    )}
                    <p className="text-slate-600 leading-snug mb-2 flex-grow text-xs">{proj.description}</p>
                    {proj.link && (
                      <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold group-hover:underline mt-auto w-max px-2.5 py-1.5 rounded bg-slate-50 border border-slate-200" style={{ color: themeColor }}>
                         Voir le projet <span className="text-xs leading-none">→</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
               <div className="w-1 h-5 rounded-full" style={{ backgroundColor: themeColor }}></div>
               <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Expertise Technique</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group transition-colors hover:border-slate-300">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1.5 bg-slate-50 group-hover:scale-110 transition-transform">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  </div>
                  <span className="font-bold text-slate-800 mb-0.5 text-xs truncate w-full">{skill.name}</span>
                  <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* FOOTER */}
      <div className="w-full py-4 mt-auto text-center text-slate-500 text-[10px] border-t border-slate-200 bg-white">
         <p>© {new Date().getFullYear()} {personal.name}. Tous droits réservés.</p>
      </div>
    </div>
  );
}
