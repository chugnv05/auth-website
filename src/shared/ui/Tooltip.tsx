"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function TooltipProvider({
  delayDuration = 200,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
  variant?: "default" | "dark" | "light";
};

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  variant = "default",
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        data-variant={variant}
        sideOffset={sideOffset}
        className={cn(
          // Base
          "z-50 max-w-xs rounded-xl px-3 py-2 text-xs leading-relaxed shadow-xl ring-1 transition-all duration-200",

          // Animation
          "data-[state=delayed-open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=delayed-open]:fade-in-0",
          "data-[state=closed]:zoom-out-95",
          "data-[state=delayed-open]:zoom-in-95",

          // Slide animation
          "data-[side=top]:slide-in-from-bottom-2",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",

          // Variants
          "data-[variant=default]:bg-crimson-red",
          "data-[variant=default]:text-peach",
          "data-[variant=default]:ring-crimson-red/20",

          "data-[variant=dark]:bg-black",
          "data-[variant=dark]:text-white",
          "data-[variant=dark]:ring-white/10",

          "data-[variant=light]:bg-peach",
          "data-[variant=light]:text-crimson-red",
          "data-[variant=light]:ring-crimson-red/10",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className={cn(
            "fill-current",

            variant === "default" && "text-crimson-red",
            variant === "dark" && "text-black",
            variant === "light" && "text-peach",
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
