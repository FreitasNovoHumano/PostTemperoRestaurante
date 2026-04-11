"use client";

/**
 * ✅ APPROVAL PAGE (PÚBLICA)
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Permitir que o cliente:
 * - visualize o post
 * - aprove ou solicite alteração
 *
 * ⚠️ IMPORTANTE:
 * - Tela pública (sem login)
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

/**
 * 🔹 Tipo do post
 */
type Post = {
  id: string;
  image?: string;
  caption: string;
};

export default function ApprovalPage() {

  /**
   * 📦 Params da rota
   */
  const params = useParams();
  const id = params.id as string;

  /**
   * 📦 Estados
   */
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🔄 Carregar post
   */
  async function loadPost() {
    try {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();

      setPost(data);
    } catch (error) {
      console.error("Erro ao carregar post");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, []);

  /**
   * ✅ Aprovar
   */
  async function approve() {
    await fetch("/api/approvals", {
      method: "POST",
      body: JSON.stringify({
        postId: id,
        status: "APPROVED",
      }),
    });

    alert("Post aprovado!");
  }

  /**
   * ⚠️ Solicitar alteração
   */
  async function requestChanges() {
    await fetch("/api/approvals", {
      method: "POST",
      body: JSON.stringify({
        postId: id,
        status: "CHANGES_REQUESTED",
      }),
    });

    alert("Alterações solicitadas!");
  }

  /**
   * ⏳ Loading
   */
  if (loading) {
    return <p className="p-10">Carregando...</p>;
  }

  return (
    <div className="flex flex-col items-center p-10">

      {/* =====================================================
          🖼️ PREVIEW
      ===================================================== */}
      <div className="max-w-md w-full">

        {post?.image && (
          <img
            src={post.image}
            className="w-full rounded mb-4"
          />
        )}

        <p className="text-lg mb-6 whitespace-pre-line">
          {post?.caption}
        </p>

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

    </div>
  );
}