import type { UserFilter } from "@/entities/user";
import { genderData } from "@/shared/config/gender.data";
import { STATUS_CONFIG } from "@/shared/config/status.data";
import type { Gender } from "@/shared/constants/gender";
import type { Status } from "@/shared/constants/status";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Plus, Search, X } from "lucide-react";
import React, { useRef } from "react";

type UserToolbarProps = {
  onSearch: (keyword: string) => void;
  onFilterChange: (filter: Partial<UserFilter>) => void;
  onAdd: () => void;
  filter: UserFilter;
};

const STATUS_OPTIONS = (Object.keys(STATUS_CONFIG) as Status[]).filter((s) => s !== "EXPIRED");

export function UserToolbar({ onSearch, onFilterChange, onAdd, filter }: UserToolbarProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(e.target.value.trim());
    }, 400);
  };

  const hasFilter = filter.gender || filter.status;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-crimson-red pointer-events-none" />
          <Input
            variant="basic"
            placeholder="Search name, email, phone..."
            className="pl-9"
            onChange={handleSearch}
          />
        </div>

        {/* Gender filter */}
        <Select
          value={filter.gender ?? "ALL_GENDER"}
          onValueChange={(v) =>
            onFilterChange({ gender: v === "ALL_GENDER" ? undefined : (v as Gender) })
          }
        >
          <SelectTrigger variant="auth" className="w-36">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL_GENDER">All genders</SelectItem>
            {genderData.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          value={filter.status ?? "ALL_STATUS"}
          onValueChange={(v) =>
            onFilterChange({ status: v === "ALL_STATUS" ? undefined : (v as Status) })
          }
        >
          <SelectTrigger variant="auth" className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL_STATUS">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear filter */}
        {hasFilter && (
          <Button
            variant="ghost"
            size="sm"
            className="text-crimson-red/60 hover:text-crimson-red"
            onClick={() => onFilterChange({ gender: undefined, status: undefined })}
          >
            <X className="size-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <Button variant="panel" size="sm" onClick={onAdd} className="shrink-0">
        <Plus className="size-4" />
        Add
      </Button>
    </div>
  );
}
