import type { User } from "@/entities/user/types";
import { Button, Dialog, DialogContent, DialogTitle } from "@/shared/ui";
import { X } from "lucide-react";

interface AvatarViewDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AvatarViewDialog({ user, open, onOpenChange }: AvatarViewDialogProps) {
  const initials = user.fullName
    .split("")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-sm p-0 overflow-hidden">
        <DialogTitle className="sr-only">Avatar</DialogTitle>

        <Button
          type="button"
          variant="iconRound"
          size="icon"
          className="absolute top-2 right-2 z-10 size-7"
          onClick={() => onOpenChange(false)}
        >
          <X className="size-3.5" />
        </Button>

        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-64 bg-muted">
            <span className="text-5xl font-bold text-muted-foreground">{initials}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
