/**
 * 📅 API — REAGENDAR POST (CORRIGIDA)
 */

import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserSession } from "../../../../../lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await getUserSession();

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const postId = params.id;
    const { date } = await req.json();

    if (!postId || !date) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        client: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    // 🔐 valida dono via client
    const user = await prisma.user.findUnique({
      where: { email: sessionUser.email },
    });

    if (!user || post.client.userId !== user.id) {
      return NextResponse.json(
        { error: "Sem permissão" },
        { status: 403 }
      );
    }

    const newDate = new Date(date);

    if (isNaN(newDate.getTime())) {
      return NextResponse.json(
        { error: "Data inválida" },
        { status: 400 }
      );
    }

    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        scheduledAt: newDate,
      },
    });

    return NextResponse.json({ data: updated });

  } catch (error) {
    console.error("Erro reschedule:", error);

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}