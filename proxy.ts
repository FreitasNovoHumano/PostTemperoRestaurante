/**
 * 🔐 Proxy (novo middleware do Next.js)
 *
 * Responsável por:
 * - Validar autenticação
 * - Proteger rotas privadas
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./services/auth.service";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const valid = verifyToken(token);

    if (!valid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/posts/:path*", "/clientes/:path*"],
};