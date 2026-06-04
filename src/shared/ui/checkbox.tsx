import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const checkboxVariants = cva(
  [
    "peer relative shrink-0",
    "flex items-center justify-center",
    "rounded-md border",
    "transition-all duration-200",
    "outline-none",
    "group-has-disabled/field:opacity-50",
    "focus-visible:ring-3",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-destructive/20",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "data-checked:border-primary",
          "data-checked:bg-primary",
          "data-checked:text-primary-foreground",
        ].join(" "),

        crimson: [
          "border-crimson-red/40",
          "data-checked:border-crimson-red",
          "data-checked:bg-crimson-red",
          "data-checked:text-peach",
          "focus-visible:ring-crimson-red/20",
        ].join(" "),

        success: [
          "border-green-500/40",
          "data-checked:border-green-600",
          "data-checked:bg-green-600",
          "data-checked:text-white",
          "focus-visible:ring-green-500/20",
        ].join(" "),
      },

      size: {
        sm: "size-4",
        default: "size-5",
        lg: "size-6",
      },
    },

    defaultVariants: {
      variant: "crimson",
      size: "default",
    },
  },
);

export interface CheckboxProps
  extends
    React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({ className, variant, size, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-variant={variant}
      data-size={size}
      className={cn(
        checkboxVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="
          grid
          place-content-center
          text-current
          transition-transform
          duration-200
          [&>svg]:size-3.5
        "
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
