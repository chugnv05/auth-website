import * as React from "react";

import { cn } from "@/shared/lib/utils";
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className={cn([
        "relative w-full overflow-x-auto",
        "rounded-2xl border border-crimson-red/10",
        "bg-creamy-shell",
        "shadow-[0_6px_30px_rgba(0,0,0,0.05)]",
      ])}
    >
      <table
        data-slot="table"
        className={cn(
          ["w-full caption-bottom", "text-sm text-crimson-red", "border-collapse"],
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        ["bg-crimson-red hover:bg-crimson", "[&_tr]:border-b", "[&_tr]:border-crimson-red/10"],
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(["[&_tr:last-child]:border-0"], className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        [
          "border-t border-crimson-red/10",
          "bg-crimson-red/5",
          "font-medium",
          "[&>tr]:last:border-b-0",
        ],
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        [
          "border-b border-crimson-red/10",
          "transition-all duration-200",
          "hover:bg-crimson-red/5",
          "hover:-translate-y-px",
          "data-[state=selected]:bg-crimson-red/10",
          "has-aria-expanded:bg-crimson-red/5",
        ],
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        [
          "h-12 px-4",
          "text-left align-middle",
          "font-semibold",
          "whitespace-nowrap",
          "text-peach",
          "(has-[[role=checkbox]]:pr-0)",
        ],
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        [
          "px-4 py-3",
          "align-middle",
          "whitespace-nowrap",
          "text-crimson-red/80",
          "(has-[[role=checkbox]]:pr-0)",
        ],
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(["mt-4", "text-sm", "text-crimson-red/60"], className)}
      {...props}
    />
  );
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
