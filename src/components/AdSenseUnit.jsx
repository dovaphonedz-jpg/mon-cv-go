import React, { useEffect } from 'react';

export default function AdSenseUnit() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense push error', e);
    }
  }, []);

  return (
    <div className="w-full my-8 flex justify-center overflow-hidden">
      {/* pub */}
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-pub-8616442521163368"
           data-ad-slot="2089306393"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
