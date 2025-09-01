"use client";
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const [username, setUsername] = useState('testuser');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h1>注册</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await register(username, email, password);
        }}
      >
        <div>
          <label>用户名</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>邮箱</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>密码</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button disabled={loading} type="submit">{loading ? '注册中...' : '注册'}</button>
      </form>
      <p>
        已有账号？<Link href="/login">去登录</Link>
      </p>
    </div>
  );
}

