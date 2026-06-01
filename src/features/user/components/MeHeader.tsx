import type { User } from "@/entities/user/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { Eye, Pencil, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { AvatarRemoveDialog } from "./AvatarRemoveDialog";
import { AvatarUpdateDialog } from "./AvatarUpdateDialog";
import { AvatarViewDialog } from "./AvatarViewDialog";

interface MeHeaderProps {
  user: User;
}

export function MeHeader({ user }: MeHeaderProps) {
  const role = user.roles?.[0]?.name ?? "";
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-block">
        <Avatar size="4xl">
          <AvatarImage src={user.profilePicture ?? undefined} alt={user.fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="iconRound"
              className="absolute bottom-0 right-0 z-10 size-7"
            >
              <Pencil className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center" className="min-w-auto">
            <DropdownMenuItem className="gap-2 cursor-pointer" onSelect={() => setViewOpen(true)}>
              <Eye className="size-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer" onSelect={() => setUpdateOpen(true)}>
              <Upload className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 cursor-pointer text-destructive focus:text-destructive"
              onSelect={() => setRemoveOpen(true)}
            >
              <Trash2 className="size-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <span className="text-xs font-semibold uppercase tracking-widest text-crimson-red/60">
        {role}
      </span>
      <span className="text-lg font-bold text-crimson-red">{user.fullName}</span>

      {/* Xem anh */}
      <AvatarViewDialog user={user} open={viewOpen} onOpenChange={setViewOpen} />

      {/* Sua anh */}
      <AvatarUpdateDialog user={user} open={updateOpen} onOpenChange={setUpdateOpen} />

      {/* Xoa anh */}
      <AvatarRemoveDialog user={user} open={removeOpen} onOpenChange={setRemoveOpen} />
    </div>
  );
}
