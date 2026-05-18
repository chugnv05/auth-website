import { create } from "zustand"; // bo nho chung toan app

export type User = {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
};

type AuthState = {
  user: User | null;
  accessToken: string | null;

  isAuthenticated: boolean;
  isInitializing: boolean;

  setAuth: (data: { user: User; accessToken: string }) => void;
  logout: () => void;

  setInitializing: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  isAuthenticated: false,
  isInitializing: true,

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
    }),

  setInitializing: (value) =>
    set({
      isInitializing: value,
    }),
}));
