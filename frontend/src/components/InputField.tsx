"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputFieldProps {
  children?: React.ReactNode;
  id: string;
  label: string;
  type?: string;
  name: string;
  value?: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  error?: string;
}

export default function ({
  children,
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  error,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=""
          className={`peer p-2 border rounded w-full ${
            error ? "border-red-500" : "border-foreground"
          }`}
        />
      ) : (
        <input
          id={id}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=""
          className={`peer p-2 border rounded w-full ${
            error ? "border-red-500" : "border-foreground"
          }`}
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-0 -top-6 text-foreground text-sm 
            peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-2
            peer-placeholder-shown:text-gray-500 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-foreground
            peer-focus:text-sm transition-all"
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-gray-500 hover:text-primary focus:outline-none"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {children}
    </div>
  );
}
