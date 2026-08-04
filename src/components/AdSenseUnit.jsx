import React, { useEffect } from 'react';

export default function AdSenseUnit() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      if (!e.message?.includes("already have ads")) {
        console.error('AdSense push error', e);
      }
    }
  }, []);

  return (
    <div className="w-full my-4 sm:my-8 flex justify-center overflow-hidden min-h-[50px] max-h-[280px]">
      {/* pub */}
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', maxHeight: '280px' }}
           data-ad-client="ca-pub-8616442521163368"
           data-ad-slot="2089306393"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
