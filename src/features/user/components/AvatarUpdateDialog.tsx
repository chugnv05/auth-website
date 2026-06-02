import type { User } from "@/entities/user/types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { userApi } from "../api/user.api";

interface AvatarUpdateDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function AvatarUpdateDialog({ user, open, onOpenChange }: AvatarUpdateDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const accessToken = useAuthStore((s) => s.accessToken);

  const handleClose = () => {
    setPreview(null);
    setFile(null);
    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSave = () => {
    if (file) mutate(file);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (f: File) => userApi.updateAvatar(f),
    onSuccess: (res) => {
      const updated = res.data.data;

      if (updated && accessToken) {
        setAuth({ user: { ...user, ...updated } as User, accessToken });
      }
      notify.success(res.data.message ?? MESSAGES.common.updateSuccess);
      handleClose();
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent showCloseButton={false} size="sm">
        <DialogHeader>
          <DialogTitle className="text-crimson-red">Update Profile Picture</DialogTitle>
        </DialogHeader>
        <div
          className="relative flex items-center justify-center w-full aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer border-2 border-dashed border-border hover:border-crimson-red transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : user.profilePicture ? (
            <img src={user.profilePicture} alt="current" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-muted-foreground">Choose photo</span>
          )}

          {/* Overlay khi hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-medium">Choose another photo</span>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleSave}
            disabled={!file || isPending}
            isLoading={isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
