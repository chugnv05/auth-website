import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionApi } from "../api/permission.api";
import { PERMISSION_KEYS } from "./usePermissions";

export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permissionApi.create,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: PERMISSION_KEYS.all });
      notify.success(res.data.message ?? MESSAGES.common.addSuccess);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}
