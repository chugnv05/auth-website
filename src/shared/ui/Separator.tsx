import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const separatorVariants = cva("shrink-0 transition-colors", {
  variants: {
    variant: {
      default: "bg-border",

      muted: "bg-muted",

      crimson: "bg-crimson-red/20",

      peach: "bg-peach/30",

      gradient: "bg-gradient-to-r from-transparent via-crimson-red/30 to-transparent",

      dashed: "bg-transparent border-border border-dashed",
    },

    thickness: {
      sm: "",
      default: "",
      lg: "",
    },
  },

  compoundVariants: [
    {
      thickness: "sm",
      className: "data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
    },

    {
      thickness: "default",
      className: "data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
    },

    {
      thickness: "lg",
      className: "data-[orientation=horizontal]:h-[3px] data-[orientation=vertical]:w-[3px]",
    },

    {
      variant: "dashed",
      className: "data-[orientation=horizontal]:border-t data-[orientation=vertical]:border-l",
    },
  ],

  defaultVariants: {
    variant: "default",
    thickness: "sm",
  },
});

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>;

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  thickness,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        orientation === "vertical" ? "self-stretch" : "w-full",
        separatorVariants({
          variant,
          thickness,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Separator, separatorVariants };
