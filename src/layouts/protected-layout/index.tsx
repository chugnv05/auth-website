import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
