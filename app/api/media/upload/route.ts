/**
 * 🌐 API — MEDIA (UPLOAD + SAVE)
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * - Upload para Cloudinary
 * - Salvar no banco
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
     * 📥 FormData
     */
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo obrigatório" },
        { status: 400 }
      );
    }

    /**
     * 🔎 Buscar usuário
     */
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    /**
     * 🔄 Converter para buffer
     */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /**
     * ☁️ Upload Cloudinary
     */
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "posttempero/media",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    /**
     * 💾 Salvar no banco
     */
    const media = await prisma.media.create({
      data: {
        url: upload.secure_url,
        publicId: upload.public_id,
        userId: user.id,
      },
    });

    /**
     * ✅ Retorno
     */
    return NextResponse.json(media, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro no upload de mídia" },
      { status: 500 }
    );
  }

  /**
 * 📋 GET /api/media
 * Lista mídias do usuário
 */

export async function GET() {
  try {

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const media = await prisma.media.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(media);

  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar mídias" },
      { status: 500 }
    );
  }
}
}