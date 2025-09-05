import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

let apiClient: AxiosInstance;

// 创建API客户端实例
function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器 - 添加token
  client.interceptors.request.use(
    (config) => {
      // 从localStorage获取token
      if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器 - 处理token过期和错误
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as Record<string, unknown>;

      // 处理401错误（token过期或无效）
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 尝试刷新token
        try {
          const refreshToken = window.localStorage.getItem('auth_token');
          if (refreshToken) {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
              headers: { Authorization: `Bearer ${refreshToken}` }
            });

            const newToken = response.data.token;
            window.localStorage.setItem('auth_token', newToken);

            // 重试原始请求
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
          }
        } catch {
          // 刷新失败，清除token并重定向到登录页
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem('auth_token');
            window.location.href = '/login';
          }
        }
      }

      // 处理其他错误
      if (error.response?.status === 403) {
        console.error('权限不足:', error.response.data);
      } else if (error.response?.status >= 500) {
        console.error('服务器错误:', error.response.data);
      }

      return Promise.reject(error);
    }
  );

  return client;
}

export function getApiClient(): AxiosInstance {
  if (!apiClient) {
    apiClient = createApiClient();
  }
  return apiClient;
}

// 设置token
export function setAuthToken(token: string | null): void {
  if (typeof window !== 'undefined') {
    if (token) {
      window.localStorage.setItem('auth_token', token);
    } else {
      window.localStorage.removeItem('auth_token');
    }
  }
  
  // 重新创建客户端以更新token
  apiClient = createApiClient();
}

// 清除token
export function clearAuthToken(): void {
  setAuthToken(null);
}

// 获取当前token
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('auth_token');
  }
  return null;
}

// 检查是否已登录
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

// 通用API错误处理
export function handleApiError(error: unknown): string {
  const maybeAxiosError = error as AxiosError<{ message?: string }>;
  const responseMessage = maybeAxiosError.response?.data?.message;
  if (typeof responseMessage === 'string' && responseMessage) {
    return responseMessage;
  }

  if (typeof (error as { message?: unknown }).message === 'string') {
    return (error as { message?: string }).message as string;
  }

  return '请求失败，请稍后重试';
}

