"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FaviconImage from "@/components/FaviconImage";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(
      formData.username + ", " + formData.email + ", " + formData.password
    );
    //TODO
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex flex-col items-center">
        <FaviconImage size={50} />
        <h1 className="text-2xl font-bold mb-10  align-center">
          Sign Up with Mauri Shop
        </h1>
      </div>
      {error && <p className="text-red-500 text-sm mb-10">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="relative">
          <input
            id="username"
            type="text"
            name="username"
            placeholder=""
            value={formData.username}
            onChange={handleChange}
            className="peer p-2 border-foreground border rounded w-full"
            required
          />
          <label
            htmlFor="username"
            className="absolute left-0 -top-6 text-foreground text-sm 
            peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-2
            peer-focus:left-0 peer-focus:-top-6 peer-focus:text-foreground
            peer-focus:text-sm transition-all"
          >
            Username
          </label>
        </div>
        <div className="relative">
          <input
            id="email"
            type="email"
            name="email"
            placeholder=""
            value={formData.email}
            onChange={handleChange}
            className="peer p-2 border-foreground border rounded w-full"
            required
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-6 text-foreground text-sm 
            peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-2
            peer-focus:left-0 peer-focus:-top-6 peer-focus:text-foreground
            peer-focus:text-sm transition-all"
          >
            Email
          </label>
        </div>
        <div className="relative">
          <input
            id="password"
            type="password"
            name="password"
            placeholder=""
            value={formData.password}
            onChange={handleChange}
            className="peer p-2 border-foreground border rounded w-full"
            required
          />
          <label
            htmlFor="password"
            className="absolute left-0 -top-6 text-foreground text-sm 
            peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-2
            peer-focus:left-0 peer-focus:-top-6 peer-focus:text-foreground
            peer-focus:text-sm transition-all"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="bg-secondary text-foreground px-4 py-2 rounded hover:bg-accent  transition"
        >
          Sign Up
        </button>
      </form>
      <div className="justify-center mt-3 flex">
        <p>Already have an account?&nbsp;&nbsp;</p>
        <p className="text-blue-600">
          <Link href="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
