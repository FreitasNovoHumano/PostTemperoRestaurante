/**
 * ✅ Approval Service
 *
 * Responsável por:
 * - Aprovar post
 * - Rejeitar post
 *
 * Regra de negócio:
 * - Approved → vira "published"
 * - Rejected → volta para "draft"
 */

import { prisma } from "@/lib/prisma";

export const approvalService = {
  /**
   * Aprova um post
   */
  async approve(postId: string) {
    return prisma.post.update({
      where: { id: postId },
      data: { status: "APPROVED" },
    });
  },

  /**
   * Rejeita um post
   */
  async reject(postId: string) {
    return prisma.post.update({
      where: { id: postId },
      data: { status: "IDEA" },
    });
  },
};