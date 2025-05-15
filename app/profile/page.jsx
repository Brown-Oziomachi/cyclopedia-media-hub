"use client";
import UpdateProfile from "@/components/UpdateProfile";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";


  async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin"); // Redirect if not authenticated
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-400 py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 mt-10">
        {/* Profile Cover */}
        <div className="relative  bg-gradient-to-br from-gray-900 via-gray-800 to-orange-400 h-40 rounded-lg shadow-md">
          <div className="absolute -bottom-10 left-4 flex items-center space-x-4">
            {/* Profile Image */}
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            {/* User Name & Email */}
            <div>
              <h2 className="text-xl font-bold text-white">
                {session?.user?.name}
              </h2>
            </div>
          </div>
        </div>
</div>
        {/* Profile Details */}
        <div className="mt-16 bg-gray-900/100 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-5">
              <p className="text-gray-200">Name:</p>
              <p className="font-medium text-gray-300">{session?.user?.name || "N/A"}</p>
            </div>
            <div className="flex gap-5">
              <p className="text-gray-200">Email:</p>
              <p className="font-medium text-gray-300">{session?.user?.email || "Not available"}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/upload-to-blog"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
            >
               Upload to Wiz
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400">Want to explore more?</p>
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
            >
              Go to Home →
            </Link>
          </div>
        </div>

<div className="mt-4 text-right">
  <Link
    href="/blog"
    className="text-blue-100 hover:text-blue-200 underline"
  >
    View All Posts →
  </Link>
</div>

</div>
  )
}

export default ProfilePage;