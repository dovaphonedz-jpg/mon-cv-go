import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ title, description, url = 'https://moncvgo.com', faqItems = null, breadcrumbs = null }) {
  const { t, i18n } = useTranslation();
  const defaultDescription = t('home.seo_desc', "Créez facilement et gratuitement votre CV, lettre de motivation et portfolio avec nos outils intuitifs. Simple, rapide et professionnel.");
  const siteTitle = title ? `${title} | Mon CV Go` : 'Mon CV Go - Créez votre CV professionnel gratuitement en ligne';
  const siteDescription = description || defaultDescription;
  const lang = i18n.language || 'fr';

  // Build FAQ Schema if provided
  const faqSchema = faqItems ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  }) : null;

  // Build Breadcrumb Schema if provided
  const breadcrumbSchema = breadcrumbs ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": b.name,
      "item": b.url
    }))
  }) : null;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Hreflang for multilingual */}
      <link rel="alternate" hreflang="fr" href={url} />
      <link rel="alternate" hreflang="en" href={url} />
      <link rel="alternate" hreflang="ar" href={url} />
      <link rel="alternate" hreflang="de" href={url} />
      <link rel="alternate" hreflang="x-default" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={`https://moncvgo.com/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_AR' : lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'fr_FR'} />
      <meta property="og:site_name" content="Mon CV Go" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={`https://moncvgo.com/og-image.jpg`} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Structured Data: FAQ */}
      {faqSchema && <script type="application/ld+json">{faqSchema}</script>}

      {/* Structured Data: Breadcrumb */}
      {breadcrumbSchema && <script type="application/ld+json">{breadcrumbSchema}</script>}
    </Helmet>
  );
}
