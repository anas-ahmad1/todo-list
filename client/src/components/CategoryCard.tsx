"use client";

import { FaTrash } from "react-icons/fa";

interface CategoryCardProps {
  id: string;
  name: string;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export default function CategoryCard({ id, name, onClick, onDelete }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative p-6 py-16 primary-bg rounded-2xl shadow hover:shadow-lg cursor-pointer flex items-center justify-center mb-6 mx-4"
    >
      <h1 className="text-2xl font-bold">{name}</h1>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="absolute top-5 right-5 font-semibold"
      >
        <FaTrash />
      </button>
    </div>
  );
}
