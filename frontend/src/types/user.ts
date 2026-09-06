export interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  birthday?: string;
  profilePicture: string | null;
  emailVerified?: boolean;
  role?: string;
  currentStreak: number;
  lastPlayedDate: string | null;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  username: string;
  birthday: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
}
