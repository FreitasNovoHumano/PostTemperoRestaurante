/**
 * 📌 Sidebar
 * =====================================================
 *
 * 🎯 RESPONSABILIDADE:
 * - Navegação principal do sistema
 * - Links entre páginas
 */

import Link from "next/link"

export default function Sidebar() {
  return (

    /**
     * Container lateral
     */
    <div style={{ width: 200, padding: 20, borderRight: "1px solid #ccc" }}>

      {/* Logo / Nome */}
      <h2>🍔 PostTempero</h2>

      {/* Navegação */}
      <nav style={{ marginTop: 20 }}>

        <div>
          <Link href="/">Dashboard</Link>
        </div>

        <div>
          <Link href="/clients">Clientes</Link>
        </div>

        <div>
          <Link href="/posts">Posts</Link>
        </div>

        <div>
          <Link href="/calendar">Calendário</Link>
        </div>

      </nav>

    </div>
  )
}