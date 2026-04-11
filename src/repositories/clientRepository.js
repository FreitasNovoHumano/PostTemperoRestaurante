import prisma from '../database/prisma.js';

// Função responsável por criar cliente no banco
export const createClient = async (data) => {
  return await prisma.client.create({
    data,
  });
};