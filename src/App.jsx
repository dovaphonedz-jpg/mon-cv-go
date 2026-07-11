import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateCV from './pages/CreateCV';
import CoverLetter from './pages/CoverLetter';
import ConseilsCV from './pages/ConseilsCV';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCV />} />
          <Route path="/lettre-motivation" element={<CoverLetter />} />
          <Route path="/conseils-cv" element={<ConseilsCV />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/confidentialite" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
