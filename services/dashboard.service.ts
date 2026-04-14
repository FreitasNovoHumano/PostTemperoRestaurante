/**
 * 📊 Dashboard Service (Cliente)
 * =====================================================
 *
 * Responsável por gerar dados do dashboard por cliente
 */

import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client"; // ✅ import do enum

export const dashboardService = {

  /**
   * 📊 Resumo do cliente
   */
  async getClientSummary(clientId: string) {

    /**
     * 🔎 Busca todos os posts do cliente
     */
    const posts = await prisma.post.findMany({
      where: { clientId },
    });

    /**
     * 📊 Cálculos
     */
    const total = posts.length;

    /**
     * 🚦 Status: PENDING (correto via enum)
     */
    const pending = posts.filter(
      (p) => p.status === PostStatus.PENDING
    ).length;

    /**
     * 🚦 Status: APPROVED (corrigido)
     * ❌ antes: "approved"
     * ✅ agora: PostStatus.APPROVED
     */
    const approved = posts.filter(
      (p) => p.status === PostStatus.APPROVED
    ).length;

    /**
     * 📦 Retorno estruturado
     */
    return { total, pending, approved };
  },

  /**
   * 📅 Posts recentes
   */
  async getRecentPosts(clientId: string) {
    return prisma.post.findMany({
      where: { clientId },

      /**
       * 🕒 Ordena pelos mais recentes
       */
      orderBy: { createdAt: "desc" },

      /**
       * 🔢 Limita a 5 resultados
       */
      take: 5,
    });
  }
};