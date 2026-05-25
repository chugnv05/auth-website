import { PATHS } from "@/app/router/paths";
import { useLogout } from "@/features/auth/logout/hooks/useLogout";
import { useAuthStore } from "@/features/auth/store/auth.store";
import svg from "@/shared/assets/svg";
import { cn } from "@/shared/lib/utils";
import { ConfirmLogout } from "@/shared/ui/dialog/confirm-logout";
import { ChevronDown, Info, LogOut, Settings, UserCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProtectedHeader() {
  const user = useAuthStore((s) => s.user);
  const { handleLogout } = useLogout();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onConfirmLogout = async () => {
    setLoggingOut(true);
    await handleLogout();
    setLoggingOut(false);
    setConfirmOpen(false);
  };

  const dropdownItems = [
    {
      label: "Thông tin",
      icon: Info,
      onClick: () => {
        navigate(PATHS.DASHBOARD); // thay bằng PATHS.PROFILE khi có
        setDropdownOpen(false);
      },
    },
    {
      label: "Cài đặt",
      icon: Settings,
      onClick: () => {
        navigate(PATHS.DASHBOARD); // thay bằng PATHS.SETTINGS khi có
        setDropdownOpen(false);
      },
    },
  ];

  const displayName = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "Người dùng";
  const roleName = user?.role?.name ?? "";
  const avatarUrl = user?.avatar ?? null;

  return (
    <>
      <header className="h-(--header-height) bg-crimson-red rounded-b-md sticky top-0 z-50 shadow-[0_6px_30px_rgba(0,0,0,0.2)]">
        <div className="page-container flex h-full items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={svg.textLogoPeach}
              className="h-(--header-height) w-auto object-contain"
              alt="Logo"
            />
          </Link>

          {/* User section */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-peach hover:bg-crimson transition-colors duration-200"
            >
              {/* Tên + Role */}
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-sm font-bold whitespace-nowrap">{displayName}</span>
                {roleName && (
                  <span className="text-xs font-normal text-peach/70 whitespace-nowrap">
                    {roleName}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div className="size-8 rounded-full overflow-hidden bg-crimson shrink-0 flex items-center justify-center border border-peach/30">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="size-full object-cover" />
                ) : (
                  <UserCircle2 className="size-5 text-peach" />
                )}
              </div>

              {/* Chevron */}
              <ChevronDown
                className={cn(
                  "size-4 text-peach/70 transition-transform duration-200 shrink-0",
                  dropdownOpen && "rotate-180",
                )}
              />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-md bg-crimson-red border border-peach/20 shadow-lg overflow-hidden z-50">
                {dropdownItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <button
                        onClick={item.onClick}
                        className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-peach hover:bg-crimson transition-colors duration-200"
                      >
                        <Icon className="size-4 shrink-0" />
                        {item.label}
                      </button>
                      <div className="mx-3 h-px bg-peach/15" />
                    </div>
                  );
                })}

                {/* Logout — có confirm */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setConfirmOpen(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-peach hover:bg-crimson transition-colors duration-200"
                >
                  <LogOut className="size-4 shrink-0" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Confirm logout dialog */}
      <ConfirmLogout
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Đăng xuất"
        description="Bạn có chắc chắn muốn đăng xuất không?"
        confirmLabel="Đăng xuất"
        cancelLabel="Huỷ"
        onConfirm={onConfirmLogout}
        loading={loggingOut}
      />
    </>
  );
}
