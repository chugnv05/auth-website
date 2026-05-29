import { userApi } from "@/features/user/api/user.api";
import { useEffect } from "react";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

// Promise singleton — được tạo 1 lần duy nhất ở module level.
// Dù StrictMode mount/unmount/remount bao nhiêu lần,
// initPromise luôn trỏ đến cùng 1 Promise → chỉ có đúng 1 API call.
let initPromise: Promise<void> | null = null;

function runInit(): Promise<void> {
  if (initPromise) return initPromise; // lần 2+ trở đi: reuse promise cũ

  initPromise = (async () => {
    const { setAuth, logout, setInitializing } = useAuthStore.getState();
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
  })();

  return initPromise;
}

export function useAuthInit() {
  useEffect(() => {
    runInit();
  }, []);
}
