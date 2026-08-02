import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AdManager() {
  const location = useLocation();

  useEffect(() => {
    // Pages where we DO NOT want ads
    const noAdsPaths = ['/create', '/portfolio', '/lettre-motivation'];
    
    const isNoAdsPage = noAdsPaths.some(path => location.pathname.startsWith(path));

    if (isNoAdsPage) {
      // If ads were injected in this session, the only way to truly kill 
      // their global event listeners (popunders) is a hard reload.
      if (window.adsInjectedThisSession && !sessionStorage.getItem('reloadedForAds')) {
        sessionStorage.setItem('reloadedForAds', 'true');
        window.location.reload();
        return;
      }
      
      // If we already reloaded, or ads were never injected, we just clean the DOM
      // (in case they got here directly)
      const adScripts = document.querySelectorAll('script[src*="al5sm.com"], script[src*="n6wxm.com"], script[src*="nap5k.com"]');
      adScripts.forEach(script => script.remove());

      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (!iframe.src || iframe.src.includes('about:blank') || !iframe.id) {
           iframe.style.display = 'none';
        }
      });

      const allDivs = document.body.querySelectorAll('div');
      allDivs.forEach(div => {
         const zIndex = window.getComputedStyle(div).zIndex;
         if (zIndex && parseInt(zIndex) > 2147483000) {
            div.style.display = 'none';
         }
      });

      return;
    }

    // If we are on an allowed page, clear the reload flag so we can reload again later if needed
    sessionStorage.removeItem('reloadedForAds');

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

    // Inject Delayed Ads (120 seconds)
    if (!window.adDelayedTimerSet) {
      window.adDelayedTimerSet = true;
      setTimeout(() => {
        const isStillNoAdsPage = noAdsPaths.some(path => window.location.pathname.startsWith(path));
        
        if (!isStillNoAdsPage) {
            // MARK ADS AS INJECTED SO WE CAN RELOAD LATER IF NEEDED
            window.adsInjectedThisSession = true;

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
