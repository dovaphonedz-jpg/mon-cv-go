import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulating form submission or opening mailto link
    setTimeout(() => {
      setStatus('success');
      // Opening mail client as fallback
      window.location.href = "mailto:iratenebillel@gmail.com";
      
      setTimeout(() => {
        setStatus('idle');
        e.target.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <>
    <SEO title={t('contact.seo_title')} description={t('contact.seo_desc')} url="https://www.moncvgo.com/contact" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] relative overflow-hidden flex flex-col justify-center">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-0 rtl:left-0 ltr:right-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wider border border-blue-200 dark:border-blue-800 mb-6 shadow-sm">
              <MessageSquare className="w-3.5 h-3.5" />
              {t('contact.badge')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('contact.title_1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">{t('contact.title_highlight')}</span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              {t('contact.p1')}
            </p>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800/50 shadow-inner">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('contact.email_label')}</p>
                <a href="mailto:iratenebillel@gmail.com" className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  iratenebillel@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('contact.form_title')}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('contact.label_name')}</label>
                  <input required type="text" className="w-full rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" placeholder={t('contact.ph_name')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('contact.label_email')}</label>
                  <input required type="email" className="w-full rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" placeholder={t('contact.ph_email')} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('contact.label_subject')}</label>
                <input required type="text" className="w-full rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" placeholder={t('contact.ph_subject')} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('contact.label_message')}</label>
                <textarea required rows="4" className="w-full rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none" placeholder={t('contact.ph_message')}></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status !== 'idle'}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {status === 'idle' && (
                  <>
                    <Send className="w-5 h-5 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rtl:-scale-x-100" />
                    {t('contact.btn_send')}
                  </>
                )}
                {status === 'loading' && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t('contact.status_opening')}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}
