import { useAuthStore } from "@/features/auth/store/auth.store";
import { LoadingOverlay } from "@/shared/ui/overlay";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../paths";

export default function PublicOnlyRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isInitializing = useAuthStore((s) => s.isInitializing);

  if (isInitializing) {
    return <LoadingOverlay />;
  }

  if (accessToken) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
}
