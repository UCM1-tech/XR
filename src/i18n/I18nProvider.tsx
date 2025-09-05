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

function getMessageByPath(messages: Messages, path: string): string {
  if (!path) return '';
  const segments = path.split('.');
  let current: unknown = messages as unknown;
  for (const segment of segments) {
    if (current == null) break;
    if (typeof current === 'object' && current !== null && segment in current) {
      // @ts-expect-error index access over nested message dict
      current = current[segment];
    } else {
      current = undefined;
    }
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


