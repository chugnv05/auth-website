import type { RoleFilter } from "@/entities/role";
import { useQuery } from "@tanstack/react-query";
import { roleApi } from "../api/role.api";

// role list + filter + pagination
export const ROLE_KEYS = {
  all: ["roles"] as const,
  list: (filter?: RoleFilter, page?: number, size?: number) =>
    [...ROLE_KEYS.all, "list", filter, page, size] as const,
  detail: (id: string) => [...ROLE_KEYS.all, "detail", id] as const,
};

export function useRoles(filter?: RoleFilter, page = 1, size = 10) {
  return useQuery({
    queryKey: ROLE_KEYS.list(filter, page, size),
    queryFn: () => roleApi.getList(filter, page, size),
    select: (res) => ({
      data: res.data.data ?? [],
      pagination: res.data.meta?.pagination,
    }),
  });
}
