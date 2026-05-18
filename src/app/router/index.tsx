import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/home/HomePage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicOnlyRoute from "./guards/PublicOnlyRoute";
import { guestRoutes } from "./guest.routes";
import { protectedRoutes } from "./protected.routes";
import { publicRoutes } from "./public.routes";

export const appRouter = createBrowserRouter([
  // Public
  {
    path: "/",
    element: <MainLayout />,
    children: publicRoutes,
  },

  // Guest
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: guestRoutes,
      },
    ],
  },

  // Protected
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <HomePage />,
        children: protectedRoutes,
      },
    ],
  },
]);
