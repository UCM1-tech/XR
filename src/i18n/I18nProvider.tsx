"use client";
import React, { createContext, useContext, useMemo } from 'react';
import { Locale } from './config';
import { Messages } from './types';

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getMessageByPath(messages: unknown, path: string): string {
  if (!path) return '';
  const segments = path.split('.');
  let current: any = messages as any;
  for (const segment of segments) {
    if (current == null) break;
    current = current[segment];
  }
  return typeof current === 'string' ? current : path;
}

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nContextValue>(() => ({
    locale,
    messages,
    t: (key: string) => getMessageByPath(messages, key),
  }), [locale, messages]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18nContext(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18nContext must be used within I18nProvider');
  }
  return ctx;
}


