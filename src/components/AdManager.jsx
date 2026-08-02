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

    // Inject Vignette Ad
    injectScript('11467569', 'https://n6wxm.com/vignette.min.js');

    // Inject Interstitial/Pop Ad
    injectScript('11463164', 'https://nap5k.com/tag.min.js');

    // Inject Delayed Ad (120 seconds)
    // We check if we already scheduled it so we don't schedule multiple times
    if (!window.adDelayedTimerSet && !document.querySelector('script[src="https://al5sm.com/tag.min.js"]')) {
      window.adDelayedTimerSet = true;
      setTimeout(() => {
        // Double check we are still not on a blocked page when the timer fires
        const isStillNoAdsPage = noAdsPaths.some(path => window.location.pathname.startsWith(path));
        if (!isStillNoAdsPage && !document.querySelector('script[src="https://al5sm.com/tag.min.js"]')) {
            const s = document.createElement('script');
            s.dataset.zone = '11486028';
            s.src = 'https://al5sm.com/tag.min.js';
            document.body.appendChild(s);
        }
      }, 120000);
    }

  }, [location.pathname]);

  return null;
}
