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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState<number | "">("");

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

  const startEditing = (item: Item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          quantity: Number(editQuantity) || 0,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setItems((prev) =>
          prev.map((item) => (item.id === id ? updated : item))
        );
        setEditingId(null);
      } else {
        const err = await res.json();
        alert(err.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
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
              {editingId === item.id ? (
                <div className="flex gap-2 items-center w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) =>
                      setEditQuantity(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    className="border p-1 rounded w-24"
                  />
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>
                    <span className="font-medium">{item.name}</span>{" "}
                    <span className="text-gray-500">({item.quantity})</span>
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditing(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

