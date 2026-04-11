"use client";

import Calendar from "@/components/calendar/calendar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

/**
 * 🔹 Buscar clientes
 */
async function fetchClients() {
  const res = await fetch("/api/clients");

  if (!res.ok) {
    throw new Error("Erro ao buscar clientes");
  }

  return res.json();
}

export default function CalendarPage() {
  const [clientId, setClientId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Calendário</h1>

      {/* 🔄 LOADING */}
      {isLoading && <p>Carregando clientes...</p>}

      {/* 🔽 SELECT */}
      <select
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
      >
        <option value="">Selecione um cliente</option>

        {data?.map((client: any) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      {/* ❌ Validação */}
      {!clientId && (
        <p className="text-gray-500">
          Selecione um cliente para visualizar
        </p>
      )}

      {/* 📅 CALENDAR */}
      {clientId && <Calendar clientId={clientId} />}
    </div>
  );
}