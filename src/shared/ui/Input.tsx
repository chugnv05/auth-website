import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/utils";

const inputVariants = cva(
  [
    "flex w-full min-w-0 rounded-xl border bg-transparent",
    "px-3 py-2 text-sm transition-all duration-200",
    "outline-none",
    "placeholder:text-muted-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:ring-2",
    "aria-invalid:border-destructive",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background",
          "focus-visible:border-ring",
          "focus-visible:ring-ring/30",
        ],
        ghost: ["rounded-full border-border bg-muted/50", "focus-visible:bg-background"],
        search: ["rounded-full border-boder bg-muted/50", "focus-visiable:bg-background"],
        basic: [
          "border-crimson-red/20 bg-white",
          "focus-visible: border-crimson-red",
          "focus-visible: ring-crimson-red/20",
          "shadow-sm",
        ],
        checkBox: "w-4 h-4",
      },
      size: {
        sm: "h-9, text-sm",
        md: "h-11 text-base",
        lg: "h-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type InputProps = React.ComponentProps<"input"> & VariantProps<typeof inputVariants>;

function Input({ className, variant, size, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Input };
