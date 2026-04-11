"use client";

/**
 * 👥 CLIENTES PAGE (VERSÃO FINAL PROFISSIONAL)
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Listar clientes + criar cliente + upload de logo
 *
 * 🧩 FUNCIONALIDADES:
 * - Listagem com React Query
 * - Criação de cliente
 * - Modal
 * - Upload de imagem
 * - Feedback visual básico
 */

import { useState } from "react";
import Layout from "@/components/layout/layout";
import Upload from "@/components/forms/upload";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 🔹 Tipo do cliente
 */
type Client = {
  id: string;
  name: string;
  logo?: string;
  _count: {
    posts: number;
  };
};

/**
 * 🔹 Buscar clientes
 */
async function fetchClients(): Promise<Client[]> {
  const res = await fetch("/api/clients");

  if (!res.ok) throw new Error("Erro ao buscar clientes");

  return res.json();
}

/**
 * 🔹 Criar cliente
 */
async function createClientAPI(data: { name: string; logo: string }) {
 const res = await fetch("/api/clients", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

  if (!res.ok) throw new Error("Erro ao criar cliente");

  return res.json();
}

export default function ClientesPage() {

  /**
   * 📦 STATES
   */
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  /**
   * 📡 React Query
   */
  const queryClient = useQueryClient();

  const { data: clients, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  /**
   * 🚀 Mutation
   */
  const mutation = useMutation({
    mutationFn: createClientAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });

      // limpa formulário
      setName("");
      setLogo("");
      setOpen(false);
    },
  });

  /**
   * 📤 Criar cliente
   */
  function handleCreate() {
    if (!name) {
      alert("Nome é obrigatório");
      return;
    }

    mutation.mutate({ name, logo });
  }

  return (
    <Layout>

      {/* =====================================================
          🔝 HEADER
      ===================================================== */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Clientes
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Novo cliente
        </button>

      </div>

      {/* =====================================================
          ❌ ERRO
      ===================================================== */}
      {error && (
        <p className="text-red-500">
          Erro ao carregar clientes
        </p>
      )}

      {/* =====================================================
          ⏳ LOADING
      ===================================================== */}
      {isLoading && (
        <p>Carregando...</p>
      )}

      {/* =====================================================
          📋 LISTA
      ===================================================== */}
      <div className="grid grid-cols-3 gap-4">

        {clients?.map((client) => (
          <div
            key={client.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* 🖼️ LOGO */}
            <div className="w-16 h-16 bg-gray-200 rounded mb-3 overflow-hidden">

              {client.logo ? (
                <img
                  src={client.logo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Sem logo
                </div>
              )}

            </div>

            {/* 🏷️ NOME */}
            <h2 className="font-semibold text-lg">
              {client.name}
            </h2>

            {/* 📊 POSTS */}
            <p className="text-sm text-gray-500">
              {client._count.posts} posts
            </p>

            {/* 🔘 AÇÃO */}
            <button className="mt-3 bg-green-600 text-white px-3 py-1 rounded">
              Entrar
            </button>

          </div>
        ))}

      </div>

      {/* =====================================================
          ❌ EMPTY STATE
      ===================================================== */}
      {!isLoading && clients?.length === 0 && (
        <p className="text-gray-500 mt-6">
          Nenhum cliente encontrado.
        </p>
      )}

      {/* =====================================================
          🆕 MODAL
      ===================================================== */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-lg font-bold mb-4">
              Novo cliente
            </h2>

            {/* 📝 INPUT */}
            <input
              placeholder="Nome do restaurante"
              className="border p-2 w-full mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* 🖼️ UPLOAD */}
            <Upload onUpload={setLogo} />

            {/* 🔘 AÇÕES */}
            <div className="flex justify-end gap-2 mt-4">

              <button onClick={() => setOpen(false)}>
                Cancelar
              </button>

              <button
                onClick={handleCreate}
                disabled={mutation.isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {mutation.isPending ? "Salvando..." : "Salvar"}
              </button>

            </div>

          </div>
        </div>
      )}

    </Layout>
  );
}