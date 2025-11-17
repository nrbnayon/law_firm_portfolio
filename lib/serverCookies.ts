// frontend/src/utils/serverCookies.ts
import { cookies } from "next/headers";

/**
 * Cookie utility functions for reading cookies set by backend
 * Backend handles setting cookies via res.cookie()
 * Frontend only needs to READ cookies for middleware/auth checks
 *
 * NOTE: In Next.js 16, cookies() returns a Promise, so all functions are async
 */

// Get access token from cookies
export const getAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

// Get refresh token from cookies
export const getRefreshToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("refreshToken")?.value;
};

// Get user role from cookies
export const getUserRole = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("userRole")?.value;
};

// Get all user data from cookies
export const getUserData = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const userRole = cookieStore.get("userRole")?.value;

  return {
    accessToken,
    refreshToken,
    userRole,
    isAuthenticated: !!accessToken,
  };
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = await getAccessToken();
  return !!accessToken;
};

// Check if user has specific role
export const hasRole = async (role: string): Promise<boolean> => {
  const userRole = await getUserRole();
  return userRole === role;
};

export const serverCookies = {
  getAccessToken,
  getRefreshToken,
  getUserRole,
  getUserData,
  isAuthenticated,
  hasRole,
};
