/**
 * 🧱 Layout principal
 *
 * Estrutura base com sidebar + conteúdo
 */

import Sidebar from "./sidebar";

export default function Layout({ children }: any) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}