"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Loading component for navigation
function NavigationLoading() {
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
        <Link href="/" style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '18px' }}>XR</Link>
        <Link href="/products" style={{ marginRight: '1rem' }}>...</Link>
        <Link href="/ar-tryon" style={{ marginRight: '1rem' }}>...</Link>
        <Link href="/favorites" style={{ marginRight: '1rem' }}>...</Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/cart" style={{ position: 'relative' }}>...</Link>
        <Link href="/login">...</Link>
        <Link href="/register">...</Link>
      </div>
    </nav>
  );
}

// Dynamically import the client-only navigation with no SSR
const ClientOnlyNavigation = dynamic(() => import('./ClientOnlyNavigation'), {
  ssr: false,
  loading: NavigationLoading
});

export default function Navigation() {
  return <ClientOnlyNavigation />;
}