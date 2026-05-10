"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

const Toaster = ({
  richColors = true,
  closeButton = true,
  position = "top-right",
  expand = true,
  visibleToasts = 4,
  ...props
}: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      richColors={richColors}
      closeButton={closeButton}
      position={position}
      expand={expand}
      visibleToasts={visibleToasts}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,

        info: <InfoIcon className="size-4" />,

        warning: <TriangleAlertIcon className="size-4" />,

        error: <OctagonXIcon className="size-4" />,

        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "calc(var(--radius) + 2px)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl rounded-xl border",

          title: "text-sm font-semibold",

          description: "text-sm text-muted-foreground",

          actionButton: "bg-crimson-red text-peach hover:bg-crimson-red/90",

          cancelButton: "bg-muted text-foreground hover:bg-muted/80",

          closeButton: "bg-background border border-border hover:bg-muted",

          success: "!border-emerald-500/20",

          error: "!border-destructive/20",

          warning: "!border-yellow-500/20",

          info: "!border-blue-500/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
