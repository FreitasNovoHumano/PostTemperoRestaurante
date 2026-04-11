/**
 * 💬 Comment Service
 * =====================================================
 * Responsável pela lógica de comentários
 */

import { prisma } from "@/lib/prisma";

export const commentService = {

  /**
   * 📋 Buscar comentários de um post
   */
  async findByPost(postId: string) {
    return prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * ➕ Criar comentário
   */
  async create(data: { content: string; postId: string }) {
    return prisma.comment.create({
      data,
    });
  },
};