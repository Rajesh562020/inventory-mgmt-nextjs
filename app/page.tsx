"use client";

import { useState } from "react";
import ItemForm from "@/components/ItemForm";
import ItemList from "@/components/ItemList";
import { signOut } from "next-auth/react";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">📦 Inventory Manager</h1>
      <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-sm underline">
        Sign out
      </button>
      <ItemForm onItemAdded={() => setRefresh((r) => r + 1)} />
      <ItemList refresh={refresh} />
    </main>
  );
}
