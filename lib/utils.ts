/**
 * 🧰 Funções utilitárias globais
 *
 * Pequenas funções reutilizáveis no sistema inteiro
 */

/**
 * Formata data no padrão brasileiro
 */

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

/**
 * Corta textos longos (preview de posts)
 */
export function truncate(text: string, max: number = 100) {
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
}