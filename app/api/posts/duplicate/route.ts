/**
 * 🌐 API — DUPLICAR POST
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Criar uma cópia de um post existente
 *
 * 🧩 REGRAS:
 * - Mesmo conteúdo (title, caption, image)
 * - Novo ID
 * - Status volta para IDEA
 * - Novo createdAt
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * 🔁 POST /api/posts/duplicate
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
     * 📥 Body
     */
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: "postId é obrigatório" },
        { status: 400 }
      );
    }

    /**
     * 🔎 Busca usuário + clientes
     */
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clients: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔎 Busca post original
     */
    const originalPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!originalPost) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔒 Segurança: verificar se pertence ao usuário
     */
    const ownsClient = user.clients.some(
      (c) => c.id === originalPost.clientId
    );

    if (!ownsClient) {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    /**
     * 🔁 Cria cópia
     */
    const duplicatedPost = await prisma.post.create({
      data: {
        title: originalPost.title
          ? `${originalPost.title} (cópia)`
          : null,

        caption: originalPost.caption,
        image: originalPost.image,

        /**
         * 🚦 Reset de status (boa prática)
         */
        status: "IDEA",

        /**
         * ❌ Não copia agendamento
         */
        scheduledAt: null,

        /**
         * 🔗 Mantém cliente
         */
        clientId: originalPost.clientId,
      },
    });

    /**
     * ✅ Retorno
     */
    return NextResponse.json(duplicatedPost);

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao duplicar post" },
      { status: 500 }
    );
  }
}