"use client";

/**
 * 👨‍🍳 Tela de Aprovação (Cliente)
 *
 * Cliente pode:
 * - Aprovar
 * - Rejeitar
 * - Comentar
 */

import { useParams } from "next/navigation";

export default function ApprovalPage() {
  const { postId } = useParams();

  async function handleAction(status: string) {
    await fetch("/api/approvals", {
      method: "POST",
      body: JSON.stringify({
        postId,
        status,
      }),
    });

    alert("Ação realizada!");
  }

  return (
    <div>
      <h1>Aprovação de Post</h1>

      <button onClick={() => handleAction("approved")}>
        Aprovar
      </button>

      <button onClick={() => handleAction("rejected")}>
        Rejeitar
      </button>
    </div>
  );
}