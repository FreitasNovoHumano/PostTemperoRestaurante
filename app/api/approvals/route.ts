/**
 * ✅ API - Aprovação de Posts
 *
 * Endpoint:
 * POST /api/approvals
 *
 * Body:
 * {
 *   postId: string,
 *   status: "approved" | "rejected"
 * }
 */

import { approvalService } from "@/services/approval.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, status } = await req.json();

  // Validação
  if (!postId || !status) {
    return NextResponse.json(
      { error: "Dados inválidos" },
      { status: 400 }
    );
  }

  if (status === "approved") {
    const result = await approvalService.approve(postId);
    return NextResponse.json(result);
  }

  if (status === "rejected") {
    const result = await approvalService.reject(postId);
    return NextResponse.json(result);
  }

  return NextResponse.json(
    { error: "Status inválido" },
    { status: 400 }
  );
}