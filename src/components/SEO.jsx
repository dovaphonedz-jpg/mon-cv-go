import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url = 'https://mon-cv-go.com' }) {
  const defaultDescription = "Créez votre CV professionnel en ligne gratuitement. Mon CV Go propose 100 modèles premium, un export PDF de qualité et des conseils pour décrocher des entretiens.";
  const siteTitle = title ? `${title} | Mon CV Go` : 'Mon CV Go - Créez votre CV professionnel gratuitement en ligne';
  const siteDescription = description || defaultDescription;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={`${url}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={`${url}/og-image.jpg`} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
