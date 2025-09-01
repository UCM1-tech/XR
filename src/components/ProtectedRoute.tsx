"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login',
  requireAuth = true 
}: ProtectedRouteProps) {
  const { token, isInitialized, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return; // 等待初始化完成

    if (requireAuth && !token) {
      // 需要登录但未登录，重定向到登录页
      router.push(redirectTo);
    } else if (!requireAuth && token) {
      // 不需要登录但已登录，重定向到首页
      router.push('/');
    }
  }, [token, isInitialized, requireAuth, redirectTo, router]);

  // 等待初始化完成
  if (!isInitialized || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          <p style={{ color: '#666' }}>加载中...</p>
        </div>
      </div>
    );
  }

  // 需要登录但未登录，显示加载状态
  if (requireAuth && !token) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
          <p style={{ color: '#666' }}>正在跳转到登录页面...</p>
        </div>
      </div>
    );
  }

  // 不需要登录但已登录，显示加载状态
  if (!requireAuth && token) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔄</div>
          <p style={{ color: '#666' }}>正在跳转...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 