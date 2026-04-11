/**
 * 🌐 API — COMMENTS
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * - POST → criar comentário
 * - GET → listar comentários por post
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { notifyNewComment } from "@/lib/notifications";

await notifyNewComment(session.user.email, content);

/**
 * 📋 GET /api/comments?postId=xxx
 */
export async function GET(req: Request) {
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
     * 🔎 Query params
     */
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    /**
     * ❌ Validação
     */
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
     * 🔎 Busca post
     */
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔒 Segurança
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
     * 📋 Buscar comentários
     */
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });

    /**
     * ✅ Retorno
     */
    return NextResponse.json(comments);

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar comentários" },
      { status: 500 }
    );
  }
}

/**
 * ➕ POST /api/comments
 */
export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content, postId } = body;

    if (!content || !postId) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

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

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    const ownsClient = user.clients.some(
      (c) => c.id === post.clientId
    );

    if (!ownsClient) {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
      },
    });

    return NextResponse.json(comment, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar comentário" },
      { status: 500 }
    );
  }
}