"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthStore, initializeAuth } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { useI18n } from '@/hooks/useI18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function ClientOnlyNavigation() {
  const { token, logout } = useAuthStore();
  const { totalItems, isHydrated: cartHydrated, setHydrated } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setIsHydrated(true);
    // Initialize auth state from localStorage after hydration
    initializeAuth();
    // Mark cart as hydrated
    setHydrated();
  }, [setHydrated]);

  // Prevent hydration mismatch by not rendering dynamic content until hydrated
  if (!isHydrated || !cartHydrated) {
    return (
      <nav style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div>
          <Link href="/" style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '18px' }}>{t('nav.brand')}</Link>
          <Link href="/products" style={{ marginRight: '1rem' }}>{t('nav.products')}</Link>
          <Link href="/ar-tryon" style={{ marginRight: '1rem' }}>{t('nav.arTryOn')}</Link>
          <Link href="/favorites" style={{ marginRight: '1rem' }}>{t('nav.favorites')}</Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/cart" style={{ position: 'relative' }}>
            {t('nav.cart')}
          </Link>
          <Link href="/login">{t('nav.login')}</Link>
          <Link href="/register">{t('nav.register')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>
    );
  }

  return (
    <nav style={{ 
      padding: '1rem', 
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div>
        <Link href="/" style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '18px' }}>{t('nav.brand')}</Link>
        <Link href="/products" style={{ marginRight: '1rem' }}>{t('nav.products')}</Link>
        <Link href="/ar-tryon" style={{ marginRight: '1rem' }}>{t('nav.arTryOn')}</Link>
        <Link href="/favorites" style={{ marginRight: '1rem' }}>{t('nav.favorites')}</Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/cart" style={{ position: 'relative' }}>
          {t('nav.cart')}
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#dc3545',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {totalItems}
            </span>
          )}
        </Link>
        
        {token ? (
          <>
            <Link href="/dashboard">{t('nav.dashboard')}</Link>
            <Link href="/profile">{t('nav.profile')}</Link>
            <button 
              onClick={logout}
              style={{
                padding: '6px 12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('nav.logout')}
            </button>
          </>
        ) : (
          <>
            <Link href="/login">{t('nav.login')}</Link>
            <Link href="/register">{t('nav.register')}</Link>
          </>
        )}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
