/**
 * 🤖 API - Gerar legenda com IA
 */

import { aiService } from "@/services/ai.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt obrigatório" },
      { status: 400 }
    );
  }

  const caption = await aiService.generateCaption(prompt);

  return NextResponse.json({ caption });
}