"use client";
import UpdateProfile from "@/components/UpdateProfile";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import UserBlogs from "@/components/UserBlog";
import Ads from "@/components/Ads";

async function ProfilePage() {
const session = await auth()
if (!session) {
  redirect("/")
}
  return (
    <div className="min-h-screen bg-gray-400/5 text-white py-12 lg:px-12 mb-10">
      {/* Header info bar */}
      <div className="bg-gray-400/5 h-auto w-full py-5 border-b border-x mt-10">
        <h1 className="text-center text-white/90 text-lg font-semibold">
          Your access is confirmed.
        </h1>
        <h2 className="text-center text-white/70 text-sm mt-1">
          We are building a better way.{" "}
          <Link href="/contact">
            <span className="underline cursor-pointer text-white hover:text-gray-300 mb-10">
              SHARE YOUR THOUGHTS
            </span>
          </Link>
        </h2>
      </div>

      {/* Main profile container */}
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-6 mt-8 border border-gray-800">
        {/* Profile Cover */}
        <div className="relative bg-gray-400/5 rounded-lg shadow-inner border border-gray-700">
          <div className="absolute -bottom-12 left-6 flex items-center space-x-6">
            {/* Profile Image (no grayscale) */}
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {/* User Name (normal color) */}
            <div>
              <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
                {session?.user?.name}
              </h2>
              <p className="text-white/70 text-sm mt-1">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Spacer for profile image overlay */}
        <div className="h-16"></div>

        {/* Profile Details Section */}
        <div className="bg-gray-400/5 p-6 rounded-lg shadow-md border-x ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 uppercase tracking-wide text-xs">Name</p>
              <p className="text-white font-semibold">{session?.user?.name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 uppercase tracking-wide text-xs">Email</p>
              <p className="text-white font-semibold">
                {session?.user?.email || "Not available"}
              </p>
            </div>
          </div>

          {/* <div className="mt-8 flex justify-center">
            <Link
              href="/upload-to-blog"
              className="px-5 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition"
            >
              Upload to Wiz
            </Link>
          </div> */}

          <div className="mt-6 text-center text-gray-500 text-sm">
            Want to explore more?{" "}
            <Link href="/" className="underline hover:text-white cursor-pointer text-white">
              Go to Home →
            </Link>
          </div>
        </div>
<Ads/>
        {/* User Blogs Section */}
        <div className="mt-10">
          <UserBlogs />
        </div>

        {/* View all posts link */}
        <div className="mt-6 text-right">
          <Link
            href="/blog"
            className="text-gray-400 hover:text-white underline"
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
