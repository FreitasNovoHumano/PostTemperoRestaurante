/**
 * 📌 DashboardPage
 * =====================================================
 *
 * 🎯 RESPONSABILIDADE:
 * - Exibir visão geral do sistema
 * - Mostrar métricas principais
 * - Exibir próximos posts
 * - Oferecer ações rápidas
 *
 * 🧠 OBS:
 * - Usa componentes do shadcn (Card, Button)
 * - Layout já é controlado pelo layout.tsx
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

/**
 * 🧱 Componente principal do Dashboard
 */
export default function DashboardPage() {
  return (

    /**
     * 📦 Container principal
     *
     * space-y-6 → espaçamento vertical entre seções
     */
    <div className="space-y-6">

      {/* =========================
          📌 HEADER DO DASHBOARD
          =========================
          - Título da página
          - Botão de ação principal
      */}
      <div className="flex items-center justify-between">

        {/* Título */}
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        {/* Ação principal */}
        <Button>
          + Criar post
        </Button>

      </div>

      {/* =========================
          📊 CARDS DE MÉTRICAS
          =========================
          - Visão rápida dos dados do sistema
      */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Card 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Posts da semana
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              12
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Pendentes
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              4
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Aprovados
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              8
            </p>
          </CardContent>
        </Card>

      </div>

      {/* =========================
          📦 CONTEÚDO PRINCIPAL
          =========================
          - Dividido em duas colunas (responsivo)
      */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* =========================
            📅 PRÓXIMOS POSTS
            =========================
        */}
        <Card>

          <CardHeader>
            <CardTitle>
              Próximos posts
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Post 1 */}
            <div className="border-b pb-2">
              <p className="font-medium">
                🍔 Promoção de Hambúrguer
              </p>

              <p className="text-sm text-gray-500">
                20/04/2026
              </p>
            </div>

            {/* Post 2 */}
            <div>
              <p className="font-medium">
                👨‍👩‍👧 Combo Família
              </p>

              <p className="text-sm text-gray-500">
                22/04/2026
              </p>
            </div>

          </CardContent>

        </Card>

        {/* =========================
            ⚡ AÇÕES RÁPIDAS
            =========================
        */}
        <Card>

          <CardHeader>
            <CardTitle>
              Ações rápidas
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">

            {/* Criar post */}
            <Button className="w-full">
              Criar novo post
            </Button>

            {/* Adicionar cliente */}
            <Button variant="outline" className="w-full">
              Adicionar cliente
            </Button>

            {/* Ver calendário */}
            <Button variant="secondary" className="w-full">
              Ver calendário
            </Button>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}