"use client";

import { useState } from "react";

export default function ItemForm({ onItemAdded }: { onItemAdded: () => void }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quantity: Number(quantity) || 0 }),
      });

      if (res.ok) {
        setName("");
        setQuantity("");
        onItemAdded(); // refresh list
      } else {
        const err = await res.json();
        alert(err.message || "Error adding item");
      }
    } catch (error) {
      console.error("Add item error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 flex gap-3 items-center"
    >
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-1/2"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(e.target.value ? Number(e.target.value) : "")
        }
        className="border p-2 rounded w-1/4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}
