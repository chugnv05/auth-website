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

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await authApi.refresh();

        const user = response.data.data;
        const accessToken = response.data.meta?.tokenInfo?.accessToken;

        if (!user || !accessToken) {
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
