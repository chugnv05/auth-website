"use client";

import { Avatar as AvatarPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        [
          "group/avatar relative flex shrink-0 overflow-hidden",
          "rounded-full",
          "select-none",

          "ring-2 ring-peach",
          "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",

          "transition-all duration-200",

          "hover:-translate-y-px",
          "hover:shadow-md",

          /* sizes */
          "data-[size=sm]:size-8",
          "data-[size=default]:size-10",
          "data-[size=lg]:size-14",
          "data-[size=xl]:size-20",
          "data-[size=2xl]:size-24",
          "data-[size=3xl]:size-28",
          "data-[size=4xl]:size-32",
        ],
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(["aspect-square size-full", "object-cover"], className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        [
          "flex size-full items-center justify-center",
          "bg-crimson-red",
          "font-medium",
          "text-peach",

          "group-data-[size=sm]/avatar:text-xs",
          "group-data-[size=default]/avatar:text-sm",
          "group-data-[size=lg]/avatar:text-base",
          "group-data-[size=xl]/avatar:text-xl",
        ],
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({
  className,
  variant = "online",
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "online" | "offline" | "busy" | "away";
}) {
  return (
    <span
      data-slot="avatar-badge"
      data-variant={variant}
      className={cn(
        [
          "absolute bottom-0 right-0 z-10",
          "rounded-full border-2 border-peach",

          /* size */
          "group-data-[size=sm]/avatar:size-2.5",
          "group-data-[size=default]/avatar:size-3",
          "group-data-[size=lg]/avatar:size-4",
          "group-data-[size=xl]/avatar:size-5",

          /* variants */
          "data-[variant=online]:bg-emerald-500",
          "data-[variant=offline]:bg-gray-400",
          "data-[variant=busy]:bg-red-500",
          "data-[variant=away]:bg-amber-400",
        ],
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        [
          "group/avatar-group flex",
          "-space-x-3",

          "*:data-[slot=avatar]:ring-2",
          "*:data-[slot=avatar]:ring-peach",

          "*:data-[slot=avatar]:transition-transform",
          "*:data-[slot=avatar]:hover:z-10",
          "*:data-[slot=avatar]:hover:-translate-y-0.5",
        ],
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        [
          "relative flex shrink-0 items-center justify-center",
          "rounded-full",

          "bg-peach",
          "text-crimson-red",
          "font-medium",

          "ring-2 ring-peach",

          /* sizes */
          "group-has-data-[size=sm]/avatar-group:size-8",
          "group-has-data-[size=default]/avatar-group:size-10",
          "group-has-data-[size=lg]/avatar-group:size-14",
          "group-has-data-[size=xl]/avatar-group:size-20",

          "group-has-data-[size=sm]/avatar-group:text-xs",
          "group-has-data-[size=default]/avatar-group:text-sm",
          "group-has-data-[size=lg]/avatar-group:text-base",
          "group-has-data-[size=xl]/avatar-group:text-lg",
        ],
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage };
