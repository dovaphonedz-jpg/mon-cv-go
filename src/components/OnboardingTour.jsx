import React, { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';
import { useTranslation } from 'react-i18next';

const CustomBeacon = React.forwardRef((props, ref) => {
  // Destructure non-DOM props to prevent React warnings
  const { continuous, index, isLastStep, step, ...domProps } = props;
  return (
    <span
      ref={ref}
      {...domProps}
      className="relative flex items-center justify-center w-10 h-10 bg-yellow-400 text-slate-900 border-[3px] border-slate-900 shadow-[2px_2px_0px_rgba(15,23,42,1)] rounded-md hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all animate-bounce cursor-pointer"
      title="Ouvrir l'astuce"
    >
      <span className="font-black text-sm -rotate-6 tracking-tighter mt-0.5">GO</span>
      <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 border-2 border-slate-900"></span>
      </span>
    </span>
  );
});

export default function OnboardingTour({ isPortfolio = false, pageType = 'cv' }) {
  const { t } = useTranslation();
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
      content: t('tour.tour_welcome'),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.tour-step-actions',
      content: t('tour.tour_actions'),
      placement: 'auto',
    },
    ...(pageType !== 'coverletter' ? [{
      target: '.tour-step-nav',
      content: t('tour.tour_nav'),
      placement: 'auto',
    }] : []),
    {
      target: '.tour-step-form',
      content: t('tour.tour_form'),
      placement: 'auto',
    },
    {
      target: '.tour-step-preview',
      content: t('tour.tour_preview'),
      placement: 'auto',
    },
    {
      target: '.tour-step-download',
      content: t('tour.tour_download'),
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
        back: t('tour.tour_back'),
        close: t('tour.tour_close'),
        last: t('tour.tour_last'),
        next: t('tour.tour_next'),
        skip: t('tour.tour_skip'),
      }}
    />
  );
}
