import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function EducationForm() {
  const { cvData, addEducation, updateEducation, removeEducation } = useResume();
  const education = cvData.education || [];
  
  const [expandedIndex, setExpandedIndex] = useState(education.length > 0 ? 0 : null);

  const handleAdd = () => {
    addEducation({ school: '', degree: '', start: '', end: '', desc: '' });
    setExpandedIndex(education.length);
  };

  const handleChange = (index, field, value) => {
    const edu = { ...education[index], [field]: value };
    updateEducation(index, edu);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Formations & Diplômes</h3>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Aucune formation ajoutée.</p>
          <button onClick={handleAdd} className="text-sm text-emerald-500 font-semibold hover:underline">
            Ajoutez votre dernier diplôme
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {education.map((edu, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              {/* Accordion Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    {edu.degree || '(Nouveau diplôme)'}
                  </h4>
                  <p className="text-xs text-slate-500">{edu.school || 'Établissement'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeEducation(index); }}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedIndex === index ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {/* Accordion Body */}
              {expandedIndex === index && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Diplôme / Titre</label>
                    <input 
                      type="text" 
                      value={edu.degree || ''} 
                      onChange={(e) => handleChange(index, 'degree', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
                      placeholder="Ex: Master en Informatique"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Établissement / École</label>
                    <input 
                      type="text" 
                      value={edu.school || ''} 
                      onChange={(e) => handleChange(index, 'school', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
                      placeholder="Ex: Université de Paris"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Date de début</label>
                    <input 
                      type="text" 
                      value={edu.start || ''} 
                      onChange={(e) => handleChange(index, 'start', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
                      placeholder="Ex: Sept 2018"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Date de fin</label>
                    <input 
                      type="text" 
                      value={edu.end || ''} 
                      onChange={(e) => handleChange(index, 'end', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
                      placeholder="Ex: Juin 2020"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Description (Optionnel)</label>
                    <textarea 
                      value={edu.desc || ''} 
                      onChange={(e) => handleChange(index, 'desc', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none min-h-[80px]" 
                      placeholder="Ex: Mention Très Bien. Projet de fin d'études sur l'IA..."
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
