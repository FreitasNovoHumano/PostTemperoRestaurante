/**
 * 📅 API — REAGENDAR POST (SEGURA)
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {

    /**
     * 🔐 AUTH
     */
    const sessionUser = await getUserSession();

    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    /**
     * 📥 BODY
     */
    const { postId, date } = await req.json();

    if (!postId || !date) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos" },
        { status: 400 }
      );
    }

    /**
     * 🔎 POST
     */
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔄 UPDATE
     */
    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        scheduledAt: new Date(date),
      },
    });

    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro reschedule:", error);

    return NextResponse.json(
      { success: false, error: "Erro interno" },
      { status: 500 }
    );
  }
}