import { cn } from "@/shared/lib/utils";
import { Loader2, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { ScrollArea } from "../scroll-area";

export interface SelectOption {
  id: string;
  label: string;
}

interface MultiSelectPickerProps {
  options: SelectOption[];
  value: string[]; // selected IDs
  onChange: (ids: string[]) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function MultiSelectPicker({
  options,
  value,
  onChange,
  isLoading = false,
  placeholder = "Search...",
  className,
}: MultiSelectPickerProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  const filteredIds = filtered.map((o) => o.id);
  const allSelected = filteredIds.length > 0 && filteredIds.every((id) => value.includes(id));
  const someSelected = filteredIds.some((id) => value.includes(id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      onChange(value.filter((id) => !filteredIds.includes(id)));
    } else {
      onChange(Array.from(new Set([...value, ...filteredIds])));
    }
  };

  return (
    <div
      className={cn(
        "rounded-md border border-input bg-background flex flex-col overflow-hidden",
        className,
      )}
    >
      {/* Search */}
      <div className="relative border-b border-input">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-crimson-red pointer-events-none" />
        <Input
          variant="ghost"
          placeholder={placeholder}
          className="pl-9 pr-8 h-9 text-sm border-none rounded-none focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading...
        </div>
      ) : options.length === 0 ? (
        <p className="text-center py-6 text-sm text-muted-foreground">No Data</p>
      ) : (
        <>
          {/* Select all */}
          <div
            role="button"
            tabIndex={0}
            className="flex items-center gap-2.5 px-3 py-2 border-b border-input hover:bg-accent text-left cursor-pointer"
            onClick={toggleAll}
            onKeyDown={(e) => e.key === "Enter" && toggleAll()}
          >
            <Checkbox
              variant="crimson"
              size="sm"
              checked={allSelected ? true : someSelected ? "indeterminate" : false}
              className="pointer-events-none"
            />
            <span className="text-xs font-medium text-muted-foreground">
              {allSelected ? "Uncheck all" : "Select all"}
              {search && ` (${filtered.length} result)`}
            </span>
          </div>

          {/* List */}
          <ScrollArea className="max-h-50">
            {filtered.length === 0 ? (
              <p className="text-center py-5 text-sm text-muted-foreground">No Data</p>
            ) : (
              filtered.map((option) => {
                const checked = value.includes(option.id);
                return (
                  <div
                    key={option.id}
                    role="button"
                    tabIndex={0}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 hover:bg-accent transition-colors text-left cursor-pointer",
                      checked && "bg-accent/50",
                    )}
                    onClick={() => toggle(option.id)}
                    onKeyDown={(e) => e.key === "Enter" && toggle(option.id)}
                  >
                    <Checkbox
                      variant="crimson"
                      size="sm"
                      checked={checked}
                      className="pointer-events-none"
                    />
                    <span className="text-sm truncate">{option.label}</span>
                  </div>
                );
              })
            )}
          </ScrollArea>
        </>
      )}

      {/* Selected count */}
      {value.length > 0 && (
        <div className="border-t border-input px-3 py-1.5">
          <span className="text-xs text-crimson-red font-medium">Selectd: {value.length}</span>
        </div>
      )}
    </div>
  );
}
