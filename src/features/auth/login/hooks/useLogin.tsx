import { tokenStorage } from "@/features/session/token-storage";
import { ApiError } from "@/shared/types/api-response.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "../../../session/stores/auth.store";
import { authService } from "../services/auth.service";

function getErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<ApiError>;
  return (
    axiosError.response?.data?.message ||
    axiosError.response?.data?.error ||
    axiosError.message ||
    "Login failed. Please verify your credentials."
  );
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (result) => {
      tokenStorage.setTokens(result.tokens);
      tokenStorage.setUser(result.user);
      setAuth(result.user);
      toast.success("Signed in successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
