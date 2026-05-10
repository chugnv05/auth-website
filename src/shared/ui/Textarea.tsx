import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const textareaVariants = cva(
  [
    "flex min-h-24 w-full rounded-xl border",
    "bg-background px-4 py-3",
    "text-sm text-foreground",
    "transition-all duration-200",
    "outline-none",

    "placeholder:text-muted-foreground",

    "focus-visible:ring-4",
    "focus-visible:ring-ring/20",
    "focus-visible:border-ring",

    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "disabled:bg-muted/50",

    "aria-invalid:border-destructive",
    "aria-invalid:ring-destructive/20",

    "dark:bg-input/30",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-border",

        auth: "border-crimson-red/20 bg-peach/40 focus-visible:border-crimson-red",

        ghost: "border-transparent bg-muted/50 focus-visible:border-border",
      },

      resize: {
        none: "resize-none",
        vertical: "resize-y",
        auto: "resize",
      },
    },

    defaultVariants: {
      variant: "default",
      resize: "vertical",
    },
  },
);

type TextareaProps = React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>;

function Textarea({ className, variant, resize, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        textareaVariants({
          variant,
          resize,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
