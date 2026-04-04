/**
 * 📝 Post Service
 *
 * Responsável pela lógica dos posts
 * (criação, listagem, atualização e exclusão)
 */

import { prisma } from "@/lib/prisma";

export const postService = {
  /**
   * Cria um novo post
   */
  async create(data: {
    title: string;
    content: string;
    imageUrl?: string;
    clientId: string;
  }) {
    return prisma.post.create({ data });
  },

  /**
   * Lista todos os posts com cliente
   */
  async findAll() {
    return prisma.post.findMany({
      include: { client: true },
    });
  },

  /**
   * Atualiza post
   */
  async update(id: string, data: any) {
    return prisma.post.update({
      where: { id },
      data,
    });
  },

  /**
   * Deleta post
   */
  async delete(id: string) {
    return prisma.post.delete({
      where: { id },
    });
  },
};