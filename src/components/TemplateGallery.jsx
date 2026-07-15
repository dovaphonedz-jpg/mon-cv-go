import React from 'react';
import { Link } from 'react-router-dom';
import TemplatePortfolio from './portfolio-templates/TemplatePortfolio';
import TemplateModern from './cv-templates/TemplateModern';
import { demoData } from '../utils/cvData';

export default function TemplateGallery() {
  const portfolioTemplates = [
    { id: "modern", type: "portfolio", name: "Portfolio Web Moderne", isNew: true, path: "/portfolio?template=portfolio-modern&demo=true", color: 'blue' },
    { id: "terminal", type: "portfolio", name: "Portfolio Terminal OS", isNew: true, path: "/portfolio?template=portfolio-terminal&demo=true", color: 'emerald' },
    { id: "grid", type: "portfolio", name: "Portfolio Dark Grille", isNew: true, path: "/portfolio?template=portfolio-grid&demo=true", color: 'indigo' },
    { id: "masonry", type: "portfolio", name: "Portfolio Dev Minimal", isNew: false, path: "/portfolio?template=portfolio-dev&demo=true", color: 'sky' }
  ];

  const cvTemplates = [
    { id: "siliconvalley", type: "cv", name: "CV Silicon Valley", isNew: true, path: "/create?template=siliconvalley&demo=true", color: 'blue' },
    { id: "tokyoneo", type: "cv", name: "CV Tokyo Neo", isNew: true, path: "/create?template=tokyoneo&demo=true", color: 'purple' },
    { id: "parisvogue", type: "cv", name: "CV Paris Vogue", isNew: true, path: "/create?template=parisvogue&demo=true", color: 'rose' },
    { id: "londonelite", type: "cv", name: "CV London Elite", isNew: true, path: "/create?template=londonelite&demo=true", color: 'amber' },
    { id: "berlinbrutal", type: "cv", name: "CV Berlin Brutal", isNew: true, path: "/create?template=berlinbrutal&demo=true", color: 'red' },
    { id: "singaporenext", type: "cv", name: "CV Singapore Next", isNew: false, path: "/create?template=singaporenext&demo=true", color: 'cyan' },
    { id: "barcelone", type: "cv", name: "CV Créatif Barcelone", isNew: false, path: "/create?template=barcelone&demo=true", color: 'orange' },
    { id: "paris", type: "cv", name: "CV Paris Minimal", isNew: false, path: "/create?template=paris&demo=true", color: 'zinc' },
    { id: "cairo", type: "cv", name: "CV Cairo Chronologique", isNew: false, path: "/create?template=cairo&demo=true", color: 'emerald' },
    { id: "helsinki2", type: "cv", name: "CV Helsinki Split", isNew: false, path: "/create?template=helsinki2&demo=true", color: 'indigo' }
  ];

  // Duplication for seamless infinite scroll
  const marqueeCVs = [...cvTemplates, ...cvTemplates];
  const marqueePortfolios = [...portfolioTemplates, ...portfolioTemplates, ...portfolioTemplates, ...portfolioTemplates];

  return (
    <section id="modeles-galerie" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-500 font-bold uppercase tracking-wider text-sm mb-3">
            NOTRE GALERIE
          </p>
          <h2 className="text-white text-4xl font-bold mb-5">
            Des designs approuvés par les experts.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Faites forte impression. Nos modèles sont modernes, épurés et optimisés pour capter l'attention des recruteurs.
          </p>
        </div>

        {/* CV Marquee */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-end mb-6 px-4">
            <h3 className="text-white text-2xl font-bold flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span> Modèles de CV
            </h3>
          </div>
          
          <div className="relative flex overflow-hidden w-full group py-4">
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee pause-on-hover">
              {marqueeCVs.map((template, index) => (
                <Link 
                  to={template.path}
                  key={`cv-${index}`} 
                  className="w-[280px] md:w-[320px] flex-shrink-0 mx-4 bg-slate-900 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 group/card cursor-pointer border border-slate-800 block"
                >
                  <div className="relative aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden mb-4 flex flex-col items-center justify-start border border-slate-700/50">
                    <div className="w-full h-full bg-slate-50 relative overflow-hidden transition-transform duration-700 group-hover/card:scale-105 z-0 pointer-events-none">
                      <div className="absolute top-0 left-[50%] origin-top bg-white" style={{ width: '794px', height: '1123px', transform: 'translateX(-50%) scale(0.35)', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
                        <TemplateModern cvData={demoData.fr} config={{ template: template.id, color: template.color || 'blue', font: 'inter', fontSize: 'normal', spacing: 'normal' }} />
                      </div>
                    </div>
                    {template.isNew && <div className="absolute top-3 -left-2 bg-fuchsia-500 text-white font-bold text-[10px] px-2 py-1 rounded-full shadow-lg z-10">NOUVEAU</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity z-0 flex items-end justify-center pb-6">
                      <span className="text-white font-bold text-xs bg-blue-600 px-4 py-2 rounded-full shadow-lg translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">Créer ce CV</span>
                    </div>
                  </div>
                  <div className="text-center relative z-10">
                    <h3 className="text-white font-semibold text-base group-hover/card:text-blue-400 transition-colors truncate">{template.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Marquee */}
        <div className="relative">
          <div className="flex justify-end items-end mb-6 px-4">
            <h3 className="text-white text-2xl font-bold flex items-center gap-3">
              Modèles de Portfolio <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            </h3>
          </div>
          
          <div className="relative flex overflow-hidden w-full group py-4">
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee-reverse pause-on-hover">
              {marqueePortfolios.map((template, index) => (
                <Link 
                  to={template.path}
                  key={`port-${index}`} 
                  className="w-[280px] md:w-[320px] flex-shrink-0 mx-4 bg-slate-900 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 group/card cursor-pointer border border-slate-800 block"
                >
                  <div className="relative aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden mb-4 flex flex-col items-center justify-start border border-slate-700/50">
                    <div className="w-full h-full bg-slate-50 relative overflow-hidden transition-transform duration-700 group-hover/card:scale-105 z-0 pointer-events-none">
                      <div className="absolute top-0 left-[50%] origin-top bg-white" style={{ width: '794px', height: '1123px', transform: 'translateX(-50%) scale(0.35)', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
                        <TemplatePortfolio cvData={demoData.fr} config={{ template: template.id === 'modern' ? 'portfolio-modern' : template.id === 'terminal' ? 'portfolio-terminal' : template.id === 'masonry' ? 'portfolio-dev' : 'portfolio-grid', color: template.color || 'blue', font: 'inter', fontSize: 'normal' }} />
                      </div>
                    </div>
                    {template.isNew && <div className="absolute top-3 -left-2 bg-emerald-500 text-white font-bold text-[10px] px-2 py-1 rounded-full shadow-lg z-10">NOUVEAU</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity z-0 flex items-end justify-center pb-6">
                      <span className="text-white font-bold text-xs bg-emerald-600 px-4 py-2 rounded-full shadow-lg translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">Créer ce Portfolio</span>
                    </div>
                  </div>
                  <div className="text-center relative z-10">
                    <h3 className="text-white font-semibold text-base group-hover/card:text-emerald-400 transition-colors truncate">{template.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
