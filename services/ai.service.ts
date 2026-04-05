/**
 * 🤖 AI Service (OpenAI)
 *
 * Gera legendas automaticamente
 */

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiService = {
  async generateCaption(prompt: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em marketing para restaurantes. Gere legendas envolventes para redes sociais.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  },
};