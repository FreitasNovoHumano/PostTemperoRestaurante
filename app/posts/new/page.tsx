"use client";

/**
 * ✍️ CREATE POST + IA
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Permitir gerar legenda automaticamente com IA
 */

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Upload from "@/components/forms/Upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * 🔹 Buscar clientes
 */
async function fetchClients() {
  const res = await fetch("/api/clients");
  return res.json();
}

/**
 * 🔹 Criar post
 */
async function createPost(data: any) {
  const res = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar post");

  return res.json();
}

/**
 * 🤖 Gerar legenda
 */
async function generateCaptionAPI(theme: string) {
  const res = await fetch("/api/ai/caption", {
    method: "POST",
    body: JSON.stringify({
      theme,
      tone: "engajador",
    }),
  });

  return res.json();
}

export default function CreatePostPage() {

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [clientId, setClientId] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const router = useRouter();

  /**
   * 📡 Clientes
   */
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  /**
   * 🚀 Criar post
   */
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => router.push("/posts"),
  });

  /**
   * 🤖 GERAR LEGENDA
   */
  async function handleGenerateCaption() {

    if (!caption) {
      alert("Digite algo base (ex: pizza, promoção, hambúrguer)");
      return;
    }

    try {
      setLoadingAI(true);

      const data = await generateCaptionAPI(caption);

      /**
       * ✨ Atualiza campo
       */
      setCaption(data.caption);

    } catch {
      alert("Erro ao gerar legenda");
    } finally {
      setLoadingAI(false);
    }
  }

  /**
   * 📤 Submit
   */
  function handleSubmit(e: any) {
    e.preventDefault();

    mutation.mutate({
      caption,
      image,
      clientId,
    });
  }

  return (
    <Layout>

      <h1 className="text-2xl mb-6">
        Criar Post
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md">

        {/* CLIENTE */}
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Selecione</option>

          {clients?.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* UPLOAD */}
        <Upload onUpload={setImage} />

        {/* LEGENDA */}
        <textarea
          placeholder="Digite algo base ou legenda"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 w-full mt-4"
        />

        {/* 🤖 BOTÃO IA */}
        <button
          type="button"
          onClick={handleGenerateCaption}
          className="bg-purple-600 text-white px-4 py-2 mt-2 rounded w-full"
        >
          {loadingAI ? "Gerando..." : "🤖 Gerar legenda com IA"}
        </button>

        {/* SALVAR */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded"
        >
          Salvar
        </button>

      </form>

    </Layout>
  );
}