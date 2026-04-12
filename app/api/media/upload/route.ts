export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { Buffer } from "buffer";
import { getUserSession } from "@/lib/auth";

/**
 * 📤 POST — Upload
 */
export async function POST(req: Request) {
  try {
    const sessionUser = await getUserSession();

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: sessionUser.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "posttempero/media" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const media = await prisma.media.create({
      data: {
        url: upload.secure_url,
        publicId: upload.public_id,
        userId: user.id,
      },
    });

    return NextResponse.json(media, { status: 201 });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { error: "Erro no upload de mídia" },
      { status: 500 }
    );
  }
}