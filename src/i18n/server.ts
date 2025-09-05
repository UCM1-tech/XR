import { cookies, headers } from 'next/headers';
import { defaultLocale, isSupportedLocale, isSupportedPreference, defaultPreference, type Locale } from './config';
import { messages as en } from './dictionaries/en';
import { messages as zhCN } from './dictionaries/zh-CN';
import { messages as ja } from './dictionaries/ja';
import { messages as fr } from './dictionaries/fr';
import { messages as es } from './dictionaries/es';
import { messages as de } from './dictionaries/de';
import { Messages } from './types';

function parseAcceptLanguage(header: string | undefined | null): string[] {
  if (!header) return [];
  // Basic parser for values like: "en-US,en;q=0.9,ja;q=0.8"
  return header
    .split(',')
    .map((part) => part.trim().split(';')[0])
    .filter(Boolean);
}

function resolveFromSystemPreference(): Locale {
  const header = (headers().get('accept-language') || '');
  const candidates = parseAcceptLanguage(header);
  for (const candidate of candidates) {
    // Try full match first (e.g., zh-CN)
    if (isSupportedLocale(candidate)) return candidate as Locale;
    // Try base language (e.g., zh from zh-CN)
    const base = candidate.split('-')[0];
    if (isSupportedLocale(base)) return base as Locale;
    // Map common bases to supported regional where needed
    if (base === 'zh') return 'zh-CN';
  }
  return defaultLocale;
}

export function getLocaleFromCookies(): Locale {
  const store = cookies();
  const rawPref = (store.get('locale')?.value || defaultPreference) as string | undefined;
  if (isSupportedPreference(rawPref) && rawPref !== 'system') {
    return rawPref as Locale;
  }
  return resolveFromSystemPreference();
}

export function getMessagesForLocale(locale: Locale): Messages {
  switch (locale) {
    case 'en':
      return en;
    case 'es':
      return es;
    case 'fr':
      return fr;
    case 'de':
      return de;
    case 'ja':
      return ja;
    case 'zh-CN':
    default:
      return zhCN;
  }
}


