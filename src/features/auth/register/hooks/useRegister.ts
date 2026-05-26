import { PATHS } from "@/app/router/paths";
import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import type { RegisterSchemaType } from "../schemas/register.schema";

export default function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterSchemaType) => authApi.register(data),
    onSuccess: (res) => {
      notify.success(res.data.message ?? MESSAGES.auth.registerSuccess);
      navigate(PATHS.LOGIN);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
}
