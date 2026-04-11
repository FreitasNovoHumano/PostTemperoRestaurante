"use client";

import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

/**
 * 🧱 CARD DRAGGABLE
 */
function DraggablePost({ post }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: post.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="text-xs bg-blue-100 p-1 rounded cursor-grab"
    >
      {post.caption}
    </div>
  );
}

/**
 * 📅 DIA DROPPABLE
 */
function DroppableDay({ date, children }: any) {
  const { setNodeRef } = useDroppable({
    id: date,
  });

  return (
    <div ref={setNodeRef} className="border p-2 min-h-[100px] rounded">
      {children}
    </div>
  );
}

/**
 * 🔹 API
 */
async function fetchCalendar(clientId: string, month: string) {
  const res = await fetch(`/api/posts/calendar?clientId=${clientId}&month=${month}`);
  return res.json();
}

export default function Calendar({ clientId }: any) {

  const [currentDate] = useState(new Date());
  const month = currentDate.toISOString().slice(0, 7);

  const queryClient = useQueryClient();

  const { data: calendar } = useQuery({
    queryKey: ["calendar", clientId, month],
    queryFn: () => fetchCalendar(clientId, month),
    enabled: !!clientId,
  });

  /**
   * 🎯 DROP HANDLER
   */
  async function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    const postId = active.id;
    const newDate = over.id;

    /**
     * 🔄 Atualiza no backend
     */
    await fetch("/api/posts/reschedule", {
      method: "PATCH",
      body: JSON.stringify({
        postId,
        date: newDate,
      }),
    });

    /**
     * 🔄 Atualiza cache
     */
    queryClient.invalidateQueries({ queryKey: ["calendar"] });
  }

  /**
   * 📅 Gerar dias
   */
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <DndContext onDragEnd={handleDragEnd}>

      <div className="grid grid-cols-7 gap-2">

        {days.map((day) => {

          const dateKey = `${month}-${String(day).padStart(2, "0")}`;
          const posts = calendar?.[dateKey] || [];

          return (
            <DroppableDay key={day} date={dateKey}>

              <div className="text-xs font-bold mb-1">{day}</div>

              {posts.map((post: any) => (
                <DraggablePost key={post.id} post={post} />
              ))}

            </DroppableDay>
          );
        })}

      </div>

    </DndContext>
  );
}