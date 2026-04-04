/**
 * 🖼️ Upload de Imagem (MVP local)
 *
 * Recebe arquivo via FormData
 * Salva em /public/uploads
 * Retorna URL pública
 *
 * ⚠️ Em produção:
 * usar Cloudinary / S3
 */

import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const file: any = data.get("file");

  // Converte para buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Caminho do arquivo
  const filePath = path.join(
    process.cwd(),
    "public/uploads",
    file.name
  );

  // Salva arquivo
  await writeFile(filePath, buffer);

  return NextResponse.json({
    url: `/uploads/${file.name}`,
  });
}