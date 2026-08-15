import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, FilePlus2, PenLine, BookOpen, Info, Mail, Menu, X, Moon, Sun, Briefcase, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CookieConsent from './CookieConsent';
import ChatBot from './Chatbot';
import LanguageSwitcher from './LanguageSwitcher';

export default function Layout({ children }) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  // Pages where the footer should be hidden (editor pages)
  const noFooterPaths = ['/create', '/portfolio', '/lettre-motivation'];
  const isEditorPage = noFooterPaths.some(path => location.pathname.startsWith(path));

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Helper to check active path
  const isActive = (path) => location.pathname === path;

  return (
    <div id="app" className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#0F172A] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Header - Brutalist */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b-4 border-slate-900 transition-colors duration-300">
        <div className="w-full mx-auto px-3 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 group transition-smooth brutal-hover shrink-0">
            <span className="font-extrabold text-lg sm:text-3xl tracking-tighter text-slate-900 dark:text-white flex items-center">
              MONCV<span className="bg-yellow-400 text-slate-900 px-1.5 sm:px-2 py-0.5 ml-1 brutal-border transform rotate-3 inline-block shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">GO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 lg:gap-3 text-xs xl:text-sm font-semibold text-slate-600 dark:text-slate-300 rtl:gap-2">
            {[
              { path: '/', label: t('nav.home') },
              { path: '/create', label: t('nav.create_cv') },
              { path: '/studio-photo', label: '📸 Studio Photo', isNew: true },
              { path: '/portfolio', label: t('nav.create_portfolio') },
              { path: '/lettre-motivation', label: t('nav.cover_letter') },
              { path: '/conseils-cv', label: t('nav.cv_tips') },
              { path: '/espace-emploi', label: t('nav.job_space', '💼 Espace Emploi') },
              { path: '/blog', label: 'Blog' },
              { path: '/a-propos', label: t('nav.about') },
              { path: '/contact', label: t('nav.contact') },
            ].map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`relative font-black uppercase tracking-widest px-3 py-1 brutal-border transition-smooth brutal-hover ${isActive(link.path) ? 'bg-cyan-400 text-slate-900 brutal-shadow' : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-yellow-400 hover:text-slate-900'}`}
              >
                {link.label}
                {link.isNew && <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[8px] font-black uppercase px-1 rounded-sm">NEW</span>}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageSwitcher />
            <button 
              onClick={toggleTheme} 
              className="p-1.5 sm:p-2 bg-yellow-400 text-slate-900 brutal-border brutal-shadow transition-smooth brutal-hover brutal-active" 
              title={t('theme.change')}
            >
              {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />}
            </button>
            
            {/* Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-1.5 sm:p-2 bg-pink-400 text-slate-900 brutal-border brutal-shadow transition-smooth brutal-hover brutal-active"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col">
        {children}
      </main>

      {/* FOOTER — Hidden on editor pages */}
      {!isEditorPage && (
      <footer className="bg-cyan-400 border-t-4 md:border-t-8 border-slate-900 py-10 text-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white brutal-border brutal-shadow flex items-center justify-center text-slate-900 font-black text-lg transform -rotate-6 shrink-0">M</div>
                <span className="font-black text-sm uppercase tracking-widest">Mon CV Go</span>
              </div>
              <p className="text-sm font-bold opacity-80 max-w-xs">{t('footer_section.desc', 'Le créateur de CV gratuit le plus simple du web. Sans inscription, sans paiement.')}</p>
              <div className="flex gap-2 mt-1">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white brutal-border flex items-center justify-center font-black text-xs hover:bg-yellow-300 transition-colors" aria-label="Twitter">X</a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white brutal-border flex items-center justify-center font-black text-xs hover:bg-yellow-300 transition-colors" aria-label="LinkedIn">in</a>
              </div>
            </div>

            {/* Outils */}
            <div className="flex flex-col gap-2">
              <h4 className="font-black uppercase tracking-widest text-sm mb-1">{t('footer_section.our_tools', 'Nos Outils')}</h4>
              <Link to="/create" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><FilePlus2 className="w-3 h-3" /> {t('nav.create_cv')}</Link>
              <Link to="/studio-photo" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><Sparkles className="w-3 h-3 text-yellow-600" /> {t('footer_section.photo_studio', '📸 Studio Photo CV')}</Link>
              <Link to="/portfolio" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><Briefcase className="w-3 h-3" /> {t('nav.create_portfolio')}</Link>
              <Link to="/lettre-motivation" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><PenLine className="w-3 h-3" /> {t('nav.cover_letter')}</Link>
              <Link to="/espace-emploi" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1">
                <Zap className="w-3 h-3" /> {t('nav.job_space', 'Espace Emploi')} <span className="bg-pink-500 text-white text-[9px] font-black px-1 rounded">NEW</span>
              </Link>
            </div>

            {/* Modèles SEO */}
            <div className="flex flex-col gap-2">
              <h4 className="font-black uppercase tracking-widest text-sm mb-1">{t('footer_section.resume_templates', 'Modèles de CV')}</h4>
              <Link to="/modele-cv-comptable-word" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_comptable', 'CV Comptable')}</Link>
              <Link to="/modele-cv-ingenieur" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_ingenieur', 'CV Ingénieur')}</Link>
              <Link to="/modele-cv-debutant" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_debutant', 'CV Débutant')}</Link>
              <Link to="/modele-cv-etudiant" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_etudiant', 'CV Étudiant')}</Link>
              <Link to="/modele-cv-commercial" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_commercial', 'CV Commercial')}</Link>
              <Link to="/modele-cv-developpeur" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_developpeur', 'CV Développeur')}</Link>
              <Link to="/modele-cv-designer" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_designer', 'CV Designer')}</Link>
              <Link to="/modele-cv-infirmiere" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_infirmiere', 'CV Infirmière')}</Link>
              <Link to="/modele-cv-restauration" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_restauration', 'CV Restauration')}</Link>
              <Link to="/modele-cv-chauffeur-livreur" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_chauffeur', 'CV Chauffeur Livreur')}</Link>
              <Link to="/modele-cv-secretaire" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_secretaire', 'CV Secrétaire')}</Link>
              <Link to="/modele-cv-vendeur" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer_section.tpl_vendeur', 'CV Vendeur')}</Link>
            </div>

            {/* Liens utiles */}
            <div className="flex flex-col gap-2">
              <h4 className="font-black uppercase tracking-widest text-sm mb-1">{t('footer_section.useful_links', 'Liens utiles')}</h4>
              <Link to="/conseils-cv" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><BookOpen className="w-3 h-3" /> {t('nav.cv_tips')}</Link>
              <Link to="/blog" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><BookOpen className="w-3 h-3" /> Blog</Link>
              <Link to="/plan-du-site" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><FilePlus2 className="w-3 h-3" /> {t('footer_section.sitemap_html', 'Plan du site (HTML)')}</Link>
              <Link to="/a-propos" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><Info className="w-3 h-3" /> {t('nav.about')}</Link>
              <Link to="/contact" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all flex items-center gap-1"><Mail className="w-3 h-3" /> {t('nav.contact')}</Link>
              <Link to="/mentions-legales" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer.terms')}</Link>
              <Link to="/confidentialite" className="text-sm font-bold hover:underline underline-offset-4 decoration-2 transition-all">{t('footer.privacy')}</Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t-2 border-slate-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-black text-xs uppercase tracking-widest">&copy; 2026 Mon CV Go. {t('footer.rights')}</span>
            <span className="text-xs font-bold opacity-70">Made with ❤️ for job seekers worldwide</span>
          </div>
        </div>
      </footer>
      )}

      {/* AdSense Compliance: Cookie Banner */}
      <CookieConsent />

      {/* AI Assistant Chatbot */}
      <ChatBot />

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white">{t('nav.menu')}</span>
                <button onClick={closeMobileMenu} className="p-2 -mr-2 rtl:-mr-0 rtl:-ml-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex flex-col p-4 gap-2 overflow-y-auto">
                <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-white text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  {t('nav.home')}
                </Link>
                <Link to="/create" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <FilePlus2 className="w-6 h-6" strokeWidth={3} /> {t('nav.create_cv')}
                </Link>
                <Link to="/studio-photo" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-yellow-300 text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <Sparkles className="w-6 h-6 text-slate-900" strokeWidth={3} /> 📸 Studio Photo CV <span className="bg-pink-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded">NEW</span>
                </Link>
                <Link to="/portfolio" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-cyan-400 text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <Briefcase className="w-6 h-6" strokeWidth={3} /> {t('nav.create_portfolio')}
                </Link>
                <Link to="/lettre-motivation" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-pink-400 text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <PenLine className="w-6 h-6" strokeWidth={3} /> {t('nav.cover_letter')}
                </Link>
                <Link to="/espace-emploi" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-emerald-400 text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <Zap className="w-6 h-6" strokeWidth={3} /> Espace Emploi
                </Link>
                <Link to="/conseils-cv" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-white text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <BookOpen className="w-6 h-6" strokeWidth={3} /> {t('nav.cv_tips')}
                </Link>
                <Link to="/blog" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-purple-100 text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <BookOpen className="w-6 h-6" strokeWidth={3} /> Blog
                </Link>
                <Link to="/a-propos" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-white text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <Info className="w-6 h-6" strokeWidth={3} /> {t('nav.about')}
                </Link>
                <Link to="/contact" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-4 bg-white text-slate-900 font-black uppercase tracking-widest brutal-border brutal-shadow transition-smooth brutal-hover">
                  <Mail className="w-6 h-6" strokeWidth={3} /> {t('nav.contact')}
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
