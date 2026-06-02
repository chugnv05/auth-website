import type { User } from "@/entities/user/types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { ConfirmDialog } from "@/shared/ui/custom";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

interface AvatarRemoveDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AvatarRemoveDialog({ user, open, onOpenChange }: AvatarRemoveDialogProps) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const accessToken = useAuthStore((s) => s.accessToken);

  const { mutate, isPending } = useMutation({
    mutationFn: () => userApi.removeAvatar(),
    onSuccess: (res) => {
      const updated = res.data.data;
      if (updated && accessToken) {
        setAuth({ user: { ...user, ...updated } as User, accessToken });
      }
      notify.success(MESSAGES.common.deleteSuccess);
      onOpenChange(false);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });

  return (
    <ConfirmDialog
      variant="destructive"
      open={open}
      onOpenChange={onOpenChange}
      title="Remove Profile Picture"
      description="Cannot be undone"
      confirmLabel="Remove"
      cancelLabel="Cancel"
      loading={isPending}
      onConfirm={() => mutate()}
    />
  );
}
