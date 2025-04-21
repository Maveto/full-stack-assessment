"use client";

import FaviconImage from "@/components/FaviconImage";
import InputField from "@/components/InputField";
import { useAuth } from "@/hooks/useAuth";
import { login } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const { login: saveUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login({
        username: formData.username,
        password: formData.password,
      });
      saveUser(user);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex flex-col items-center mb-8">
        <FaviconImage size={50} />
        <h1 className="text-2xl font-bold">Log into Mauri Shop</h1>
      </div>
      {error && <p className="text-red-500 text-sm mb-8">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <InputField
          id="username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <InputField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-blue-400 hover:cursor-not-allowed"
              : "bg-secondary hover:bg-accent"
          } text-foreground px-4 py-2 rounded transition`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="mt-3 text-center">
        <p>
          Don't have an account yet?{" "}
          <Link href="/signup" className="text-blue-600">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
}
