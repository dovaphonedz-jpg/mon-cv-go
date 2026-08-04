import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Layout>
        <AdManager />
        <Suspense fallback={<div className="min-h-screen bg-slate-100 dark:bg-slate-900" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCV />} />
            <Route path="/portfolio" element={<CreatePortfolio />} />
            <Route path="/lettre-motivation" element={<CoverLetter />} />
            <Route path="/conseils-cv" element={<ConseilsCV />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/confidentialite" element={<Privacy />} />
            <Route path="/modele-cv-comptable-word" element={<ModelePage />} />
            <Route path="/modele-cv-ingenieur" element={<ModelePage />} />
            <Route path="/modele-cv-debutant" element={<ModelePage />} />
            <Route path="/modele-cv-etudiant" element={<ModelePage />} />
            <Route path="/modele-cv-commercial" element={<ModelePage />} />
            <Route path="/espace-emploi" element={<JobSpace />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </Layout>
    </Router>
  );
}

export default App;
