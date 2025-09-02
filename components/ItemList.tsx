"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
  quantity: number;
  createdAt: string;
};

export default function ItemList({ refresh }: { refresh: number }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Fetch items error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Inventory Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-3">
              <span>
                <span className="font-medium">{item.name}</span>{" "}
                <span className="text-gray-500">({item.quantity})</span>
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
