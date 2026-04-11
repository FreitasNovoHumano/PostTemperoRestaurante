"use client";

/**
 * ✅ APPROVAL PAGE (CLIENTE)
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Permitir aprovação simples do post
 *
 * 🧩 ELEMENTOS:
 * - Preview (imagem + legenda)
 * - Comentários
 * - Aprovação / rejeição
 */

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";

/**
 * 🔹 Tipos
 */
type Post = {
  id: string;
  image?: string;
  caption: string;
};

type Comment = {
  id: string;
  content: string;
};

/**
 * 🔹 Página principal
 */
export default function ApprovalPage({ params }: any) {

  const { id } = params;

  /**
   * 📦 Estados
   */
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  /**
   * 🔄 Carregar dados do post + comentários
   */
  async function load() {
    const postRes = await fetch(`/api/posts/${id}`);
    const postData = await postRes.json();

    const commentsRes = await fetch(`/api/comments?postId=${id}`);
    const commentsData = await commentsRes.json();

    setPost(postData);
    setComments(commentsData);
  }

  useEffect(() => {
    load();
  }, []);

  /**
   * 💬 Adicionar comentário
   */
  async function addComment() {
    if (!text) return;

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content: text,
        postId: id,
      }),
    });

    setText("");
    load();
  }

  /**
   * ✅ Aprovar post
   */
  async function approve() {
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "approved" }),
    });

    alert("Post aprovado!");
  }

  /**
   * ⚠️ Solicitar alteração
   */
  async function requestChanges() {
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "pending" }),
    });

    alert("Alterações solicitadas!");
  }

  return (
    <Layout>

      {/* =====================================================
          🖼️ PREVIEW DO POST
      ===================================================== */}
      <div className="mb-6">

        {post?.image && (
          <img
            src={post.image}
            className="w-full max-w-md rounded mb-4"
          />
        )}

        <p className="text-lg whitespace-pre-line">
          {post?.caption}
        </p>
      </div>

      {/* =====================================================
          💬 COMENTÁRIOS
      ===================================================== */}
      <div className="bg-white p-4 rounded shadow mb-6">

        <h2 className="font-semibold mb-3">
          Comentários
        </h2>

        {/* Lista */}
        {comments.map((c) => (
          <div key={c.id} className="mb-2">
            <p className="text-sm">{c.content}</p>
          </div>
        ))}

        {/* Campo */}
        <div className="flex gap-2 mt-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva um comentário..."
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={addComment}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Enviar
          </button>
        </div>
      </div>

      {/* =====================================================
          ✅ AÇÕES
      ===================================================== */}
      <div className="flex gap-4">

        <button
          onClick={approve}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Aprovar
        </button>

        <button
          onClick={requestChanges}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg"
        >
          Solicitar alteração
        </button>

      </div>

    </Layout>
  );
}