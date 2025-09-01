export type Locale = 'en' | 'zh-CN' | 'ja';

export const defaultLocale: Locale = 'zh-CN';
export const locales: Locale[] = ['en', 'zh-CN', 'ja'];

export function isSupportedLocale(value: string | undefined | null): value is Locale {
  return value === 'en' || value === 'zh-CN' || value === 'ja';
}


