/**
 * ✅ API de Aprovação
 *
 * POST /api/approvals
 */

import { approvalService } from "@/services/approval.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, status, feedback } = await req.json();

  if (!postId || !status) {
    return NextResponse.json(
      { error: "Dados inválidos" },
      { status: 400 }
    );
  }

  if (status === "approved") {
    const result = await approvalService.approve(postId, feedback);
    return NextResponse.json(result);
  }

  if (status === "rejected") {
    const result = await approvalService.reject(postId, feedback);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Status inválido" }, { status: 400 });
}