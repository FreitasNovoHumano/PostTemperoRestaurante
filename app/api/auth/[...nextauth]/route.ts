/**
 * 🔐 NEXTAUTH CONFIG
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Gerenciar autenticação do sistema
 *
 * 🧩 FUNCIONALIDADES:
 * - Login com email/senha (credentials)
 * - Sessão JWT
 * - Integração com Prisma
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

/**
 * 🔹 Configuração principal
 */
const handler = NextAuth({

  /**
   * 🔐 Estratégia de sessão
   * - JWT (mais simples para MVP)
   */
  session: {
    strategy: "jwt",
  },

  /**
   * 🔑 Providers de autenticação
   */
  providers: [

    CredentialsProvider({

      /**
       * 📄 Campos esperados no login
       */
      credentials: {
        email: {},
        password: {},
      },

      /**
       * 🔍 Função que valida usuário
       */
      async authorize(credentials) {

        /**
         * ❌ Validação básica
         */
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        /**
         * 🔎 Busca usuário no banco
         */
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        /**
         * ❌ Usuário não encontrado
         */
        if (!user || !user.password) {
          throw new Error("Usuário não encontrado");
        }

        /**
         * 🔐 Compara senha criptografada
         */
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        /**
         * ❌ Senha inválida
         */
        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        /**
         * ✅ Retorna usuário autenticado
         */
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  /**
   * 🧠 Callbacks
   */
  callbacks: {

    /**
     * 🔐 Adiciona dados ao token
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    /**
     * 👤 Adiciona dados à sessão
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  /**
   * 🔑 Chave secreta (vem do .env)
   */
  secret: process.env.NEXTAUTH_SECRET,
});

/**
 * 🔐 NEXTAUTH — API DE AUTENTICAÇÃO
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Conectar login (frontend) com banco (backend)
 *
 * 🧩 RESPONSABILIDADES:
 * - Validar credenciais
 * - Criar sessão JWT
 * - Persistir login
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = { ... }

const session = await getServerSession(authOptions);

/**
 * 🔹 Handler principal
 */
const handler = NextAuth({

  /**
   * 🔐 Sessão baseada em JWT
   */
  session: {
    strategy: "jwt",
  },

  /**
   * 🔑 Provider (email/senha)
   */
  providers: [
    CredentialsProvider({

      credentials: {
        email: {},
        password: {},
      },

      /**
       * 🔍 Validação do login
       */
      async authorize(credentials) {

        /**
         * ❌ Validação básica
         */
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        /**
         * 🔎 Busca usuário no banco
         */
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        /**
         * ❌ Usuário não existe
         */
        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        /**
         * 🔐 Compara senha
         */
        const validPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        /**
         * ❌ Senha inválida
         */
        if (!validPassword) {
          throw new Error("Senha incorreta");
        }

        /**
         * ✅ Retorna dados do usuário
         */
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  /**
   * 🧠 Callbacks
   */
  callbacks: {

    /**
     * 🔐 JWT → salva dados no token
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    /**
     * 👤 SESSION → expõe dados no frontend
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  /**
   * 🔑 Segredo
   */
  secret: process.env.NEXTAUTH_SECRET,
});

/**
 * 📡 Exporta métodos HTTP
 */
export { handler as GET, handler as POST };