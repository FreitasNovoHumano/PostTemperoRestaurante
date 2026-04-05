"use client";

import { useEffect, useState } from "react";

/**
 * 📝 Tela de Posts (real)
 */


export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    const res = await fetch("/api/posts");
    setPosts(await res.json());
  }

  async function create() {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        clientId: "1",
      }),
    });

    load();
  }

  async function generateAI() {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: title,
      }),
    });

    const data = await res.json();
    setContent(data.text);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Posts</h1>

      <input
        className="border p-2 mt-4 w-full"
        placeholder="Título"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 mt-2 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="mt-2 space-x-2">
        <button onClick={create}>Criar</button>
        <button onClick={generateAI}>Gerar IA</button>
      </div>

      <ul className="mt-4">
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}