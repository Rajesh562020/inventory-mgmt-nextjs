"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl
    });
    setLoading(false);
    if (res?.ok) router.push(callbackUrl);
    else alert("Invalid credentials");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white shadow rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Sign in</h1>
        <input
          type="email" placeholder="you@example.com" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md p-2"
        />
        <input
          type="password" placeholder="••••••••" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md p-2"
        />
        <button
          type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <RegisterBox />
      </form>
    </main>
  );
}

function RegisterBox() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
const register = async () => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) {
    const json = await res.json().catch(()=>({message:'Register failed'}));
    alert("Register failed: " + (json.message || "unknown"));
    return;
  }
  // Auto-login
  const sign = await signIn("credentials", { redirect: false, email, password });
  if (sign?.ok) router.push("/");
  else alert("Registered but automatic login failed — please sign in.");
};
  // const register = async () => {
  //   const res = await fetch("/api/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name, email, password })
  //   });
  //   if (res.ok) alert("Registered! Now sign in.");
  //   else {
  //     const json = await res.json().catch(()=>({message:'Register failed'}));
  //     alert("Register failed: " + (json.message || "unknown"));
  //   }
  // };
  return (
    <div className="pt-3 border-t text-sm">
      <div className="font-medium mb-2">New here? (dev only)</div>
      <input className="w-full border rounded-md p-2 mb-2" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input className="w-full border rounded-md p-2 mb-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="w-full border rounded-md p-2 mb-2" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button type="button" onClick={register} className="w-full border rounded-md py-2">Register</button>
    </div>
  );
}
