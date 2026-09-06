import api from './api';
import type { LoginRequest, RegisterRequest, LoginResponse, RefreshResponse } from '../types/user';

export const authApi = {
  register: (data: RegisterRequest) => api.post<{ message: string; userId: string }>('/auth/register', data),
  verifyEmail: (email: string, code: string) => api.post('/auth/verify-email', { email, code }),
  resendCode: (email: string) => api.post('/auth/resend-code', { email }),
  login: (data: LoginRequest) => api.post<LoginResponse>('/auth/login', data),
  refresh: (refreshToken: string) => api.post<RefreshResponse>('/auth/refresh', { refreshToken }),
  logout: () => api.post('/auth/logout'),
};
