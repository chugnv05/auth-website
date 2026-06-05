import type { UserFilter } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const USER_KEYS = {
  all: ["users"] as const,
  list: (filter?: UserFilter, page?: number, size?: number) =>
    [...USER_KEYS.all, "list", filter, page, size] as const,
  detail: (id: string) => [...USER_KEYS.all, "detail", id] as const,
};

export function useUsers(filter?: UserFilter, page = 1, size = 10) {
  return useQuery({
    queryKey: USER_KEYS.list(filter, page, size),
    queryFn: () => userApi.getList(filter, page, size),
    select: (res) => ({
      data: res.data.data ?? [],
      pagination: res.data.meta?.pagination,
    }),
  });
}
