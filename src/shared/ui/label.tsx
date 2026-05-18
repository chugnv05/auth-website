import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/utils";

const labelVariants = cva(
  [
    "text-sm font-medium leading-none",
    "peer-disabled:cursor-not-allowed",
    "peer-disabled:opacity-50",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "text-foreground",
        mute: "text-muted-foreground",
        error: "text-destructive",
        success: "text-deep-jungle-green",
        basic: "text-crimson-red",
      },

      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & { required?: boolean };

function Label({ className, variant, size, required = false, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}

        {required && <span className="text-destructive">*</span>}
      </span>
    </LabelPrimitive.Root>
  );
}

export { Label };
