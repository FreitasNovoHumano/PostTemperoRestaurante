/**
 * 📌 DashboardPage
 * =====================================================
 *
 * 🎯 RESPONSABILIDADE:
 * - Exibir visão geral do sistema
 * - Mostrar métricas básicas
 * - Listar próximos posts
 *
 * ⚠️ IMPORTANTE:
 * - Versão estável (SEM dependência externa)
 * - NÃO usa shadcn (evita erro de build)
 * - Ideal para garantir funcionamento no Vercel
 */

export default function DashboardPage() {
  return (

    /**
     * 📦 Container principal
     */
    <div style={{ padding: 20 }}>

      {/* =========================
          📌 TÍTULO
      ========================= */}
      <h1>Dashboard</h1>

      {/* =========================
          📊 MÉTRICAS
      ========================= */}
      <p>Posts criados essa semana: 12</p>
      <p>Pendentes: 4</p>
      <p>Aprovados: 8</p>

      {/* =========================
          📅 PRÓXIMOS POSTS
      ========================= */}
      <h2>Próximos posts</h2>

      <p>🍔 Promoção de Hambúrguer</p>
      <p>👨‍👩‍👧 Combo Família</p>

      {/* =========================
          ⚡ AÇÕES
      ========================= */}
      <div style={{ marginTop: 20 }}>
        <button>Criar post</button>
        <button style={{ marginLeft: 10 }}>Adicionar cliente</button>
      </div>

    </div>
  )
}