/**
 * 📌 API de Registro
 */

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { email, password } = body

  // 👉 validação simples
  if (!email || !password) {
    return NextResponse.json({
      message: "Email e senha obrigatórios",
    })
  }

  // 👉 simulação de cadastro
  return NextResponse.json({
    message: "Usuário cadastrado com sucesso!",
  })
}