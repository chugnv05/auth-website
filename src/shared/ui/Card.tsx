import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const cardVariants = cva(
  ["group/card flex flex-col overflow-hidden", "rounded-2xl transition-all duration-200"],
  {
    variants: {
      variant: {
        default: ["bg-card text-card-foreground", "border border-border", "shadow-sm"].join(" "),

        auth: [
          "bg-peach text-crimson-red",
          "border border-crimson-red/10",
          "shadow-[0_10px_40px_rgba(0,0,0,0.08)]",
        ].join(" "),

        elevated: ["bg-card text-card-foreground", "border border-border/50", "shadow-xl"].join(
          " ",
        ),

        outline: ["border-2 border-border", "bg-transparent"].join(" "),

        glass: ["border border-white/20", "bg-white/10", "backdrop-blur-md", "shadow-lg"].join(" "),
      },

      size: {
        sm: "gap-3 py-3",
        default: "gap-4 py-4",
        lg: "gap-6 py-6",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>;

function Card({ className, variant, size, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        cardVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        [
          "grid auto-rows-min items-start gap-1",
          "px-6",
          "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
          "has-data-[slot=card-description]:gap-2",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("justify-self-end", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        ["flex items-center", "border-t border-border/50", "bg-muted/30", "px-6 py-4"].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
