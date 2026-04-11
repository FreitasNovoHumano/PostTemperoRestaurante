/**
 * 🔐 AUTH HELPER (VERSÃO ESTÁVEL)
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getUserSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  return {
    email: session.user.email,
  };
}