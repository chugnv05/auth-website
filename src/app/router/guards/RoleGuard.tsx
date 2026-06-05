import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../paths";

interface RoleGuardProps {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user);
  const userRoles = user?.roles?.map((r) => r.name) ?? [];

  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
}
