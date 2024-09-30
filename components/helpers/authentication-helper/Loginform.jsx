"use client";
import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Loginform() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { contact, password, callbackUrl: "/admin/dashboard-home" });
    setLoading(false);
  };
  return (
    <>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <input
          type="email"
          onChange={(e) => setContact(e.target.value)}
          placeholder="name@example.com / phone number"
          className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-slate-800 w-full  no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex justify-center space-x-2 text-base py-3 items-center z-10 rounded-full bg-zinc-950 px-4 ring-1 ring-white/10 ">
            <span>{loading ? "login please wait..." : "Login Securely"}</span>
            <FaKey />
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
      </form>
    </>
  );
}
