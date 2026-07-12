import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';

// Lazy loaded pages
const CreateCV = lazy(() => import('./pages/CreateCV'));
const CreatePortfolio = lazy(() => import('./pages/CreatePortfolio'));
const CoverLetter = lazy(() => import('./pages/CoverLetter'));
const ConseilsCV = lazy(() => import('./pages/ConseilsCV'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#0B1120]">
    <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCV />} />
            <Route path="/portfolio" element={<CreatePortfolio />} />
            <Route path="/lettre-motivation" element={<CoverLetter />} />
            <Route path="/conseils-cv" element={<ConseilsCV />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/confidentialite" element={<Privacy />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </Layout>
    </Router>
  );
}

export default App;
