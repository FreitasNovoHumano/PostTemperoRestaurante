/**
 * 📧 CONFIG — RESEND
 */

import { Resend } from "resend";

/**
 * 🔐 Instância do cliente
 */
export const resend = new Resend(process.env.RESEND_API_KEY);