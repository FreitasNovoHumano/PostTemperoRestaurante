/**
 * Simulação de banco em memória
 * OBS: será substituído por Prisma depois
 */
let clients: any[] = [];

/**
 * Retorna todos os clientes
 */
export function getClients() {
  return clients;
}

/**
 * Cria um novo cliente
 * @param data Dados do cliente (name, email, etc)
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
 * Atualiza um cliente existente
 * @param id ID do cliente
 * @param data Novos dados
 */
export function updateClient(id: number, data: any) {
  const index = clients.findIndex(c => c.id === id);

  // Se não encontrar o cliente
  if (index === -1) return null;

  // Atualiza mantendo dados antigos + novos
  clients[index] = { ...clients[index], ...data };

  return clients[index];
}

/**
 * Remove um cliente
 * @param id ID do cliente
 */
export function deleteClient(id: number) {
  clients = clients.filter(c => c.id !== id);
}

/**
 * 👥 Client Service
 *
 * Camada responsável por toda lógica relacionada a clientes.
 *
 * 📌 Boa prática:
 * Nunca acessar o Prisma direto nas rotas.
 * Sempre usar services.
 */

import { prisma } from "@/lib/prisma";

export const clientService = {
  /**
   * Cria um novo cliente
   */
  async create(data: { name: string; email?: string }) {
    return prisma.client.create({ data });
  },

  /**
   * Retorna todos os clientes com seus posts
   */
  async findAll() {
    return prisma.client.findMany({
      include: { posts: true },
    });
  },

  /**
   * Busca cliente por ID
   */
  async findById(id: string) {
    return prisma.client.findUnique({
      where: { id },
    });
  },

  /**
   * Atualiza cliente
   */
  async update(id: string, data: any) {
    return prisma.client.update({
      where: { id },
      data,
    });
  },

  /**
   * Remove cliente
   */
  async delete(id: string) {
    return prisma.client.delete({
      where: { id },
    });
  },
};