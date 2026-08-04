import React, { useState, useEffect, useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { 
  Briefcase, BarChart2, Search, DollarSign, Plus, X, 
  ChevronRight, Clock, CheckCircle2, XCircle, Trophy,
  TrendingUp, Target, ArrowRight, Trash2, Edit2, 
  ExternalLink, AlertCircle, Star, Zap, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SALARY DATA ──────────────────────────────────────────────────────────────
const SALARY_DATA = {
  'Développeur / Programmeur': { junior: [28000, 38000], mid: [38000, 55000], senior: [55000, 80000] },
  'Ingénieur informatique': { junior: [35000, 45000], mid: [45000, 65000], senior: [65000, 90000] },
  'Chef de projet IT': { junior: [38000, 48000], mid: [48000, 68000], senior: [68000, 95000] },
  'Data Scientist / Analyste': { junior: [35000, 50000], mid: [50000, 70000], senior: [70000, 100000] },
  'Designer / UX-UI': { junior: [28000, 38000], mid: [38000, 55000], senior: [55000, 75000] },
  'Commercial / Vendeur': { junior: [25000, 35000], mid: [35000, 55000], senior: [55000, 85000] },
  'Comptable': { junior: [28000, 36000], mid: [36000, 50000], senior: [50000, 70000] },
  'Ingénieur mécanique': { junior: [32000, 42000], mid: [42000, 60000], senior: [60000, 85000] },
  'Responsable RH': { junior: [30000, 42000], mid: [42000, 58000], senior: [58000, 80000] },
  'Marketing / Communication': { junior: [27000, 38000], mid: [38000, 55000], senior: [55000, 78000] },
  'Infirmier(ère)': { junior: [26000, 32000], mid: [32000, 42000], senior: [42000, 55000] },
  'Enseignant / Formateur': { junior: [24000, 32000], mid: [32000, 42000], senior: [42000, 58000] },
  'Juriste / Avocat': { junior: [32000, 45000], mid: [45000, 70000], senior: [70000, 110000] },
  'Architecte': { junior: [30000, 42000], mid: [42000, 60000], senior: [60000, 90000] },
  'Logisticien / Supply Chain': { junior: [28000, 38000], mid: [38000, 52000], senior: [52000, 72000] },
  'Pharmacien': { junior: [35000, 45000], mid: [45000, 60000], senior: [60000, 80000] },
  'Chef cuisinier': { junior: [22000, 30000], mid: [30000, 45000], senior: [45000, 70000] },
  'Électricien / Technicien': { junior: [24000, 32000], mid: [32000, 45000], senior: [45000, 60000] },
};

const CITY_MULTIPLIERS = {
  'Paris / Île-de-France': 1.25,
  'Lyon': 1.05,
  'Marseille': 0.95,
  'Bordeaux': 1.0,
  'Toulouse': 1.0,
  'Nice': 1.0,
  'Nantes': 0.98,
  'Strasbourg': 1.02,
  'Lille': 0.97,
  'Autre région': 0.92,
};

// ─── KANBAN COLUMNS ──────────────────────────────────────────────────────────
const getColumns = (t) => [
  { id: 'wishlist', label: t('jobspace.col_wishlist', '⭐ À postuler'), color: 'bg-slate-500', light: 'bg-slate-100 dark:bg-slate-800', border: 'border-slate-400' },
  { id: 'applied', label: t('jobspace.col_applied', '📤 Envoyé'), color: 'bg-blue-500', light: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-400' },
  { id: 'interview', label: t('jobspace.col_interview', '🎤 Entretien'), color: 'bg-amber-500', light: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-400' },
  { id: 'offer', label: t('jobspace.col_offer', '🎉 Offre reçue'), color: 'bg-green-500', light: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-400' },
  { id: 'rejected', label: t('jobspace.col_rejected', '❌ Refusé'), color: 'bg-red-400', light: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-400' },
];

const newCard = () => ({ 
  id: Date.now().toString(), 
  company: '', role: '', date: new Date().toISOString().split('T')[0], 
  link: '', notes: '', status: 'wishlist' 
});

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function JobSpace() {
  const { cvData } = useResume();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('tracker');

  const tabs = [
    { id: 'tracker', label: t('jobspace.tab_tracker', 'Mon Tracker'), icon: Briefcase },
    { id: 'dashboard', label: t('jobspace.tab_dashboard', 'Dashboard'), icon: BarChart2 },
    { id: 'analyze', label: t('jobspace.tab_analyze', 'Analyser une offre'), icon: Search },
    { id: 'salary', label: t('jobspace.tab_salary', 'Calculateur de salaire'), icon: DollarSign },
  ];

  return (
    <>
      <SEO 
        title={t('jobspace.seo_title', 'Espace Emploi — Outils pour trouver un travail')}
        description={t('jobspace.seo_desc', "Suivez vos candidatures, analysez des offres d'emploi, calculez votre salaire et optimisez votre CV.")}
        url="https://www.moncvgo.com/espace-emploi"
      />
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <Zap className="w-4 h-4" /> {t('jobspace.badge', 'Espace Emploi')}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
              {t('jobspace.title', 'Trouvez votre prochain emploi')} 💼
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {t('jobspace.subtitle', "Tous vos outils de recherche d'emploi au même endroit. 100% gratuit, 100% privé.")}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'tracker' && <TrackerTab />}
              {activeTab === 'dashboard' && <DashboardTab />}
              {activeTab === 'analyze' && <AnalyzeTab cvData={cvData} />}
              {activeTab === 'salary' && <SalaryTab cvData={cvData} />}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}

// ─── TRACKER TAB ─────────────────────────────────────────────────────────────
function TrackerTab() {
  const { t } = useTranslation();
  const COLUMNS = getColumns(t);
  const [cards, setCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moncvgo_tracker') || '[]'); } catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [form, setForm] = useState(newCard());
  const [dragOver, setDragOver] = useState(null);

  useEffect(() => {
    localStorage.setItem('moncvgo_tracker', JSON.stringify(cards));
  }, [cards]);

  const saveCard = () => {
    if (!form.company || !form.role) return;
    if (editCard) {
      setCards(prev => prev.map(c => c.id === editCard ? { ...form } : c));
    } else {
      setCards(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setForm(newCard()); setShowForm(false); setEditCard(null);
  };

  const deleteCard = (id) => setCards(prev => prev.filter(c => c.id !== id));

  const moveCard = (id, newStatus) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const startEdit = (card) => {
    setForm({ ...card }); setEditCard(card.id); setShowForm(true);
  };

  const handleDrop = (e, colId) => {
    const id = e.dataTransfer.getData('cardId');
    moveCard(id, colId);
    setDragOver(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t('jobspace.tracker_title', '📋 Suivi de candidatures')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{cards.length} {t('jobspace.tracker_count', 'candidature(s) au total')}</p>
        </div>
        <button
          onClick={() => { setForm(newCard()); setEditCard(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> {t('jobspace.add', 'Ajouter')}
        </button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-lg">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
                {editCard ? t('jobspace.form_edit', 'Modifier la candidature') : t('jobspace.form_new', 'Nouvelle candidature')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">{t('jobspace.company', 'Entreprise')} *</label>
                  <input value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))}
                    placeholder="Ex: Google, SNCF..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">{t('jobspace.role', 'Poste')} *</label>
                  <input value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value}))}
                    placeholder={t('jobspace.role_ph', 'Ex: Développeur React...')} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">{t('jobspace.date', 'Date de candidature')}</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">{t('jobspace.status', 'Statut')}</label>
                  <select value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500">
                    {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">{t('jobspace.link', "Lien de l'offre")}</label>
                  <input value={form.link} onChange={e => setForm(p => ({...p, link: e.target.value}))}
                    placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">{t('jobspace.notes', 'Notes')}</label>
                  <input value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))}
                    placeholder={t('jobspace.notes_ph', 'Notes personnelles...')} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={saveCard} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">
                  {editCard ? t('jobspace.update', 'Mettre à jour') : t('jobspace.add', 'Ajouter')}
                </button>
                <button onClick={() => { setShowForm(false); setEditCard(null); setForm(newCard()); }}
                  className="px-5 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  {t('jobspace.cancel', 'Annuler')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(col => {
          const colCards = cards.filter(c => c.status === col.id);
          return (
            <div
              key={col.id}
              className={`flex-shrink-0 w-64 sm:w-72 rounded-2xl border-2 ${dragOver === col.id ? 'border-blue-400 scale-[1.02]' : 'border-transparent'} transition-all`}
              onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={e => handleDrop(e, col.id)}
            >
              <div className={`${col.light} rounded-2xl p-3`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-sm text-slate-700 dark:text-slate-200">{col.label}</span>
                  <span className={`${col.color} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center`}>
                    {colCards.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2 min-h-[80px]">
                  {colCards.map(card => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={e => e.dataTransfer.setData('cardId', card.id)}
                      className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{card.role}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{card.company}</p>
                          {card.date && <p className="text-xs text-slate-400 mt-1">{new Date(card.date).toLocaleDateString('fr-FR')}</p>}
                          {card.notes && <p className="text-xs text-slate-400 mt-1 italic truncate">{card.notes}</p>}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          {card.link && <a href={card.link} target="_blank" rel="noreferrer" className="p-1 hover:text-blue-500 text-slate-400"><ExternalLink className="w-3.5 h-3.5" /></a>}
                          <button onClick={() => startEdit(card)} className="p-1 hover:text-amber-500 text-slate-400"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => deleteCard(card.id)} className="p-1 hover:text-red-500 text-slate-400"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      {/* Move buttons */}
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {COLUMNS.filter(c => c.id !== col.id).slice(0, 2).map(target => (
                          <button key={target.id} onClick={() => moveCard(card.id, target.id)}
                            className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                            → {target.label.split(' ')[1] || target.label.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {colCards.length === 0 && (
                    <div className="flex items-center justify-center h-16 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                      <span className="text-xs text-slate-400">{t('jobspace.drop_here', 'Glissez ici')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DASHBOARD TAB ───────────────────────────────────────────────────────────
function DashboardTab() {
  const { t } = useTranslation();
  const COLUMNS = getColumns(t);
  const [cards] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moncvgo_tracker') || '[]'); } catch { return []; }
  });

  const stats = useMemo(() => {
    const total = cards.length;
    const applied = cards.filter(c => ['applied', 'interview', 'offer', 'rejected'].includes(c.status)).length;
    const interviews = cards.filter(c => ['interview', 'offer'].includes(c.status)).length;
    const offers = cards.filter(c => c.status === 'offer').length;
    const rejected = cards.filter(c => c.status === 'rejected').length;
    const responseRate = applied > 0 ? Math.round((interviews / applied) * 100) : 0;
    const offerRate = applied > 0 ? Math.round((offers / applied) * 100) : 0;
    return { total, applied, interviews, offers, rejected, responseRate, offerRate };
  }, [cards]);

  const statCards = [
    { label: t('jobspace.stat_total', 'Total candidatures'), value: stats.total, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: t('jobspace.stat_interviews', 'Entretiens obtenus'), value: stats.interviews, icon: CheckCircle2, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: t('jobspace.stat_offers', 'Offres reçues'), value: stats.offers, icon: Trophy, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: t('jobspace.stat_rejected', 'Refus reçus'), value: stats.rejected, icon: XCircle, color: 'text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];

  const tips = [
    stats.total === 0 && t('jobspace.tip_empty', "Commencez par ajouter vos candidatures dans l'onglet Tracker !"),
    stats.responseRate < 10 && stats.total > 3 && t('jobspace.tip_low_rate', "Votre taux de réponse est faible. Pensez à personnaliser davantage vos lettres de motivation."),
    stats.responseRate > 30 && t('jobspace.tip_good_rate', "Excellent taux de réponse ! Continuez sur cette lancée."),
    stats.offers > 0 && t('jobspace.tip_offer', "🎉 Félicitations ! Vous avez reçu une offre. Prenez le temps de bien négocier."),
    stats.interviews > 0 && stats.offers === 0 && t('jobspace.tip_interviews', "Vous obtenez des entretiens, c'est bien ! Préparez-les avec notre simulateur."),
  ].filter(Boolean);

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">{t('jobspace.dashboard_title', '📊 Tableau de bord')}</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className={`${s.bg} rounded-2xl p-5 border border-slate-100 dark:border-slate-700`}>
            <s.icon className={`w-6 h-6 ${s.color} mb-3`} />
            <p className="text-3xl font-black text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Rates */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{t('jobspace.response_rate', 'Taux de réponse')}</span>
            <span className="font-black text-2xl text-blue-500">{stats.responseRate}%</span>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000" style={{ width: `${stats.responseRate}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{t('jobspace.rate_desc_response', 'Candidatures ayant mené à un entretien')}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{t('jobspace.success_rate', 'Taux de succès')}</span>
            <span className="font-black text-2xl text-green-500">{stats.offerRate}%</span>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${stats.offerRate}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{t('jobspace.rate_desc_offer', 'Candidatures ayant mené à une offre')}</p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-8">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t('jobspace.pipeline', 'Pipeline de candidatures')}</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {COLUMNS.map((col, i) => {
            const count = cards.filter(c => c.status === col.id).length;
            return (
              <React.Fragment key={col.id}>
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-12 h-12 ${col.color} rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg`}>{count}</div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center leading-tight w-16">{col.label.split(' ').slice(1).join(' ')}</span>
                </div>
                {i < COLUMNS.length - 1 && <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" /> {t('jobspace.personalized_tips', 'Conseils personnalisés')}
          </h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
                <Star className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" /> {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cards.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <BarChart2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="font-semibold">{t('jobspace.no_data', 'Aucune donnée pour l\'instant')}</p>
           <p className="text-sm">{t('jobspace.no_data_hint', 'Ajoutez des candidatures dans l\'onglet Tracker pour voir vos statistiques')}</p>
        </div>
      )}
    </div>
  );
}

// ─── ANALYZE TAB ─────────────────────────────────────────────────────────────
function AnalyzeTab({ cvData }) {
  const { t } = useTranslation();
  const [offerText, setOfferText] = useState('');
  const [result, setResult] = useState(null);

  const extractKeywords = (text) => {
    const stopWords = new Set(['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'en', 'à', 'au', 'avec', 'par', 'sur', 'pour', 'dans', 'ou', 'si', 'est', 'sont', 'sera', 'avoir', 'être', 'nous', 'vous', 'ils', 'elles', 'cette', 'notre', 'votre', 'their', 'the', 'and', 'or', 'of', 'in', 'to', 'a', 'an', 'is', 'are', 'will', 'be', 'have', 'has', 'that', 'this', 'with', 'for', 'as', 'at']);
    return text.toLowerCase()
      .replace(/[^\w\s\-+#]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopWords.has(w));
  };

  const analyze = () => {
    if (!offerText.trim()) return;

    const offerKeywords = [...new Set(extractKeywords(offerText))];
    
    // Build CV text
    const cvText = [
      cvData?.summary || '',
      (cvData?.skills || []).join(' '),
      (cvData?.experiences || []).map(e => `${e.role} ${e.company} ${e.desc}`).join(' '),
      (cvData?.education || []).map(e => `${e.degree} ${e.school}`).join(' '),
    ].join(' ').toLowerCase();

    const found = [];
    const missing = [];

    offerKeywords.forEach(kw => {
      if (cvText.includes(kw)) {
        found.push(kw);
      } else {
        missing.push(kw);
      }
    });

    const score = offerKeywords.length > 0 ? Math.round((found.length / offerKeywords.length) * 100) : 0;

    // Get important missing (longer, more meaningful words)
    const importantMissing = missing
      .filter(w => w.length > 4)
      .slice(0, 12);

    setResult({ score, found: found.slice(0, 15), missing: importantMissing, total: offerKeywords.length });
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 70) return 'from-green-500 to-emerald-400';
    if (score >= 40) return 'from-amber-500 to-yellow-400';
    return 'from-red-500 to-rose-400';
  };

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('jobspace.analyze_title', "🔍 Analyser une offre d'emploi")}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{t('jobspace.analyze_desc', "Collez le texte d'une offre d'emploi et voyez instantanément votre compatibilité avec votre CV actuel.")}</p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-200 block mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" /> {t('jobspace.offer_text', "Texte de l'offre d'emploi")}
          </label>
          <textarea
            value={offerText}
            onChange={e => setOfferText(e.target.value)}
            placeholder={t('jobspace.offer_ph', "Copiez-collez ici le texte complet de l'offre d'emploi...")}
            rows={12}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
          />
          <button
            onClick={analyze}
            disabled={!offerText.trim()}
            className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" /> {t('jobspace.analyze_btn', 'Analyser maintenant')}
          </button>
          
          {!cvData?.personal?.name && (
            <div className="mt-3 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-300">
                {t('jobspace.empty_cv', 'Votre CV est vide.')} <a href="/create" className="underline font-bold">{t('jobspace.fill_cv', 'Remplissez-le d\'abord')}</a> {t('jobspace.for_precise_analysis', 'pour une analyse précise.')}
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          {result ? (
            <div className="space-y-4">
              {/* Score */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{t('jobspace.compat_score', 'Score de compatibilité')}</p>
                <div className={`text-7xl font-black ${getScoreColor(result.score)} mb-2`}>{result.score}%</div>
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mx-4 mb-3">
                  <div className={`h-full bg-gradient-to-r ${getScoreBg(result.score)} rounded-full transition-all duration-1000`} style={{ width: `${result.score}%` }} />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {result.found.length} {t('jobspace.found_kw_count', 'mots-clés trouvés sur')} {result.total} {t('jobspace.analyzed', 'analysés')}
                </p>
              </div>

              {/* Missing keywords */}
              {result.missing.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800 p-5">
                  <h3 className="font-bold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> {t('jobspace.missing_kw', 'Mots-clés manquants dans votre CV')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missing.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-xs font-semibold">{kw}</span>
                    ))}
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-3">💡 {t('jobspace.add_terms', 'Ajoutez ces termes à votre CV pour augmenter votre score ATS')}</p>
                </div>
              )}

              {/* Found keywords */}
              {result.found.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800 p-5">
                  <h3 className="font-bold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {t('jobspace.found_kw', 'Points forts détectés')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.found.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-semibold">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              <a href="/create" className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                {t('jobspace.improve_cv', 'Améliorer mon CV')} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 h-full flex flex-col items-center justify-center text-center">
              <Search className="w-16 h-16 text-slate-200 dark:text-slate-700 mb-4" />
              <p className="font-semibold text-slate-400 dark:text-slate-500">{t('jobspace.paste_offer', "Collez une offre d'emploi")}</p>
              <p className="text-sm text-slate-300 dark:text-slate-600 mt-1">{t('jobspace.result_here', 'Le résultat apparaîtra ici')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SALARY TAB ──────────────────────────────────────────────────────────────
function SalaryTab({ cvData }) {
  const { t } = useTranslation();
  const [role, setRole] = useState('');
  const [city, setCity] = useState('Paris / Île-de-France');
  const [experience, setExperience] = useState('mid');
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Pre-fill with CV data if available
    const cvTitle = cvData?.personal?.title || '';
    if (cvTitle) {
      const match = Object.keys(SALARY_DATA).find(k => 
        cvTitle.toLowerCase().includes(k.toLowerCase().split('/')[0].trim()) ||
        k.toLowerCase().includes(cvTitle.toLowerCase().split(' ')[0])
      );
      if (match) setRole(match);
    }
  }, [cvData]);

  const calculate = () => {
    const data = SALARY_DATA[role];
    if (!data) return;
    const mult = CITY_MULTIPLIERS[city] || 1;
    const range = data[experience];
    setResult({
      min: Math.round(range[0] * mult / 1000) * 1000,
      max: Math.round(range[1] * mult / 1000) * 1000,
      median: Math.round(((range[0] + range[1]) / 2) * mult / 1000) * 1000,
      role, city, experience
    });
  };

  const expLabels = { junior: 'Junior (0-3 ans)', mid: 'Confirmé (3-7 ans)', senior: 'Senior (7+ ans)' };

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('jobspace.salary_title', '💰 Calculateur de salaire')}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{t('jobspace.salary_desc', 'Estimez votre fourchette de salaire en France selon votre poste et votre expérience.')}</p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 block mb-2">{t('jobspace.job_title', 'Poste / Métier')}</label>
            <select value={role} onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">{t('jobspace.select_job', 'Sélectionnez un métier...')}</option>
              {Object.keys(SALARY_DATA).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 block mb-2">{t('jobspace.region', 'Région')}</label>
            <select value={city} onChange={e => setCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500">
              {Object.keys(CITY_MULTIPLIERS).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 block mb-3">{t('jobspace.exp_level', "Niveau d'expérience")}</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(expLabels).map(([key, label]) => (
                <button key={key} onClick={() => setExperience(key)}
                  className={`py-2.5 px-2 rounded-xl border-2 text-xs font-bold transition-all text-center ${
                    experience === key 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={!role}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" /> {t('jobspace.calculate_btn', 'Calculer mon salaire')}
          </button>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white text-center shadow-xl shadow-blue-500/20">
                <p className="text-sm font-semibold opacity-80 mb-1">{result.role} — {expLabels[result.experience]}</p>
                <p className="text-sm opacity-70 mb-4">{result.city}</p>
                <div className="text-5xl font-black mb-1">{result.median.toLocaleString('fr-FR')} €</div>
                <p className="text-sm opacity-80">Salaire médian annuel brut</p>
                <div className="flex justify-between mt-6 bg-white/20 rounded-xl p-4">
                  <div>
                    <p className="text-xs opacity-70">Minimum</p>
                    <p className="text-xl font-black">{result.min.toLocaleString('fr-FR')} €</p>
                  </div>
                  <div className="w-px bg-white/30" />
                  <div>
                    <p className="text-xs opacity-70">Maximum</p>
                    <p className="text-xl font-black">{result.max.toLocaleString('fr-FR')} €</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white">💡 Conseils de négociation</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> Demandez toujours en haut de la fourchette lors de vos négociations.</li>
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> Incluez les avantages (télétravail, RTT, mutuelle) dans votre évaluation.</li>
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> À Paris, le coût de la vie est ~20% plus élevé qu'en région.</li>
                </ul>
              </div>

              <p className="text-xs text-slate-400 text-center px-4">
                * Estimations basées sur des données du marché français en 2024. Les salaires réels peuvent varier selon l'entreprise, le secteur et les compétences spécifiques.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 h-full flex flex-col items-center justify-center text-center">
              <DollarSign className="w-16 h-16 text-slate-200 dark:text-slate-700 mb-4" />
              <p className="font-semibold text-slate-400 dark:text-slate-500">Sélectionnez votre métier</p>
              <p className="text-sm text-slate-300 dark:text-slate-600 mt-1">La fourchette de salaire apparaîtra ici</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
