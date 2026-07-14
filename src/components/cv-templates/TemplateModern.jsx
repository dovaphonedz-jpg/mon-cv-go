import React from 'react';
import { templates100, translations } from '../../utils/cvData';

export default function TemplateModern({ cvData, config }) {
  const { personal, summary, experiences, education, skills, languages, projects = [] } = cvData;
  const { color, font, fontSize, spacing, template } = config;

  // Find active template config
  const activeTemplate = templates100.find(t => t.id === template) || templates100[0];
  const { layout, style } = activeTemplate;
  const t = translations[config.cvLang || 'fr'];

  // Configuration Mappings
  const fontClass = `font-${font}`;
  const spacingClass = spacing === 'compact' ? 'space-y-2' : spacing === 'generous' ? 'space-y-3' : 'space-y-4';
  const paddingClass = spacing === 'compact' ? 'p-4' : spacing === 'generous' ? 'p-6' : 'p-5';
  
  // Tailwind color mappings
  const colorMap = {
    slate: '#64748b', gray: '#6b7280', zinc: '#71717a', neutral: '#737373', stone: '#78716c',
    red: '#ef4444', orange: '#f97316', amber: '#f59e0b', yellow: '#eab308', lime: '#84cc16',
    green: '#22c55e', emerald: '#10b981', teal: '#14b8a6', cyan: '#06b6d4', sky: '#0ea5e9',
    blue: '#3b82f6', indigo: '#6366f1', violet: '#8b5cf6', purple: '#a855f7', fuchsia: '#d946ef',
    pink: '#ec4899', rose: '#f43f5e'
  };
  const themeColor = colorMap[color] || '#3b82f6';

  // Helper for text size
  const getScale = () => fontSize === 'small' ? '0.9em' : fontSize === 'large' ? '1.1em' : '1em';

  // Base layout wrapper
  let containerClasses = `cv-page ${fontClass} bg-white text-slate-800 shadow-2xl relative w-full h-full h-[1123px] overflow-hidden box-border transition-all duration-300`;
  
  // Global Styles
  if (style === 'bordered') containerClasses += ' border-[12px] border-slate-100';
  if (style === 'soft-shadow') containerClasses += ' shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]';
  if (style === 'underlined') containerClasses += ' border-b-[16px]'
  
  // Section Header Styling based on `style`
  const getSectionHeader = (title) => {
    if (style === 'compact-badge') {
      return <h3 className="text-sm font-bold uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded text-white" style={{ backgroundColor: themeColor }}>{title}</h3>;
    }
    if (style === 'underlined') {
      return <h3 className="text-base font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 inline-block" style={{ borderBottomColor: themeColor, color: themeColor }}>{title}</h3>;
    }
    if (style === 'bordered') {
      return <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-s-4 ps-3" style={{ borderLeftColor: themeColor, color: themeColor }}>{title}</h3>;
    }
    // Default / Solid
    return <h3 className="text-base font-extrabold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>{title}</h3>;
  };

  // --- Dynamic Layout Rendering ---

  // 0.1 NEOBRUTALISM
  if (layout === 'neobrutalism') {
    return (
      <div className={`cv-page ${fontClass} bg-yellow-400 text-black shadow-2xl relative w-full h-full h-[1123px] overflow-hidden box-border border-[12px] border-black`} style={{ fontSize: getScale() }}>
        <header className="p-5 border-b-[12px] border-black bg-white flex justify-between items-center">
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter mb-2 bg-black text-yellow-400 inline-block px-4 py-2 border-4 border-black" style={{ transform: 'rotate(-2deg)' }}>{personal.name}</h1>
            <h2 className="text-base font-bold uppercase mt-4">{personal.title}</h2>
          </div>
          {personal.photo && (
            <img src={personal.photo} alt="Profile" className="w-20 h-20 object-cover border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
          )}
        </header>

        <div className="p-5 grid grid-cols-2 gap-5">
          <div className="space-y-5">
            {experiences.length > 0 && (
              <section className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase mb-3 bg-black text-white inline-block px-3 py-1">{t.experience}</h3>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="border-b-4 border-black pb-4 last:border-0">
                      <h4 className="font-black text-sm">{exp.role}</h4>
                      <div className="font-bold text-sm mb-2">{exp.company} | {exp.start} - {exp.end}</div>
                      <p className="text-sm font-medium leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {education.length > 0 && (
              <section className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase mb-3 bg-black text-white inline-block px-3 py-1">{t.education}</h3>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="border-b-4 border-black pb-4 last:border-0">
                      <h4 className="font-black text-sm">{edu.degree}</h4>
                      <div className="font-bold text-sm mb-2">{edu.school} | {edu.start} - {edu.end}</div>
                      <p className="text-sm font-medium leading-relaxed">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {projects.length > 0 && (
              <section className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase mb-3 bg-black text-white inline-block px-3 py-1">{t.projects}</h3>
                <div className="space-y-3">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="border-b-4 border-black pb-4 last:border-0">
                      <h4 className="font-bold text-sm mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="space-y-5">
            {summary && (
              <section className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase mb-4 bg-black text-white inline-block px-3 py-1">{t.profile}</h3>
                <p className="text-base font-medium leading-relaxed">{summary}</p>
              </section>
            )}
            
            <section className="bg-[#ff90e8] border-[6px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase mb-4 bg-black text-[#ff90e8] inline-block px-3 py-1">{t.contact}</h3>
              <ul className="text-sm font-bold space-y-2">
                {personal.email && <li>{personal.email}</li>}
                {personal.phone && <li>{personal.phone}</li>}
                {personal.address && <li>{personal.address}</li>}
                {personal.website && <li>{personal.website}</li>}
              </ul>
            </section>

            {skills.length > 0 && (
              <section className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase mb-4 bg-black text-white inline-block px-3 py-1">{t.skills}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((s, idx) => (
                    <span key={idx} className="font-bold border-4 border-black px-3 py-1 bg-[#bbf7d0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 0.2 GLASSMORPHISM
  if (layout === 'glassmorphism') {
    return (
      <div className={`cv-page ${fontClass} bg-slate-900 text-white shadow-2xl relative w-full h-full h-[1123px] overflow-hidden box-border p-5`} style={{ fontSize: getScale() }}>
        {/* Background Decorative blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

        <div className="relative z-10 w-full h-full flex flex-col gap-4">
          <header className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl flex justify-between items-center shadow-2xl">
            <div>
              <h1 className="text-base font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2">{personal.name}</h1>
              <h2 className="text-sm font-medium text-white/80">{personal.title}</h2>
              <div className="flex gap-4 mt-4 text-sm text-white/70 font-semibold">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>• {personal.phone}</span>}
                {personal.address && <span>• {personal.address}</span>}
              </div>
            </div>
            {personal.photo && (
              <img src={personal.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg" />
            )}
          </header>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-3">
              {summary && (
                <section className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-xl">
                  <h3 className="text-base font-bold uppercase tracking-widest text-white/90 mb-4">{t.profile}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{summary}</p>
                </section>
              )}
              {experiences.length > 0 && (
                <section className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-xl">
                  <h3 className="text-base font-bold uppercase tracking-widest text-white/90 mb-3">{t.experience}</h3>
                  <div className="space-y-3 relative border-s-2 border-white/20 ms-2 ps-6">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute w-3 h-3 rounded-full bg-white -start-[31px] top-1 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                        <h4 className="font-bold text-sm text-white">{exp.role}</h4>
                        <div className="text-sm font-semibold text-white/60 mb-2">{exp.company} | {exp.start} - {exp.end}</div>
                        <p className="text-sm text-white/70 leading-relaxed">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            
            <div className="col-span-1 space-y-3">
              {skills.length > 0 && (
                <section className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-xl">
                  <h3 className="text-base font-bold uppercase tracking-widest text-white/90 mb-4">{t.skills}</h3>
                  <div className="flex flex-col gap-3">
                    {skills.map((s, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm font-semibold mb-1 text-white/80">
                          <span>{s.name}</span>
                          <span>{s.level}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-400 to-emerald-400 h-1.5 rounded-full" style={{ width: String(s.level).includes('%') ? s.level : '80%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {languages.length > 0 && (
                <section className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-xl">
                  <h3 className="text-base font-bold uppercase tracking-widest text-white/90 mb-4">{t.languages}</h3>
                  <ul className="text-sm text-white/80 space-y-3 font-medium">
                    {languages.map((l, idx) => (
                      <li key={idx} className="flex justify-between border-b border-white/10 pb-2">
                        <span>{l.name}</span>
                        <span className="text-white/50">{l.level}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0.3 DARK MINIMAL / NEON
  if (layout === 'dark-minimal' || layout === 'neon') {
    const isNeon = layout === 'neon';
    const accent = isNeon ? '#0ea5e9' : themeColor;
    const shadow = isNeon ? `0 0 15px ${accent}` : 'none';
    
    return (
      <div className={`cv-page ${fontClass} bg-[#09090b] text-[#f4f4f5] shadow-2xl relative w-full h-full h-[1123px] overflow-hidden box-border p-6`} style={{ fontSize: getScale() }}>
        <header className="border-b border-[#27272a] pb-4 mb-4 flex justify-between items-end">
          <div>
            <h1 className="text-base font-extrabold uppercase tracking-[0.2em] mb-2" style={{ color: accent, textShadow: shadow }}>{personal.name}</h1>
            <h2 className="text-base tracking-widest uppercase text-[#a1a1aa]">{personal.title}</h2>
          </div>
          {personal.photo && (
            <img src={personal.photo} alt="Profile" className="w-16 h-16 rounded-none object-cover border border-[#27272a] grayscale hover:grayscale-0 transition-all" />
          )}
        </header>

        <div className="flex gap-6">
          <div className="w-1/3 space-y-5">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#71717a] mb-4">{t.contact}</h3>
              <ul className="text-sm text-[#d4d4d8] space-y-3 font-medium">
                {personal.email && <li>{personal.email}</li>}
                {personal.phone && <li>{personal.phone}</li>}
                {personal.address && <li>{personal.address}</li>}
                {personal.website && <li style={{ color: accent }}>{personal.website}</li>}
              </ul>
            </section>
            {skills.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#71717a] mb-4">{t.skills}</h3>
                <ul className="text-sm text-[#d4d4d8] space-y-2 font-medium tracking-wide">
                  {skills.map((s, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{s.name}</span>
                      <span className="text-xs" style={{ color: accent }}>{s.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {languages.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#71717a] mb-4">{t.languages}</h3>
                <ul className="text-sm text-[#d4d4d8] space-y-2 font-medium tracking-wide">
                  {languages.map((l, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{l.name}</span>
                      <span className="text-[#71717a] text-xs">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          
          <div className="w-2/3 space-y-5">
            {summary && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#71717a] mb-4">{t.profile}</h3>
                <p className="text-sm leading-relaxed text-[#a1a1aa] font-light">{summary}</p>
              </section>
            )}
            {experiences.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#71717a] mb-3">{t.experience}</h3>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-sm tracking-wide">{exp.role}</h4>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{exp.start} - {exp.end}</span>
                      </div>
                      <div className="text-sm font-medium text-[#71717a] mb-3">{exp.company}</div>
                      <p className="text-sm text-[#a1a1aa] font-light leading-relaxed whitespace-pre-line">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {education.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#71717a] mb-3">{t.education}</h3>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-sm tracking-wide">{edu.degree}</h4>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{edu.start} - {edu.end}</span>
                      </div>
                      <div className="text-sm font-medium text-[#71717a] mb-3">{edu.school}</div>
                      <p className="text-sm text-[#a1a1aa] font-light leading-relaxed">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {projects.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#71717a] mb-3">{t.projects}</h3>
                <div className="space-y-4">
                  {projects.map((proj, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-sm mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 0.4 TYPOGRAPHIC
  if (layout === 'typographic') {
    return (
      <div className={`cv-page ${fontClass} bg-[#fdfcf8] text-[#1c1c1c] shadow-2xl relative w-full h-full h-[1123px] overflow-hidden box-border p-6`} style={{ fontSize: getScale() }}>
        <header className="border-b-[3px] border-[#1c1c1c] pb-4 mb-6 flex justify-between items-start">
          <div className="w-2/3">
            <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4" style={{ color: themeColor }}>{personal.name}</h1>
            <h2 className="text-base font-serif italic text-[#4a4a4a] mb-3">{personal.title}</h2>
            {summary && <p className="text-sm font-serif leading-relaxed text-[#1c1c1c] border-l-[3px] pl-6" style={{ borderColor: themeColor }}>{summary}</p>}
          </div>
          {personal.photo && (
            <img src={personal.photo} alt="Profile" className="w-40 h-40 rounded-full object-cover grayscale contrast-125 border-[3px] border-[#1c1c1c] p-2" />
          )}
        </header>

        <div className="flex gap-6">
          <div className="w-1/4 space-y-6 border-r-[3px] border-[#1c1c1c] pr-12">
            <section>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: themeColor }}>{t.contact}</h3>
              <ul className="text-base font-medium space-y-3 break-words">
                {personal.email && <li>{personal.email}</li>}
                {personal.phone && <li>{personal.phone}</li>}
                {personal.address && <li>{personal.address}</li>}
                {personal.website && <li>{personal.website}</li>}
              </ul>
            </section>

            {skills.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: themeColor }}>{t.skills}</h3>
                <ul className="text-base font-medium space-y-2">
                  {skills.map((s, idx) => (
                    <li key={idx} className="flex justify-between border-b border-[#e5e5e5] pb-1">
                      <span>{s.name}</span>
                      <span className="font-bold">{s.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: themeColor }}>{t.languages}</h3>
                <ul className="text-base font-medium space-y-2">
                  {languages.map((l, idx) => (
                    <li key={idx} className="flex justify-between border-b border-[#e5e5e5] pb-1">
                      <span>{l.name}</span>
                      <span className="text-[#888]">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          
          <div className="w-3/4 space-y-6">
            {experiences.length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-tight mb-4 pb-2 border-b-2 border-[#1c1c1c] inline-block">{t.experience}</h3>
                <div className="space-y-5">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-bold text-sm uppercase tracking-tight">{exp.role}</h4>
                        <span className="text-sm font-bold uppercase tracking-widest px-3 py-1 bg-[#1c1c1c] text-white">{exp.start} - {exp.end}</span>
                      </div>
                      <div className="text-base font-serif italic mb-4" style={{ color: themeColor }}>{exp.company}</div>
                      <p className="text-base font-serif leading-relaxed text-[#333] whitespace-pre-line">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {education.length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-tight mb-4 pb-2 border-b-2 border-[#1c1c1c] inline-block">{t.education}</h3>
                <div className="space-y-5">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-bold text-sm uppercase tracking-tight">{edu.degree}</h4>
                        <span className="text-sm font-bold uppercase tracking-widest px-3 py-1 bg-[#1c1c1c] text-white">{edu.start} - {edu.end}</span>
                      </div>
                      <div className="text-base font-serif italic mb-4" style={{ color: themeColor }}>{edu.school}</div>
                      <p className="text-base font-serif leading-relaxed text-[#333]">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {projects.length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-tight mb-4 pb-2 border-b-2 border-[#1c1c1c] inline-block">{t.projects}</h3>
                <div className="space-y-5">
                  {projects.map((proj, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-sm mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 1. BANNER / GRADIENT / HYBRID (Huge header block)
  if (layout === 'banner' || layout === 'gradient' || layout === 'hybrid') {
    return (
      <div className={containerClasses} style={{ fontSize: getScale(), ...(style === 'underlined' ? { borderBottomColor: themeColor } : {}) }}>
        <header className="p-6 text-white flex justify-between items-center" style={{ background: layout === 'gradient' ? `linear-gradient(135deg, ${themeColor}, #0f172a)` : themeColor }}>
          <div>
            <h1 className="text-base font-extrabold uppercase tracking-tight mb-2">{personal.name}</h1>
            <h2 className="text-sm font-light opacity-90">{personal.title}</h2>
          </div>
          {personal.photo && (
            <img src={personal.photo} alt="Profile" className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl" />
          )}
        </header>

        <div className="p-5 grid grid-cols-3 gap-5">
          <div className="col-span-2">
            {summary && (
              <section className="mb-4">
                {getSectionHeader(t.profile)}
                <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
              </section>
            )}

            {experiences.length > 0 && (
              <section className="mb-4">
                {getSectionHeader(t.experience)}
                <div className={spacingClass}>
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{exp.role}</h4>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">{exp.start} - {exp.end}</span>
                      </div>
                      <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</div>
                      <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {education.length > 0 && (
              <section className="mb-4">
                {getSectionHeader(t.education)}
                <div className={spacingClass}>
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">{edu.start} - {edu.end}</span>
                      </div>
                      <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{edu.school}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {projects.length > 0 && (
              <section className="mb-4">
                {getSectionHeader(t.education)}
                <div className={spacingClass}>
                  {projects.map((proj, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-sm mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-1 space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <section>
              {getSectionHeader(t.contact)}
              <ul className="text-xs text-slate-700 space-y-3 font-medium">
                {personal.email && <li className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center">✉</span>{personal.email}</li>}
                {personal.phone && <li className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center">☎</span>{personal.phone}</li>}
                {personal.address && <li className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center">⌂</span>{personal.address}</li>}
                {personal.website && <li className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center">🌐</span>{personal.website}</li>}
              </ul>
            </section>

            {skills.length > 0 && (
              <section>
                {getSectionHeader(t.skills)}
                <ul className="text-xs text-slate-700 space-y-3">
                  {skills.map((s, idx) => (
                    <li key={idx}>
                      <div className="flex justify-between mb-1 font-semibold">
                        <span>{s.name}</span>
                        <span>{s.level}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-slate-700 h-1.5 rounded-full" style={{ width: String(s.level).includes('%') ? s.level : '80%', backgroundColor: themeColor }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                {getSectionHeader(t.languages)}
                <ul className="text-xs text-slate-700 space-y-2 font-medium">
                  {languages.map((l, idx) => (
                    <li key={idx} className="flex justify-between border-b border-slate-200 pb-2">
                      <span>{l.name}</span>
                      <span className="font-bold opacity-60">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. TIMELINE / MODERN / ACADEMIC (Single column heavy text)
  if (layout === 'timeline' || layout === 'modern' || layout === 'academic') {
    return (
      <div className={`${containerClasses} ${paddingClass}`} style={{ fontSize: getScale(), ...(style === 'underlined' ? { borderBottomColor: themeColor } : {}) }}>
        <header className="mb-5 text-center">
          <h1 className="text-base font-black uppercase tracking-widest mb-3" style={{ color: themeColor }}>{personal.name}</h1>
          <h2 className="text-sm text-slate-500 font-light mb-3 tracking-widest uppercase">{personal.title}</h2>
          
          <div className="flex justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider flex-wrap">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>| {personal.phone}</span>}
            {personal.address && <span>| {personal.address}</span>}
            {personal.website && <span>| {personal.website}</span>}
          </div>
        </header>

        {summary && (
          <section className="mb-5 max-w-4xl mx-auto text-center">
            <p className="text-sm leading-loose text-slate-700 italic">"{summary}"</p>
          </section>
        )}

        <div className="max-w-4xl mx-auto space-y-5">
          {experiences.length > 0 && (
            <section>
              {getSectionHeader(t.experience)}
              <div className="space-y-3 border-s-2 ms-4 ps-6" style={{ borderColor: themeColor }}>
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute w-4 h-4 rounded-full -start-[33px] top-1 border-4 bg-white" style={{ borderColor: themeColor }}></div>
                    <h4 className="font-bold text-slate-900 text-base">{exp.role}</h4>
                    <div className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: themeColor }}>{exp.company} • {exp.start} - {exp.end}</div>
                    <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              {getSectionHeader(t.education)}
              <div className="space-y-3 border-s-2 ms-4 ps-6" style={{ borderColor: themeColor }}>
                {education.map((edu, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute w-4 h-4 rounded-full -start-[33px] top-1 border-4 bg-white" style={{ borderColor: themeColor }}></div>
                    <h4 className="font-bold text-slate-900 text-base">{edu.degree}</h4>
                    <div className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: themeColor }}>{edu.school} • {edu.start} - {edu.end}</div>
                    <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
            {projects.length > 0 && (
            <section>
              {getSectionHeader(t.education)}
              <div className="space-y-3 border-s-2 ms-4 ps-6" style={{ borderColor: themeColor }}>
                {projects.map((proj, idx) => (
                  <div key={idx} className="relative">
                      <h4 className="font-bold text-sm mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-5">
            {skills.length > 0 && (
              <section>
                {getSectionHeader(t.skills)}
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border" style={{ borderColor: themeColor }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
            
            {languages.length > 0 && (
              <section>
                {getSectionHeader(t.languages)}
                <div className="flex flex-wrap gap-4">
                  {languages.map((l, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="font-bold text-sm" style={{ color: themeColor }}>{l.name}</span>
                      <span className="text-xs text-slate-500 uppercase">{l.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. SPLIT / SIDEBAR / CREATIVE (Left or Right Sidebar)
  if (layout === 'creative' || layout === 'sidebarRight' || layout === 'split' || layout === 'portfolio' || layout === 'startup') {
    const isRight = layout === 'sidebarRight';
    return (
      <div className={`${containerClasses} flex ${isRight ? 'flex-row-reverse' : 'flex-row'}`} style={{ fontSize: getScale(), ...(style === 'underlined' ? { borderBottomColor: themeColor } : {}) }}>
        
        {/* Sidebar */}
        <aside className={`w-1/3 p-5 text-white ${layout === 'split' ? 'w-2/5' : ''}`} style={{ backgroundColor: themeColor }}>
          {personal.photo ? (
            <img src={personal.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-white mx-auto mb-3 shadow-lg" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white mx-auto mb-3 shadow-lg flex items-center justify-center text-white font-bold text-sm">
              {personal.name ? personal.name.charAt(0) : ''}
            </div>
          )}
          
          <h1 className="text-base font-extrabold uppercase tracking-tight text-center mb-1 text-white">
            {personal.name}
          </h1>
          <h2 className="text-sm text-white/80 font-medium text-center mb-4">{personal.title}</h2>

          <div className="space-y-4">
            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">{t.contact}</h3>
              <ul className="text-xs text-white/90 space-y-3 font-medium">
                {personal.email && <li className="break-words">{personal.email}</li>}
                {personal.phone && <li>{personal.phone}</li>}
                {personal.address && <li>{personal.address}</li>}
                {personal.website && <li>{personal.website}</li>}
              </ul>
            </section>

            {skills.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">{t.skills}</h3>
                <ul className="text-xs text-white/90 space-y-2 font-medium">
                  {skills.map((s, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{s.name}</span>
                      <span className="opacity-80 font-bold">{s.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">{t.languages}</h3>
                <ul className="text-xs text-white/90 space-y-2 font-medium">
                  {languages.map((l, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{l.name}</span>
                      <span className="opacity-80 font-bold">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className={`p-5 bg-slate-50 ${layout === 'split' ? 'w-3/5' : 'w-2/3'}`}>
          {summary && (
            <section className="mb-5">
              {getSectionHeader(t.profile)}
              <p className="text-sm leading-relaxed text-slate-700 bg-white p-5 rounded-xl shadow-sm border border-slate-100">{summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="mb-5">
              {getSectionHeader(t.experience)}
              <div className={`${spacingClass} relative border-s-2 ms-3 ps-6`} style={{ borderColor: themeColor }}>
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute w-3 h-3 rounded-full -start-[31px] top-1 border-2 bg-white" style={{ borderColor: themeColor }}></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-slate-900 text-base">{exp.role}</h4>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-slate-200 text-slate-600">{exp.start} - {exp.end}</span>
                    </div>
                    <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</div>
                    <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {education.length > 0 && (
            <section className="mb-5">
              {getSectionHeader(t.education)}
              <div className={`${spacingClass} relative border-s-2 ms-3 ps-6`} style={{ borderColor: themeColor }}>
                {education.map((edu, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute w-3 h-3 rounded-full -start-[31px] top-1 border-2 bg-white" style={{ borderColor: themeColor }}></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-slate-900 text-base">{edu.degree}</h4>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-slate-200 text-slate-600">{edu.start} - {edu.end}</span>
                    </div>
                    <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{edu.school}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
            {projects.length > 0 && (
            <section className="mb-5">
              {getSectionHeader(t.education)}
              <div className={`${spacingClass} relative border-s-2 ms-3 ps-6`} style={{ borderColor: themeColor }}>
                {projects.map((proj, idx) => (
                  <div key={idx} className="relative">
                      <h4 className="font-bold text-sm mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // 4. MINIMALIST / CLASSIC / CENTERED (Default 1-column header)
  const isCentered = layout === 'centered';
  return (
    <div className={`${containerClasses} ${paddingClass}`} style={{ fontSize: getScale(), ...(style === 'underlined' ? { borderBottomColor: themeColor } : {}) }}>
      <header className={`${isCentered ? 'text-center' : ''} border-b-2 pb-6 mb-3`} style={{ borderColor: themeColor }}>
        <h1 className="text-sm font-extrabold uppercase tracking-tight" style={{ color: themeColor }}>
          {personal.name}
        </h1>
        <h2 className="text-base text-slate-500 font-medium mt-1">{personal.title}</h2>
        
        <ul className={`text-xs text-slate-600 mt-4 flex flex-wrap gap-4 ${isCentered ? 'justify-center' : ''}`}>
          {personal.email && <li>{personal.email}</li>}
          {personal.phone && <li>• {personal.phone}</li>}
          {personal.address && <li>• {personal.address}</li>}
          {personal.website && <li>• {personal.website}</li>}
        </ul>
      </header>

      {summary && (
        <section className="mb-4">
          {getSectionHeader(t.profile)}
          <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          {experiences.length > 0 && (
            <section className="mb-4">
              {getSectionHeader(t.experience)}
              <div className={spacingClass}>
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-slate-800 text-sm">{exp.role}</h4>
                      <span className="text-xs font-semibold text-slate-500">{exp.start} - {exp.end}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-600 mb-2">{exp.company}</div>
                    <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {education.length > 0 && (
            <section className="mb-4">
              {getSectionHeader(t.education)}
              <div className={spacingClass}>
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-slate-800 text-sm">{edu.degree}</h4>
                      <span className="text-xs font-semibold text-slate-500">{edu.start} - {edu.end}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-600 mb-2">{edu.school}</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
            {projects.length > 0 && (
            <section className="mb-4">
              {getSectionHeader(t.education)}
              <div className={spacingClass}>
                {projects.map((proj, idx) => (
                  <div key={idx}>
                      <h4 className="font-bold text-sm mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={String(proj.link).startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="col-span-1 space-y-4">
          {skills.length > 0 && (
            <section>
              {getSectionHeader(t.skills)}
              <ul className="text-xs text-slate-700 space-y-3 font-medium">
                {skills.map((s, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-1">
                    <span>{s.name}</span>
                    {style !== 'compact-badge' && <span style={{ color: themeColor }} className="font-bold">{s.level}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              {getSectionHeader(t.languages)}
              <ul className="text-xs text-slate-700 space-y-3 font-medium">
                {languages.map((l, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-1">
                    <span>{l.name}</span>
                    <span className="font-bold text-slate-500">{l.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
