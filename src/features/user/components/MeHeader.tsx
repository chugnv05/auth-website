import type { User } from "@/entities/user/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { Camera } from "lucide-react";
import React, { useRef } from "react";

interface MeHeaderProps {
  user: User;
  isEditing: boolean;
  onFileChange?: (file: File) => void;
}

export function MeHeader({ user, isEditing, onFileChange }: MeHeaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const role = user.roles?.[0]?.name ?? "";
  const initials = user.fullName
    .split("")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileChange?.(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar size="4xl">
        <AvatarImage src={user.profilePicture ?? undefined} alt={user.fullName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {isEditing && (
        <>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
          >
            <Camera className="size-5 text-white" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}

      <span className="text-xs font-semibold uppercase tracking-widest text-crimson-red/60">
        {role}
      </span>
      <span className="text-lg font-bold text-crimson-red">{user.fullName}</span>
    </div>
  );
}
