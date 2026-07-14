import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import TemplatePortfolio from '../portfolio-templates/TemplatePortfolio';

const PortfolioPreview = forwardRef((props, ref) => {
  const { cvData, config } = useResume();
  const isRTL = config.cvLang === 'ar';
  
  const containerRef = useRef(null);
  const cvRef = useRef(null);
  const [scale, setScale] = useState(0.7);
  const [cvHeight, setCvHeight] = useState(1123);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let availableWidth = entry.contentRect.width;
        if (availableWidth <= 0) {
          availableWidth = containerRef.current.parentElement.clientWidth;
        }
        availableWidth -= 32; // padding
        if (availableWidth > 50) {
          const a4Width = 794;
          const a4Height = 1123;
          const availableHeight = window.innerHeight - 120; // Leave space for navbar and padding
          
          const widthScale = availableWidth / a4Width;
          const heightScale = availableHeight / a4Height;
          
          // Use the smaller scale so it never overflows width or height
          const newScale = Math.min(1, widthScale, heightScale);
          setScale(Math.max(0.1, newScale));
        }
      }
    });
    observer.observe(containerRef.current);
    
    // Fallback if observer misses initial hidden state
    const timer = setTimeout(() => {
      if (containerRef.current && containerRef.current.clientWidth > 50) {
        const availableWidth = containerRef.current.clientWidth - 32;
        const a4Width = 794;
        const a4Height = 1123;
        const availableHeight = window.innerHeight - 120;
        
        const widthScale = availableWidth / a4Width;
        const heightScale = availableHeight / a4Height;
        
        const newScale = Math.min(1, widthScale, heightScale);
        setScale(Math.max(0.1, newScale));
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

  return (
    <div ref={containerRef} className="w-full flex justify-center p-2 sm:p-8 bg-slate-100 dark:bg-slate-800">
      <div 
        style={{ width: `${794 * scale}px`, height: `${cvHeight * scale}px` }}
        className="relative transition-all duration-200"
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
          id="cv-export-container"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <TemplatePortfolio cvData={cvData} config={config} />
        </div>
      </div>
    </div>
  );
});

export default PortfolioPreview;
