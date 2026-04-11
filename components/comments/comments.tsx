"use client";

/**
 * 💬 COMMENTS COMPONENT
 * =====================================================
 *
 * 🎯 OBJETIVO:
 * Exibir e criar comentários de um post
 *
 * 🧩 FUNCIONALIDADES:
 * - Listagem (GET /comments)
 * - Criação (POST /comments)
 * - Atualização automática (React Query)
 */

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * 🔹 Buscar comentários
 */
async function fetchComments(postId: string) {
  const res = await fetch(`/api/comments?postId=${postId}`);
  return res.json();
}

/**
 * 🔹 Criar comentário
 */
async function createComment(data: any) {
  const res = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if