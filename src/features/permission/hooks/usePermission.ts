import type { PermissionFilter } from "@/entities/permission";
import { useQuery } from "@tanstack/react-query";
import { permissionApi } from "../api/permission.api";

// role list + filter + pagination
export const PERMISSION_KEYS = {
  all: ["permissions"] as const,
  list: (filter?: PermissionFilter, page?: number, size?: number) =>
    [...PERMISSION_KEYS.all, "list", filter, page, size] as const,
  detail: (id: string) => [...PERMISSION_KEYS.all, "detail", id] as const,
};

export function usePermissions(filter?: PermissionFilter, page = 1, size = 10) {
  return useQuery({
    queryKey: PERMISSION_KEYS.list(filter, page, size),
    queryFn: () => permissionApi.getList(filter, page, size),
    select: (res) => ({
      data: res.data.data ?? [],
      pagination: res.data.meta?.pagination,
    }),
  });
}
