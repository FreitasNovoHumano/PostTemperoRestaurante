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
import { Toaster } from "react-hot-toast";
<Toaster />

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

{posts?.length === 0 && (
  <div className="text-center py-10">

    <p className="text-gray-500 mb-4">
      Nenhum post ainda
    </p>

    <button className="bg-blue-600 text-white px-4 py-2 rounded">
      Criar primeiro post
    </button>

  </div>
)}