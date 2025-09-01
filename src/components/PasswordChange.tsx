"use client";
import { useState } from 'react';

interface PasswordChangeProps {
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<void>;
  onCancel: () => void;
}

export default function PasswordChange({ onPasswordChange, onCancel }: PasswordChangeProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength) {
      errors.push(`密码至少需要${minLength}个字符`);
    }
    if (!hasUpperCase) {
      errors.push('密码需要包含大写字母');
    }
    if (!hasLowerCase) {
      errors.push('密码需要包含小写字母');
    }
    if (!hasNumbers) {
      errors.push('密码需要包含数字');
    }
    if (!hasSpecialChar) {
      errors.push('密码需要包含特殊字符');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 验证当前密码
    if (!currentPassword.trim()) {
      setError('请输入当前密码');
      return;
    }

    // 验证新密码
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('、'));
      return;
    }

    // 验证确认密码
    if (newPassword !== confirmPassword) {
      setError('新密码和确认密码不匹配');
      return;
    }

    // 验证新密码不能与当前密码相同
    if (currentPassword === newPassword) {
      setError('新密码不能与当前密码相同');
      return;
    }

    setIsLoading(true);
    try {
      await onPasswordChange(currentPassword, newPassword);
      // 成功后清空表单
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '密码修改失败');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, color: '#e2e8f0', text: '' };
    
    const errors = validatePassword(password);
    const strength = 5 - errors.length;
    
    if (strength <= 1) return { strength, color: '#ef4444', text: '很弱' };
    if (strength <= 2) return { strength, color: '#f97316', text: '弱' };
    if (strength <= 3) return { strength, color: '#eab308', text: '中等' };
    if (strength <= 4) return { strength, color: '#22c55e', text: '强' };
    return { strength, color: '#16a34a', text: '很强' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ marginBottom: '25px', color: '#333', textAlign: 'center' }}>
        修改密码
      </h3>

      <form onSubmit={handleSubmit}>
        {/* 错误提示 */}
        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        {/* 当前密码 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontWeight: 'bold'
          }}>
            当前密码 *
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword.current ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 45px 12px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="请输入当前密码"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
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
              {showPassword.current ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* 新密码 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontWeight: 'bold'
          }}>
            新密码 *
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword.new ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 45px 12px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="请输入新密码"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
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
              {showPassword.new ? '🙈' : '👁️'}
            </button>
          </div>
          
          {/* 密码强度指示器 */}
          {newPassword && (
            <div style={{ marginTop: '10px' }}>
              <div style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '5px'
              }}>
                {[1, 2, 3, 4, 5].map((level) => (
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
        </div>

        {/* 确认新密码 */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontWeight: 'bold'
          }}>
            确认新密码 *
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 45px 12px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="请再次输入新密码"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
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
              {showPassword.confirm ? '🙈' : '👁️'}
            </button>
          </div>
          
          {/* 密码匹配提示 */}
          {confirmPassword && (
            <div style={{
              marginTop: '5px',
              fontSize: '0.8rem',
              color: newPassword === confirmPassword ? '#22c55e' : '#ef4444'
            }}>
              {newPassword === confirmPassword ? '✅ 密码匹配' : '❌ 密码不匹配'}
            </div>
          )}
        </div>

        {/* 密码要求提示 */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '25px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>密码要求：</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>至少8个字符</li>
            <li>包含大写字母</li>
            <li>包含小写字母</li>
            <li>包含数字</li>
            <li>包含特殊字符</li>
          </ul>
        </div>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '15px',
              backgroundColor: isLoading ? '#6c757d' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? '修改中...' : '确认修改'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            style={{
              padding: '15px 25px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
} 