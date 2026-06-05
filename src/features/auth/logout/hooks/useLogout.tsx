import { PATHS } from "@/app/router/paths";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
    } finally {
      logout();
      navigate(PATHS.LOGIN);
    }
  };

  return { handleLogout };
}
