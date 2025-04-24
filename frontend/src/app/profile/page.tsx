"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-all duration-300 animate-fade-in">
      <div className="flex flex-col items-center text-center">
        <img
          // Just a mock profile image
          src={`https://i.pravatar.cc/150?u=${user.username}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full shadow-md border-4 border-secondary"
        />
        <h2 className="text-2xl font-semibold mt-2 text-foreground">
          {user.username}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">User ID: {user.id}</p>

        <p className="text-gray-500 dark:text-gray-300 my-4">
          Email: {user.email}
        </p>

        <span className="mt-2 inline-block px-4 py-1 bg-secondary text-white dark:text-blue-300 rounded-full text-sm">
          Role: {user.role === "ROLE_ADMIN" ? "ADMIN" : "USER"}
        </span>
      </div>
    </div>
  );
}
