import { useLogout } from "@/features/auth/logout";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { profileDropdownData } from "@/shared/config/profile-dropdown.data";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { ConfirmDialog } from "@/shared/ui/custom";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileDropdown() {
  const user = useAuthStore((s) => s.user);
  const { handleLogout } = useLogout();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const username = user?.fullName ?? "User";

  const role = user?.roles?.[0]?.name ?? "Undefine";

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onConfirmLogout = async () => {
    setLoggingOut(true);
    await handleLogout();
    setLoggingOut(false);
    setConfirmOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-md px-2 py-1.5 ext-peach hover:bg-crimson transition-colors duration-200 outline-none">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-semibold text-peach whitespace-nowrap">{username}</span>
              {role && (
                <span className="text-sm font-normal text-peach/70 whitespace-nowrap">{role}</span>
              )}
            </div>
            <Avatar size="sm">
              <AvatarImage src={user?.profilePicture ?? undefined} alt={username} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-auto">
          <DropdownMenuLabel>Hi {username}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          {profileDropdownData.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.to} className="flex items-center gap-1">
                <DropdownMenuItem className="w-full">
                  {Icon && <Icon />}
                  {item.label}
                </DropdownMenuItem>
              </Link>
            );
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive" onClick={() => setConfirmOpen(true)}>
            <LogOut /> Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Đăng xuất"
        description="Bạn có chắc chắn muốn đăng xuất không?"
        confirmLabel="Đăng xuất"
        cancelLabel="Hủy"
        variant="destructive"
        loading={loggingOut}
        onConfirm={onConfirmLogout}
      />
    </>
  );
}
