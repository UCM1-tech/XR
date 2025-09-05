"use client";
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  // 如果已经登录，重定向到首页
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    // 验证邮箱
    if (!email.trim()) {
      errors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = '请输入有效的邮箱地址';
    }

    // 验证密码
    if (!password.trim()) {
      errors.password = '请输入密码';
    } else if (password.length < 6) {
      errors.password = '密码至少需要6个字符';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      // 登录成功后会自动重定向
    } catch {
      // 错误已经在 store 中处理
    }
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* 页面标题 */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔐</div>
            <h1 style={{ 
              fontSize: '2rem', 
              color: '#333', 
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              欢迎回来
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              登录您的账户继续购物
            </p>
          </div>

          {/* 表单 */}
          <form onSubmit={handleSubmit}>
            {/* 邮箱输入 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: 'bold'
              }}>
                邮箱地址 *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) {
                    setFormErrors(prev => ({ ...prev, email: undefined }));
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: formErrors.email ? '1px solid #dc3545' : '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="请输入邮箱地址"
              />
              {formErrors.email && (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* 密码输入 */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: 'bold'
              }}>
                密码 *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password) {
                      setFormErrors(prev => ({ ...prev, password: undefined }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 45px 12px 12px',
                    border: formErrors.password ? '1px solid #dc3545' : '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {formErrors.password && (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* 错误提示 */}
            {error && (
              <div style={{
                padding: '12px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #f5c6cb',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: loading ? '#6c757d' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          {/* 注册链接 */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '25px',
            paddingTop: '25px',
            borderTop: '1px solid #eee'
          }}>
            <p style={{ color: '#666', margin: '0 0 15px 0' }}>
              还没有账户？
            </p>
            <Link href="/register">
              <button style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>
                立即注册
              </button>
            </Link>
          </div>

          {/* 测试账号提示 */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#1976d2'
          }}>
            <strong>测试账号：</strong><br />
            邮箱：test@example.com<br />
            密码：password
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

