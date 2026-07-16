import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Download } from 'lucide-react';
import DonationButton from './DonationButton';

export default function ThankYouModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-white dark:bg-[#0B1120] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A]">
            <h2 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-500" />
              Génération en cours...
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Merci d'utiliser Mon CV Go !
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Votre document est prêt. Si ce service 100% gratuit vous a fait gagner du temps, n'hésitez pas à soutenir le projet pour nous aider à le maintenir en ligne !
            </p>
            
            <div className="bg-slate-50 dark:bg-[#0F172A] rounded-2xl p-1">
              <DonationButton />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
