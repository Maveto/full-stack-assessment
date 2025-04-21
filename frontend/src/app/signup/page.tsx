"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FaviconImage from "@/components/FaviconImage";
import Link from "next/link";
import { signUpUser } from "@/lib/api";
import InputField from "@/components/InputField";
import Tooltip from "@/components/Tooltip";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++; // has 8 or more chars
    if (/[A-Z]/.test(password)) strength++; // has an uppercase
    if (/[a-z]/.test(password)) strength++; // has a lowercase
    if (/\d/.test(password)) strength++; // has a digits
    if (/[@$!%*?&#]/.test(password)) strength++; // has a special chars
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return setError("Passwords do not match");
    }

    if (passwordStrength < 3) {
      setLoading(false);
      return setError("Password is too weak");
    }

    try {
      await signUpUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
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
        <h1 className="text-2xl font-bold">Sign Up with Mauri Shop</h1>
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
          id="email"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
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
        >
          <div className="flex flex-row w-full items-center mt-3">
            <Tooltip
              content={
                <ul className="list-disc list-inside space-y-1">
                  <li>At least 8 characters</li>
                  <li>At least 1 lowercase</li>
                  <li>At least 1 uppercase</li>
                  <li>At least one digit</li>
                  <li>
                    At least 1 special character{" "}
                    <span className="text-yellow-300">(@$!%*?&#)</span>
                  </li>
                </ul>
              }
            >
              <p className="text-sm">Password Strength</p>
            </Tooltip>
            <div className="h-2 w-full bg-gray-400 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  passwordStrength === 0
                    ? "w-0"
                    : passwordStrength === 1
                    ? "bg-red-800 w-1/5"
                    : passwordStrength === 2
                    ? "bg-red-500 w-2/5"
                    : passwordStrength === 3
                    ? "bg-yellow-400 w-3/5"
                    : passwordStrength === 4
                    ? "bg-green-500 w-4/5"
                    : "bg-green-600 w-full"
                }`}
              ></div>
            </div>
          </div>
        </InputField>
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-blue-400 hover:cursor-progress"
              : "bg-secondary hover:bg-accent"
          } text-foreground px-4 py-2 rounded transition`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-3 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
