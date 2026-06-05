import { ROLE_KEYS } from "@/features/role";
import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionApi } from "../api/permission.api";
import { PERMISSION_KEYS } from "./usePermissions";
export function useUpdatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof permissionApi.update>[1] }) =>
      permissionApi.update(id, data),
    onSuccess: (res, { id }) => {
      queryClient.invalidateQueries({ queryKey: PERMISSION_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PERMISSION_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.byPermission(id) });
      notify.success(res.data.message ?? MESSAGES.common.updateSuccess);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}
