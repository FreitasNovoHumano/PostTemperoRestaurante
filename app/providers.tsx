"use client";

/**
 * 🌐 GLOBAL PROVIDERS
 * =====================================================
 * - NextAuth
 * - React Query
 */

import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

/**
 * 🔹 Cria instância do client
 */
const queryClient = new QueryClient();

/**
 * 🔹 Wrapper global
 */
export default function Providers({ children }: any) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}