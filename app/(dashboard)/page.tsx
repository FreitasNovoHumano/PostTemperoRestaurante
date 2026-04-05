"use client";

/**
 * 📊 Dashboard
 */

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-4 space-x-4">
        <Link href="/posts">Posts</Link>
        <Link href="/templates">Templates</Link>
        <Link href="/calendar">Calendário</Link>
      </div>
    </div>
  );
}