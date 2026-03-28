import { NextResponse } from "next/server";
import {
  getClients,
  updateClient,
  deleteClient,
} from "@/services/client.service";

import { Client } from "@/types/client.types";

/**
 * Tipo do contexto recebido nas rotas dinâmicas do Next.js
 */
type RouteContext = {
  params: {
    id: string; // ID vem como string na URL
  };
};

/**
 * GET /api/clients/:id
 * Retorna um cliente específico pelo ID
 */
export async function GET(
  _: Request, // Request não utilizado (por isso "_")
  { params }: RouteContext // Tipagem correta do params
) {
  // Busca cliente na lista convertendo id para número
  const client = getClients().find(
    (c: Client) => c.id === Number(params.id)
  );

  // Se não encontrar → retorna erro 404
  if (!client) {
    return NextResponse.json(
      { error: "Cliente não encontrado" },
      { status: 404 }
    );
  }

  // Retorna cliente encontrado
  return NextResponse.json(client);
}

/**
 * PUT /api/clients/:id
 * Atualiza um cliente existente
 */
export async function PUT(
  req: Request, // Request contém o body
  { params }: RouteContext
) {
  // Extrai dados enviados no corpo da requisição
  const body = await req.json();

  // Atualiza cliente pelo ID
  const updated = updateClient(
    Number(params.id), // converte id para number
    body // novos dados
  );

  // Se cliente não existir → erro 404
  if (!updated) {
    return NextResponse.json(
      { error: "Cliente não encontrado" },
      { status: 404 }
    );
  }

  // Retorna cliente atualizado
  return NextResponse.json(updated);
}

/**
 * DELETE /api/clients/:id
 * Remove um cliente pelo ID
 */
export async function DELETE(
  _: Request,
  { params }: RouteContext
) {
  // Remove cliente da lista
  deleteClient(Number(params.id));

  // Retorna sucesso
  return NextResponse.json({
    success: true,
  });
}