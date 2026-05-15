import { User } from "@/features/auth/store/auth.store";
import { AUTH_STORAGE_KEYS } from "../constants/auth-storage.constants";
import { AuthTokens } from "../types/auth-token.type";

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  },

  setTokens(tokens: AuthTokens) {
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);

    if (tokens.refreshToken) {
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    }
  },

  setUser(user: User) {
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser() {
    const rawUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);

    if (!rawUser) return null;

    try {
      return JSON.parse(rawUser) as User;
    } catch (error) {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
  },
};
