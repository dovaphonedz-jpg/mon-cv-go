import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ 
  title, 
  description, 
  url = 'https://moncvgo.com', 
  faqItems = null, 
  breadcrumbs = null,
  noindex = false 
}) {
  const { t, i18n } = useTranslation();
  const defaultDescription = t('home.seo_desc', "Créez facilement et gratuitement votre CV, lettre de motivation et portfolio avec nos outils intuitifs. Simple, rapide et professionnel.");
  const siteTitle = title 
    ? (title.includes('Mon CV Go') ? title : `${title} | Mon CV Go`)
    : 'Mon CV Go - Créez votre CV professionnel gratuitement en ligne';
  const siteDescription = description || defaultDescription;

  // Determine active language: priority to URL path prefix, fallback to i18n
  const detectLanguage = () => {
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (['en', 'de', 'ar'].includes(parts[0])) {
        return parts[0];
      }
      if (parts[0] === 'fr') {
        return 'fr';
      }
    }
    // Also check if url prop passed has an explicit language prefix
    try {
      if (url) {
        const parsed = new URL(url.startsWith('http') ? url : `https://moncvgo.com${url.startsWith('/') ? url : '/' + url}`);
        const parts = parsed.pathname.split('/').filter(Boolean);
        if (['en', 'de', 'ar'].includes(parts[0])) {
          return parts[0];
        }
      }
    } catch {
      // ignore
    }
    return (i18n.language || 'fr').substring(0, 2);
  };

  const cleanLang = detectLanguage();

  // Calculate canonical and language alternates based on current relative path
  const getCleanRelativePath = () => {
    let pathname = '';
    try {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        pathname = new URL(url).pathname;
      } else if (url.startsWith('/')) {
        pathname = url;
      } else if (typeof window !== 'undefined') {
        pathname = window.location.pathname;
      }
    } catch {
      pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    }

    const parts = pathname.split('/').filter(Boolean);
    // Remove language prefix if present
    if (parts.length > 0 && ['en', 'de', 'ar', 'fr'].includes(parts[0])) {
      const rest = parts.slice(1).join('/');
      return rest ? `/${rest}` : '';
    }
    return parts.length > 0 ? `/${parts.join('/')}` : '';
  };

  const relativePath = getCleanRelativePath();
  const canonicalUrl = cleanLang === 'fr' 
    ? `https://moncvgo.com${relativePath}` 
    : `https://moncvgo.com/${cleanLang}${relativePath}`;

  const altFr = `https://moncvgo.com${relativePath}`;
  const altEn = `https://moncvgo.com/en${relativePath}`;
  const altDe = `https://moncvgo.com/de${relativePath}`;
  const altAr = `https://moncvgo.com/ar${relativePath}`;

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
    <Helmet htmlAttributes={{ lang: cleanLang }}>
      <title>{siteTitle}</title>
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Hreflang for multilingual */}
      <link rel="alternate" hreflang="fr" href={altFr} />
      <link rel="alternate" hreflang="en" href={altEn} />
      <link rel="alternate" hreflang="ar" href={altAr} />
      <link rel="alternate" hreflang="de" href={altDe} />
      <link rel="alternate" hreflang="x-default" href={altFr} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={`https://moncvgo.com/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={cleanLang === 'ar' ? 'ar_AR' : cleanLang === 'en' ? 'en_US' : cleanLang === 'de' ? 'de_DE' : 'fr_FR'} />
      <meta property="og:site_name" content="Mon CV Go" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={`https://moncvgo.com/og-image.jpg`} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data: FAQ */}
      {faqSchema && <script type="application/ld+json">{faqSchema}</script>}

      {/* Structured Data: Breadcrumb */}
      {breadcrumbSchema && <script type="application/ld+json">{breadcrumbSchema}</script>}
    </Helmet>
  );
}
