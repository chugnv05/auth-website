import { queryClient } from "@/shared/api/query-client";
import { Toaster } from "@/shared/ui/Sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
