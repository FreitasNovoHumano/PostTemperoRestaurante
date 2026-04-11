/**
 * 🌐 API — UPLOAD DE IMAGEM
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Receber imagem e enviar para Cloudinary
 */

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

/**
 * 📤 POST /api/upload
 */
export async function POST(req: Request) {
  try {

    /**
     * 📦 Recebe form-data
     */
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não enviado" },
        { status: 400 }
      );
    }

    /**
     * 🔄 Converte para buffer
     */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /**
     * ☁️ Upload para Cloudinary
     */
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "posttempero" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    /**
     * ✅ Retorna URL
     */
    return NextResponse.json({
      url: upload.secure_url,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro no upload" },
      { status: 500 }
    );
  }
}