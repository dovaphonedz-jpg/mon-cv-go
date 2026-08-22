import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function localizePath(path, lang) {
  if (typeof path !== 'string') return path;
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  const cleanLang = (lang || 'fr').substring(0, 2);
  if (cleanLang && cleanLang !== 'fr') {
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    if (cleanPath.startsWith(`/${cleanLang}/`) || cleanPath === `/${cleanLang}`) {
      return path;
    }
    return `/${cleanLang}${cleanPath === '/' ? '' : cleanPath}`;
  }
  return path;
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
