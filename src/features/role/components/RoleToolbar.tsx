import { Button, Input } from "@/shared/ui";
import { Plus, Search } from "lucide-react";
import type React from "react";
import { useRef } from "react";

type RoleToolbarProps = {
  onSearch: (keyword: string) => void;
  onAdd: () => void;
};

export function RoleToolbar({ onSearch, onAdd }: RoleToolbarProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(e.target.value.trim());
    }, 400);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Search */}
      <div className="relative max-w-xs w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-crimson-red pointer-events-none" />
        <Input variant="basic" placeholder="Search..." className="pl-9" onChange={handleChange} />
      </div>

      {/* Add */}
      <Button variant="panel" size="sm" onClick={onAdd} className="shrink-0">
        <Plus className="size-4" />
        Add
      </Button>
    </div>
  );
}
