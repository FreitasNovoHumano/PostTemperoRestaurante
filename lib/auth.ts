/**

* 🔐 Autenticação com JWT
*
* Responsável por:
* * Gerar token de autenticação
* * Validar token
* * Obter sessão do usuário
*
* 📌 Usado em:
* * Login
* * Middleware (proteção de rotas)
    */

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Chave secreta (vem do .env)
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**

* Gera um token JWT
* @param user - Dados do usuário
* @returns token JWT
  */
  export function generateToken(user: { id: string; email: string }) {
  return jwt.sign(user, JWT_SECRET, {
  expiresIn: "7d",
  });
  }

/**

* Verifica se o token é válido
* @param token
* @returns dados do usuário ou null
  */
  export function verifyToken(token: string) {
  try {
  return jwt.verify(token, JWT_SECRET);
  } catch {
  return null;
  }
  }

/**

* Obtém a sessão do usuário a partir do cookie
* @returns dados do usuário ou null
  */
  export async function getUserSession() {
  try {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const user = verifyToken(token);

  return user;
  } catch {
  return null;
  }
  }
