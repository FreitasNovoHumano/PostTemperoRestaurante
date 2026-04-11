/**
 * 📅 API — REAGENDAR POST
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {

  const { postId, date } = await req.json();

  if (!postId || !date) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const updated = await prisma.post.update({
    where: { id: postId },
    data: {
      scheduledAt: new Date(date),
    },
  });

  return NextResponse.json(updated);
}