import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicOnlyRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
