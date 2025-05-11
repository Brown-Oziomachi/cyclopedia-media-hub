"use client";
import { auth } from "@/auth";
import Link from "next/link";
import React from "react";

async function ProfilePage() {
  async function getSession() {
    return await auth();
  }
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6">
        <div className="text-center">
          <img
            className="h-20 w-20 mx-auto rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform duration-300"
            src={session?.user?.image || "/default-avatar.png"}
            alt="Profile Avatar"
          />
          <h1 className="mt-4 text-2xl font-semibold text-white">{session?.user?.name || "Explorer"}</h1>
          <p className="text-gray-300">{session?.user?.email || "Your journey begins here"}</p>
        </div>

        <div className="mt-6 space-y-4 text-gray-200">
          <p><strong>📍 Location:</strong> {session?.user?.location?.city || "Not specified"}</p>
          <p><strong>📅 Account Created:</strong> {session?.user?.createdAt ? new Date(session?.user?.createdAt).toLocaleDateString() : "Unknown"}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/upload-to-blog"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
          >
            ✏️ Upload to Wiz
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400">Want to explore more?</p>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
          >
            🌎 Go to Home →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
