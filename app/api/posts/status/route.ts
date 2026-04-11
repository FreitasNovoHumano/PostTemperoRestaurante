/**
 * 🌐 API — UPDATE STATUS DO POST (VERSÃO SÊNIOR)
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Atualizar o status de um post com segurança e padrão profissional
 *
 * 🧩 FUNCIONALIDADES:
 * - Autenticação centralizada
 * - Validação forte de dados
 * - Segurança multi-tenant
 * - Tipagem segura
 * - Resposta padronizada
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";

/**
 * 🚦 Tipagem de status
 */
type PostStatus = "IDEA" | "CREATING" | "PENDING" | "APPROVED";

/**
 * 🔄 PATCH /api/posts/status
 */
export async function PATCH(req: Request) {
  try {

    /**
     * 🔐 1. AUTENTICAÇÃO (PADRÃO)
     */
    const sessionUser = await getUserSession();

    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    /**
     * 📥 2. BODY
     */
    const body = await req.json();

    const { postId, status } = body as {
      postId?: string;
      status?: PostStatus;
    };

    /**
     * ❌ 3. VALIDAÇÃO
     */
    if (!postId || !status) {
      return NextResponse.json(
        { success: false, error: "postId e status são obrigatórios" },
        { status: 400 }
      );
    }

    /**
     * 🚦 4. VALIDAR STATUS
     */
    const allowedStatus: PostStatus[] = [
      "IDEA",
      "CREATING",
      "PENDING",
      "APPROVED",
    ];

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Status inválido" },
        { status: 400 }
      );
    }

    /**
     * 🔎 5. BUSCAR USUÁRIO + CLIENTES
     */
    const user = await prisma.user.findUnique({
      where: { email: sessionUser.email },
      include: { clients: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔎 6. BUSCAR POST
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
     * 🔒 7. SEGURANÇA (MULTI-TENANT)
     */
    const ownsClient = user.clients.some(
      (client) => client.id === post.clientId
    );

    if (!ownsClient) {
      return NextResponse.json(
        { success: false, error: "Acesso negado" },
        { status: 403 }
      );
    }

    /**
     * 🔄 8. ATUALIZAÇÃO
     */
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { status },
    });

    /**
     * ✅ 9. RESPOSTA PADRÃO
     */
    return NextResponse.json(
      {
        success: true,
        data: updatedPost,
      },
      { status: 200 }
    );

  } catch (error) {

    /**
     * 🧠 LOG (DEBUG)
     */
    console.error("Erro ao atualizar status:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}