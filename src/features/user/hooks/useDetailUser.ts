import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { USER_KEYS } from "./useUsers";

export function useUserDetail(id: string | undefined) {
  return useQuery({
    queryKey: USER_KEYS.detail(id!),
    queryFn: () => userApi.getById(id!),
    enabled: !!id,
    select: (res) => res.data.data,
  });
}
