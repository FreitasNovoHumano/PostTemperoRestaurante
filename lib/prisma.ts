/**
 * 📦 Prisma Client (Singleton)
 *
 * Esse arquivo é responsável por criar e gerenciar
 * uma única instância do Prisma Client.
 *
 * ❗ Problema que resolve:
 * No Next.js (modo dev), o servidor reinicia várias vezes,
 * criando múltiplas conexões com o banco.
 *
 * ✅ Solução:
 * Armazenamos a instância no objeto global.
 */

import { PrismaClient } from "@prisma/client";

// Tipagem do objeto global
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Cria ou reutiliza instância existente
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // opcional: mostra queries no console
  });

// Em desenvolvimento, salva no global
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}