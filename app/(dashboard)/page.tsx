/**
 * 📌 DashboardLayout
 * =====================================================
 *
 * 🎯 RESPONSABILIDADE:
 * - Definir a estrutura visual padrão das páginas do dashboard
 * - Aplicar layout com Sidebar + Header + Conteúdo
 *
 * 🧠 CONCEITO:
 * Esse layout envolve TODAS as páginas dentro de (dashboard)
 * graças ao App Router do Next.js.
 *
 * Exemplo:
 * /dashboard
 * /clients
 * /posts
 *
 * Todas essas páginas herdam este layout automaticamente.
 *
 * 🧩 ESTRUTURA:
 * ┌───────────────────────────────┐
 * │ Sidebar │ Header             │
 * │         ├────────────────────│
 * │         │ Conteúdo (children)│
 * └───────────────────────────────┘
 */

import Sidebar from "@/components/layout/sidebar"

/**
 * 🧱 Componente principal do layout
 *
 * @param children - Conteúdo dinâmico da página atual
 */
export default function DashboardLayout({ children }: any) {
  return (
    <div>
      {children}
    </div>
  )
}

    /**
     * 🧱 Container principal
     *
     * - flex → layout horizontal (sidebar + conteúdo)
     * - min-h-screen → ocupa altura total da tela
     * - bg-gray-100 → fundo suave padrão de dashboards
     */
    <div className="flex min-h-screen bg-gray-100">

      {/* =========================
          📌 SIDEBAR
          =========================
          - Navegação lateral fixa
          - Contém links principais do sistema
      */}
      <Sidebar />

      {/* =========================
          📌 ÁREA PRINCIPAL
          =========================
          - Ocupa todo o espaço restante (flex-1)
          - Contém header + conteúdo da página
      */}
      <div className="flex-1 flex flex-col">

        {/* =========================
            📌 HEADER (TOPO)
            =========================
            - Barra superior do sistema
            - Pode conter:
              - Nome do sistema
              - Usuário logado
              - Ações rápidas
        */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          
          {/* Nome do sistema */}
          <h1 className="font-semibold text-lg">
            🍔 PostTempero
          </h1>

          {/* Info do usuário */}
          <div className="text-sm text-gray-500">
            Bem-vindo, Fábio 👋
          </div>
        </header>

        {/* =========================
            📌 CONTEÚDO DA PÁGINA
            =========================
            - Onde cada rota renderiza seu conteúdo
            - children = page.tsx atual
        */}
        <main className="flex-1 p-6">

          {/* Container centralizado */}
          <div className="max-w-6xl mx-auto">
            {children}
          </div>

        </main>

      </div>
    </div>
  )
}