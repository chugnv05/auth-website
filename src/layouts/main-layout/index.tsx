import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
