import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AdManager() {
  const location = useLocation();

  useEffect(() => {
    // Pages where ads are excluded for optimal user experience (editor tools & studio photo)
    const noAdsPaths = ['/create', '/portfolio', '/lettre-motivation', '/studio-photo'];
    const isNoAdsPage = noAdsPaths.some(path => location.pathname.startsWith(path));

    if (isNoAdsPage) {
      // Hide AdSense auto-ads containers if navigating to interactive creation tool pages
      const adsenseElements = document.querySelectorAll('.google-auto-placed, ins.adsbygoogle');
      adsenseElements.forEach(el => {
        el.style.display = 'none';
      });
    }
  }, [location.pathname]);

  return null;
}

