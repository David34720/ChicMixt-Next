"use client";

import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical } from "react-icons/fa";
import { useSession } from "next-auth/react";

interface User {
  role?: string;
}

interface SortableItemProps {
  id: string | number;
  children: ReactNode;
}

export default function SortableItem({ id, children }: SortableItemProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user && (session.user as User).role === "admin";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative"
    >
      {isAdmin && (
        <FaGripVertical className="absolute top-2 left-2 z-10 cursor-grab text-gray-500" />
      )}
      {children}
    </div>
  );
}