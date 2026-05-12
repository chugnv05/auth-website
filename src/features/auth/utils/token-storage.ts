import { AUTH_STORAGE_KEYS } from "../constants/auth.constants";
import { AuthTokens, User } from "../types/auth.type";

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  },

  setTokens(tokens: AuthTokens) {
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);

    if (tokens.refreshRoken) {
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshRoken);
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
