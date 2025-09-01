"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';

export default function Navigation() {
  const { token, logout } = useAuthStore();
  const { totalItems } = useCartStore();

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
        <Link href="/" style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '18px' }}>XR 购物</Link>
        <Link href="/products" style={{ marginRight: '1rem' }}>商品</Link>
        <Link href="/ar-tryon" style={{ marginRight: '1rem' }}>虚拟试衣间</Link>
        <Link href="/favorites" style={{ marginRight: '1rem' }}>收藏</Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/cart" style={{ position: 'relative' }}>
          购物车
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
            <Link href="/dashboard">仪表板</Link>
            <Link href="/profile">资料</Link>
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
              退出
            </button>
          </>
        ) : (
          <>
            <Link href="/login">登录</Link>
            <Link href="/register">注册</Link>
          </>
        )}
      </div>
    </nav>
  );
} 