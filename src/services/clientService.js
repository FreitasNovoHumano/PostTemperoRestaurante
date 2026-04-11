import * as clientRepository from '../repositories/clientRepository.js';

// Service responsável por regras antes de salvar
export const createClientService = async (clientData) => {
  
  // Validação simples de regra de negócio
  if (!clientData.name || !clientData.email) {
    throw new Error('Nome e email são obrigatórios');
  }

  // Aqui você poderia validar duplicidade, etc.

  const client = await clientRepository.createClient(clientData);

  return client;
};