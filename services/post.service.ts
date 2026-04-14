/**
 * 📝 Post Service
 * =====================================================
 *
 * Responsável pela lógica de posts
 * (criação, listagem, atualização, exclusão e duplicação)
 *
 * 📌 Regra importante:
 * O schema Prisma é a fonte da verdade:
 * - content ❌ → caption ✅
 * - imageUrl ❌ → image ✅
 */

import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

/**
 * 📦 Tipagem de criação (alinhada com o banco)
 */
interface CreatePostDTO {
  title?: string;
  caption?: string;
  image?: string;
  clientId: string;
}

export const postService = {
  /**
   * ➕ Cria um novo post
   */
  async create(data: CreatePostDTO) {
    const { title, caption, image, clientId } = data;

    return prisma.post.create({
      data: {
        title: title ?? null,
        caption: caption ?? "",
        image,
        clientId,

        /**
         * 🚦 Status inicial padrão
         */
        status: PostStatus.IDEA,
      },
    });
  },

  /**
   * 📋 Lista posts com filtro opcional por status
   */
  async findAll(status?: PostStatus) {
    return prisma.post.findMany({
      where: status ? { status } : {},
      include: {
        client: true, // 🔗 inclui dados do cliente
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  /**
   * 🔎 Busca post por ID
   */
  async findById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: { client: true },
    });
  },

  /**
   * ✏️ Atualiza post
   */
  async update(id: string, data: Partial<CreatePostDTO>) {
    return prisma.post.update({
      where: { id },
      data,
    });
  },

  /**
   * ❌ Deleta post
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

    /**
     * 🚫 Validação
     */
    if (!post) {
      throw new Error("Post não encontrado");
    }

    /**
     * 🧬 Cria cópia do post
     */
    return prisma.post.create({
      data: {
        title: post.title ? `${post.title} (cópia)` : null,

        /**
         * ✅ Campos corretos do schema
         */
        caption: post.caption,
        image: post.image,

        clientId: post.clientId,

        /**
         * 🚦 Novo post começa como IDEA
         */
        status: PostStatus.IDEA,
      },
    });
  },
};