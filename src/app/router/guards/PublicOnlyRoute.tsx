import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../paths";

export default function PublicOnlyRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isInitializing = useAuthStore((s) => s.isInitializing);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (accessToken) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return <Outlet />;
}
