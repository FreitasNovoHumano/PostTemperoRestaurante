/**
 * 📦 Template Service
 * =====================================================
 *
 * Responsável por:
 * - Criar templates
 * - Listar templates
 * - Buscar templates
 *
 * 📌 Regra importante:
 * O Prisma é a fonte da verdade:
 * - title (frontend) → name (banco)
 */

import { prisma } from "@/lib/prisma";

/**
 * 📦 DTO de criação (entrada do frontend)
 */
interface CreateTemplateDTO {
  title: string;
  content?: string;
}

export const templateService = {
  /**
   * ➕ Cria um novo template
   *
   * 🔄 Faz o mapeamento:
   * - title → name (Prisma)
   */
  /**
 * ➕ Cria um novo template
 */
async create(data: { title: string; content?: string }) {
  const { title, content } = data;

  return prisma.template.create({
    data: {
      /**
       * 🔄 Mapeamento correto
       */
      name: title,

      /**
       * ⚠️ Evita undefined
       */
      content: content ?? "",
    },
  });
},

  /**
   * 📋 Lista todos os templates
   */
  async findAll() {
    return prisma.template.findMany({
      orderBy: {
        createdAt: "desc", // 🕒 mais recentes primeiro
      },
    });
  },

  /**
   * 🔎 Busca template por ID
   */
  async findById(id: string) {
    return prisma.template.findUnique({
      where: { id },
    });
  },
};