import { MESSAGES } from "@/shared/constants/messages";
import { getErrorMessage } from "@/shared/lib/error";
import { notify } from "@/shared/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import type {
  ForgotPasswordSchemaType,
  ResetPasswordSchemaType,
  VerifyOtpSchemaType,
} from "../schemas/forgot-password.shema";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordSchemaType) => authApi.forgotPassword(data),
    onSuccess: (res) => {
      notify.success(res.data.data ?? MESSAGES.common.sendSuccess);
    },
    onError: (error) => notify.error(getErrorMessage(error)),
  });
}

export function useVerifyOtp(email: string) {
  return useMutation({
    mutationFn: (data: VerifyOtpSchemaType) => authApi.verifyOtp(email, data),
    onSuccess: (res) => {
      notify.success(res.data.data ?? MESSAGES.common.verifySuccess);
    },
    onError: (error) => notify.error(getErrorMessage(error)),
  });
}

export function useResetPassword(email: string) {
  return useMutation({
    mutationFn: (data: ResetPasswordSchemaType) => authApi.resetPassword(email, data),
  });
}
