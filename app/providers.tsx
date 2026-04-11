"use client";

/**
 * 🌐 GLOBAL PROVIDERS
 */

import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

/**
 * 🔹 Wrapper global
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // 🔥 Evita recriar o client a cada render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}

        {/* 🔔 Toast global */}
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
}