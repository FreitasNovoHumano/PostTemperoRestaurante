"use client";

import Calendar from "@/components/calendar/Calendar";
import { useState } from "react";

export default function CalendarPage() {

  const [clientId, setClientId] = useState("");

  return (
    <div className="p-6">

      <h1 className="text-2xl mb-4">Calendário</h1>

      {/* 🔍 Seleção simples */}
      <input
        placeholder="Digite clientId"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="border p-2 mb-4"
      />

      <Calendar clientId={clientId} />

    </div>
  );
}