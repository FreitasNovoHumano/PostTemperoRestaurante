"use client";

/**
 * 💬 COMMENTS COMPONENT
 */

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * 🔹 Buscar comentários
 */
async function fetchComments(postId: string) {
  const res = await fetch(`/api/comments?postId=${postId}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar comentários");
  }

  return res.json();
}

/**
 * 🔹 Criar comentário
 */
async function createComment(data: { content: string; postId: string }) {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar comentário");
  }

  return res.json();
}

/**
 * 💬 COMPONENTE
 */
export default function Comments({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  /**
   * 🔹 GET
   */
  const { data, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  /**
   * 🔹 POST
   */
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setContent("");

      // 🔄 Atualiza lista automaticamente
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
  });

  /**
   * 🔹 Submit
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) return;

    mutation.mutate({ content, postId });
  }

  /**
   * 🔹 UI
   */
  if (isLoading) return <p>Carregando comentários...</p>;

  return (
    <div className="space-y-4">
      {/* Lista */}
      <div className="space-y-2">
        {data?.map((comment: any) => (
          <div
            key={comment.id}
            className="p-2 border rounded"
          >
            {comment.content}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva um comentário..."
          className="border p-2 flex-1 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded"
          disabled={mutation.isPending}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}