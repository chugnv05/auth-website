import { useAuthInit } from "@/features/hooks/useAuthInit";

export function AppInitializer() {
  useAuthInit();

  return null;
}
