"use client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";


async function ProfilePage() {
  const session = await auth();


  return (
    <div className="bg-gray-200 min-h-screen flex flex-col lg:flex-row">
      <aside className="w-full lg:w-1/4 bg-gray-800 p-6 text-white flex flex-col justify-between">
        <nav className="space-y-4 py-20">
          <Link
            href="/"
            className="block px-4 py-2 text-lg font-semibold rounded bg-gray-500 hover:bg-gray-600 transition-all shadow-md"
          >
            🏠 Go to Home
          </Link>
          <Link
            href="/myprofile"
            className="block px-4 py-2 text-lg font-semibold rounded bg-gray-500 hover:bg-gray-600 transition-all shadow-md"
          >
            🚀 My Profile
          </Link>
          <Link
            href="/news"
            className="block px-4 py-2 text-lg font-semibold rounded bg-gray-500 hover:bg-gray-600 transition-all shadow-md"
          >
            📰 News Feed
          </Link>
          <Link
            href="/blog"
            className="block px-4 py-2 text-lg font-semibold rounded bg-gray-600 hover:bg-gray-700 transition-all shadow-md"
          >
            ✍️ Blog Posts
          </Link>
          <button
            onClick={() => redirect("/auth/signin")}
            className="block px-4 py-2 text-lg font-semibold rounded bg-gray-700 hover:bg-gray-800 transition-all shadow-md"
          >
            🔒 Sign Out
          </button>
        </nav>
        <footer className="mt-20 text-center text-sm text-gray-400">
          Webwiz Creation 🌞 | Your Trusted Path
        </footer>
      </aside>

      <main className="w-full lg:w-3/4 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
          <div className="relative h-64 bg-gray-500 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center">
              <h1 className="text-3xl text-white font-bold">
                Welcome to the Sun Web Experience! 🌞
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center mt-12">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gray-500 shadow-lg">
              <img
                src={session?.user?.image || "/default-avatar.png"}
                alt="Profile Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center mt-6">
              <h2 className="text-3xl font-bold text-gray-700">
                {session?.user?.name || "Explorer"}
              </h2>
              <p className="text-lg text-gray-500 mt-2">
                🌟 {session?.user?.email || "Your journey begins here"}
              </p>
              <p className="text-lg text-gray-500 mt-2">
                🌟 {session?.user?.location?.city || ""}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              A Neutral Canvas for Bright Ideas 🌞
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore innovation with Sun Web. This gray-themed background is the ideal neutral base to bring warmth and vibrancy to your creativity.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition-all"
            >
              🌞 Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
