import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./services/auth.service";

/**
 * Middleware global que intercepta todas as requisições
 * Responsável por validar autenticação do usuário
 */
export function middleware(req: NextRequest) {
  // Recupera o token armazenado nos cookies
  const token = req.cookies.get("token")?.value;

  // Verifica se a rota atual é pública (ex: login)
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");

  
  // Caso não tenha token e não seja rota pública → redireciona
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Caso exista token, valida ele
  if (token) {
    const valid = verifyToken(token);

    // Se inválido → força login novamente
    if (!valid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Se tudo estiver ok, permite seguir
  return NextResponse.next();
}