"use client";
import { useI18nContext } from '@/i18n/I18nProvider';

export function useI18n() {
  const { t, locale } = useI18nContext();
  return { t, locale };
}


