"use client"

/**
 * 📌 Página de Cadastro
 */

import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    alert(data.message)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}