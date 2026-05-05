import svg from "@/assets/svg";
import { Button } from "@/shared/ui/Button";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="h-(--header-height) bg-crimson-red rounded-b-md">
      <div className="page-container flex h-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-semibold">
            <img
              src={svg.textLogoPeach}
              className="h-(--header-height) w-auto object-contain"
              alt="Logo"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-20 lg:gap-20 md:gap-10 text-lg">
          <Link to="/" className="text-peach transition-all duration-200 hover:-translate-y-0.5">
            Home
          </Link>
          <Link
            to="/about"
            className="text-peach transition-all duration-200 hover:-translate-y-0.5"
          >
            About us
          </Link>
          <Link to="/qa" className="text-peach transition-all duration-200 hover:-translate-y-0.5">
            Q&A
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="login">Login</Button>
          <Button variant="register">Register</Button>
        </div>

        {/* Mobile Menu - default hidden */}
        <MobileMenu />
      </div>
    </header>
  );
}
