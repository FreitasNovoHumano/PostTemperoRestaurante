import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/services/auth.service";

/**
 * Endpoint de login
 * Método: POST
 * Recebe email e senha e retorna um cookie com JWT
 */
export async function POST(req: Request) {
  // Extrai dados do body da requisição
  const { email, password } = await req.json();

  /**
   * MOCK de usuário (temporário)
   * Futuramente será substituído pelo banco de dados (Prisma)
   */
  const user = {
    id: 1,
    email: "admin@email.com",
    password: await bcrypt.hash("123456", 10),
  };

  // Compara senha digitada com senha armazenada
  const isValid = await bcrypt.compare(password, user.password);

  // Caso senha inválida → retorna erro 401 (não autorizado)
  if (!isValid) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  // Gera token JWT com dados do usuário
  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  // Cria resposta e adiciona cookie com token
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: true, // impede acesso via JS (segurança)
    path: "/", // disponível em toda aplicação
  });

  return response;
}