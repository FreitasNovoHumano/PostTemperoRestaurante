/**
 * 🔐 NEXTAUTH CONFIG
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

/**
 * 🔹 Configuração principal
 */
export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Usuário não encontrado");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * 🔹 Handler único
 */
const handler = NextAuth(authOptions);

/**
 * 📡 Exportações obrigatórias (App Router)
 */
export { handler as GET, handler as POST };