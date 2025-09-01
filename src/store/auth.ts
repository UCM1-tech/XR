"use client";
import { create } from 'zustand';
import { getApiClient } from '@/lib/api';

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
  lastLoginAt?: string;
  [key: string]: unknown;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null,
  user: null,
  loading: false,
  error: null,

  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const api = getApiClient();
      const { data } = await api.post('/auth/login', { email, password });
      const token = data.token as string;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('auth_token', token);
      }
      set({ token, user: data.user as UserProfile, loading: false });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      set({ error: error?.response?.data?.message || error.message || '登录失败', loading: false });
    }
  },

  async register(username, email, password) {
    set({ loading: true, error: null });
    try {
      const api = getApiClient();
      const { data } = await api.post('/auth/register', { username, email, password });
      const token = data.token as string;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('auth_token', token);
      }
      set({ token, user: data.user as UserProfile, loading: false });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      set({ error: error?.response?.data?.message || error.message || '注册失败', loading: false });
    }
  },

  logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
    }
    set({ token: null, user: null });
  }
}));

