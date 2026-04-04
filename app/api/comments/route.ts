/**
 * 💬 API de Comentários
 *
 * POST -> criar comentário
 * GET  -> listar comentários por post
 */

import { commentService } from "@/services/comment.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, comment } = await req.json();

  const result = await commentService.create(postId, comment);

  return NextResponse.json(result);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json([], { status: 400 });
  }

  const comments = await commentService.findByPost(postId);

  return NextResponse.json(comments);
}