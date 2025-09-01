"use client";
import { useState, useTransition, useRef, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

export default function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function toggle() {
    setOpen((v) => !v);
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  async function setLocale(nextLocale: 'en' | 'zh-CN' | 'ja') {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }
    startTransition(async () => {
      await fetch('/api/i18n/set-locale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: nextLocale }),
      });
      window.location.reload();
    });
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        onClick={toggle}
        disabled={isPending}
        style={{
          padding: '6px 10px',
          borderRadius: 4,
          border: '1px solid #ddd',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >{t('nav.language')}</button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: 'white',
            border: '1px solid #eee',
            borderRadius: 6,
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            minWidth: 140,
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setLocale('zh-CN')}
            disabled={isPending}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              background: locale === 'zh-CN' ? '#f7f7f7' : 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >中文</button>
          <button
            onClick={() => setLocale('en')}
            disabled={isPending}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              background: locale === 'en' ? '#f7f7f7' : 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >English</button>
          <button
            onClick={() => setLocale('ja')}
            disabled={isPending}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              background: locale === 'ja' ? '#f7f7f7' : 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >日本語</button>
        </div>
      )}
    </div>
  );
}


