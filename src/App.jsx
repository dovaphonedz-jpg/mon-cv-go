import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
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
const JobSpace = lazy(() => import('./pages/JobSpace'));
const PlanDuSite = lazy(() => import('./pages/PlanDuSite'));
const StudioPhoto = lazy(() => import('./pages/StudioPhoto'));
const CreerCvGratuitPillar = lazy(() => import('./pages/CreerCvGratuitPillar'));

const SUPPORTED_LANGS = ['en', 'de', 'ar'];

// For non-prefixed routes (always French)
function RootWrapper({ children }) {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    if (i18n.language !== 'fr') {
      i18n.changeLanguage('fr');
    }
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'fr';
  }, [i18n]);

  return children;
}

// For lang-prefixed routes (e.g. /en/create)
function LangWrapper({ children }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  const cleanLang = (lang || 'fr').substring(0, 2);

  useEffect(() => {
    if (SUPPORTED_LANGS.includes(cleanLang)) {
      if (i18n.language !== cleanLang) {
        i18n.changeLanguage(cleanLang);
      }
      document.documentElement.dir = cleanLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = cleanLang;
    }
  }, [cleanLang, i18n]);

  if (cleanLang === 'fr') {
    // Redirect /fr/some-path to /some-path
    const cleanPath = location.pathname.replace(/^\/fr(\/|$)/, '/') || '/';
    return <Navigate to={cleanPath} replace />;
  }

  if (!SUPPORTED_LANGS.includes(cleanLang)) {
    // Fallback to home if language prefix is not supported
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const routesConfig = [
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
    { path: 'modele-cv-vendeur', element: <ModelePage /> },
    { path: 'creer-cv-gratuit', element: <CreerCvGratuitPillar /> },
    { path: 'faire-cv-gratuit', element: <ModelePage /> },
    { path: 'cv-gratuit-en-ligne', element: <ModelePage /> },
    { path: 'modeles-cv-gratuits', element: <ModelePage /> },
    { path: 'cv-professionnel-gratuit', element: <ModelePage /> },
    { path: 'cv-etudiant-gratuit', element: <ModelePage /> },
    { path: 'cv-sans-experience', element: <ModelePage /> },
    { path: 'exemples-cv', element: <ModelePage /> },
    { path: 'espace-emploi', element: <JobSpace /> }
  ];

  return (
    <Router>
      <Layout>
        <AdManager />
        <Suspense fallback={<div className="min-h-screen bg-slate-100 dark:bg-slate-900" />}>
          <Routes>
            {/* Redirects */}
            <Route path="/privacy" element={<Navigate to="/confidentialite" replace />} />
            <Route path="/:lang/privacy" element={<Navigate to="/confidentialite" replace />} />
            
            {/* Base Paths (default French) */}
            {routesConfig.map(r => (
              <Route 
                key={`base-${r.path}`} 
                path={r.path === '' ? '/' : `/${r.path}`} 
                element={<RootWrapper>{r.element}</RootWrapper>} 
              />
            ))}
            
            {/* Prefixed Paths (EN, DE, AR) */}
            {routesConfig.map(r => (
              <Route 
                key={`lang-${r.path}`} 
                path={r.path === '' ? '/:lang' : `/:lang/${r.path}`} 
                element={<LangWrapper>{r.element}</LangWrapper>} 
              />
            ))}
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </Layout>
    </Router>
  );
}

export default App;
