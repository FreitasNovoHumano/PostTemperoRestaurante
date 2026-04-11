import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {

    const sessionUser = await getUserSession();

    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "postId é obrigatório" },
        { status: 400 }
      );
    }

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

    const originalPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!originalPost) {
      return NextResponse.json(
        { success: false, error: "Post não encontrado" },
        { status: 404 }
      );
    }

    const ownsClient = user.clients.some(
      (c) => c.id === originalPost.clientId
    );

    if (!ownsClient) {
      return NextResponse.json(
        { success: false, error: "Acesso negado" },
        { status: 403 }
      );
    }

    const duplicatedPost = await prisma.post.create({
      data: {
        title: originalPost.title
          ? `${originalPost.title} (cópia)`
          : null,
        caption: originalPost.caption,
        image: originalPost.image,
        status: "IDEA",
        scheduledAt: null,
        clientId: originalPost.clientId,
      },
    });

    return NextResponse.json(
      { success: true, data: duplicatedPost },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erro duplicate:", error);

    return NextResponse.json(
      { success: false, error: "Erro ao duplicar post" },
      { status: 500 }
    );
  }
}