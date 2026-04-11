/**
 * 🔔 NOTIFICATIONS SERVICE
 * =====================================================
 *
 * 🎯 Centraliza envio de emails
 */

import { resend } from "@/lib/resend";

/**
 * ✅ Notificar aprovação
 */
export async function notifyPostApproved(email: string) {
  await resend.emails.send({
    from: "PostTempero <onboarding@resend.dev>",
    to: email,
    subject: "Post aprovado ✅",
    html: `
      <h2>Seu post foi aprovado!</h2>
      <p>Parabéns! Seu conteúdo está pronto para publicação 🚀</p>
    `,
  });
}

/**
 * ⚠️ Notificar alteração solicitada
 */
export async function notifyPostChanges(email: string) {
  await resend.emails.send({
    from: "PostTempero <onboarding@resend.dev>",
    to: email,
    subject: "Alterações solicitadas ⚠️",
    html: `
      <h2>Seu post precisa de ajustes</h2>
      <p>Revise o conteúdo e envie novamente.</p>
    `,
  });
}

/**
 * 💬 Notificar comentário
 */
export async function notifyNewComment(email: string, content: string) {
  await resend.emails.send({
    from: "PostTempero <onboarding@resend.dev>",
    to: email,
    subject: "Novo comentário 💬",
    html: `
      <h2>Você recebeu um comentário</h2>
      <p>${content}</p>
    `,
  });
}