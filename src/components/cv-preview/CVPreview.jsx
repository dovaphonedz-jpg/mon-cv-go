import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import TemplateModern from '../cv-templates/TemplateModern';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { translations } from '../../utils/cvData';

const CVPreview = forwardRef(({ isMini = false }, ref) => {
  const { cvData, config, focusedSection } = useResume();
  const isRTL = config.cvLang === 'ar';
  
  const containerRef = useRef(null);
  const cvRef = useRef(null);
  
  const [autoScale, setAutoScale] = useState(0.7);
  const [manualScale, setManualScale] = useState(null);
  const [cvHeight, setCvHeight] = useState(1123);

  // The effective scale used for rendering
  const scale = manualScale !== null ? manualScale : autoScale;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let availableWidth = entry.contentRect.width;
        if (availableWidth <= 0 && containerRef.current) {
          availableWidth = containerRef.current.parentElement.clientWidth;
        }
        availableWidth -= 32; // padding
        if (availableWidth > 50) {
          const a4Width = 794;
          const widthScale = availableWidth / a4Width;
          
          const newScale = Math.min(1.5, widthScale); // limit max auto scale to 1.5
          setAutoScale(Math.max(0.1, newScale));
        }
      }
    });
    observer.observe(containerRef.current);
    
    const timer = setTimeout(() => {
      if (containerRef.current && containerRef.current.clientWidth > 50) {
        const availableWidth = containerRef.current.clientWidth - 32;
        const a4Width = 794;
        const widthScale = availableWidth / a4Width;
        const newScale = Math.min(1.5, widthScale);
        setAutoScale(Math.max(0.1, newScale));
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!cvRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCvHeight(entry.target.offsetHeight || 1123);
      }
    });
    observer.observe(cvRef.current);
    return () => observer.disconnect();
  }, [cvData, config]);

  // Auto-zoom and scroll to section when focused
  useEffect(() => {
    let timeoutId;
    if (focusedSection) {
      // Zoom in proportionally
      setManualScale(Math.min(1.8, autoScale * 1.4));
      
      // Allow time for the CSS zoom transition to apply, then scroll
      timeoutId = setTimeout(() => {
        if (!cvRef.current) return;
        
        const t = translations[config.cvLang || 'fr'];
        let targetText = null;
        
        switch (focusedSection) {
          case 'personal': targetText = cvData.personal?.name; break;
          case 'summary': targetText = t.profile; break;
          case 'experience': targetText = t.experience; break;
          case 'education': targetText = t.education; break;
          case 'skills': targetText = t.skills; break;
          case 'projects': targetText = t.projects; break;
          default: targetText = null;
        }

        const scrollContainer = cvRef.current.closest('.cv-preview-container')?.parentElement;
        const isDesktop = window.innerWidth >= 1024;
        const scrollParent = (isDesktop && scrollContainer) ? scrollContainer : window;

        if (focusedSection === 'personal' || !targetText) {
          // Scroll to top
          scrollParent.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Search for headers containing the target text
        const headers = Array.from(cvRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const targetElement = headers.find(el => 
          el.textContent.trim().toLowerCase().includes(targetText.toLowerCase())
        );

        if (targetElement && targetElement.offsetParent !== null) {
          // Manual scroll calculation to bypass scrollIntoView bugs with CSS transform: scale()
          const targetRect = targetElement.getBoundingClientRect();
          
          let parentTop = 0;
          let parentHeight = window.innerHeight;
          let currentScrollTop = window.scrollY;
          
          if (scrollParent !== window) {
            const parentRect = scrollParent.getBoundingClientRect();
            parentTop = parentRect.top;
            parentHeight = parentRect.height;
            currentScrollTop = scrollParent.scrollTop;
          }
          
          const scrollDelta = (targetRect.top - parentTop) - (parentHeight / 2) + (targetRect.height / 2);
          scrollParent.scrollTo({ top: currentScrollTop + scrollDelta, behavior: 'smooth' });
          
        } else if (!targetElement && cvRef.current && cvRef.current.offsetParent !== null) {
          // Fallback if section doesn't exist yet (e.g., empty projects array)
          const isBottomSection = ['projects', 'skills', 'languages', 'qualities'].includes(focusedSection);
          if (isBottomSection) {
            const maxScroll = scrollParent === window ? document.documentElement.scrollHeight : scrollParent.scrollHeight;
            scrollParent.scrollTo({ top: maxScroll, behavior: 'smooth' });
          }
        }
      }, 300); // Wait 300ms for the zoom scale transition to finish
    } else {
      // Reset zoom
      setManualScale(null);
    }
    
    return () => clearTimeout(timeoutId);
  }, [focusedSection, autoScale, config.cvLang, cvData.personal]);

  const handleZoomIn = () => {
    setManualScale(prev => Math.min(2.0, (prev || autoScale) + 0.1));
  };

  const handleZoomOut = () => {
    setManualScale(prev => Math.max(0.2, (prev || autoScale) - 0.1));
  };

  const handleZoomReset = () => {
    setManualScale(null); // Return to auto scale
  };

  return (
    <div ref={containerRef} className={`w-full flex justify-center bg-transparent relative ${isMini ? 'pb-0' : 'pb-16'}`}>
      
      {/* Zoom Controls */}
      {!isMini && (
        <div className="fixed lg:absolute bottom-20 lg:bottom-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-4 bg-slate-800/80 backdrop-blur-md p-1.5 rounded-full flex items-center gap-1 shadow-lg z-50 border border-slate-700">
        <button 
          onClick={handleZoomOut} 
          className="p-2 bg-transparent text-white hover:bg-slate-700 hover:text-blue-400 rounded-full transition-colors"
          title="Dézoomer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="text-white text-xs font-bold px-2 w-12 text-center">
          {Math.round(scale * 100)}%
        </div>
        <button 
          onClick={handleZoomIn} 
          className="p-2 bg-transparent text-white hover:bg-slate-700 hover:text-blue-400 rounded-full transition-colors"
          title="Zoomer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-600 mx-1"></div>
        <button 
          onClick={handleZoomReset} 
          className={`p-2 bg-transparent rounded-full transition-colors ${manualScale === null ? 'text-blue-400 cursor-default' : 'text-white hover:bg-slate-700 hover:text-blue-400'}`}
          title="Ajuster à l'écran"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
      )}

      <div 
        style={{ width: `${794 * scale}px`, height: `${cvHeight * scale}px` }}
        className="relative transition-all duration-200 mt-2"
      >
        <div 
          ref={(node) => {
            cvRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className="shadow-2xl bg-white absolute top-0 left-0 origin-top-left transition-transform duration-200" 
          style={{ 
            width: '794px', 
            height: '1123px', 
            transform: `scale(${scale})`
          }}
          id={isMini ? "cv-export-container-mini" : "cv-export-container"}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <TemplateModern cvData={cvData} config={config} />
        </div>
      </div>
    </div>
  );
});

export default CVPreview;
