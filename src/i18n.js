import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';
import deTranslation from './locales/de.json';

const resources = {
  fr: { translation: frTranslation.translation },
  en: { translation: enTranslation.translation },
  ar: { translation: arTranslation.translation },
  de: { translation: deTranslation.translation },
};

const pathPrefixDetector = {
  name: 'pathPrefix',
  lookup() {
    if (typeof window === 'undefined') return undefined;
    const parts = window.location.pathname.split('/').filter(Boolean);
    const firstPart = parts[0];
    if (['en', 'de', 'ar'].includes(firstPart)) {
      return firstPart;
    }
    // If explicitly /fr/... or any root path without prefix, French is the source language
    if (firstPart === 'fr') {
      return 'fr';
    }
    return 'fr';
  },
  cacheUserLanguage(lng) {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('i18nextLng', lng);
      } catch (e) {
        // Ignore localStorage quota or privacy restrictions
      }
    }
  }
};

const customDetector = new LanguageDetector();
customDetector.addDetector(pathPrefixDetector);

i18n
  .use(customDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    detection: {
      order: ['pathPrefix', 'localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
