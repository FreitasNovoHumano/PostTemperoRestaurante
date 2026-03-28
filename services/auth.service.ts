import jwt from "jsonwebtoken";

// Chave secreta usada para assinar e validar o token JWT
// Vem do arquivo .env (boa prática de segurança)
const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Gera um token JWT com base no payload informado
 * @param payload Dados do usuário (id, email, etc)
 * @returns Token JWT assinado
 */
export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token expira em 7 dias
  });
}

/**
 * Verifica se um token JWT é válido
 * @param token Token recebido (geralmente via cookie)
 * @returns Payload decodificado ou null se inválido
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    // Caso o token seja inválido ou expirado
    return null;
  }
}