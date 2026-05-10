import svg from "@/assets/svg";
import { PATHS } from "@/routers/paths";
import { navItems } from "@/shared/config/nav.data";
import { Button } from "@/shared/ui/Button";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="h-(--header-height) bg-crimson-red rounded-b-md sticky top-0 z-50 shadow-[0_6px_30px_rgba(0,0,0,0.2)]">
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

        <nav className="hidden md:flex items-center gap-5 lg:gap-10 text-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.to} className="text-peach gently-emerge">
                {Icon && <Icon />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-2 lg:gap-3">
          <Link to={PATHS.LOGIN}>
            <Button variant="authOutline">Login</Button>
          </Link>
          <Link to={PATHS.REGISTER}>
            <Button variant="auth">Register</Button>
          </Link>
        </div>

        {/* Mobile Menu - default hidden */}
        <MobileMenu />
      </div>
    </header>
  );
}
