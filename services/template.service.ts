/**
 * 📦 Template Service
 *
 * Responsável por:
 * - Criar templates
 * - Listar templates
 * - Reutilizar conteúdo
 */

import { prisma } from "@/lib/prisma";

export const templateService = {
  /**
   * Cria um novo template
   */
  async create(data: { title: string; content: string }) {
    return prisma.template.create({ data });
  },

  /**
   * Lista todos os templates
   */
  async findAll() {
    return prisma.template.findMany();
  },

  /**
   * Busca template por ID
   */
  async findById(id: string) {
    return prisma.template.findUnique({
      where: { id },
    });
  },
};