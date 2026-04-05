/**
 * 🤖 API - Gerar legenda com IA
 */

import { aiService } from "@/services/ai.service";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt obrigatório" },
      { status: 400 }
    );
  }

  const caption = await aiService.generateCaption(prompt);

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "Especialista em marketing para restaurantes",
      },
      { role: "user", content: prompt },
    ],
  });

  const text = response.choices[0].message.content || "";

  // salva log
  await prisma.aILog.create({
    data: {
      prompt,
      response: text,
    },
  });


  return NextResponse.json({ caption });
}