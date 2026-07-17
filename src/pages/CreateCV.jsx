import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { UploadCloud, Sparkles, Trash2, ArrowLeft, ArrowRight, Eye, Download, ChevronRight, Save, FileText, Presentation, Palette, X, Info } from 'lucide-react';
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



export default function CreateCV() {
  const { cvData, config, updateConfig, resetData, loadDemo, importData } = useResume();
  const { t } = useTranslation();
  
  const STEPS = [
    { id: 'style', label: t('create_cv.step_1') },
    { id: 'personal', label: t('create_cv.step_2') },
    { id: 'experience', label: t('create_cv.step_3') },
    { id: 'education', label: t('create_cv.step_4') },
    { id: 'skills', label: t('create_cv.step_5') },
    { id: 'projects', label: t('create_cv.step_6') },
    { id: 'summary', label: t('create_cv.step_7') }
  ];

  // Parse query params to allow deep linking to steps
  const getInitialStep = () => {
    const params = new URLSearchParams(window.location.search);
    const step = params.get('step');
    if (step === 'projects') return 5;
    return 0;
  };
  
  const [activeStepIdx, setActiveStepIdx] = useState(getInitialStep);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const printRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const templateParam = params.get('template');
    if (templateParam) {
      updateConfig('template', templateParam);
    }
    
    // Automatically load the demo if requested in the URL
    if (params.get('demo') === 'true') {
      loadDemo('fr');
      // Remove the query string so it doesn't reload demo on subsequent navigation
      window.history.replaceState({}, '', location.pathname + (templateParam ? '?template=' + templateParam : ''));
    }

    if (params.get('step') === 'projects') {
      setActiveStepIdx(5);
    }
  }, [location.search]); // updateConfig is stable from Context

  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: cvData?.personal?.name ? `CV_${cvData.personal.name.replace(/\s+/g, '_')}` : 'Mon_CV',
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body { margin: 0; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        #cv-export-container {
          position: relative !important;
          transform: scale(1) !important;
          margin: 0 !important;
          width: 210mm !important;
          height: 297mm !important;
          box-shadow: none !important;
        }
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
          const { cvData: parsedData } = parseCVText(text);
          importData(JSON.stringify({ cvData: parsedData }));
          alert('Texte extrait du PDF ! Veuillez vérifier et corriger les champs.');
          setIsImporting(false);
        } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
          const { extractTextFromWord, parseCVText } = await import('../utils/cvParser');
          const text = await extractTextFromWord(file);
          const { cvData: parsedData } = parseCVText(text);
          importData(JSON.stringify({ cvData: parsedData }));
          alert('Texte extrait de Word ! Veuillez vérifier et corriger les champs.');
          setIsImporting(false);
        } else {
          alert("Format non supporté. Veuillez utiliser JSON, PDF ou Word.");
          setIsImporting(false);
        }
      } catch (err) {
        console.error("Erreur d'importation", err);
        alert("Erreur lors de l'analyse du fichier.");
        setIsImporting(false);
      }
    }
  };

  const activeStep = STEPS[activeStepIdx];

  const nextStep = () => {
    if (activeStepIdx < STEPS.length - 1) setActiveStepIdx(i => i + 1);
  };

  const prevStep = () => {
    if (activeStepIdx > 0) setActiveStepIdx(i => i - 1);
  };

  return (
    <>
    <SEO title={t('create_cv.seo_title')} description={t('create_cv.seo_desc')} url="https://www.moncvgo.com/create" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden">
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Header Info */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0F172A]/50 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              {t('create_cv.title')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('create_cv.subtitle')}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => loadDemo(config.cvLang || 'fr')} className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-semibold transition-all border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{t('create_cv.btn_example')}</span>
            </button>
            <button onClick={handleImportClick} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold transition-all border border-slate-200 dark:border-slate-700">
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">{t('create_cv.btn_import')}</span>
            </button>
            <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <button onClick={resetData} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold transition-all border border-red-100 dark:border-red-900/50">
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('create_cv.btn_clear')}</span>
            </button>
            <button className="flex lg:hidden items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-bold transition-all" onClick={() => setShowPreviewMobile(!showPreviewMobile)}>
              <Eye className="w-4 h-4" />
              {showPreviewMobile ? t('create_cv.btn_edit') : t('create_cv.btn_preview')}
            </button>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row lg:items-start gap-6">
        
        {/* LEFT COLUMN: Editor Form */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`w-full lg:w-1/2 xl:w-5/12 flex flex-col gap-6 lg:sticky lg:top-6 ${showPreviewMobile ? 'hidden lg:flex' : 'flex'}`}
        >
          <div className="w-full">
            <ATSScore />
          </div>

          <div className="w-full">
            <DonationButton />
          </div>

          {/* Breadcrumbs / Steps */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 relative">
            <nav className="flex gap-2 flex-wrap">
              {STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                    idx === activeStepIdx 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${idx === activeStepIdx ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    {idx + 1}
                  </span>
                  {step.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Form Container */}
          <div className="bg-white dark:bg-[#0F172A] rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex-grow flex flex-col relative z-10">
            
            {/* Form Content Wrapper */}
            <div className="flex-grow min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeStep.id === 'personal' && <PersonalInfoForm />}
                  {activeStep.id === 'style' && <StyleForm />}
                  {activeStep.id === 'experience' && <ExperienceForm />}
                  {activeStep.id === 'education' && <EducationForm />}
                  {activeStep.id === 'skills' && <SkillsForm />}
                  {activeStep.id === 'projects' && <ProjectsForm />}
                  {activeStep.id === 'summary' && <SummaryForm />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button 
                onClick={prevStep}
                disabled={activeStepIdx === 0}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" /> {t('create_cv.btn_prev')}
              </button>
              
              <div className="flex items-center gap-3">
                {activeStepIdx < STEPS.length - 1 && (
                  <button 
                    onClick={nextStep}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors px-2"
                  >
                    {t('create_cv.btn_skip')}
                  </button>
                )}
                
                {activeStepIdx === STEPS.length - 1 ? (
                  <button 
                    onClick={() => {
                       triggerConfetti();
                       setIsThankYouModalOpen(true);
                       setTimeout(() => {
                         handlePrint();
                       }, 500);
                       if (window.innerWidth < 1024) setShowPreviewMobile(true);
                       else {
                         const previewEl = document.querySelector('.cv-preview-container');
                         if (previewEl) previewEl.scrollIntoView({ behavior: 'smooth' });
                       }
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg transition-all group"
                  >
                    {t('create_cv.btn_finish')} <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                ) : (
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-xl shadow-lg transition-all group"
                  >
                    {t('create_cv.btn_next')} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:-scale-x-100" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* RIGHT COLUMN: Live Preview */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`w-full lg:w-1/2 xl:w-7/12 flex flex-col gap-4 ${!showPreviewMobile ? 'hidden lg:flex' : 'flex'}`}
        >
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-500" />
                <span className="hidden sm:inline">{t('create_cv.preview_title')}</span>
              </h2>
              {/* Bouton visible uniquement sur mobile pour aller aux styles */}
              <button 
                onClick={() => setIsStyleModalOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg text-sm border border-indigo-100 dark:border-indigo-800 transition-colors"
              >
                <Palette className="w-4 h-4" />
                {t('create_cv.btn_styles')}
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setIsThankYouModalOpen(true); exportToWord(cvData, config, printRef); }} className="flex items-center gap-2 px-3 py-2.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-bold rounded-xl text-sm transition-all" title="Exporter en Word">
                <FileText className="w-4 h-4" />
                <span className="hidden xl:inline">{t('create_cv.btn_word')}</span>
              </button>
              <button onClick={() => { setIsThankYouModalOpen(true); exportToPowerPoint(cvData); }} className="flex items-center gap-2 px-3 py-2.5 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-400 font-bold rounded-xl text-sm transition-all" title="Exporter en PowerPoint">
                <Presentation className="w-4 h-4" />
                <span className="hidden xl:inline">{t('create_cv.btn_pptx')}</span>
              </button>
              <button onClick={handleImportClick} disabled={isImporting} className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-sm transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-wait">
                <UploadCloud className="w-4 h-4" />
                <span className="hidden sm:inline">{isImporting ? "Analyse..." : t('create_cv.btn_import')}</span>
              </button>
              <button onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'generation_cv', { 'event_category': 'Engagement', 'event_label': 'Bouton_Generer_CV' }); triggerConfetti(); setIsThankYouModalOpen(true); setTimeout(() => handlePrint(), 500); }} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t('create_cv.btn_pdf')}</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-3 flex items-start gap-2 shadow-sm">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              <strong className="font-semibold">{t('create_cv.private_title')}</strong>{t('create_cv.private_desc')}
              <span className="opacity-90">{t('create_cv.private_warn')}</span>
            </p>
          </div>

          <div className="cv-preview-container flex-grow rounded-3xl border border-slate-200 dark:border-slate-800 relative z-10 shadow-inner overflow-hidden">
            <CVPreview ref={printRef} />
          </div>
        </motion.section>
      </main>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".json,.pdf,.doc,.docx" 
        onChange={handleFileChange} 
      />
      <AnimatePresence>
        {isStyleModalOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-50 bg-white dark:bg-[#0B1120] overflow-y-auto lg:hidden"
          >
            <div className="sticky top-0 bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center z-10 shadow-sm">
              <h2 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-500" /> {t('create_cv.btn_styles')}
              </h2>
              <button onClick={() => setIsStyleModalOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 pb-24">
              <StyleForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ThankYouModal isOpen={isThankYouModalOpen} onClose={() => setIsThankYouModalOpen(false)} />
    </div>
    </>
  );
}
