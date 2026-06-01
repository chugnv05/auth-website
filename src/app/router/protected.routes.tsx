import ChangePasswordPage from "@/pages/change-password/ChangePasswrodPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
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
];
