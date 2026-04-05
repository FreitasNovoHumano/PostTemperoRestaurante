/**
 * 📅 API - Calendar
 *
 * Retorna posts de um cliente organizados por data.
 *
 * Endpoint:
 * GET /api/posts/calendar?clientId=ID
 *
 * Uso:
 * - Alimentar o calendário
 * - Planejamento de conteúdo
 */

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  // Validação básica
  if (!clientId) {
    return NextResponse.json(
      { error: "clientId é obrigatório" },
      { status: 400 }
    );
  }

  /**
   * Busca posts do cliente
   */
  const posts = await prisma.post.findMany({
    where: { clientId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(posts);
}