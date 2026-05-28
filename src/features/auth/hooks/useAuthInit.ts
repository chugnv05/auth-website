import { userApi } from "@/features/user/api/user.api";
import { useEffect } from "react";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

// call api refresh
// be doc refresh token cookie
// be doc -> verify ->gen new accessToken -> gui FE
// => reload brower van se login
export function useAuthInit() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const setInitializing = useAuthStore((s) => s.setInitializing);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const setInitialized = useAuthStore((s) => s.setInitialized);

  useEffect(() => {
    if (isInitialized) return; // chan StrictMode chay lan 2
    setInitialized(true);
    const initialize = async () => {
      try {
        const refreshResponse = await authApi.refresh();
        const accessToken = refreshResponse.data.data?.accessToken;

        if (!accessToken) {
          logout();
          return;
        }

        useAuthStore.setState({ accessToken });

        const meResponse = await userApi.getMe();
        const user = meResponse.data.data;

        if (!user) {
          logout();
          return;
        }

        setAuth({ user, accessToken });
      } catch {
        logout();
      } finally {
        setInitializing(false);
      }
    };

    initialize();
  }, []);
}
