"use client";

/**
 * 📝 POSTS PAGE — LISTAGEM
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Listar posts filtrados por cliente
 *
 * 🧩 FUNCIONALIDADES:
 * - Buscar posts da API
 * - Exibir lista com status
 * - Badge colorido por status
 */

import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * 🎨 Função para cor do status
 */
function getStatusColor(status: string) {
  switch (status) {
    case "IDEA":
      return "bg-gray-300";
    case "CREATING":
      return "bg-blue-300";
    case "PENDING":
      return "bg-yellow-300";
    case "APPROVED":
      return "bg-green-300";
    default:
      return "bg-gray-200";
  }
}

/**
 * 🔹 Buscar posts
 */
async function fetchPosts(clientId: string) {
  const res = await fetch(`/api/posts?clientId=${clientId}`);
  return res.json();
}

export default function PostsPage() {

  /**
   * 📦 Estado do cliente selecionado
   */
  const [clientId, setClientId] = useState("");

  /**
   * 📡 Query (só executa se tiver clientId)
   */
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", clientId],
    queryFn: () => fetchPosts(clientId),
    enabled: !!clientId,
  });

  return (
    <Layout>

      {/* =====================================================
          🔝 HEADER
      ===================================================== */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Posts
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo Post
        </button>

      </div>

      {/* =====================================================
          🔍 FILTRO (CLIENTE)
      ===================================================== */}
      <input
        placeholder="Digite o clientId"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* =====================================================
          ⏳ LOADING
      ===================================================== */}
      {isLoading && <p>Carregando posts...</p>}

      {/* =====================================================
          📋 LISTA
      ===================================================== */}
      <div className="space-y-4">

        {posts?.map((post: any) => (
          <div
            key={post.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >

            {/* 📝 INFO */}
            <div>

              <h2 className="font-semibold">
                {post.title || "Sem título"}
              </h2>

              <p className="text-sm text-gray-500">
                {post.caption}
              </p>

            </div>

            {/* 🏷️ STATUS */}
            <span
              className={`px-3 py-1 rounded text-sm ${getStatusColor(post.status)}`}
            >
              {post.status}
            </span>

          </div>
        ))}

      </div>

      {/* =====================================================
          ❌ ESTADO VAZIO
      ===================================================== */}
      {!isLoading && posts?.length === 0 && (
        <p className="text-gray-500 mt-4">
          Nenhum post encontrado.
        </p>
      )}

    </Layout>
  );
}