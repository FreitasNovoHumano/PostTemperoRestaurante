/**
 * ✅ Approval Service
 *
 * Controla aprovação/rejeição de posts
 */

import { prisma } from "@/lib/prisma";

export const approvalService = {
  async approve(postId: string, feedback?: string) {
    return prisma.post.update({
      where: { id: postId },
      data: {
        status: "published",
      },
    });
  },

  async reject(postId: string, feedback?: string) {
    return prisma.post.update({
      where: { id: postId },
      data: {
        status: "draft",
      },
    });
  },
};