export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      
      <h2 className="text-xl font-bold mb-6">
        🍔 PostTempero
      </h2>

      <nav className="flex flex-col gap-2">
        <a className="p-2 rounded hover:bg-gray-100">Dashboard</a>
        <a className="p-2 rounded hover:bg-gray-100">Clientes</a>
        <a className="p-2 rounded hover:bg-gray-100">Posts</a>
        <a className="p-2 rounded hover:bg-gray-100">Calendário</a>
      </nav>

    </aside>
  )
}