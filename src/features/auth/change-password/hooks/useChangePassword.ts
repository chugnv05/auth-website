import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import type { ChangePasswordSchemaType } from "../schemas/change-password.shema";

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordSchemaType) => authApi.changePassword(data),
    onSuccess: (res) => {
      notify.success(res.data.message ?? MESSAGES.common.changeSuccess);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}
