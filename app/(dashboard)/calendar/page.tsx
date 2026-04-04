"use client";

/**
 * 📅 Tela de Calendário
 *
 * Exibe posts organizados por data
 */

import { useEffect, useState } from "react";

export default function CalendarPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/posts/calendar?clientId=1")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h1>Calendário</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <small>{post.status}</small>
        </div>
      ))}
    </div>
  );
}