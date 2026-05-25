import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";
import type { LoginSchemaType } from "../schemas/login.schema";

export default function useLogin() {
  //connect UI voi API
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    // thuc hien apiRequest
    mutationFn: ({ email, password }: LoginSchemaType) => authApi.login({ email, password }),
    onSuccess: (res) => {
      const user = res.data.data;
      const accessToken = res.data.meta?.tokenInfo?.accessToken;

      if (!user || !accessToken) {
        notify.error(MESSAGES.common.errorGeneric);
        return;
      }

      setAuth({ user, accessToken });
      notify.success(res.data.message ?? MESSAGES.auth.loginSuccess);
    },

    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}
