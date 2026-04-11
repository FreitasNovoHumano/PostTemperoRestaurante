import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * 📋 GET post por ID
 */
export async function GET(_: Request, { params }: any) {

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json(
      { error: "Post não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}