import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsForm() {
  const { cvData, addProject, updateProject, removeProject } = useResume();
  const [newProject, setNewProject] = useState({ title: '', techStack: '', link: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newProject.title.trim() === '') return;
    addProject(newProject);
    setNewProject({ title: '', techStack: '', link: '', description: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-500" />
          Projets & Portfolio
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          {isAdding ? 'Annuler' : <><Plus className="w-4 h-4" /> Ajouter</>}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nom du Projet</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="Ex: Application E-commerce"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Lien (URL)</label>
                  <input
                    type="text"
                    value={newProject.link}
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="Ex: github.com/mon-projet"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Technologies utilisées</label>
                <input
                  type="text"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="Ex: React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none h-24 dark:text-white"
                  placeholder="Décrivez votre rôle et ce que fait le projet..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAdd}
                  disabled={newProject.title.trim() === ''}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ajouter le projet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {(cvData.projects || []).map((project, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={index}
            className="group relative bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
          >
            <button
              onClick={() => removeProject(index)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
              <div>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, { ...project, title: e.target.value })}
                  className="font-bold text-slate-800 dark:text-white bg-transparent outline-none w-full border-b border-transparent focus:border-indigo-300 dark:focus:border-indigo-600 mb-1"
                  placeholder="Nom du projet"
                />
                <input
                  type="text"
                  value={project.techStack}
                  onChange={(e) => updateProject(index, { ...project, techStack: e.target.value })}
                  className="text-sm text-slate-500 dark:text-slate-400 bg-transparent outline-none w-full border-b border-transparent focus:border-indigo-300 dark:focus:border-indigo-600"
                  placeholder="Technologies"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={project.link}
                  onChange={(e) => updateProject(index, { ...project, link: e.target.value })}
                  className="text-sm text-indigo-500 bg-transparent outline-none w-full border-b border-transparent focus:border-indigo-300 dark:focus:border-indigo-600"
                  placeholder="Lien (URL)"
                />
              </div>
            </div>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(index, { ...project, description: e.target.value })}
              className="mt-3 text-sm text-slate-600 dark:text-slate-300 bg-transparent outline-none w-full border border-transparent focus:border-indigo-300 dark:focus:border-indigo-600 rounded-lg focus:p-2 transition-all resize-none h-20"
              placeholder="Description..."
            />
          </motion.div>
        ))}
        
        {(!cvData.projects || cvData.projects.length === 0) && !isAdding && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Aucun projet ajouté. Présentez vos meilleures réalisations !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
