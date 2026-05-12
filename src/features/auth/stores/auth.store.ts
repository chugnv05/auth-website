import { create } from "zustand";
import { User } from "../types/auth.type";
import { tokenStorage } from "../utils/token-storage";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const user = tokenStorage.getUser();
  const accessToken = tokenStorage.getAccessToken();

  return {
    user,
    isAuthenticated: Boolean(accessToken),
    setAuth: (nextUser) =>
      set({
        user: nextUser,
        isAuthenticated: true,
      }),
    clearAuth: () =>
      set({
        user: null,
        isAuthenticated: false,
      }),
  };
});
