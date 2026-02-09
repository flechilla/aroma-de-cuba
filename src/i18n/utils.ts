import { ui, defaultLang } from './ui';

type UiKeys = keyof typeof ui[typeof defaultLang];

export function getLangFromUrl(url: URL): 'es' | 'en' {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'es';
}

export function useTranslations(lang: 'es' | 'en') {
  return function t(key: UiKeys): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: 'es' | 'en'): string {
  // Remove leading slash for manipulation
  const clean = path.replace(/^\//, '');

  if (lang === 'es') {
    // Spanish uses clean paths (no prefix)
    return `/${clean}`;
  }

  // English gets /en/ prefix
  return `/en/${clean}`;
}

export function getDateLocale(lang: 'es' | 'en'): string {
  return lang === 'es' ? 'es-ES' : 'en-US';
}

export function getOgLocale(lang: 'es' | 'en'): string {
  return lang === 'es' ? 'es_ES' : 'en_US';
}
