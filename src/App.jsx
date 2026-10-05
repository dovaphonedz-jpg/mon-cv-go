import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <Layout>
        <AdManager />
        <Suspense fallback={<div className="min-h-screen bg-slate-100 dark:bg-slate-900" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCV />} />
            <Route path="/studio-photo" element={<StudioPhoto />} />
            <Route path="/portfolio" element={<CreatePortfolio />} />
            <Route path="/lettre-motivation" element={<CoverLetter />} />
            <Route path="/conseils-cv" element={<ConseilsCV />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/confidentialite" element={<Privacy />} />
            <Route path="/privacy" element={<Navigate to="/confidentialite" replace />} />
            <Route path="/plan-du-site" element={<PlanDuSite />} />
            
            {/* 10 Specialized SEO Pages */}
            <Route path="/cv-ingenieur" element={<SpecializedPage />} />
            <Route path="/cv-ingenieur-debutant" element={<SpecializedPage />} />
            <Route path="/cv-etudiant" element={<SpecializedPage />} />
            <Route path="/cv-sans-experience" element={<SpecializedPage />} />
            <Route path="/cv-debutant" element={<SpecializedPage />} />
            <Route path="/cv-ats" element={<SpecializedPage />} />
            <Route path="/exemple-cv" element={<SpecializedPage />} />
            <Route path="/modele-cv-gratuit" element={<SpecializedPage />} />
            <Route path="/cv-informatique" element={<SpecializedPage />} />
            <Route path="/cv-professionnel" element={<SpecializedPage />} />

            {/* Existing Job Models Routes */}
            <Route path="/modele-cv-comptable-word" element={<ModelePage />} />
            <Route path="/modele-cv-ingenieur" element={<ModelePage />} />
            <Route path="/modele-cv-debutant" element={<ModelePage />} />
            <Route path="/modele-cv-etudiant" element={<ModelePage />} />
            <Route path="/modele-cv-commercial" element={<ModelePage />} />
            <Route path="/modele-cv-developpeur" element={<ModelePage />} />
            <Route path="/modele-cv-designer" element={<ModelePage />} />
            <Route path="/modele-cv-infirmiere" element={<ModelePage />} />
            <Route path="/modele-cv-restauration" element={<ModelePage />} />
            <Route path="/modele-cv-chauffeur-livreur" element={<ModelePage />} />
            <Route path="/modele-cv-secretaire" element={<ModelePage />} />
            <Route path="/modele-cv-vendeur" element={<ModelePage />} />
            
            <Route path="/espace-emploi" element={<JobSpace />} />
            
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
