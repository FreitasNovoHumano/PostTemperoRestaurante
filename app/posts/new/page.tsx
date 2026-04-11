"use client";

/**
 * ✍️ CREATE POST PAGE
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Criar novo post
 *
 * 🧩 FUNCIONALIDADES:
 * - Upload de imagem
 * - Legenda
 * - Status
 * - Seleção de cliente
 * - Integração com API
 */

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Upload from "@/components/forms/Upload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  if (!res.ok) {
    throw new Error("Erro ao criar post");
  }

  return res.json();
}

export default function CreatePostPage() {

  /**
   * 📦 Estados
   */
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("IDEA");
  const [clientId, setClientId] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  /**
   * 📡 Buscar clientes
   */
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  /**
   * 🚀 Mutation
   */
  const mutation = useMutation({
    mutationFn: createPost,

    /**
     * ✅ Sucesso
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/posts");
    },
  });

  /**
   * 📤 Submit
   */
  function handleSubmit(e: any) {
    e.preventDefault();

    if (!caption || !clientId) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    mutation.mutate({
      caption,
      image,
      status,
      clientId,
    });
  }

  return (
    <Layout>

      <h1 className="text-2xl font-bold mb-6">
        Criar Post
      </h1>

      {/* =====================================================
          📝 FORM
      ===================================================== */}
      <form onSubmit={handleSubmit} className="max-w-md">

        {/* 🧾 CLIENTE */}
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Selecione um cliente</option>

          {clients?.map((client: any) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}

        </select>

        {/* 🖼️ UPLOAD */}
        <Upload onUpload={setImage} />

        {image && (
          <img
            src={image}
            className="w-40 mt-4 rounded"
          />
        )}

        {/* 📝 LEGENDA */}
        <textarea
          placeholder="Legenda do post"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 w-full mt-4"
        />

        {/* 🚦 STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full mt-4"
        >
          <option value="IDEA">Ideia</option>
          <option value="CREATING">Em criação</option>
          <option value="PENDING">Aguardando aprovação</option>
          <option value="APPROVED">Aprovado</option>
        </select>

        {/* 🔘 BOTÃO */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-6 w-full rounded"
        >
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </button>

      </form>

    </Layout>
  );
}
