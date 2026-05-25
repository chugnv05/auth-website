import { PATHS } from "@/app/router/paths";
import svg from "@/shared/assets/svg";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProtectedHeader() {
  return (
    <header className="h-(--header-height) bg-crimson-red sticky top-0 z-50 shadow-[0_6px_30px_rgba(0, 0, 0, 0.2)]">
      <div className="page-container flex h-full items-center justify-between">
        {/* logo */}
        <Link className="text-lg font-semibold" to={PATHS.HOME}>
          <img
            src={svg.textLogoPeach}
            className="h-(--header-height) w-auto object-contain"
            alt="Logo"
          />
        </Link>
        <div className="flex items-center gap-2 md:gap-2 lg:gap-3">
          <CircleUserRound className="text-peach" />
        </div>
      </div>
    </header>
  );
}
