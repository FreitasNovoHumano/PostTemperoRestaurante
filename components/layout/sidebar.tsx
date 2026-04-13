/**
 * 🧭 Sidebar — Navegação principal
 *
 * Contém links principais do sistema
 */

import Link from "next/link";

export default function sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">🍔 PostTempero</h2>

      <nav className="flex flex-col gap-4">

        <Link href="/dashboard">Dashboard</Link>
        <Link href="/clientes">Clientes</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/calendar">Calendário</Link>

      </nav>
    </aside>
  );
}