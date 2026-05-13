import { User } from "@/entities/user/types/user.type";
import { create } from "zustand";
import { tokenStorage } from "../services/token-storage.service";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  clearAuth: () => void;
};

export const useSessionStore = create<AuthState>((set) => {
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
