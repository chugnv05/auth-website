import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-3",
        "data-[orientation=horizontal]:flex-col",
        "data-[orientation=vertical]:flex-row",
        className,
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  [
    "group/tabs-list inline-flex w-fit items-center",
    "rounded-2xl p-1",
    "bg-peach text-crimson-red",
    "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
    "border border-crimson-red/10",
    "transition-all duration-300",

    "group-data-[orientation=horizontal]/tabs:flex-row",
    "group-data-[orientation=vertical]/tabs:flex-col",
  ],
  {
    variants: {
      variant: {
        default: "",

        line: [
          "rounded-none border-0 bg-transparent shadow-none p-0",
          "border-b border-crimson-red/10",
        ],

        pills: ["rounded-full", "bg-crimson-red/5", "border border-crimson-red/10"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        [
          "relative inline-flex items-center justify-center gap-2",
          "rounded-xl px-4 py-2",
          "text-sm font-medium whitespace-nowrap",
          "transition-all duration-200",
          "outline-none select-none",

          "text-crimson-red/70",
          "hover:text-crimson-red",
          "hover:-translate-y-px",

          "focus-visible:ring-2",
          "focus-visible:ring-crimson-red/30",

          "disabled:pointer-events-none",
          "disabled:opacity-50",

          "[&_svg]:size-4",
          "[&_svg]:shrink-0",

          /* active */
          "data-[state=active]:bg-crimson-red",
          "data-[state=active]:text-peach",
          "data-[state=active]:shadow-md",

          /* line variant */
          "group-data-[variant=line]/tabs-list:rounded-none",
          "group-data-[variant=line]/tabs-list:bg-transparent",
          "group-data-[variant=line]/tabs-list:px-3",
          "group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
          "group-data-[variant=line]/tabs-list:data-[state=active]:text-crimson-red",
          "group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none",

          /* underline */
          "group-data-[variant=line]/tabs-list:after:absolute",
          "group-data-[variant=line]/tabs-list:after:left-0",
          "group-data-[variant=line]/tabs-list:after:bottom-0",
          "group-data-[variant=line]/tabs-list:after:h-0.5",
          "group-data-[variant=line]/tabs-list:after:w-full",
          "group-data-[variant=line]/tabs-list:after:origin-center",
          "group-data-[variant=line]/tabs-list:after:scale-x-0",
          "group-data-[variant=line]/tabs-list:after:bg-crimson-red",
          "group-data-[variant=line]/tabs-list:after:transition-transform",

          "group-data-[variant=line]/tabs-list:data-[state=active]:after:scale-x-100",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        ["flex-1 outline-none", "animate-in fade-in-50 duration-300", "text-sm"],
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger };
