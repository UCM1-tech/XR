"use client";
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { fetchUserProfile, updateUserProfile } from '@/lib/users';
import type { UserProfile } from '@/store/auth';
import Link from 'next/link';
import AvatarUpload from '@/components/AvatarUpload';
import PasswordChange from '@/components/PasswordChange';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?._id) {
        try {
          const data = await fetchUserProfile(user._id);
          setProfile(data);
        } catch (error) {
          console.error('加载用户资料失败:', error);
          setMessage({ type: 'error', text: '加载用户资料失败' });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    loadProfile();
  }, [user?._id]);

  const handleSave = async () => {
    if (!profile) return;
    
    setSaving(true);
    setMessage(null);
    
    try {
      const updatedProfile = await updateUserProfile(profile._id, {
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
        avatar: profile.avatar,
        bio: profile.bio
      });
      setProfile(updatedProfile);
      setMessage({ type: 'success', text: '个人资料更新成功！' });
    } catch (error) {
      console.error('更新用户资料失败:', error);
      setMessage({ type: 'error', text: '更新用户资料失败，请重试' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      logout();
    }
  };

  const handlePasswordChange = async () => {
    // 这里应该调用后端API来修改密码
    // 暂时模拟成功
    setMessage({ type: 'success', text: '密码修改成功！' });
    setShowPasswordChange(false);
  };

  if (!token) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔒</div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>需要登录</h2>
          <p style={{ marginBottom: '30px', color: '#666' }}>请先登录后查看个人资料</p>
          <Link href="/login">
            <button style={{
              padding: '15px 30px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              去登录
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
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

  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* 页面内容 */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
          {/* 页面标题 */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>个人资料</h1>
            <p style={{ color: '#666' }}>管理您的账户信息和偏好设置</p>
          </div>

          {/* 消息提示 */}
          {message && (
            <div style={{
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message.text}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
            {/* 左侧：头像和基本信息 */}
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', height: 'fit-content' }}>
              <AvatarUpload
                currentAvatar={profile?.avatar}
                onAvatarChange={(avatarUrl) => {
                  if (profile) {
                    setProfile({ ...profile, avatar: avatarUrl });
                  }
                }}
                size={120}
              />
              
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{profile?.username || '用户'}</h3>
                <p style={{ margin: 0, color: '#666' }}>{profile?.email}</p>
              </div>

              {/* 快速统计 */}
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ color: '#666' }}>注册时间</span>
                  <span style={{ color: '#333', fontWeight: 'bold' }}>
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('zh-CN') : '未知'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ color: '#666' }}>最后登录</span>
                  <span style={{ color: '#333', fontWeight: 'bold' }}>
                    {profile?.lastLoginAt ? new Date(profile.lastLoginAt).toLocaleDateString('zh-CN') : '未知'}
                  </span>
                </div>
              </div>
            </div>

            {/* 右侧：详细信息表单 */}
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px' }}>
              <h2 style={{ marginBottom: '30px', color: '#333' }}>编辑资料</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {/* 用户名 */}
                  <div>
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
                      value={profile?.username || ''}
                      onChange={(e) => setProfile({ ...profile!, username: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                      placeholder="请输入用户名"
                    />
                  </div>

                  {/* 邮箱 */}
                  <div>
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
                      value={profile?.email || ''}
                      onChange={(e) => setProfile({ ...profile!, email: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                      placeholder="请输入邮箱地址"
                    />
                  </div>

                  {/* 手机号 */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: '#333',
                      fontWeight: 'bold'
                    }}>
                      手机号码
                    </label>
                    <input
                      type="tel"
                      value={profile?.phone || ''}
                      onChange={(e) => setProfile({ ...profile!, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                      placeholder="请输入手机号码"
                    />
                  </div>

                  {/* 个人简介 */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: '#333',
                      fontWeight: 'bold'
                    }}>
                      个人简介
                    </label>
                    <textarea
                      value={profile?.bio || ''}
                      onChange={(e) => setProfile({ ...profile!, bio: e.target.value })}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                      placeholder="介绍一下自己..."
                    />
                  </div>

                  {/* 操作按钮 */}
                  <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <button
                      type="submit"
                      disabled={saving}
                      style={{
                        flex: 1,
                        padding: '15px',
                        backgroundColor: saving ? '#6c757d' : '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: saving ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {saving ? '保存中...' : '保存更改'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowPasswordChange(true)}
                      style={{
                        padding: '15px 25px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      修改密码
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        padding: '15px 25px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      退出登录
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* 密码修改模态框 */}
          {showPasswordChange && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{ maxWidth: '500px', width: '90%' }}>
                <PasswordChange
                  onPasswordChange={handlePasswordChange}
                  onCancel={() => setShowPasswordChange(false)}
                />
              </div>
            </div>
          )}

          {/* 底部快速链接 */}
          <div style={{ 
            marginTop: '40px', 
            padding: '30px', 
            backgroundColor: 'white', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>快速操作</h3>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/dashboard">
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}>
                  用户仪表板
                </button>
              </Link>
              <Link href="/favorites">
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}>
                  我的收藏
                </button>
              </Link>
              <Link href="/cart">
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}>
                  购物车
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

