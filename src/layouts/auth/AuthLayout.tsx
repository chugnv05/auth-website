import svg from "@/assets/svg";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex lg:items-center lg: justify-center">
        <img src={svg.banner} alt="Banner" className="w-full" />
      </div>

      <div className="flex items-center justify-center px-6 py-10">
        <Outlet />
      </div>
    </div>
  );
}
