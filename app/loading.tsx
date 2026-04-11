/**
 * ⏳ LOADING GLOBAL
 */

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Carregando...</p>
    </div>
  );
}

<button className="hover:scale-105 transition" disabled={loadingAI}>
  {loadingAI ? "🤖 Gerando..." : "Gerar legenda"}
</button>