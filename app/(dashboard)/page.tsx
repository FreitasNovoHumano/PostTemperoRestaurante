"use client";

/**
 * 📊 DASHBOARD PAGE — PostTempero
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Exibir uma visão geral do sistema para o usuário,
 * permitindo rápida tomada de decisão.
 *
 * 🧩 ELEMENTOS:
 * - Cards de resumo (métricas principais)
 * - Lista de próximos posts
 * - Ações rápidas
 * - Layout com menu lateral
 *
 * 📌 DEPENDÊNCIAS:
 * - Layout global (Sidebar)
 */

import Layout from "@/components/layout/Layout";
import { useSession } from "next-auth/react";

/**
 * 🔹 Componente principal do Dashboard
 */
export default function DashboardPage() {
  return (
    <Layout>
      {/* 📊 Título */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* =====================================================
          📊 CARDS DE RESUMO
      ===================================================== */}
      <div className="grid grid-cols-3 gap-4 mb-8">

        {/* 📝 Posts da semana */}
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Posts criados essa semana
          </p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>

        {/* ⏳ Pendentes */}
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Pendentes de aprovação
          </p>
          <h2 className="text-2xl font-bold text-yellow-500">4</h2>
        </div>

        {/* ✅ Aprovados */}
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Posts aprovados
          </p>
          <h2 className="text-2xl font-bold text-green-500">8</h2>
        </div>
      </div>

      {/* =====================================================
          📅 PRÓXIMOS POSTS
      ===================================================== */}
      <div className="bg-white p-4 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Próximos posts
        </h2>

        {/* Lista simples */}
        <div className="space-y-3">

          {/* Item */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded" />
            <div>
              <p className="font-medium">Promoção de Hambúrguer</p>
              <small className="text-gray-500">20/04/2026</small>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded" />
            <div>
              <p className="font-medium">Combo Família</p>
              <small className="text-gray-500">22/04/2026</small>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          ⚡ AÇÕES RÁPIDAS
      ===================================================== */}
      <div className="flex gap-4">

        {/* ➕ Criar post */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Criar post
        </button>

        {/* 👤 Adicionar cliente */}
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Adicionar cliente
        </button>
      </div>
    </Layout>
  );

    /**
   * 🔐 Dados da sessão
   */
  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>

      {/* 👤 Usuário logado */}
      <p>Usuário: {session?.user?.email}</p>
    </div>
  );
}