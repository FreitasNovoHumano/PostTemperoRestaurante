/**
 * 🤖 API - Gerar legenda com IA
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { prompt } = await req.json();

  /**
   * 🔹 Simulação (substituir por OpenAI depois)
   */
  const caption = `🔥 Promoção especial! ${prompt}`;

  return NextResponse.json({ caption });
}