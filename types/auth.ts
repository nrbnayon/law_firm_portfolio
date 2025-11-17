// types/auth.ts
export interface User {
  _id: string;
  email: string;
  fullName?: string;
  profileImage?: string | null;
  role: string;
  status?: string;
  verified?: boolean;
  isOnline?: boolean;
  isSubscribed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  role: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordResponse {
  email: string;
  message: string;
}

export interface VerifyOTPPayload {
  email: string;
  oneTimeCode: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
}