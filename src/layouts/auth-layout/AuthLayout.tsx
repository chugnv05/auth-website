import svg from "@/shared/assets/svg";
import { Outlet } from "react-router-dom";
import Footer from "../public-layout/Footer";
import Header from "../public-layout/Header";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex lg:items-center lg: justify-center">
          <img src={svg.banner} alt="Banner" className="w-full" />
        </div>

        <div className="flex items-center justify-center p-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
