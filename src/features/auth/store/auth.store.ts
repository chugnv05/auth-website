import type { User } from "@/entities/user/types/user.type";
import { create } from "zustand"; // bo nho chung toan app

type AuthState = {
  user: User | null;
  accessToken: string | null;

  isAuthenticated: boolean;
  isInitializing: boolean;
  isInitialized: boolean;

  setAuth: (data: { user: User; accessToken: string }) => void;
  logout: () => void;
  setInitializing: (value: boolean) => void;
  setInitialized: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
  isInitialized: false,

  setAuth: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitializing: false,
    }),

  setInitializing: (value) =>
    set({
      isInitializing: value,
    }),

  setInitialized: (value) => set({ isInitialized: value }),
}));
