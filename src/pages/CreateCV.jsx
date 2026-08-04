import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { UploadCloud, Sparkles, Trash2, Eye, Download, FileText, Presentation, Palette, Info, ChevronDown, ChevronUp, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

import { exportToWord } from '../utils/exportWord';
import { exportToPowerPoint } from '../utils/exportPowerPoint';
import { triggerConfetti } from '../utils/confetti';

import CVPreview from '../components/cv-preview/CVPreview';
import PersonalInfoForm from '../components/cv-forms/PersonalInfoForm';
import StyleForm from '../components/cv-forms/StyleForm';
import ExperienceForm from '../components/cv-forms/ExperienceForm';
import EducationForm from '../components/cv-forms/EducationForm';
import SkillsForm from '../components/cv-forms/SkillsForm';
import SummaryForm from '../components/cv-forms/SummaryForm';
import ProjectsForm from '../components/cv-forms/ProjectsForm';
import DonationButton from '../components/DonationButton';
import ThankYouModal from '../components/ThankYouModal';
import ATSScore from '../components/ATSScore';
import OnboardingTour from '../components/OnboardingTour';
import { PRESETS } from '../utils/presets';

export default function CreateCV() {
  const { cvData, config, updateConfig, resetData, loadDemo, importData } = useResume();
  const { t } = useTranslation();
  
  // URL Params handling
  const location = useLocation();
  const getInitialAccordion = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('step') === 'projects') return 'projects';
    return 'personal';
  };

  const [openAccordion, setOpenAccordion] = useState(getInitialAccordion);
  const [mobileTab, setMobileTab] = useState('content'); // 'content' | 'preview' | 'design'
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  
  const fileInputRef = useRef(null);
  const printRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateParam = params.get('template');
    if (templateParam) {
      updateConfig('template', templateParam);
    }
    
    const presetParam = params.get('preset');
    if (presetParam && PRESETS[presetParam]) {
      const preset = PRESETS[presetParam];
      // Load directly without going through importData JSON stringify/parse
      importData(JSON.stringify(preset));
      // Clean URL
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('preset');
      window.history.replaceState({}, '', newUrl.toString());
    } else if (params.get('demo') === 'true') {
      loadDemo('fr');
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('demo');
      window.history.replaceState({}, '', newUrl.toString());
    }
    if (params.get('step') === 'projects') {
      setOpenAccordion('projects');
    }
  }, []);

  // CV Completeness Score (Progress Bar)
  const completionScore = useMemo(() => {
    let score = 0;
    const personal = cvData.personal || {};
    if (personal.name && personal.name.length > 2) score += 10;
    if (personal.email && personal.email.includes('@')) score += 10;
    if (personal.phone && personal.phone.length > 5) score += 10;
    if (cvData.summary && cvData.summary.length > 20) score += 20;
    
    const experiences = cvData.experiences || [];
    const validExperiences = experiences.filter(exp => exp.role && exp.desc);
    if (validExperiences.length >= 2) score += 30;
    else if (validExperiences.length === 1) score += 15;
    
    const skills = cvData.skills || [];
    if (skills.length >= 5) score += 20;
    else if (skills.length >= 3) score += 10;
    
    return Math.min(100, score);
  }, [cvData]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: cvData?.personal?.name ? `CV_${cvData.personal.name.replace(/\s+/g, '_')}` : 'Mon_CV',
    pageStyle: `
      @page { size: A4 portrait; margin: 0mm !important; }
      @media print {
        *, *:before, *:after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        html, body { width: 210mm !important; height: 297mm !important; max-height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
        #cv-export-container { position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; height: 297mm !important; max-height: 297mm !important; margin: 0 !important; padding: 0 !important; transform: none !important; box-shadow: none !important; overflow: hidden !important; page-break-before: avoid !important; page-break-after: avoid !important; page-break-inside: avoid !important; }
      }
    `
  });

  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImporting(true);
      try {
        if (file.name.endsWith('.json')) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const success = importData(evt.target.result);
            if (success) alert('Données JSON importées avec succès !');
            else alert('Fichier JSON invalide ou corrompu.');
            setIsImporting(false);
          };
          reader.readAsText(file);
        } else if (file.name.endsWith('.pdf')) {
          const { extractTextFromPDF, parseCVText } = await import('../utils/cvParser');
          const text = await extractTextFromPDF(file);
          if (!text || text.trim().length < 20) {
            alert('Aucun texte extrait du PDF. S\'agit-il d\'un document scanné ou d\'une image ?');
            setIsImporting(false);
            return;
          }
          const { cvData: parsedData } = parseCVText(text);
          importData(JSON.stringify({ cvData: parsedData }));
          alert('Texte extrait du PDF ! Veuillez vérifier et corriger les champs.');
          setIsImporting(false);
        } else if (file.name.endsWith('.docx')) {
          const { extractTextFromWord, parseCVText } = await import('../utils/cvParser');
          const text = await extractTextFromWord(file);
          if (!text || text.trim().length < 20) {
            alert('Aucun texte extrait du fichier Word. Veuillez vérifier son contenu.');
            setIsImporting(false);
            return;
          }
          const { cvData: parsedData } = parseCVText(text);
          importData(JSON.stringify({ cvData: parsedData }));
          alert('Texte extrait de Word ! Veuillez vérifier et corriger les champs.');
          setIsImporting(false);
        } else if (file.name.endsWith('.doc')) {
          alert('Les anciens fichiers .doc ne sont pas supportés. Veuillez utiliser .docx ou .pdf.');
          setIsImporting(false);
        } else {
          alert("Format non supporté. Veuillez utiliser JSON, PDF ou .docx.");
          setIsImporting(false);
        }
      } catch (err) {
        console.error("Erreur d'importation", err);
        alert("Erreur lors de l'analyse du fichier.");
        setIsImporting(false);
      } finally {
        e.target.value = null;
      }
    }
  };

  const ACCORDION_STEPS = [
    { id: 'personal', label: t('create_cv.step_2'), component: <PersonalInfoForm /> },
    { id: 'summary', label: t('create_cv.step_7'), component: <SummaryForm /> },
    { id: 'experience', label: t('create_cv.step_3'), component: <ExperienceForm /> },
    { id: 'education', label: t('create_cv.step_4'), component: <EducationForm /> },
    { id: 'skills', label: t('create_cv.step_5'), component: <SkillsForm /> },
    { id: 'projects', label: t('create_cv.step_6'), component: <ProjectsForm /> }
  ];

  return (
    <>
    <SEO title={t('create_cv.seo_title')} description={t('create_cv.seo_desc')} url="https://www.moncvgo.com/create" />

    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden mt-1.5 lg:mt-0">
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Header Info */}
      <section className="shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0F172A]/50 backdrop-blur-md z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="shrink-0">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              {t('create_cv.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 hidden sm:block">
              {t('create_cv.subtitle')}
            </p>
          </div>
          
          <div className="hidden lg:flex items-start gap-2.5 bg-blue-50/80 dark:bg-blue-900/20 px-4 py-2.5 rounded-xl border border-blue-100 dark:border-blue-800/50 flex-grow max-w-[500px] mr-auto ml-4 lg:ml-8 shadow-sm">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-snug">
              <strong className="font-semibold block mb-0.5">{t('create_cv.private_title')}</strong>
              {t('create_cv.private_desc')} <span className="opacity-90">{t('create_cv.private_warn')}</span>
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-center overflow-x-auto pb-1 sm:pb-0 custom-scrollbar-hide tour-step-actions shrink-0">

            <button onClick={() => loadDemo(config.cvLang || 'fr')} className="shrink-0 flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              <Sparkles className="w-4 h-4" />
              <span>{t('create_cv.btn_example')}</span>
            </button>
            <button onClick={handleImportClick} className="shrink-0 flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-semibold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              <UploadCloud className="w-4 h-4" />
              <span>{t('create_cv.btn_import')}</span>
            </button>
            <button onClick={resetData} className="shrink-0 flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 font-semibold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('create_cv.btn_clear')}</span>
            </button>
            <button onClick={() => setIsDonationModalOpen(true)} className="shrink-0 flex items-center justify-center px-3 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-500 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-rose-200 dark:hover:bg-rose-900/50 hover:-translate-y-0.5" title="Soutenez le projet">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500" />
            </button>
            <button onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'generation_cv', { 'event_category': 'Engagement', 'event_label': 'Bouton_Generer_CV' }); triggerConfetti(); setIsThankYouModalOpen(true); setTimeout(() => handlePrint(), 500); }} className="shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5">
              <Download className="w-4 h-4" />
              <span>{t('create_cv.btn_pdf')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content: 3 Columns on LG screens */}
      <main className="flex-grow max-w-[1600px] w-full mx-auto p-0 lg:p-6 flex flex-col lg:flex-row gap-0 lg:gap-6 lg:overflow-hidden relative z-10">
        
        {/* COLUMN 1: FORMS (Left) */}
        <section className={`w-full lg:w-[350px] xl:w-[420px] flex-col gap-4 lg:overflow-y-auto custom-scrollbar lg:pr-2 pb-24 lg:pb-0 pt-4 lg:pt-0 shrink-0 ${mobileTab === 'content' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="px-4 lg:px-0 flex flex-col gap-4 shrink-0">
            <OnboardingTour />
          </div>

          <div className="px-4 lg:px-0 flex flex-col gap-3 mt-2 tour-step-nav tour-step-form">
            {ACCORDION_STEPS.map((step) => (
              <div key={step.id} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === step.id ? null : step.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-base text-slate-800 dark:text-slate-100"
                >
                  {step.label}
                  {openAccordion === step.id ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === step.id && (
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: 'auto' }} 
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
                        {step.component}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 2: PREVIEW (Center) */}
        <section className={`flex-grow flex-col h-full lg:overflow-hidden pb-24 lg:pb-0 pt-4 lg:pt-0 tour-step-preview ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="mx-4 lg:mx-0 mb-4 shrink-0">
            <ATSScore />
          </div>
          
          <div className="flex-grow lg:overflow-y-auto custom-scrollbar rounded-3xl border border-slate-200 dark:border-slate-800 mx-4 lg:mx-0 relative z-10 shadow-inner bg-slate-100/50 dark:bg-slate-900/50 p-2 sm:p-4 lg:p-6 mt-4 lg:mt-0">
            <div className="cv-preview-container w-full">
              <CVPreview ref={printRef} />
            </div>
          </div>
        </section>

        {/* COLUMN 3: DESIGN (Right) */}
        <section className={`w-full lg:w-[300px] xl:w-[350px] flex-col gap-4 lg:overflow-y-auto custom-scrollbar lg:pl-2 pb-24 lg:pb-0 pt-4 lg:pt-0 shrink-0 ${mobileTab === 'design' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none p-4 sm:p-6 mx-4 lg:mx-0 mb-4">
            <h2 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <Palette className="w-5 h-5 text-indigo-500" /> Paramètres Design
            </h2>
            <StyleForm />
          </div>
        </section>

      </main>

      {/* MOBILE BOTTOM NAVIGATION TABS */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-2 flex justify-around items-center z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <button onClick={() => setMobileTab('design')} className={`flex flex-col items-center justify-center gap-1 p-2 w-[30%] rounded-xl transition-all ${mobileTab === 'design' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 transform -translate-y-1' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
          <Palette className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Design</span>
        </button>
        <button onClick={() => setMobileTab('content')} className={`flex flex-col items-center justify-center gap-1 p-2 w-[30%] rounded-xl transition-all ${mobileTab === 'content' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 transform -translate-y-1' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Contenu</span>
        </button>
        <button onClick={() => setMobileTab('preview')} className={`flex flex-col items-center justify-center gap-1 p-2 w-[30%] rounded-xl transition-all ${mobileTab === 'preview' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 transform -translate-y-1' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
          <Eye className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Aperçu</span>
        </button>
      </div>

      <input 
        id="cv-import-file"
        name="cv-import-file"
        aria-label="Importer un fichier"
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }}
        accept=".json,application/json,.pdf,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
        onChange={handleFileChange} 
      />
      
      <ThankYouModal isOpen={isThankYouModalOpen} onClose={() => setIsThankYouModalOpen(false)} />
      
      <AnimatePresence>
        {isDonationModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm"
            >
              <button 
                onClick={() => setIsDonationModalOpen(false)} 
                className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-full shadow-lg z-10 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <DonationButton />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
