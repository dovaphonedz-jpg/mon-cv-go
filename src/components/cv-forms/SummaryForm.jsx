import React from 'react';
import { useResume } from '../../context/ResumeContext';

export default function SummaryForm() {
  const { cvData, updateSummary } = useResume();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Profil Professionnel</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Rédigez un court paragraphe (3 à 5 phrases) résumant votre profil, vos années d'expérience et votre objectif professionnel.
      </p>
      
      <div>
        <textarea 
          value={cvData.summary || ''} 
          onChange={(e) => updateSummary(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[250px] leading-relaxed resize-y" 
          placeholder="Ex: Professionnel passionné avec plus de 5 ans d'expérience dans la gestion de projets Web..."
        ></textarea>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 mt-6">
        <h4 className="text-sm font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Conseil
        </h4>
        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          Un bon profil professionnel accroche l'œil du recruteur en quelques secondes. Mentionnez-y vos compétences les plus fortes, un chiffre clé (ex: "gestion d'un budget de 100K€"), et ce que vous recherchez pour votre prochain défi.
        </p>
      </div>
    </div>
  );
}
