import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResumeProvider } from './context/ResumeContext'

import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </HelmetProvider>
  </StrictMode>,
)
