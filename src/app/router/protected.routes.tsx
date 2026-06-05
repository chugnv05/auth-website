import ChangePasswordPage from "@/pages/auth/ChangePasswrodPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import PermissionPage from "@/pages/permissions/PermissionPage";
import RolePage from "@/pages/roles/RolePage";
import MePage from "@/pages/users/MePage";
import UserPage from "@/pages/users/UserPage";
import { RoleType } from "@/shared/constants/role";
import RoleGuard from "./guards/RoleGuard";
import { PATHS } from "./paths";

export const protectedRoutes = [
  {
    path: PATHS.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    element: <RoleGuard allowedRoles={[RoleType.ADMIN, RoleType.MANAGER]} />,
    children: [
      {
        path: PATHS.USER,
        element: <UserPage />,
      },
    ],
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
    element: <RoleGuard allowedRoles={[RoleType.ADMIN]} />,
    children: [
      {
        path: PATHS.ROLE,
        element: <RolePage />,
      },
      {
        path: PATHS.PERMISSION,
        element: <PermissionPage />,
      },
    ],
  },
];
