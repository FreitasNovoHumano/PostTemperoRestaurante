"use client";

/**
 * 🏪 CLIENT DASHBOARD PAGE
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Exibir visão completa de um restaurante específico
 *
 * 🧩 ELEMENTOS:
 * - Resumo (métricas)
 * - Posts recentes
 * - Ações rápidas
 */

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";

/**
 * 🔹 Tipos
 */
type Summary = {
  total: number;
  pending: number;
  approved: number;
};

type Post = {
  id: string;
  title: string;
  status: string;
};

/**
 * 🔹 Página principal
 */
export default function ClientDashboard({ params }: any) {

  const { id } = params;

  /**
   * 📦 Estados
   */
  const [summary, setSummary] = useState<Summary | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  /**
   * 🔄 Carregar dados
   */
  async function load() {
    const res = await fetch(`/api/dashboard/${id}`);
    const data = await res.json();

    setSummary(data.summary);
    setPosts(data.posts);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>

      {/* =====================================================
          📊 RESUMO
      ===================================================== */}
      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-white p-4 rounded shadow">
          <p>Posts do mês</p>
          <h2 className="text-xl font-bold">
            {summary?.total}
          </h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Pendentes</p>
          <h2 className="text-xl font-bold text-yellow-500">
            {summary?.pending}
          </h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Aprovados</p>
          <h2 className="text-xl font-bold text-green-500">
            {summary?.approved}
          </h2>
        </div>
      </div>

      {/* =====================================================
          📅 POSTS RECENTES
      ===================================================== */}
      <div className="bg-white p-4 rounded shadow mb-8">

        <h2 className="font-semibold mb-4">
          Posts recentes
        </h2>

        {posts.map((post) => (
          <div key={post.id} className="flex justify-between mb-2">

            <p>{post.title}</p>

            <span className="text-sm text-gray-500">
              {post.status}
            </span>

          </div>
        ))}
      </div>

      {/* =====================================================
          ⚡ AÇÕES RÁPIDAS
      ===================================================== */}
      <div className="flex gap-4">

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Criar post
        </button>

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Ver calendário
        </button>

      </div>

    </Layout>
  );
}