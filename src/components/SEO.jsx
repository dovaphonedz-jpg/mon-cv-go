import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ title, description, url = 'https://www.moncvgo.com' }) {
  const { t, i18n } = useTranslation();
  const defaultDescription = t('home.seo_desc', "Créez facilement et gratuitement votre CV, lettre de motivation et portfolio avec nos outils intuitifs. Simple, rapide et professionnel.");
  const siteTitle = title ? `${title} | Mon CV Go` : 'Mon CV Go - Créez votre CV professionnel gratuitement en ligne';
  const siteDescription = description || defaultDescription;

  return (
    <Helmet htmlAttributes={{ lang: i18n.language || 'fr' }}>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={`${url}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

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
