import { QueryClient as TanStackQueryClient } from "@tanstack/react-query";

export const queryClient = new TanStackQueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
