"use client";
import Cookies from "js-cookie";

export const cookieUtils = {
  getAccessToken: (): string | null => {
    const token = Cookies.get("accessToken");
    return token || null;
  },

  getRefreshToken: (): string | null => {
    const token = Cookies.get("refreshToken");
    return token || null;
  },

  getUserRole: (): string | null => {
    const role = Cookies.get("userRole");
    return role || null;
  },

  clearAll: () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    Cookies.remove("userRole", { path: "/" });
  },
};
