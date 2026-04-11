/**
 * 📦 PADRÃO DE RESPOSTA API
 */

import { NextResponse } from "next/server";

/**
 * ✅ Sucesso
 */
export function success(data: any, status = 200) {
  return NextResponse.json({
    success: true,
    data,
  }, { status });

  return NextResponse.json({ error: "Erro" }, { status: 400 });
  
}


/**
 * ❌ Erro
 */
export function error(message: string, status = 400) {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status });
}