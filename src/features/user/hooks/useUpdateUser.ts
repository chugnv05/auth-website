import type { User, UserUpdateByIdRequest } from "@/entities/user";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import type { UpdateMeSchemaType } from "../schemas/update.schema";
import { USER_KEYS } from "./useUsers";

export function useUpdateMe() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: (data: UpdateMeSchemaType) => userApi.updateMe(data),
    onSuccess: (res) => {
      const updated = res.data.data;
      if (updated && accessToken) {
        setAuth({ user: { ...user, ...updated } as User, accessToken });
      }
      notify.success(res.data.message ?? MESSAGES.common.updateSuccess);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}

export function useUpdateUserById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdateByIdRequest }) =>
      userApi.updateById(id, data),
    onSuccess: (res, { id }) => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
      queryClient.invalidateQueries({ queryKey: USER_KEYS.detail(id) });
      notify.success(res.data.message ?? MESSAGES.common.updateSuccess);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}
