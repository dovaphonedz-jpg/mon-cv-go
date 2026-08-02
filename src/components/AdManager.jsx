import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AdManager() {
  const location = useLocation();

  useEffect(() => {
    // Pages where we DO NOT want ads
    const noAdsPaths = ['/create', '/portfolio', '/lettre-motivation'];
    
    const isNoAdsPage = noAdsPaths.some(path => location.pathname.startsWith(path));

    if (isNoAdsPage) {
      // 1. Remove any known script tags
      const adScripts = document.querySelectorAll('script[src*="al5sm.com"], script[src*="n6wxm.com"], script[src*="nap5k.com"]');
      adScripts.forEach(script => script.remove());
      return;
    }

    // Function to safely inject a script if it doesn't already exist
    const injectScript = (zone, src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s = document.createElement('script');
        s.dataset.zone = zone;
        s.src = src;
        // The networks usually want it on document.documentElement or document.body
        const target = [document.documentElement, document.body].filter(Boolean).pop();
        if (target) {
            target.appendChild(s);
        }
      }
    };

    // We wrap ALL ad injections in a 120 seconds (2 minutes) delay
    if (!window.adDelayedTimerSet) {
      window.adDelayedTimerSet = true;
      setTimeout(() => {
        // Double check we are still not on a blocked page when the timer fires
        const isStillNoAdsPage = noAdsPaths.some(path => window.location.pathname.startsWith(path));
        
        if (!isStillNoAdsPage) {
            // Inject Vignette Ad
            injectScript('11467569', 'https://n6wxm.com/vignette.min.js');

            // Inject Interstitial/Pop Ad
            injectScript('11463164', 'https://nap5k.com/tag.min.js');

            // Inject the third Ad
            injectScript('11486028', 'https://al5sm.com/tag.min.js');
        }
      }, 120000); // 120000 ms = 2 minutes
    }

  }, [location.pathname]);

  return null;
}
