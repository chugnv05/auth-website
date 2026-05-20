import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import ProtectedLayout from "@/layouts/protected-layout";
import PublicLayout from "@/layouts/public-layout";
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
    element: <PublicLayout />,
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
        element: <ProtectedLayout />,
        children: protectedRoutes,
      },
    ],
  },
]);
