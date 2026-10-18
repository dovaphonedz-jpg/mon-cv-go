import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';
import AdManager from './components/AdManager';
import Home from './pages/Home';

// Lazy load non-homepage routes for ultra-fast initial bundle loading
const CreateCV = lazy(() => import('./pages/CreateCV'));
const CreatePortfolio = lazy(() => import('./pages/CreatePortfolio'));
const CoverLetter = lazy(() => import('./pages/CoverLetter'));
const ConseilsCV = lazy(() => import('./pages/ConseilsCV'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ModelePage = lazy(() => import('./pages/ModelePage'));
const SpecializedPage = lazy(() => import('./pages/SpecializedPage'));
const JobSpace = lazy(() => import('./pages/JobSpace'));
const PlanDuSite = lazy(() => import('./pages/PlanDuSite'));
const StudioPhoto = lazy(() => import('./pages/StudioPhoto'));
const CreerCvGratuitPillar = lazy(() => import('./pages/CreerCvGratuitPillar'));
const NotFound = lazy(() => import('./pages/NotFound'));

const SUPPORTED_LANGS = ['en', 'de', 'ar'];

const routesList = [
  { path: '', element: <Home /> },
  { path: 'create', element: <CreateCV /> },
  { path: 'studio-photo', element: <StudioPhoto /> },
  { path: 'portfolio', element: <CreatePortfolio /> },
  { path: 'lettre-motivation', element: <CoverLetter /> },
  { path: 'conseils-cv', element: <ConseilsCV /> },
  { path: 'blog', element: <Blog /> },
  { path: 'blog/:id', element: <BlogPost /> },
  { path: 'a-propos', element: <About /> },
  { path: 'contact', element: <Contact /> },
  { path: 'mentions-legales', element: <Legal /> },
  { path: 'confidentialite', element: <Privacy /> },
  { path: 'plan-du-site', element: <PlanDuSite /> },
  { path: 'creer-cv-gratuit', element: <CreerCvGratuitPillar /> },
  { path: 'espace-emploi', element: <JobSpace /> },

  // 12 Specialized SEO Pages
  { path: 'cv-ingenieur', element: <SpecializedPage /> },
  { path: 'cv-ingenieur-debutant', element: <SpecializedPage /> },
  { path: 'cv-etudiant', element: <SpecializedPage /> },
  { path: 'cv-sans-experience', element: <SpecializedPage /> },
  { path: 'cv-debutant', element: <SpecializedPage /> },
  { path: 'cv-ats', element: <SpecializedPage /> },
  { path: 'exemple-cv', element: <SpecializedPage /> },
  { path: 'modele-cv-gratuit', element: <SpecializedPage /> },
  { path: 'cv-informatique', element: <SpecializedPage /> },
  { path: 'cv-professionnel', element: <SpecializedPage /> },
  { path: 'alternative-gratuite-zety', element: <SpecializedPage /> },
  { path: 'cv-ats-score-gratuit', element: <SpecializedPage /> },

  // Existing Job Models
  { path: 'modele-cv-comptable-word', element: <ModelePage /> },
  { path: 'modele-cv-ingenieur', element: <ModelePage /> },
  { path: 'modele-cv-debutant', element: <ModelePage /> },
  { path: 'modele-cv-etudiant', element: <ModelePage /> },
  { path: 'modele-cv-commercial', element: <ModelePage /> },
  { path: 'modele-cv-developpeur', element: <ModelePage /> },
  { path: 'modele-cv-designer', element: <ModelePage /> },
  { path: 'modele-cv-infirmiere', element: <ModelePage /> },
  { path: 'modele-cv-restauration', element: <ModelePage /> },
  { path: 'modele-cv-chauffeur-livreur', element: <ModelePage /> },
  { path: 'modele-cv-secretaire', element: <ModelePage /> },
  { path: 'modele-cv-vendeur', element: <ModelePage /> }
];

function LanguageSync() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const lang = SUPPORTED_LANGS.includes(parts[0]) ? parts[0] : 'fr';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [location.pathname, i18n]);

  return null;
}

function App() {
  return (
    <Router>
      <LanguageSync />
      <Layout>
        <AdManager />
        <Suspense fallback={<div className="min-h-screen bg-slate-100 dark:bg-slate-900" />}>
          <Routes>
            {/* French (default root) routes */}
            {routesList.map(r => (
              <Route 
                key={r.path || 'home'} 
                path={r.path ? `/${r.path}` : '/'} 
                element={r.element} 
              />
            ))}
            <Route path="/privacy" element={<Navigate to="/confidentialite" replace />} />

            {/* Multilingual routes for EN, DE, AR */}
            {SUPPORTED_LANGS.map(lang => (
              <React.Fragment key={lang}>
                {routesList.map(r => (
                  <Route 
                    key={`${lang}-${r.path || 'home'}`} 
                    path={r.path ? `/${lang}/${r.path}` : `/${lang}`} 
                    element={r.element} 
                  />
                ))}
                <Route path={`/${lang}/privacy`} element={<Navigate to={`/${lang}/confidentialite`} replace />} />
              </React.Fragment>
            ))}

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </Layout>
    </Router>
  );
}

export default App;
