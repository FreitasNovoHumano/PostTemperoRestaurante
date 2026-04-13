/**
 * 📌 Rota: Duplicar Post
 * --------------------------------------------------
 * Responsável por duplicar um post existente,
 * garantindo que o usuário tenha permissão.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";

/**
 * 🔐 Tipagem do usuário vindo do JWT/session
 * Garantimos que sempre terá email
 */
interface SessionUser {
  email: string;
}

export async function POST(req: Request) {
  try {
    /**
     * 🔑 Recupera o usuário da sessão (JWT)
     */
    const sessionUser = (await getUserSession()) as SessionUser | null;

    /**
     * 🚫 Bloqueia acesso não autenticado
     */
    if (!sessionUser || !sessionUser.email) {
      return NextResponse.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    /**
     * 📥 Extrai dados da requisição
     */
    const { postId } = await req.json();

    /**
     * ⚠️ Validação do input
     */
    if (!postId) {
      return NextResponse.json(
        { success: false, error: "postId é obrigatório" },
        { status: 400 }
      );
    }

    /**
     * 🔎 Busca o usuário no banco com seus clientes
     */
    const user = await prisma.user.findUnique({
      where: { email: sessionUser.email },
      include: { clients: true },
    });

    /**
     * 🚫 Usuário não encontrado
     */
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔎 Busca o post original
     */
    const originalPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    /**
     * 🚫 Post não encontrado
     */
    if (!originalPost) {
      return NextResponse.json(
        { success: false, error: "Post não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔐 Verifica se o usuário tem acesso ao cliente do post
     */
    const ownsClient = user.clients.some(
      (c) => c.id === originalPost.clientId
    );

    if (!ownsClient) {
      return NextResponse.json(
        { success: false, error: "Acesso negado" },
        { status: 403 }
      );
    }

    /**
     * 🧬 Cria a cópia do post
     */
    const duplicatedPost = await prisma.post.create({
      data: {
        title: originalPost.title
          ? `${originalPost.title} (cópia)`
          : null,
        caption: originalPost.caption,
        image: originalPost.image,
        status: "IDEA", // novo status padrão
        scheduledAt: null, // remove agendamento
        clientId: originalPost.clientId,
      },
    });

    /**
     * ✅ Retorno de sucesso
     */
    return NextResponse.json(
      { success: true, data: duplicatedPost },
      { status: 201 }
    );

  } catch (error) {
    /**
     * 🧨 Log de erro para debug
     */
    console.error("Erro duplicate:", error);

    /**
     * ❌ Retorno genérico
     */
    return NextResponse.json(
      { success: false, error: "Erro ao duplicar post" },
      { status: 500 }
    );
  }
}