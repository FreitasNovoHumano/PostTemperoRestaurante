/**
 * 🌐 API — UPDATE STATUS DO POST
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Atualizar o status de um post
 *
 * 🧩 FUNCIONALIDADES:
 * - Validação de dados
 * - Autenticação
 * - Segurança (post pertence ao usuário)
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * 🔄 PATCH /api/posts/status
 */
export async function PATCH(req: Request) {
  try {

    /**
     * 🔐 Sessão do usuário
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
    const body = await req.json();

    const { postId, status } = body;

    /**
     * ❌ Validação
     */
    if (!postId || !status) {
      return NextResponse.json(
        { error: "postId e status são obrigatórios" },
        { status: 400 }
      );
    }

    /**
     * 🔎 Busca usuário com clientes
     */
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        clients: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔎 Busca post com client
     */
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        client: true,
      },
    });

    /**
     * ❌ Post não encontrado
     */
    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔒 Verifica se o cliente do post pertence ao usuário
     */
    const ownsClient = user.clients.some(
      (c) => c.id === post.clientId
    );

    if (!ownsClient) {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    /**
     * 🚦 Validação de status permitido
     */
    const allowedStatus = ["IDEA", "CREATING", "PENDING", "APPROVED"];

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        { error: "Status inválido" },
        { status: 400 }
      );
    }

    /**
     * 🔄 Atualiza status
     */
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        status,
      },
    });

    /**
     * ✅ Retorno
     */
    return NextResponse.json(updatedPost);

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}