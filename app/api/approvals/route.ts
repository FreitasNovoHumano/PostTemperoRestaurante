/**
 * 🌐 API — APPROVALS (VERSÃO PROFISSIONAL)
 */

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  notifyPostApproved,
  notifyPostChanges,
} from "../../../lib/notifications";

/**
 * ➕ POST /api/approvals
 */
export async function POST(req: Request) {
  try {
    /**
     * 🔐 Sessão
     */
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    /**
     * 📥 Dados
     */
    const { postId, status } = await req.json();

    if (!postId || !status) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    /**
     * 🚦 Validação
     */
    const allowed = ["APPROVED", "CHANGES_REQUESTED"];

    if (!allowed.includes(status)) {
      return NextResponse.json(
        { error: "Status inválido" },
        { status: 400 }
      );
    }

    /**
     * 🔎 Usuário
     */
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔎 Post + client
     */
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

    /**
     * 🔐 Segurança (dono do client)
     */
    if (post.client.userId !== user.id) {
      return NextResponse.json(
        { error: "Sem permissão" },
        { status: 403 }
      );
    }

    /**
     * 💾 Salvar aprovação
     */
    await prisma.approval.create({
      data: {
        postId,
        status,
      },
    });

    /**
     * 🔄 Atualizar status do post
     */
    await prisma.post.update({
      where: { id: postId },
      data: {
        status,
      },
    });

    /**
     * 🔔 NOTIFICAÇÕES
     */
    if (status === "APPROVED") {
      await notifyPostApproved(session.user.email);
    }

    if (status === "CHANGES_REQUESTED") {
      await notifyPostChanges(session.user.email);
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("Erro approvals:", error);

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}