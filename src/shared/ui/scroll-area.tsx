"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const scrollBarVariants = cva("flex touch-none select-none transition-all duration-200", {
  variants: {
    variant: {
      default: [
        "[&_[data-slot=scroll-area-thumb]]:bg-border",
        "[&_[data-slot=scroll-area-thumb]]:hover:bg-muted-foreground/40",
      ].join(" "),

      crimson: [
        "[&_[data-slot=scroll-area-thumb]]:bg-crimson-red/40",
        "[&_[data-slot=scroll-area-thumb]]:hover:bg-crimson-red",
      ].join(" "),
    },

    size: {
      sm: ["data-horizontal:h-1.5", "data-vertical:w-1.5"].join(" "),

      default: ["data-horizontal:h-2.5", "data-vertical:w-2.5"].join(" "),

      lg: ["data-horizontal:h-3", "data-vertical:w-3"].join(" "),
    },
  },

  defaultVariants: {
    variant: "crimson",
    size: "default",
  },
});

interface ScrollAreaProps extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {}

function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "max-h-[inherit] rounded-[inherit]",
          "scroll-smooth",
          "outline-none",
          "focus-visible:ring-3",
          "focus-visible:ring-ring/50",
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar />

      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

interface ScrollBarProps
  extends
    React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    VariantProps<typeof scrollBarVariants> {}

function ScrollBar({
  className,
  orientation = "vertical",
  variant,
  size,
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        scrollBarVariants({
          variant,
          size,
        }),
        orientation === "vertical" && "h-full border-l border-l-transparent p-px",

        orientation === "horizontal" && "flex-col border-t border-t-transparent p-px",

        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn("relative flex-1 rounded-full", "transition-colors duration-200")}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
