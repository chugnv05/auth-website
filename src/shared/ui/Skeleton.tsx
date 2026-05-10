import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const skeletonVariants = cva("overflow-hidden rounded-md bg-muted", {
  variants: {
    variant: {
      default: "bg-muted",
      shimmer:
        "relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
    },

    size: {
      default: "h-4 w-full",
      sm: "h-3 w-24",
      md: "h-4 w-40",
      lg: "h-5 w-64",

      avatar: "size-10 rounded-full",
      avatarSm: "size-8 rounded-full",
      avatarLg: "size-14 rounded-full",

      button: "h-10 w-28 rounded-xl",
      card: "h-52 w-full rounded-2xl",
    },

    animation: {
      pulse: "animate-pulse",
      none: "",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "default",
    animation: "pulse",
  },
});

type SkeletonProps = React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>;

function Skeleton({ className, variant, size, animation, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        skeletonVariants({
          variant,
          size,
          animation,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
