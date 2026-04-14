/**
 * 🌐 API — UPLOAD DE IMAGEM
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Receber imagem e enviar para Cloudinary
 */

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"; // ✅ import correto

/**
 * ⚙️ Configuração do Cloudinary (server-side)
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    /**
     * ❌ Validação de arquivo
     */
    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não enviado" },
        { status: 400 }
      );
    }

    /**
     * 🔄 Converte para buffer (necessário para stream)
     */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /**
     * ☁️ Upload para Cloudinary via stream
     * ✔️ Compatível com Vercel
     * ✔️ Tipado corretamente
     */
    const upload = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "posttempero",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          if (!result) {
            return reject(new Error("Upload falhou"));
          }

          resolve(result);
        }
      );

      /**
       * 🚀 Envia o buffer para o stream
       */
      stream.end(buffer);
    });

    /**
     * ✅ Retorna URL da imagem
     */
    return NextResponse.json({
      url: upload.secure_url,
    });

  } catch (error) {
    /**
     * 🧠 Log para debug
     */
    console.error("Erro no upload:", error);

    /**
     * ❌ Resposta padrão de erro
     */
    return NextResponse.json(
      { error: "Erro no upload" },
      { status: 500 }
    );
  }
}