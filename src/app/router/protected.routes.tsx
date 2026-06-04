import ChangePasswordPage from "@/pages/auth/ChangePasswrodPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import PermissionPage from "@/pages/permissions/PermissionPage";
import RolePage from "@/pages/roles/RolePage";
import MePage from "@/pages/users/MePage";
import { PATHS } from "./paths";

export const protectedRoutes = [
  {
    path: PATHS.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: PATHS.ME,
    element: <MePage />,
  },
  {
    path: PATHS.CHANGE_PASSWORD,
    element: <ChangePasswordPage />,
  },
  {
    path: PATHS.ROLE,
    element: <RolePage />,
  },
  {
    path: PATHS.PERMISSION,
    element: <PermissionPage />,
  },
];
