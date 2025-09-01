"use client";
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const token = useAuthStore((s) => s.token);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // 如果已经登录，重定向到首页
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);

  const validateForm = () => {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // 验证用户名
    if (!username.trim()) {
      errors.username = '请输入用户名';
    } else if (username.length < 2) {
      errors.username = '用户名至少需要2个字符';
    } else if (username.length > 20) {
      errors.username = '用户名不能超过20个字符';
    }

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
    } else if (password.length > 50) {
      errors.password = '密码不能超过50个字符';
    }

    // 验证确认密码
    if (!confirmPassword.trim()) {
      errors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = '两次输入的密码不一致';
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
      await register(username, email, password);
      // 注册成功后会自动重定向
    } catch (err) {
      // 错误已经在 store 中处理
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, color: '#e2e8f0', text: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    if (strength <= 2) return { strength, color: '#ef4444', text: '弱' };
    if (strength <= 4) return { strength, color: '#f97316', text: '中等' };
    if (strength <= 5) return { strength, color: '#22c55e', text: '强' };
    return { strength, color: '#16a34a', text: '很强' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
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
        maxWidth: '450px'
      }}>
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚀</div>
          <h1 style={{ 
            fontSize: '2rem', 
            color: '#333', 
            margin: '0 0 10px 0',
            fontWeight: 'bold'
          }}>
            创建账户
          </h1>
          <p style={{ color: '#666', margin: 0 }}>
            加入我们，开始您的购物之旅
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit}>
          {/* 用户名输入 */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 'bold'
            }}>
              用户名 *
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (formErrors.username) {
                  setFormErrors(prev => ({ ...prev, username: undefined }));
                }
              }}
              style={{
                width: '100%',
                padding: '12px',
                border: formErrors.username ? '1px solid #dc3545' : '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              placeholder="请输入用户名"
            />
            {formErrors.username && (
              <p style={{ color: '#dc3545', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                {formErrors.username}
              </p>
            )}
          </div>

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
          <div style={{ marginBottom: '20px' }}>
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
            
            {/* 密码强度指示器 */}
            {password && (
              <div style={{ marginTop: '10px' }}>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '5px'
                }}>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <div
                      key={level}
                      style={{
                        flex: 1,
                        height: '4px',
                        backgroundColor: level <= passwordStrength.strength ? passwordStrength.color : '#e2e8f0',
                        borderRadius: '2px',
                        transition: 'background-color 0.3s ease'
                      }}
                    />
                  ))}
                </div>
                <span style={{
                  fontSize: '0.8rem',
                  color: passwordStrength.color,
                  fontWeight: 'bold'
                }}>
                  密码强度: {passwordStrength.text}
                </span>
              </div>
            )}
            
            {formErrors.password && (
              <p style={{ color: '#dc3545', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                {formErrors.password}
              </p>
            )}
          </div>

          {/* 确认密码输入 */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 'bold'
            }}>
              确认密码 *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (formErrors.confirmPassword) {
                    setFormErrors(prev => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 12px',
                  border: formErrors.confirmPassword ? '1px solid #dc3545' : '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="请再次输入密码"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            
            {/* 密码匹配提示 */}
            {confirmPassword && (
              <div style={{
                marginTop: '5px',
                fontSize: '0.8rem',
                color: password === confirmPassword ? '#22c55e' : '#ef4444'
              }}>
                {password === confirmPassword ? '✅ 密码匹配' : '❌ 密码不匹配'}
              </div>
            )}
            
            {formErrors.confirmPassword && (
              <p style={{ color: '#dc3545', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                {formErrors.confirmPassword}
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

          {/* 注册按钮 */}
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
            {loading ? '注册中...' : '创建账户'}
          </button>
        </form>

        {/* 登录链接 */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '25px',
          paddingTop: '25px',
          borderTop: '1px solid #eee'
        }}>
          <p style={{ color: '#666', margin: '0 0 15px 0' }}>
            已有账户？
          </p>
          <Link href="/login">
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
              立即登录
            </button>
          </Link>
        </div>

        {/* 用户协议提示 */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#666',
          textAlign: 'center'
        }}>
          注册即表示您同意我们的
          <Link href="/terms" style={{ color: '#667eea', textDecoration: 'none' }}>
            <span style={{ fontWeight: 'bold' }}> 服务条款 </span>
          </Link>
          和
          <Link href="/privacy" style={{ color: '#667eea', textDecoration: 'none' }}>
            <span style={{ fontWeight: 'bold' }}> 隐私政策</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

