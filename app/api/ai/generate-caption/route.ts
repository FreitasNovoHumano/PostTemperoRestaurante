/**
 * 🤖 API — GERAR LEGENDA
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Gerar legenda com IA
 */

import { NextResponse } from "next/server";
import OpenAI from "openai";

/**
 * 🔐 Cliente OpenAI
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * ➕ POST /api/ai/caption
 */
export async function POST(req: Request) {
  try {

    /**
     * 📥 Dados
     */
    const { theme, tone } = await req.json();

    if (!theme) {
      return NextResponse.json(
        { error: "Tema é obrigatório" },
        { status: 400 }
      );
    }

    /**
     * 🤖 Prompt
     */
    const prompt = `
    Crie uma legenda para Instagram.

    Tema: ${theme}
    Tom: ${tone || "engajador"}

    Regras:
    - Curta
    - Com emojis
    - Focada em engajamento
    - Inclua CTA
    `;

    /**
     * 🤖 Chamada OpenAI
     */
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    /**
     * ✨ Resultado
     */
    const caption = response.choices[0].message.content;

    return NextResponse.json({ caption });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao gerar legenda" },
      { status: 500 }
    );
  }
}