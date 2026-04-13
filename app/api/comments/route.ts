/**

* 🌐 API — COMMENTS (VERSÃO SÊNIOR)
  */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";
import { notifyNewComment } from "@/lib/notifications";

/**

* 🔹 Tipo esperado do usuário autenticado
  */
  type SessionUser = {
  id: string;
  email: string;
  };

/**

* 📋 GET /api/comments?postId=xxx
  */
  export async function GET(req: Request) {
  try {
  const sessionUser = (await getUserSession()) as SessionUser | null;

  if (!sessionUser) {
  return NextResponse.json(
  { success: false, error: "Não autorizado" },
  { status: 401 }
  );
  }

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

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

  const post = await prisma.post.findUnique({
  where: { id: postId },
  });

  if (!post) {
  return NextResponse.json(
  { success: false, error: "Post não encontrado" },
  { status: 404 }
  );
  }

 const ownsClient = user.clients.some(
  (client: { id: string }) => client.id === post.clientId
);

  if (!ownsClient) {
  return NextResponse.json(
  { success: false, error: "Acesso negado" },
  { status: 403 }
  );
  }

  const comments = await prisma.comment.findMany({
  where: { postId },
  orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
  { success: true, data: comments },
  { status: 200 }
  );

} catch (error) {
console.error("Erro GET comments:", error);
return NextResponse.json(
  { success: false, error: "Erro ao buscar comentários" },
  { status: 500 }
);

}
}

/**

* ➕ POST /api/comments
  */
  export async function POST(req: Request) {
  try {
  const sessionUser = (await getUserSession()) as SessionUser | null;

  if (!sessionUser) {
  return NextResponse.json(
  { success: false, error: "Não autorizado" },
  { status: 401 }
  );
  }

  const body = await req.json();

  const { content, postId } = body as {
  content?: string;
  postId?: string;
  };

  if (!content || !postId) {
  return NextResponse.json(
  { success: false, error: "Dados inválidos" },
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

  const post = await prisma.post.findUnique({
  where: { id: postId },
  });

  if (!post) {
  return NextResponse.json(
  { success: false, error: "Post não encontrado" },
  { status: 404 }
  );
  }

const ownsClient = user.clients.some(
  (client: { id: string }) => client.id === post.clientId
);

  if (!ownsClient) {
  return NextResponse.json(
  { success: false, error: "Acesso negado" },
  { status: 403 }
  );
  }

  const comment = await prisma.comment.create({
  data: {
  content,
  postId,
  },
  });

  await notifyNewComment(sessionUser.email, content);

  return NextResponse.json(
  { success: true, data: comment },
  { status: 201 }
  );

} catch (error) {
console.error("Erro POST comments:", error);

return NextResponse.json(
  { success: false, error: "Erro ao criar comentário" },
  { status: 500 }
);
}
}