/**
 * 🧠 Simulação de banco em memória
 * --------------------------------------------------
 * OBS: usado apenas para testes locais (mock)
 * Será substituído pelo Prisma em produção
 */
let clients: any[] = [];

/**
 * 📋 Retorna todos os clientes (mock)
 */
export function getClients() {
  return clients;
}

/**
 * ➕ Cria um novo cliente (mock)
 */
export function createClient(data: any) {
  const newClient = {
    id: Date.now(), // ID simples baseado em timestamp
    ...data,
  };

  clients.push(newClient);

  return newClient;
}

/**
 * ✏️ Atualiza cliente (mock)
 */
export function updateClient(id: number, data: any) {
  const index = clients.findIndex((c) => c.id === id);

  if (index === -1) return null;

  clients[index] = { ...clients[index], ...data };

  return clients[index];
}

/**
 * ❌ Remove cliente (mock)
 */
export function deleteClient(id: number) {
  clients = clients.filter((c) => c.id !== id);
}

/**
 * =====================================================
 * 👥 Client Service (PRISMA)
 * =====================================================
 *
 * Camada responsável por regras de negócio de clientes
 *
 * 📌 Regra importante:
 * Nunca acessar Prisma direto na rota
 */

import { prisma } from "@/lib/prisma";

/**
 * 📦 Tipagem do input de criação
 */
interface CreateClientDTO {
  name: string;
  email?: string;
  userId: string;
}

export const clientService = {
  /**
   * ➕ Cria um novo cliente vinculado ao usuário
   */
  async create(data: CreateClientDTO) {
    const { name, email, userId } = data;

    return prisma.client.create({
      data: {
        name,
        email,

        /**
         * 🔗 Relacionamento obrigatório com User
         */
        user: {
          connect: { id: userId },
        },
      },
    });
  }, // ✅ CORREÇÃO: vírgula adicionada aqui

  /**
   * 📋 Retorna todos os clientes com contagem de posts
   */
  async findAll() {
    return prisma.client.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  },

  /**
   * 🔎 Busca cliente por ID
   */
  async findById(id: string) {
    return prisma.client.findUnique({
      where: { id },
    });
  },

  /**
   * ✏️ Atualiza cliente
   */
  async update(id: string, data: any) {
    return prisma.client.update({
      where: { id },
      data,
    });
  },

  /**
   * ❌ Remove cliente
   */
  async delete(id: string) {
    return prisma.client.delete({
      where: { id },
    });
  },
};