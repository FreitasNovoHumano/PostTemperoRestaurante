/**
 * 🌐 API — APPROVALS (VERSÃO PROFISSIONAL)
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * - Registrar aprovação
 * - Atualizar status automaticamente
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  notifyPostApproved,
  notifyPostChanges,
} from "@/lib/notifications";

/**
 * ➕ POST /api/approvals
 */
export async function POST(req: Request) {
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
     * 📥 Dados
     */
    const { postId, status } = await req.json();

    if (!postId || !status) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    /**
     * 🚦 Validação
     */
    const allowed = ["APPROVED", "CHANGES_REQUESTED"];

    if (!allowed.includes(status)) {
      return NextResponse.json(
        { error: "Status inválido" },
        { status: 400 }
      );
    }

    /**
     * 🔎 Usuário + clientes
     */
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
     