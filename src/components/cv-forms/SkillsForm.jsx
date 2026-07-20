import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export default function SkillsForm() {
  const { t } = useTranslation();
  const { cvData, addSkill, updateSkill, removeSkill, addQuality, updateQuality, removeQuality, addLanguage, updateLanguage, removeLanguage } = useResume();
  const skills = cvData.skills || [];
  const qualities = cvData.qualities || [];
  const languages = cvData.languages || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* SKILLS SECTION */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('forms.skills.title')}</h3>
          <button 
            onClick={() => addSkill({ name: '', level: 'Débutant' })}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>

        {skills.length === 0 ? (
          <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">Ajoutez vos compétences clés.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  value={skill.name || ''} 
                  onChange={(e) => updateSkill(index, { ...skill, name: e.target.value })}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                  placeholder="Ex: React.js, Gestion de Projet..."
                />
                <select 
                  value={skill.level || 'Débutant'} 
                  onChange={(e) => updateSkill(index, { ...skill, level: e.target.value })}
                  className="w-1/3 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="Débutant">{t('forms.skills.levels.beginner')}</option>
                  <option value="Intermédiaire">{t('forms.skills.levels.intermediate')}</option>
                  <option value="Avancé">{t('forms.skills.levels.advanced')}</option>
                  <option value="Expert">{t('forms.skills.levels.expert')}</option>
                  <option value="40%">40%</option>
                  <option value="60%">60%</option>
                  <option value="80%">80%</option>
                  <option value="100%">100%</option>
                </select>
                <button 
                  onClick={() => removeSkill(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* QUALITIES SECTION */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Qualités & Atouts</h3>
          <button 
            onClick={() => addQuality({ name: '' })}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>

        {qualities.length === 0 ? (
          <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">Ajoutez vos qualités personnelles et atouts sous forme de liste (ex: Autonome, Ponctuel, Esprit d'équipe...).</p>
          </div>
        ) : (
          <div className="space-y-3">
            {qualities.map((q, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  value={typeof q === 'string' ? q : (q.name || '')} 
                  onChange={(e) => updateQuality(index, typeof q === 'string' ? e.target.value : { ...q, name: e.target.value })}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
                  placeholder="Ex: Ponctuel, Autonome, Rigoureux, Esprit d'équipe..."
                />
                <button 
                  onClick={() => removeQuality(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LANGUAGES SECTION */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Langues</h3>
          <button 
            onClick={() => addLanguage({ name: '', level: 'B1 (Intermédiaire)' })}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-400 dark:hover:bg-cyan-900/50 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>

        {languages.length === 0 ? (
          <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">Ajoutez les langues que vous maîtrisez.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {languages.map((lang, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  value={lang.name || ''} 
                  onChange={(e) => updateLanguage(index, { ...lang, name: e.target.value })}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none" 
                  placeholder="Ex: Anglais, Espagnol..."
                />
                <select 
                  value={lang.level || 'B1 (Intermédiaire)'} 
                  onChange={(e) => updateLanguage(index, { ...lang, level: e.target.value })}
                  className="w-1/3 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                >
                  <option value="A1 (Débutant)">A1 (Débutant)</option>
                  <option value="A2 (Élémentaire)">A2 (Élémentaire)</option>
                  <option value="B1 (Intermédiaire)">B1 (Intermédiaire)</option>
                  <option value="B2 (Courant)">B2 (Courant)</option>
                  <option value="C1 (Avancé)">C1 (Avancé)</option>
                  <option value="C2 (Bilingue)">C2 (Bilingue)</option>
                  <option value="Langue maternelle">Langue maternelle</option>
                </select>
                <button 
                  onClick={() => removeLanguage(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      
    </div>
  );
}
