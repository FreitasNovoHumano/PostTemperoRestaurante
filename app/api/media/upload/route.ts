export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { Buffer } from "buffer";
import { getUserSession } from "@/lib/auth";

type SessionUser = {
id: string;
email: string;
};

export async function POST(req: Request) {
try {
const sessionUser = (await getUserSession()) as SessionUser | null;

if (!sessionUser || !sessionUser.email) {
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
  const stream = (cloudinary.uploader.upload_stream as any)(
    { folder: "posttempero/media" },
    (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }
  );

  stream.end(buffer);
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
