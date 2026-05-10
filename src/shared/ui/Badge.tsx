import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  [
    "group/badge inline-flex items-center justify-center",
    "gap-1 rounded-full",
    "border px-2.5 py-1",
    "text-xs font-medium whitespace-nowrap",
    "transition-all duration-200",
    "select-none",

    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-crimson-red/30",

    "[&>svg]:size-3.5",
    "[&>svg]:shrink-0",

    "hover:-translate-y-px",
  ],
  {
    variants: {
      variant: {
        default: ["border-transparent", "bg-crimson-red", "text-peach", "hover:bg-crimson-red/90"],

        secondary: ["border-transparent", "bg-peach", "text-crimson-red", "hover:bg-peach/80"],

        outline: [
          "border-crimson-red/20",
          "bg-transparent",
          "text-crimson-red",

          "hover:bg-crimson-red/5",
        ],

        ghost: [
          "border-transparent",
          "bg-transparent",
          "text-crimson-red/70",

          "hover:bg-crimson-red/5",
          "hover:text-crimson-red",
        ],

        destructive: ["border-red-200", "bg-red-100", "text-red-700", "hover:bg-red-200"],

        success: [
          "border-emerald-200",
          "bg-emerald-100",
          "text-emerald-700",

          "hover:bg-emerald-200",
        ],

        warning: ["border-amber-200", "bg-amber-100", "text-amber-700", "hover:bg-amber-200"],

        info: ["border-sky-200", "bg-sky-100", "text-sky-700", "hover:bg-sky-200"],

        premium: [
          "border-yellow-300/40",
          "bg-gradient-to-r",
          "from-yellow-100",
          "to-amber-100",
          "text-amber-800",

          "shadow-sm",

          "hover:shadow-md",
        ],
      },

      size: {
        sm: "h-5 px-2 text-[10px]",
        default: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
