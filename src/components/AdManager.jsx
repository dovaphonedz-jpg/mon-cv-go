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

    // Function to safely inject a script
    const injectAds = () => {
        if (window.adsInjectedThisSession) return;
        window.adsInjectedThisSession = true;

        const target = [document.documentElement, document.body].filter(Boolean).pop();
        if (!target) return;

        const scripts = [
            { zone: '11467569', src: 'https://n6wxm.com/vignette.min.js' },
            { zone: '11463164', src: 'https://nap5k.com/tag.min.js' },
            { zone: '11486028', src: 'https://al5sm.com/tag.min.js' }
        ];

        scripts.forEach(({ zone, src }) => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const s = document.createElement('script');
                s.dataset.zone = zone;
                s.src = src;
                target.appendChild(s);
            }
        });
    };

    // Calculate time elapsed since first visit
    if (!window.firstVisitTime) {
        window.firstVisitTime = Date.now();
    }

    const timeElapsed = Date.now() - window.firstVisitTime;
    const delayRequired = 120000; // 2 minutes

    if (timeElapsed >= delayRequired) {
        // 2 minutes have already passed! Inject immediately.
        injectAds();
    } else {
        // Less than 2 minutes have passed. Set a timeout for the remaining time!
        if (window.adTimeoutId) clearTimeout(window.adTimeoutId);

        const remainingTime = delayRequired - timeElapsed;
        window.adTimeoutId = setTimeout(() => {
            // Check one last time if we are on a blocked page when timer fires
            const stillNoAds = noAdsPaths.some(path => window.location.pathname.startsWith(path));
            if (!stillNoAds) {
                injectAds();
            }
        }, remainingTime);
    }

  }, [location.pathname]);

  return null;
}
