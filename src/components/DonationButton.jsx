import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';

const DonationButton = () => {
  const { t } = useTranslation();
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [amount, setAmount] = useState('5');
  const paypalRef = useRef(null);

  useEffect(() => {
    const scriptId = 'paypal-sdk-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://www.paypal.com/sdk/js?client-id=AZaMAIiVQsG6ovikqydHxvRaHG4g8AGa50ylGF2pfSsP3DCoBEMlElOPZCydS9zh9hbOs-E2yFDHzPnb&currency=EUR";
      script.async = true;
      script.onload = () => setIsSdkLoaded(true);
      document.body.appendChild(script);
    } else {
      if (window.paypal) {
        setIsSdkLoaded(true);
      } else {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.addEventListener('load', () => setIsSdkLoaded(true));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isSdkLoaded && window.paypal && paypalRef.current) {
      // Nettoyer les boutons précédents si le montant change
      paypalRef.current.innerHTML = '';
      
      try {
        window.paypal.Buttons({
          style: {
            layout: 'horizontal',
            color: 'gold',
            shape: 'pill',
            label: 'paypal',
            height: 45
          },
          onClick: (data, actions) => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'clic_don_paypal', { 'event_category': 'Monetisation', 'event_label': 'Bouton_Don_PayPal' });
            }
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toString(),
                },
                description: 'Donation - Soutien au projet',
              }],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              console.log("Donation réussie", order);
              alert("Merci beaucoup pour votre don ! ❤️");
            } catch (err) {
              console.error(err);
            }
          },
          onError: (err) => {
            console.error("Erreur PayPal:", err);
          }
        }).render(paypalRef.current);
      } catch (err) {
        console.error("Erreur lors du rendu du bouton PayPal:", err);
      }
    }
  }, [isSdkLoaded, amount]);

  return (
    <div className="relative group flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 my-2 text-center w-full transition-all duration-300 hover:shadow-lg overflow-hidden">
      {/* Animated gradient border (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-10 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
      <div className="absolute inset-[1px] bg-white dark:bg-[#0F172A] rounded-xl -z-10"></div>
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/10 rounded-full p-2 shadow-sm border border-rose-200 dark:border-rose-700/50 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-rose-400/30 animate-ping"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-rose-500 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h3 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{t('donation.title')}</h3>
      </div>
      
      <p className="text-slate-500 dark:text-slate-400 mb-4 text-xs font-medium">
        {t('donation.desc')}
      </p>
      
      <div className="flex items-center gap-3 mb-4 justify-center">
        <div className="relative flex items-center">
          <input 
            type="number" 
            min="1" 
            step="1"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1).toString())}
            className="w-16 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-900 dark:text-white font-semibold text-sm outline-none focus:ring-1 focus:ring-blue-500 text-center"
          />
          <div className="bg-slate-100 dark:bg-slate-700 border border-l-0 border-slate-200 dark:border-slate-700 px-2 py-1.5 rounded-r-lg font-medium text-xs text-slate-500 dark:text-slate-400">
            EUR
          </div>
        </div>
      </div>
      
      <div className="w-full relative z-0 min-h-[35px] flex justify-center">
        {!isSdkLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div ref={paypalRef} className="w-full"></div>
      </div>
    </div>
  );
};

export default DonationButton;
