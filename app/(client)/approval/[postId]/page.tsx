"use client";

/**
 * 👥 CLIENTES PAGE (COM BANCO)
 * =====================================================
 *
 * FUNCIONALIDADES:
 * - Listar clientes do banco
 * - Criar cliente
 * - Upload de logo
 * - Atualização automática
 */

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
//import Upload from "@/components/forms/Upload";

/**
 * 🔹 Tipo retornado da API
 */
type Client = {
  id: string;
  name: string;
  logo?: string;
  _count: {
    posts: number;
  };
};

export default function ClientesPage() {

  /**
   * 📦 Estado de clientes
   */
  const [clients, setClients] = useState<Client[]>([]);

  /**
   * 🧠 Controle do modal
   */
  const [open, setOpen] = useState(false);

  /**
   * 📝 Formulário
   */
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  /**
   * 🔄 Carregar clientes do backend
   */
  async function loadClients() {
    const res = await fetch("/api/clientes");
    const data = await res.json();

    setClients(data);
  }

  /**
   * ➕ Criar cliente
   */
  async function createClient() {
    await fetch("/api/clientes", {
      method: "POST",
      body: JSON.stringify({ name, logo }),
    });

    /**
     * Limpa formulário
     */
    setName("");
    setLogo("");
    setOpen(false);

    /**
     * Recarrega lista
     */
    loadClients();
  }

  /**
   * 🚀 Executa ao abrir página
   */
  useEffect(() => {
    loadClients();
  }, []);

  return (
    <Layout>
      {/* 🔝 HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo cliente
        </button>
      </div>

      {/* 📋 LISTA */}
      <div className="grid grid-cols-3 gap-4">

        {clients.map((client) => (
          <div key={client.id} className="bg-white p-4 rounded shadow">

            {/* 🖼️ Logo */}
            <div className="w-16 h-16 bg-gray-200 rounded mb-3 overflow-hidden">
              {client.logo && (
                <img src={client.logo} className="w-full h-full object-cover" />
              )}
            </div>

            {/* 🏷️ Nome */}
            <h2 className="font-semibold">{client.name}</h2>

            {/* 📊 Posts */}
            <p className="text-sm text-gray-500">
              {client._count.posts} posts
            </p>

            {/* 🔘 Entrar */}
            <button className="mt-3 bg-green-600 text-white px-3 py-1 rounded">
              Entrar
            </button>
          </div>
        ))}
      </div>

      {/* 🆕 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-lg font-bold mb-4">
              Novo cliente
            </h2>

            {/* Nome */}
            <input
              placeholder="Nome do restaurante"
              className="border p-2 w-full mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Upload */}
            <Upload onUpload={setLogo} />

            {/* Ações */}
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setOpen(false)}>
                Cancelar
              </button>

              <button
                onClick={createClient}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

"use client";

/**
 * 👥 CLIENTES PAGE — LISTAGEM
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Exibir todos os clientes do usuário logado
 *
 * 🧩 FUNCIONALIDADES:
 * - Buscar clientes da API
 * - Exibir em formato de cards
 * - Mostrar quantidade de posts
 * - Botão para criar cliente
 */

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
"use client";

/**
 * 👥 CLIENTES PAGE (COM REACT QUERY)
 */

import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";

/**
 * 🔹 Função que chama API
 */
async function fetchClients() {
  const res = await fetch("/api/clients");
  return res.json();
}

export default function ClientesPage() {

  /**
   * 📡 useQuery → busca dados
   */
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  return (
    <Layout>

      <h1 className="text-2xl font-bold mb-6">
        Clientes
      </h1>

      {isLoading && <p>Carregando...</p>}

      <div className="grid grid-cols-3 gap-4">

        {clients?.map((client: any) => (
          <div key={client.id} className="bg-white p-4 rounded shadow">

            <h2>{client.name}</h2>

            <p>{client._count.posts} posts</p>

          </div>
        ))}

      </div>

    </Layout>
  );
}

/**
 * 🔹 Tipo do cliente (baseado na API)
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
 * 🔹 Página principal
 */
export default function ClientesPage() {

  /**
   * 📦 Estado da lista
   */
  const [clients, setClients] = useState<Client[]>([]);

  /**
   * ⏳ Estado de loading
   */
  const [loading, setLoading] = useState(true);

  /**
   * 🔄 Buscar clientes
   */
  async function loadClients() {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();

      setClients(data);
    } catch (error) {
      console.error("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  }

  /**
   * 🚀 Executa ao carregar página
   */
  useEffect(() => {
    loadClients();
  }, []);

  return (
    <Layout>

      {/* =====================================================
          🔝 HEADER
      ===================================================== */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Clientes
        </h1>

        {/* ➕ Criar cliente */}
        <button
          onClick={() => alert("Abrir modal")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Novo cliente
        </button>

      </div>

      {/* =====================================================
          ⏳ LOADING
      ===================================================== */}
      {loading && (
        <p>Carregando...</p>
      )}

      {/* =====================================================
          📋 LISTA DE CLIENTES
      ===================================================== */}
      <div className="grid grid-cols-3 gap-4">

        {clients.map((client) => (
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
            <button
              className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
            >
              Entrar
            </button>

          </div>
        ))}

      </div>

      {/* =====================================================
          ❌ ESTADO VAZIO
      ===================================================== */}
      {!loading && clients.length === 0 && (
        <p className="text-gray-500 mt-6">
          Nenhum cliente encontrado.
        </p>
      )}

    </Layout>
  );
}