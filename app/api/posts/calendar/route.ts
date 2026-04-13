/**

* 📅 API — POSTS CALENDAR
  */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";

/**

* 🔹 Tipo do usuário autenticado
  */
  type SessionUser = {
  id: string;
  email: string;
  };

/**

* 🔹 GET /api/posts/calendar
  */
  export async function GET(req: Request) {
  try {
  /**

  * 🔐 1. AUTENTICAÇÃO
    */
    const sessionUser = (await getUserSession()) as SessionUser | null;

  if (!sessionUser || !sessionUser.email) {
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

  if (!clientId || !month) {
  return NextResponse.json(
  { success: false, error: "clientId e month são obrigatórios" },
  { status: 400 }
  );
  }

  /**

  * 📅 3. VALIDA FORMATO DO MÊS
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

  if (monthIndex < 1 || monthIndex > 12) {
  return NextResponse.json(
  { success: false, error: "Mês inválido" },
  { status: 400 }
  );
  }

  /**

  * 🔐 5. VALIDAR CLIENT DO USUÁRIO
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

  * 📅 6. RANGE DO MÊS
    */
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 1);

  /**

  * 📋 7. BUSCAR POSTS
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

  * 🧠 8. AGRUPAR POR DIA
    */
    const grouped: Record<string, typeof posts> = {};

  for (const post of posts) {
  if (!post.scheduledAt) continue;

  const date = new Date(post.scheduledAt);
  const dateKey = date.toLocaleDateString("sv-SE");

  if (!grouped[dateKey]) {
  grouped[dateKey] = [];
  }

  grouped[dateKey].push(post);
  }

  /**

  * ✅ 9. RESPONSE
    */
    return NextResponse.json(
    {
    success: true,
    data: grouped,
    },
    { status: 200 }
    );

  } catch (error) {
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
