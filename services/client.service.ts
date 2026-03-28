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