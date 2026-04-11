/**
 * 📊 Dashboard Service (Cliente)
 * =====================================================
 *
 * Responsável por gerar dados do dashboard por cliente
 */

import { prisma } from "@/lib/prisma";

export const dashboardService = {

  /**
   * 📊 Resumo do cliente
   */
  async getClientSummary(clientId: string) {

    const posts = await prisma.post.findMany({
      where: { clientId },
    });

    /**
     * 📊 Cálculos
     */
    const total = posts.length;
    const pending = posts.filter(p => p.status === "pending").length;
    const approved = posts.filter(p => p.status === "approved").length;

    return { total, pending, approved };
  },

  /**
   * 📅 Posts recentes
   */
  async getRecentPosts(clientId: string) {
    return prisma.post.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  }
};