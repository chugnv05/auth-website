import { useAuthInit } from "@/features/auth/login/hooks/useAuthInit";

export function AppInitializer() {
  useAuthInit();

  return null;
}
