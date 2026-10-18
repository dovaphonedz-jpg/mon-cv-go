import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function localizePath(path, lang) {
  if (typeof path !== 'string') return path;
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  const cleanLang = (lang || 'fr').substring(0, 2).toLowerCase();
  const strippedPath = path.replace(/^\/(?:en|de|ar)(?=\/|$)/, '') || '/';
  if (cleanLang && cleanLang !== 'fr') {
    return strippedPath === '/' ? `/${cleanLang}` : `/${cleanLang}${strippedPath}`;
  }
  return strippedPath;
}

export default function LocalizedLink({ to, children, ...props }) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'fr').substring(0, 2);

  return (
    <Link to={localizePath(to, currentLang)} {...props}>
      {children}
    </Link>
  );
}
