"use client";

"use client";

/**
 * 🔐 LOGIN PAGE — PostTempero
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Permitir autenticação do usuário com validação
 *
 * 🧩 FUNCIONALIDADES:
 * - Inputs controlados (email/senha)
 * - Validação de formulário
 * - Integração com NextAuth
 * - Feedback de erro
 */

import { useState } from "react";
import { signIn } from "next-auth/react";

/**
 * 🔹 Componente principal
 */
export default function LoginPage() {

  /**
   * 📦 Estados do formulário
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * ⚠️ Estados de erro
   */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * 🧠 Validação simples de email
   */
  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  /**
   * 🔐 Função de login
   */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    /**
     * ❌ Validação de campos
     */
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email inválido");
      return;
    }

    if (password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);

      /**
       * 🔑 Chamada do NextAuth
       */
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      /**
       * ❌ Erro de login
       */
      if (res?.error) {
        setError("Email ou senha inválidos");
        return;
      }

      /**
       * ✅ Sucesso
       */
      window.location.href = "/dashboard";

    } catch (err) {
      setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    /**
     * 📦 Container principal
     */
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      {/* 📄 Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* 🍔 Logo */}
        <h1 className="text-center text-2xl font-bold text-orange-500 mb-4">
          🍔 PostTempero
        </h1>

        {/* 🧾 Título */}
        <h2 className="text-center text-lg mb-6">
          Entre na sua conta
        </h2>

        {/* ⚠️ Mensagem de erro */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        {/* 📝 FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">

          {/* 📧 Email */}
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* 🔒 Senha */}
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* 🔘 Botão */}
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

        {/* 🔗 Links auxiliares */}
        <div className="flex justify-between mt-4 text-sm">

          <a href="/register" className="text-orange-500 hover:underline">
            Criar conta
          </a>

          <a href="/forgot-password" className="text-gray-500 hover:underline">
            Esqueci minha senha
          </a>

        </div>
      </div>
    </div>
  );
}

/**
 * 🔐 LOGIN PAGE — PostTempero
 * =====================================================
 * 
 * 🎯 OBJETIVO:
 * Permitir que o usuário acesse o sistema de forma
 * rápida, simples e intuitiva.
 * 
 * 🧩 FUNCIONALIDADES:
 * - Captura email e senha
 * - Exibe interface amigável
 * - Redireciona para cadastro
 * - Redireciona para recuperação de senha
 * 
 * 🧠 UX:
 * - Layout centralizado
 * - Destaque visual no botão principal
 * - Links auxiliares visíveis
 * 
 * 📌 DEPENDÊNCIAS:
 * - next/link → navegação entre páginas
 */

import Link from "next/link";

/**
 * 🔹 Componente principal da página de login
 */
/export default function LoginPage() {
  return (
    /**
     * 📦 Container principal
     * - Centraliza vertical e horizontalmente
     * - Aplica fundo neutro
     */
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      /**
       * 📄 Card de login
       * - Caixa branca com sombra
       * - Define largura máxima
       */
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        /**
         * 🍔 LOGO / BRANDING
         * - Nome do sistema
         * - Pode ser substituído por imagem futuramente
         */
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-orange-500">
            🍔 PostTempero
          </h1>
        </div>

        /**
         * 🧾 TÍTULO
         * - Indica ação da tela
         */
        <h2 className="text-xl font-semibold text-center mb-6">
          Entre na sua conta
        </h2>

        /**
         * 📧 INPUT EMAIL
         * - Campo obrigatório para login
         */
        <input
          type="email"
          placeholder="Seu email"
          className="
            w-full 
            border 
            p-3 
            rounded 
            mb-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-orange-400
          "
        />

        /**
         * 🔒 INPUT SENHA
         * - Campo protegido
         */
        <input
          type="password"
          placeholder="Sua senha"
          className="
            w-full 
            border 
            p-3 
            rounded 
            mb-4 
            focus:outline-none 
            focus:ring-2 
            focus:ring-orange-400
          "
        />

        /**
         * 🔘 BOTÃO PRINCIPAL
         * - Ação de login
         * - Cor primária do sistema
         */
        <button
          className="
            w-full 
            bg-orange-500 
            text-white 
            p-3 
            rounded-lg 
            font-semibold 
            hover:bg-orange-600 
            transition
          "
        >
          Entrar
        </button>

        /**
         * 🔗 LINKS AUXILIARES
         * - Cadastro de novo usuário
         * - Recuperação de senha
         */
        <div className="flex justify-between mt-4 text-sm">

          {/* 🔗 Criar conta */}
          <Link
            href="/register"
            className="text-orange-500 hover:underline"
          >
            Criar conta
          </Link>

          {/* 🔗 Esqueci senha */}
          <Link
            href="/forgot-password"
            className="text-gray-500 hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
  
}