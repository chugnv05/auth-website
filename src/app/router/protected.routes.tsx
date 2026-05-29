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
];
