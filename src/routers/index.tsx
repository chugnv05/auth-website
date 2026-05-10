import AuthLayout from "@/layouts/auth/AuthLayout";
import MainLayout from "@/layouts/main";
import DashboardPage from "@/pages/dashboard";
import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicOnlyRoute from "./guards/PublicOnlyRoute";
import { protectedRoutes } from "./protected.routes";
import { publicRoutes } from "./public.routes";

export const router = createBrowserRouter([
  // Public
  {
    path: "/",
    element: <MainLayout />,
    children: publicRoutes,
  },

  // Auth
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: authRoutes,
      },
    ],
  },

  // Protected
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardPage />,
        children: protectedRoutes,
      },
    ],
  },
]);
