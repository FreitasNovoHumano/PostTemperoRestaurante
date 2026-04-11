"use client";

/**
 * ➕ CREATE CLIENT (COM REACT QUERY)
 */

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Upload from "@/components/forms/Upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * 🔹 Função de criação
 */
async function createClient(data: any) {
  const res = await fetch("/api/clients", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar cliente");
  }

  return res.json();
}

export default function CreateClientPage() {

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const router = useRouter();

  /**
   * 🔄 Cache global
   */
  const queryClient = useQueryClient();

  /**
   * 🚀 useMutation
   */
  const mutation = useMutation({
    mutationFn: createClient,

    /**
     * ✅ Sucesso
     */
    onSuccess: () => {

      /**
       * 🔄 Atualiza lista automaticamente
       */
      queryClient.invalidateQueries({ queryKey: ["clients"] });

      router.push("/clientes");
    },
  });

  /**
   * 📤 Submit
   */
  function handleSubmit(e: any) {
    e.preventDefault();

    mutation.mutate({ name, logo });
  }

  return (
    <Layout>

      <h1 className="text-2xl mb-6">
        Novo Cliente
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <Upload onUpload={setLogo} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-4"
        >
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </button>

      </form>

    </Layout>
  );
}