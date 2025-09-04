export type Locale = 'en' | 'zh-CN' | 'ja' | 'fr' | 'es' | 'de';
export type LocalePreference = Locale | 'system';

export const defaultLocale: Locale = 'zh-CN';
export const locales: Locale[] = ['en', 'zh-CN', 'ja', 'fr', 'es', 'de'];
export const defaultPreference: LocalePreference = 'system';

export function isSupportedLocale(value: string | undefined | null): value is Locale {
  return value === 'en' || value === 'zh-CN' || value === 'ja' || value === 'fr' || value === 'es' || value === 'de';
}

export function isSupportedPreference(value: string | undefined | null): value is LocalePreference {
  return value === 'system' || isSupportedLocale(value);
}


