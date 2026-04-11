"use client";

/**
 * 🖼️ MEDIA LIBRARY PAGE
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Exibir imagens do usuário em grid
 */

import { useQuery } from "@tanstack/react-query";

/**
 * 🔹 Buscar mídias
 */
async function fetchMedia() {
  const res = await fetch("/api/media");
  return res.json();
}

export default function MediaPage() {

  const { data: media, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: fetchMedia,
  });

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Biblioteca de Mídia
      </h1>

      {isLoading && <p>Carregando...</p>}

      {/* =====================================================
          🖼️ GRID
      ===================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {media?.map((item: any) => (
          <div
            key={item.id}
            className="relative group cursor-pointer"
          >

            {/* IMAGEM */}
            <img
              src={item.url}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* HOVER */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">

              <span className="text-white text-sm">
                Selecionar
              </span>

            </div>

          </div>
        ))}

      </div>

      {/* =====================================================
          ❌ EMPTY
      ===================================================== */}
      {!isLoading && media?.length === 0 && (
        <p className="text-gray-500 mt-6">
          Nenhuma mídia encontrada.
        </p>
      )}

    </div>
  );
}