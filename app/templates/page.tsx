"use client";

import { useEffect, useState } from "react";

/**
 * 📦 Templates UI
 */

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then(setTemplates);
  }, []);

  return (
    <div className="p-6">
      <h1>Templates</h1>

      {templates.map((t) => (
        <div key={t.id} className="border p-2 mt-2">
          <p>{t.title}</p>
          <small>{t.content}</small>
        </div>
      ))}
    </div>
  );
}