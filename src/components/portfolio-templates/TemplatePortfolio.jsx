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

  // LAYOUT 1: GRID (Creative Grid)
  if (layout === 'grid') {
    return (
      <div className={`cv-page ${fontClass} bg-white text-slate-800 relative w-full h-full min-h-[297mm] box-border p-12 transition-all duration-300`} style={{ fontSize: getScale() }}>
        {/* HERO */}
        <div className="flex flex-col items-center text-center mb-16">
          {personal.photo && (
            <img src={personal.photo} alt={personal.name} className="w-40 h-40 rounded-full object-cover shadow-2xl mb-6 border-4 border-white" style={{ borderColor: themeColor }} />
          )}
          <h1 className="text-5xl font-extrabold tracking-tight mb-3" style={{ color: themeColor }}>{personal.name}</h1>
          <h2 className="text-2xl text-slate-600 font-medium mb-6">{personal.title}</h2>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500 mb-8">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
          </div>

          {summary && (
            <p className="max-w-2xl text-lg text-slate-700 leading-relaxed italic border-l-4 pl-4" style={{ borderLeftColor: themeColor }}>
              "{summary}"
            </p>
          )}
        </div>

        {/* PROJECTS GRID */}
        {projects.length > 0 && (
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-8 uppercase tracking-widest text-center" style={{ color: themeColor }}>{t.projects}</h3>
            <div className="grid grid-cols-2 gap-8">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow flex flex-col h-full overflow-hidden">
                  {proj.image && (
                    <div className="-mt-6 -mx-6 mb-4">
                      <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover" />
                    </div>
                  )}
                  <h4 className="text-xl font-bold mb-2 text-slate-900">{proj.title}</h4>
                  {proj.techStack && (
                    <div className="text-xs font-semibold uppercase tracking-wider mb-4 px-3 py-1 rounded-full inline-block text-white" style={{ backgroundColor: themeColor }}>
                      {proj.techStack}
                    </div>
                  )}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">{proj.description}</p>
                  {proj.link && (
                    <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-sm font-semibold underline mt-auto" style={{ color: themeColor }}>
                      Voir le projet →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: themeColor }}>{t.skills}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-slate-100 rounded-lg text-slate-800 font-medium text-sm shadow-sm border border-slate-200">
                  {skill.name} <span className="opacity-50 ml-1 text-xs">({skill.level})</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // LAYOUT 2: MASONRY (Tech Minimal / Dark)
  if (layout === 'masonry') {
    return (
      <div className={`cv-page ${fontClass} bg-slate-900 text-slate-200 relative w-full h-full min-h-[297mm] box-border p-12 transition-all duration-300`} style={{ fontSize: getScale() }}>
        {/* HERO */}
        <div className="border-b border-slate-800 pb-12 mb-12">
          <div className="flex items-center gap-8">
            {personal.photo && (
              <img src={personal.photo} alt={personal.name} className="w-32 h-32 rounded-xl object-cover shadow-xl border border-slate-700" />
            )}
            <div>
              <h1 className="text-5xl font-black tracking-tighter text-white mb-2">{personal.name}</h1>
              <h2 className="text-2xl font-mono" style={{ color: themeColor }}>{personal.title} <span className="animate-pulse">_</span></h2>
              <div className="flex gap-4 mt-4 text-sm font-mono text-slate-400">
                {personal.email && <span>{personal.email}</span>}
                {personal.location && <span>| {personal.location}</span>}
              </div>
            </div>
          </div>
          {summary && (
            <div className="mt-8 text-slate-300 leading-relaxed max-w-3xl">
              <span className="font-mono text-xs opacity-50 block mb-2">// About me</span>
              <p>{summary}</p>
            </div>
          )}
        </div>

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="mb-12">
            <span className="font-mono text-xs opacity-50 block mb-4">// {t.projects.toLowerCase()}</span>
            <div className="grid grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: themeColor }}></div>
                  {proj.image && (
                    <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover rounded mb-4 border border-slate-700 opacity-80 group-hover:opacity-100 transition-opacity" />
                  )}
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                    {proj.title}
                    {proj.link && (
                      <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-slate-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </h4>
                  <p className="text-slate-400 text-sm mb-6">{proj.description}</p>
                  {proj.techStack && (
                    <div className="font-mono text-xs" style={{ color: themeColor }}>
                      {proj.techStack}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div>
            <span className="font-mono text-xs opacity-50 block mb-4">// {t.skills.toLowerCase()}</span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-xs">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // LAYOUT 3: WEB (Modern Web Layout)
  // Default fallback
  return (
    <div className={`cv-page ${fontClass} bg-slate-50 text-slate-900 relative w-full h-full min-h-[297mm] box-border p-0 transition-all duration-300`} style={{ fontSize: getScale() }}>
      {/* HERO BANNER */}
      <div className="w-full py-16 px-12 text-white relative overflow-hidden" style={{ backgroundColor: themeColor }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 flex items-center gap-8">
          {personal.photo && (
            <img src={personal.photo} alt={personal.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl" />
          )}
          <div>
            <h1 className="text-4xl font-extrabold mb-2">{personal.name}</h1>
            <h2 className="text-xl opacity-90">{personal.title}</h2>
          </div>
        </div>
      </div>

      <div className="p-12">
        {summary && (
          <div className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-3 text-slate-800">À Propos</h3>
            <p className="text-slate-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-slate-800 border-b-2 pb-2" style={{ borderColor: themeColor }}>Portfolio</h3>
            <div className="flex flex-col gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-6">
                  {proj.image && (
                    <div className="sm:w-1/4 flex-shrink-0">
                      <img src={proj.image} alt={proj.title} className="w-full h-32 object-cover rounded-lg shadow-sm" />
                    </div>
                  )}
                  <div className={proj.image ? "sm:w-1/4 flex-shrink-0" : "sm:w-1/3 flex-shrink-0"}>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{proj.title}</h4>
                    {proj.techStack && (
                      <div className="text-sm font-medium mb-3" style={{ color: themeColor }}>{proj.techStack}</div>
                    )}
                    {proj.link && (
                      <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-sm font-medium underline text-blue-600 hover:text-blue-800">Lien du projet</a>
                    )}
                  </div>
                  <div className={proj.image ? "sm:w-2/4" : "sm:w-2/3"}>
                    <p className="text-slate-600 leading-relaxed">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-800 border-b-2 pb-2" style={{ borderColor: themeColor }}>Expertise</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: themeColor }}></div>
                  <span className="font-medium text-slate-700">{skill.name}</span>
                  <span className="ml-auto text-sm text-slate-400">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
