import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { USER_KEYS } from "./useUsers";

export function useSoftDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.softDelete,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
      notify.success(res.data.message ?? MESSAGES.common.removeSuccess);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.delete,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
      notify.success(res.data.message ?? MESSAGES.common.deleteSuccess);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}
