/**
 * 📅 API — POSTS CALENDAR
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Retornar os posts de um cliente organizados por dia
 *
 * 🔐 SEGURANÇA:
 * - Valida sessão do usuário
 * - Garante que o client pertence ao usuário
 *
 * 📥 PARAMS (query):
 * - clientId: string
 * - month: string (YYYY-MM)
 *
 * 📤 RESPONSE:
 * {
 *   success: true,
 *   data: {
 *     "2026-04-10": [Post, Post],
 *     "2026-04-11": [Post]
 *   }
 * }
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";
import { Post } from "@prisma/client";

/**
 * 🔹 GET /api/posts/calendar
 */
export async function GET(req: Request) {
  try {
    /**
     * 🔐 1. AUTENTICAÇÃO
     */
    const sessionUser = await getUserSession();

    // Valida se existe sessão e email
    if (!sessionUser?.email) {
      return NextResponse.json(
        { success: false, error: "Sessão inválida" },
        { status: 401 }
      );
    }

    /**
     * 🔎 2. PARAMS DA URL
     */
    const { searchParams } = new URL(req.url);

    const clientId = searchParams.get("clientId");
    const month = searchParams.get("month");

    // Valida presença dos parâmetros
    if (!clientId || !month) {
      return NextResponse.json(
        { success: false, error: "clientId e month são obrigatórios" },
        { status: 400 }
      );
    }

    /**
     * 📅 3. VALIDA FORMATO DO MÊS (YYYY-MM)
     */
    if (!/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json(
        { success: false, error: "Formato inválido (YYYY-MM)" },
        { status: 400 }
      );
    }

    /**
     * 📅 4. EXTRAIR ANO E MÊS
     */
    const [year, monthIndex] = month.split("-").map(Number);

    // Valida mês válido (1-12)
    if (monthIndex < 1 || monthIndex > 12) {
      return NextResponse.json(
        { success: false, error: "Mês inválido" },
        { status: 400 }
      );
    }

    /**
     * 🔐 5. VALIDA SE O CLIENT PERTENCE AO USUÁRIO
     */
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        user: {
          email: sessionUser.email,
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { success: false, error: "Acesso negado" },
        { status: 403 }
      );
    }

    /**
     * 📅 6. DEFINIR RANGE DO MÊS
     */
    const startDate = new Date(year, monthIndex - 1, 1); // início do mês
    const endDate = new Date(year, monthIndex, 1);       // início do próximo mês

    /**
     * 📋 7. BUSCAR POSTS DO PERÍODO
     */
    const posts = await prisma.post.findMany({
      where: {
        clientId,
        scheduledAt: {
          not: null,
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    /**
     * 🧠 8. AGRUPAR POSTS POR DIA
     */
    const grouped: Record<string, Post[]> = {};

    for (const post of posts) {
      // segurança extra
      if (!post.scheduledAt) continue;

      const date = new Date(post.scheduledAt);

      /**
       * 📅 Formato seguro: YYYY-MM-DD (sem bug de timezone)
       */
      const dateKey = date.toLocaleDateString("sv-SE");

      // inicializa array se não existir
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      // adiciona post ao dia
      grouped[dateKey].push(post);
    }

    /**
     * ✅ 9. RESPONSE FINAL
     */
    return NextResponse.json(
      {
        success: true,
        data: grouped,
      },
      { status: 200 }
    );

  } catch (error) {
    /**
     * ❌ 10. ERRO GLOBAL
     */
    console.error("Erro calendar:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar calendário",
      },
      { status: 500 }
    );
  }
}