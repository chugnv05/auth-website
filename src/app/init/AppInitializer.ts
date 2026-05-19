import { useAuthInit } from "@/features/auth/hooks/useAuthInit";

export function AppInitializer() {
  useAuthInit();

  return null;
}
