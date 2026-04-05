/**
 * 🔐 NEXTAUTH CONFIG
 * ---------------------------------------------------
 * Responsável pela autenticação do sistema.
 *
 * FUNCIONALIDADES:
 * - Login com email/senha
 * - Criação de sessão
 * - Integração com banco (Prisma)
 *
 * FLUXO:
 * 1. Usuário envia email/senha
 * 2. NextAuth valida no banco
 * 3. Cria sessão JWT
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      /**
       * 🔑 Validação do usuário
       */
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // ⚠️ MVP: senha sem hash (depois usar bcrypt)
        if (!user || user.password !== credentials.password) {
          return null;
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };