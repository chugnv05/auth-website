import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils";
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg",
    "text-sm font-medium",
    "transition-all duration-200",
    "outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:ring-2 focus-visible:ring-ring/50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-background hover:bg-muted",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",

        // Custom
        auth: "bg-peach text-crimson-red gently-emerge",

        authOutline:
          "bg-crimson-red text-peach hover:bg-peach hover:text-crimson-red gently-emerge",

        menu: "bg-crimson-red text-peach hover:bg-peach hover:text-crimson-red gently-emerge",

        authBlock: "w-full py-5 bg-crimson-red text-peach hover:bg-crimson",

        getStarted:
          "bg-crimson-red px-6 py-3 text-peach rounded-lg transition hover:-translate-y-0.5",

        learnMore:
          "border border-crimson-red px-6 py-3 text-crimson-red rounded-lg transition hover:bg-crimson-red hover:text-peach",
      },
      size: {
        default: "h-9 px-4 py-2",

        sm: "h-8 rounded-md px-3 text-xs",

        lg: "h-10 rounded-md px-8",

        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
