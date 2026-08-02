import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AdManager() {
  const location = useLocation();

  useEffect(() => {
    // Pages where we DO NOT want ads
    const noAdsPaths = ['/create', '/portfolio', '/lettre-motivation'];
    
    const isNoAdsPage = noAdsPaths.some(path => location.pathname.startsWith(path));

    if (isNoAdsPage) {
      // 1. Remove any known ad script tags
      const adScripts = document.querySelectorAll('script[src*="al5sm.com"], script[src*="n6wxm.com"], script[src*="nap5k.com"], script[src*="ampproject.org"]');
      adScripts.forEach(script => script.remove());
      
      // 2. Remove AMP Auto Ads elements
      const ampTags = document.querySelectorAll('amp-auto-ads, amp-ad');
      ampTags.forEach(tag => tag.remove());

      // 3. Remove suspicious iframes injected by popunder networks
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        // If it doesn't have an id or a specific source we trust, it might be an ad
        if (!iframe.src || iframe.src.includes('about:blank') || !iframe.id) {
           // We have to be careful not to delete react devtools or something, 
           // but ad iframes often have generic or no ids
           iframe.style.display = 'none';
        }
      });

      // 4. Force hide any rogue elements appended to body by these networks
      // Usually they have very high z-index and fixed position
      const allDivs = document.body.querySelectorAll('div');
      allDivs.forEach(div => {
         const zIndex = window.getComputedStyle(div).zIndex;
         if (zIndex && parseInt(zIndex) > 2147483000) {
            div.style.display = 'none';
         }
      });

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

            // Inject AMP Auto Ads script
            if (!document.querySelector('script[src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"]')) {
              const ampScript = document.createElement('script');
              ampScript.async = true;
              ampScript.setAttribute('custom-element', 'amp-auto-ads');
              ampScript.src = 'https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js';
              document.head.appendChild(ampScript);
            }

            // Inject AMP Auto Ads Tag
            if (!document.querySelector('amp-auto-ads')) {
              const ampTag = document.createElement('amp-auto-ads');
              ampTag.setAttribute('type', 'adsense');
              ampTag.setAttribute('data-ad-client', 'ca-pub-8616442521163368');
              document.body.insertBefore(ampTag, document.body.firstChild);
            }
        }
      }, 120000); // 120000 ms = 2 minutes
    }

  }, [location.pathname]);

  return null;
}
