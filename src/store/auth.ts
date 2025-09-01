"use client";
import { create } from 'zustand';
import { getApiClient, setAuthToken, clearAuthToken, handleApiError } from '@/lib/api';

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
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null, // Initialize as null to prevent hydration mismatch
  user: null,
  loading: false,
  error: null,
  isInitialized: false,

  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const api = getApiClient();
      const { data } = await api.post('/auth/login', { email, password });
      
      const token = data.token as string;
      const user = data.user as UserProfile;
      
      // 设置token到localStorage和API客户端
      setAuthToken(token);
      
      set({ 
        token, 
        user, 
        loading: false, 
        isInitialized: true 
      });
    } catch (err: unknown) {
      const errorMessage = handleApiError(err);
      set({ 
        error: errorMessage, 
        loading: false,
        isInitialized: true 
      });
      throw err;
    }
  },

  async register(username, email, password) {
    set({ loading: true, error: null });
    try {
      const api = getApiClient();
      const { data } = await api.post('/auth/register', { username, email, password });
      
      const token = data.token as string;
      const user = data.user as UserProfile;
      
      // 设置token到localStorage和API客户端
      setAuthToken(token);
      
      set({ 
        token, 
        user, 
        loading: false,
        isInitialized: true 
      });
    } catch (err: unknown) {
      const errorMessage = handleApiError(err);
      set({ 
        error: errorMessage, 
        loading: false,
        isInitialized: true 
      });
      throw err;
    }
  },

  async logout() {
    try {
      // 调用后端登出接口
      const api = getApiClient();
      await api.post('/auth/logout');
    } catch (error) {
      console.error('登出请求失败:', error);
    } finally {
      // 清除本地状态
      clearAuthToken();
      set({ 
        token: null, 
        user: null, 
        error: null,
        isInitialized: true 
      });
    }
  },

  async refreshUser() {
    const { token } = get();
    if (!token) {
      set({ isInitialized: true });
      return;
    }

    try {
      const api = getApiClient();
      const { data } = await api.get('/me');
      set({ 
        user: data.user as UserProfile,
        isInitialized: true 
      });
    } catch (error) {
      console.error('刷新用户信息失败:', error);
      // 如果获取用户信息失败，可能是token过期，清除认证状态
      clearAuthToken();
      set({ 
        token: null, 
        user: null,
        isInitialized: true 
      });
    }
  },

  clearError() {
    set({ error: null });
  }
}));

// 添加一个初始化函数，在客户端调用
export const initializeAuth = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('auth_token');
    const store = useAuthStore.getState();
    
    if (token) {
      // 设置 token 并刷新用户信息
      useAuthStore.setState({ token });
      store.refreshUser();
    } else {
      useAuthStore.setState({ isInitialized: true });
    }
  }
};

