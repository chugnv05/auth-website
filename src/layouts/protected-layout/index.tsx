import ProtectedSidebar from "@/widgets/app-sidebar/protected-sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ProtectedFooter from "./ProtectedFooter";
import ProtectedHeader from "./ProtectedHeader";

export default function ProtectedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar mo — day layout sang phai */}
      <ProtectedSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 flex-col min-w-0">
        <ProtectedHeader />

        <main className="flex-1">
          <div className="page-container">
            <Outlet />
          </div>
        </main>

        <ProtectedFooter />
      </div>
    </div>
  );
}
