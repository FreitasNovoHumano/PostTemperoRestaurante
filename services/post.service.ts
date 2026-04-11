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

  /**
 * 🔁 Duplica um post existente
 */

async duplicate(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) throw new Error("Post não encontrado");

  return prisma.post.create({
    data: {
      title: post.title + " (cópia)",
      content: post.content,
      imageUrl: post.imageUrl,
      clientId: post.clientId,
      status: "draft",
    },
  });
}
};

/**
 * 📝 Post Service
 * =====================================================
 *
 * Responsável pela lógica de posts
 */

import { prisma } from "@/lib/prisma";

export const postService = {

  /**
   * 📋 Listar posts com filtro
   */
  async findAll(status?: string) {
    return prisma.post.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: "desc" },
    });
  },
};