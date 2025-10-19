"use client";
import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function UserProfileButton({ setShowNavOpen }) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const userEmail = user?.email || "user@example.com";
  const userInitial = userEmail.charAt(0).toUpperCase();
  const displayImage = user?.profileImage;

  const handleProfileClick = async () => {
    if (setShowNavOpen) {
      setShowNavOpen(false);
    }
    setTimeout(() => {
      router.push("/profiles");
    }, 100);
  };

  return (
    <button
      onClick={handleProfileClick}
      className="flex items-center gap-2 p-2 hover:opacity-80 transition rounded-lg"
    >
      {displayImage ? (
        <img
          src={displayImage}
          alt={user?.name}
          className="w-10 h-10 mt-10  rounded-full object-cover border-2 border-purple-500"
        />
      ) : (
        <div className="w-10 h-10 mt-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
          {userInitial}
        </div>
      )}
      <span className="text-sm mt-10 font-semibold text-gray-200">
        {user?.name || "User"}
      </span>
    </button>
  );
}
