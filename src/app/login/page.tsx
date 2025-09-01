"use client";
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h1>登录</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await login(email, password);
        }}
      >
        <div>
          <label>邮箱</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>密码</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button disabled={loading} type="submit">{loading ? '登录中...' : '登录'}</button>
      </form>
      <p>
        没有账号？<Link href="/register">去注册</Link>
      </p>
    </div>
  );
}

