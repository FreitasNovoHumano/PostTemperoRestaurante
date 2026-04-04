/**
 * 💬 Comment Service
 *
 * Gerencia comentários dos posts
 */

import { prisma } from "@/lib/prisma";

export const commentService = {
  async create(postId: string, comment: string) {
    return prisma.postComment.create({
      data: {
        postId,
        comment,
      },
    });
  },

  async findByPost(postId: string) {
    return prisma.postComment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });
  },
};