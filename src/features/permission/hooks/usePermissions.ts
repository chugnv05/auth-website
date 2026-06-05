import type { PermissionFilter } from "@/entities/permission";
import { roleApi } from "@/features/role/api/role.api";
import { useQuery } from "@tanstack/react-query";
import { permissionApi } from "../api/permission.api";

// role list + filter + pagination
export const PERMISSION_KEYS = {
  all: ["permissions"] as const,
  list: (filter?: PermissionFilter, page?: number, size?: number) =>
    [...PERMISSION_KEYS.all, "list", filter, page, size] as const,
  detail: (id: string) => [...PERMISSION_KEYS.all, "detail", id] as const,
  limit: (filter?: PermissionFilter, limit?: number) =>
    [...PERMISSION_KEYS.all, "limit", filter, limit] as const,
  byRole: (roleId: string) => [...PERMISSION_KEYS.all, "byRole", roleId] as const,
};

// List + page
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

// MultiSelectPicker
export function usePermissionsLimit(filter?: PermissionFilter, limit = 100) {
  return useQuery({
    queryKey: PERMISSION_KEYS.limit(filter, limit),
    queryFn: () => permissionApi.getLimit(filter, limit),
    select: (res) => (res.data.data ?? []).map((p) => ({ id: p.id, label: p.name })),
    staleTime: 5 * 60 * 1000,
  });
}

// Edit permission - load roles dang duoc gan cho permission do
export function usePermissionsByRole(roleId: string | undefined) {
  return useQuery({
    queryKey: PERMISSION_KEYS.byRole(roleId!),
    queryFn: () => roleApi.getPermissionsByRole(roleId!),
    enabled: !!roleId,
    select: (res) => (res.data.data ?? []).map((p) => p.id),
    staleTime: 5 * 60 * 1000, // 5 phut
  });
}
