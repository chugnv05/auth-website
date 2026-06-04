import type { RoleFilter } from "@/entities/role";
import { permissionApi } from "@/features/permission/api/permission.api";
import { useQuery } from "@tanstack/react-query";
import { roleApi } from "../api/role.api";

// role list + filter + pagination
export const ROLE_KEYS = {
  all: ["roles"] as const,
  list: (filter?: RoleFilter, page?: number, size?: number) =>
    [...ROLE_KEYS.all, "list", filter, page, size] as const,
  detail: (id: string) => [...ROLE_KEYS.all, "detail", id] as const,
  limit: (filter?: RoleFilter, limit?: number) =>
    [...ROLE_KEYS.all, "limit", filter, limit] as const,
  byPermission: (permissionId: string) => [...ROLE_KEYS.all, "byPermission", permissionId] as const,
};

// list + page
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

// MultiSelectPicker
export function useRolesLimit(filter?: RoleFilter, limit = 100) {
  return useQuery({
    queryKey: ROLE_KEYS.limit(filter, limit),
    queryFn: () => roleApi.getLimit(filter, limit),
    select: (res) => (res.data.data ?? []).map((r) => ({ id: r.id, label: r.name })),
    staleTime: 5 * 60 * 1000,
  });
}

// Edit permission - load role dang duoc gang cho permission do
export function useRolesByPermission(permissionId: string | undefined) {
  return useQuery({
    queryKey: ROLE_KEYS.byPermission(permissionId!),
    queryFn: () => permissionApi.getRolesByPermission(permissionId!),
    enabled: !!permissionId,
    select: (res) => (res.data.data ?? []).map((r) => r.id).join(","),
    staleTime: 5 * 60 * 1000,
  });
}
