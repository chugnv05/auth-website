import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AppInitializer } from "./config/AppInitializer";
import AppProviders from "./providers";
import { appRouter } from "./router";

export default function App() {
  return (
    <AppProviders>
      <AppInitializer />
      <RouterProvider router={appRouter} />
      <Toaster richColors position="top-right" />
    </AppProviders>
  );
}
