import React, { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';

const CustomBeacon = React.forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="relative flex items-center justify-center w-10 h-10 bg-yellow-400 text-slate-900 border-[3px] border-slate-900 shadow-[2px_2px_0px_rgba(15,23,42,1)] rounded-md hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all animate-bounce"
      title="Ouvrir l'astuce"
    >
      <span className="font-black text-sm -rotate-6 tracking-tighter mt-0.5">GO</span>
      <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 border-2 border-slate-900"></span>
      </span>
    </button>
  );
});

export default function OnboardingTour({ isPortfolio = false, pageType = 'cv' }) {
  console.log('Joyride import:', Joyride);
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the tour for this section
    const tourKey = `moncvgo_${pageType}_tour_seen`;
    const hasSeenTour = localStorage.getItem(tourKey);
    
    if (!hasSeenTour) {
      // Small delay to let the UI render before starting the tour
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pageType]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      setRun(false);
      const tourKey = `moncvgo_${pageType}_tour_seen`;
      localStorage.setItem(tourKey, 'true');
    }
  };

  const steps = [
    {
      target: 'body',
      content: 'Bienvenue dans notre créateur ! Laissez-nous vous faire visiter rapidement les fonctionnalités.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.tour-step-actions',
      content: 'Ici, vous pouvez charger un exemple pour voir ce que ça donne, importer vos anciennes données, ou tout effacer pour recommencer.',
      placement: 'auto',
    },
    ...(pageType !== 'coverletter' ? [{
      target: '.tour-step-nav',
      content: 'Ceci est votre barre de progression. Cliquez sur les différentes étapes pour naviguer (Style, Infos Personnelles, etc.).',
      placement: 'auto',
    }] : []),
    {
      target: '.tour-step-form',
      content: 'Remplissez vos informations dans cette zone. Ne vous inquiétez pas, rien n\'est définitif !',
      placement: 'auto',
    },
    {
      target: '.tour-step-preview',
      content: 'Regardez la magie opérer ! Votre rendu final s\'affiche ici en temps réel pendant que vous tapez.',
      placement: 'auto',
    },
    {
      target: '.tour-step-download',
      content: 'Quand vous avez terminé, cliquez ici pour télécharger votre création en PDF, HTML ou PowerPoint. C\'est tout ! 🎉',
      placement: 'auto',
    }
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      beaconComponent={CustomBeacon}
      spotlightPadding={4}
      floaterProps={{ disableAnimation: true }}
      styles={{
        options: {
          primaryColor: '#3b82f6', // blue-500
          zIndex: 1000,
          backgroundColor: '#ffffff',
          textColor: '#1e293b', // slate-800
        },
        buttonNext: {
          backgroundColor: '#3b82f6',
          borderRadius: '8px',
          fontWeight: 'bold',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#64748b',
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#ef4444', // red-500
          fontWeight: 'bold',
        },
        tooltipContainer: {
          textAlign: 'left',
          fontSize: '14px',
        },
        tooltip: {
          maxWidth: '90vw',
        }
      }}
      locale={{
        back: 'Précédent',
        close: 'Fermer',
        last: 'Terminer',
        next: 'Suivant',
        skip: 'Passer le guide',
      }}
    />
  );
}
