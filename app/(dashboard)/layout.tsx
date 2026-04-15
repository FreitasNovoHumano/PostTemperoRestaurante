/**
 * 📌 DashboardLayout
 * =====================================================
 *
 * 🎯 RESPONSABILIDADE:
 * - Definir estrutura padrão do dashboard
 * - Renderizar Sidebar + Conteúdo
 *
 * 🧠 OBS:
 * - children = conteúdo da página atual
 * - aplicado automaticamente pelo Next.js
 */

import Sidebar from "@/components/layout/sidebar"

/**
 * 🧱 Layout principal
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (

    /**
     * Layout em linha (sidebar + conteúdo)
     */
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo */}
      <main style={{ padding: 20 }}>
        {children}
      </main>

    </div>
  )
}