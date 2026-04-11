"use client";

/**
 * 🖼️ Upload via API (seguro)
 */

import { useState } from "react";

export default function Upload({ onUpload }: any) {

  const [loading, setLoading] = useState(false);

  async function handleUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    /**
     * 📦 FormData
     */
    const formData = new FormData();
    formData.append("file", file);

    /**
     * 🌐 Chama sua API
     */
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    /**
     * 🔗 Retorna URL
     */
    onUpload(data.url);

    setLoading(false);
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Enviando...</p>}
    </div>
  );
}