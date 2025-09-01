import { cookies } from 'next/headers';
import { defaultLocale, isSupportedLocale, type Locale } from './config';
import { messages as en } from './dictionaries/en';
import { messages as zhCN } from './dictionaries/zh-CN';
import { messages as ja } from './dictionaries/ja';
import { Messages } from './types';

export function getLocaleFromCookies(): Locale {
  const store = cookies();
  const raw = store.get('locale')?.value;
  if (isSupportedLocale(raw)) return raw;
  return defaultLocale;
}

export function getMessagesForLocale(locale: Locale): Messages {
  switch (locale) {
    case 'en':
      return en;
    case 'ja':
      return ja;
    case 'zh-CN':
    default:
      return zhCN;
  }
}


