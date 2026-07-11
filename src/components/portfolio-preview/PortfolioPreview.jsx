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
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 32; // 16px padding on each side
        const a4Width = 794; // 210mm in pixels at 96dpi
        setScale(Math.min(1, availableWidth / a4Width));
      }
    };
    
    // Allow for layout shift then measure
    setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
            minHeight: '1123px', 
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
