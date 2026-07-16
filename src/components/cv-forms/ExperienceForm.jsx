import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Loader2 } from 'lucide-react';

export default function ExperienceForm() {
  const { cvData, addExperience, updateExperience, removeExperience } = useResume();
  const experiences = cvData.experiences || [];
  
  const [expandedIndex, setExpandedIndex] = useState(experiences.length > 0 ? 0 : null);
  const [generatingIndex, setGeneratingIndex] = useState(null);

  const generateExperience = async (index, exp) => {
    const jobTitle = exp.role || prompt("Veuillez saisir le titre de ce poste pour que l'IA puisse l'analyser :");
    if (!jobTitle) return;

    setGeneratingIndex(index);
    try {
      const response = await fetch('http://localhost:3001/api/magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: jobTitle, type: 'experience' })
      });
      
      const data = await response.json();
      if (data.text) {
        handleChange(index, 'desc', data.text);
      } else {
        alert("Erreur: " + (data.error || "Impossible de générer le texte."));
      }
    } catch (err) {
      alert("Erreur de connexion au serveur IA.");
    } finally {
      setGeneratingIndex(null);
    }
  };

  const handleAdd = () => {
    addExperience({ company: '', role: '', start: '', end: '', desc: '' });
    setExpandedIndex(experiences.length);
  };

  const handleChange = (index, field, value) => {
    const exp = { ...experiences[index], [field]: value };
    updateExperience(index, exp);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Expériences Professionnelles</h3>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Aucune expérience ajoutée.</p>
          <button onClick={handleAdd} className="text-sm text-blue-500 font-semibold hover:underline">
            Commencez par ajouter votre poste actuel
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              {/* Accordion Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    {exp.role || '(Nouveau poste)'}
                  </h4>
                  <p className="text-xs text-slate-500">{exp.company || 'Entreprise'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeExperience(index); }}
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
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Poste / Titre</label>
                    <input 
                      type="text" 
                      value={exp.role || ''} 
                      onChange={(e) => handleChange(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Ex: Chef de Projet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Entreprise</label>
                    <input 
                      type="text" 
                      value={exp.company || ''} 
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Ex: Microsoft"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Date de début</label>
                    <input 
                      type="text" 
                      value={exp.start || ''} 
                      onChange={(e) => handleChange(index, 'start', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Ex: Janv 2020"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Date de fin</label>
                    <input 
                      type="text" 
                      value={exp.end || ''} 
                      onChange={(e) => handleChange(index, 'end', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Ex: Présent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-slate-500">Description des missions</label>
                      <button 
                        onClick={() => generateExperience(index, exp)}
                        disabled={generatingIndex === index}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-md transition-colors disabled:opacity-50"
                      >
                        {generatingIndex === index ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                        {generatingIndex === index ? "Génération..." : "✨ Magie IA"}
                      </button>
                    </div>
                    <textarea 
                      value={exp.desc || ''} 
                      onChange={(e) => handleChange(index, 'desc', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]" 
                      placeholder="Décrivez vos réalisations, missions, et chiffres clés..."
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
