import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, FilePlus2, PenLine, BookOpen, Info, Mail, Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CookieConsent from './CookieConsent';
import ChatBot from './Chatbot';

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

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
      
      {/* Top Bar - Tech SaaS Vibe */}
      <div className="bg-blue-600 dark:bg-blue-900 text-white text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 select-none">
        <Sparkles className="w-3.5 h-3.5 text-blue-200" />
        <span>CV Professionnel — 100% gratuit, sans inscription.</span>
      </div>

      {/* Header - Glassmorphism */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md group-hover:shadow-blue-500/50 transition-all">
              M
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              MonCV<span className="text-blue-600 dark:text-blue-400">Go</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {[
              { path: '/lettre-motivation', label: 'Lettre de motivation' },
              { path: '/conseils-cv', label: 'Conseils CV' },
              { path: '/a-propos', label: 'À propos' },
              { path: '/contact', label: 'Contact' },
            ].map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${isActive(link.path) ? 'text-blue-600 dark:text-blue-400' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
              title="Changer de thème"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/create" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition-all shadow-sm hover:shadow-md">
              <FilePlus2 className="w-4 h-4" />
              Créer mon CV
            </Link>
            
            {/* Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-[#0B1120] border-t border-slate-200 dark:border-slate-800 py-12 text-sm text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-emerald-400 rounded flex items-center justify-center text-white font-black text-xs">M</div>
            <span className="font-bold text-slate-900 dark:text-white">&copy; 2026 Mon CV Go. Tous droits réservés.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-medium">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Accueil</Link>
            <Link to="/a-propos" className="hover:text-blue-600 dark:hover:text-blue-400">À propos</Link>
            <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
            <Link to="/mentions-legales" className="hover:text-blue-600 dark:hover:text-blue-400">Conditions d'utilisation</Link>
            <Link to="/confidentialite" className="hover:text-blue-600 dark:hover:text-blue-400">Politique de confidentialité</Link>
          </div>
        </div>
      </footer>

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
                <span className="font-extrabold text-lg text-slate-900 dark:text-white">Menu</span>
                <button onClick={closeMobileMenu} className="p-2 -mr-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex flex-col p-4 gap-2 overflow-y-auto">
                <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Accueil
                </Link>
                <Link to="/create" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md">
                  <FilePlus2 className="w-5 h-5" /> Créer mon CV
                </Link>
                <Link to="/lettre-motivation" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <PenLine className="w-5 h-5 text-slate-400" /> Lettre de motivation
                </Link>
                <Link to="/conseils-cv" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <BookOpen className="w-5 h-5 text-slate-400" /> Conseils CV
                </Link>
                <Link to="/a-propos" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Info className="w-5 h-5 text-slate-400" /> À propos
                </Link>
                <Link to="/contact" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Mail className="w-5 h-5 text-slate-400" /> Contact
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
