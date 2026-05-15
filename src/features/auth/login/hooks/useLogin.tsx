import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";

export default function useLogin() {
  //connect UI voi API
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authApi.login, // thuc hien apiRequest
    onSuccess: (res) => {
      setAuth({
        user: res.data.user,
        accessToken: res.data.accessToken,
      });
    },
  });
}
