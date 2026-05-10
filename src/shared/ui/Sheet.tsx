import * as React from "react";

import * as SheetPrimitive from "@radix-ui/react-dialog";

import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { Button } from "@/shared/ui/Button";
function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50",

        "bg-black/40",

        "backdrop-blur-sm",

        "duration-200",

        "data-[state=open]:animate-in",

        "data-[state=closed]:animate-out",

        "data-[state=open]:fade-in-0",

        "data-[state=closed]:fade-out-0",

        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  size = "default",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
  size?: "sm" | "default" | "lg" | "full";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        data-size={size}
        className={cn(
          "fixed z-50",

          "flex flex-col",

          "gap-5",

          "bg-background",

          "shadow-2xl",

          "border-border",

          "duration-300",

          "ease-out",

          "outline-none",

          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",

          "data-[state=open]:fade-in-0",
          "data-[state=closed]:fade-out-0",

          // RIGHT
          "data-[side=right]:inset-y-0",
          "data-[side=right]:right-0",
          "data-[side=right]:border-l",

          "data-[side=right]:data-[state=open]:slide-in-from-right",
          "data-[side=right]:data-[state=closed]:slide-out-to-right",

          // LEFT
          "data-[side=left]:inset-y-0",
          "data-[side=left]:left-0",
          "data-[side=left]:border-r",

          "data-[side=left]:data-[state=open]:slide-in-from-left",
          "data-[side=left]:data-[state=closed]:slide-out-to-left",

          // TOP
          "data-[side=top]:inset-x-0",
          "data-[side=top]:top-0",
          "data-[side=top]:border-b",

          "data-[side=top]:data-[state=open]:slide-in-from-top",
          "data-[side=top]:data-[state=closed]:slide-out-to-top",

          // BOTTOM
          "data-[side=bottom]:inset-x-0",
          "data-[side=bottom]:bottom-0",
          "data-[side=bottom]:border-t",

          "data-[side=bottom]:data-[state=open]:slide-in-from-bottom",
          "data-[side=bottom]:data-[state=closed]:slide-out-to-bottom",

          // WIDTH
          "data-[side=left]:w-full",
          "data-[side=right]:w-full",

          "data-[size=sm]:sm:max-w-sm",
          "data-[size=default]:sm:max-w-md",
          "data-[size=lg]:sm:max-w-xl",
          "data-[size=full]:sm:max-w-2xl",

          // HEIGHT
          "data-[side=top]:h-auto",
          "data-[side=bottom]:h-auto",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="sm"
              className="
                absolute
                top-4
                right-4
                rounded-full
                hover:bg-crimson-red
                hover:text-peach
                transition-all
                duration-200
                hover:rotate-90"
            >
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="sheet-header" className={cn("flex flex-col gap-2 p-6", className)} {...props} />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-3 p-6", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
