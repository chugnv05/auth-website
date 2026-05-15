import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);

  const isInitializing = useAuthStore((s) => s.isInitializing);

  if (isInitializing) {
    // chờ auth restore xong
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    // chan protected router
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
