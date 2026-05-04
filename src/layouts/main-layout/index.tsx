import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-peach">
      <Header />

      <main className="flex-1">
        <div className="page-container bg-peach">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
