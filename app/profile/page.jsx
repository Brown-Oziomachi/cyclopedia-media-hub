"use client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";


async function ProfilePage() {
  const session = await auth();


  return (
    <div className="min-h-screen bg-gray-950 py-30 flex flex-col justify-center sm:py-12">
      <div className="relative py-5 sm:max-w-xl sm:mx-auto mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-10 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">

            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={session?.user?.image || "/default-avatar.png"}
                      alt="Profile Avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {session?.user?.name || "Explorer"}
                    </p>
                    <p className="text-gray-500">
                      {session?.user?.email || "Your journey begins here"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <dt className="font-medium text-gray-900">Location:</dt>
                  <dd className="text-gray-500">
                    {session?.user?.location?.city || "Not specified"}
                  </dd>
                </div>
                <div className="flex items-center space-x-2">
                  <dt className="font-medium text-gray-900">Account Created:</dt>
                  <dd className="text-gray-500">
                    {/* Format the date if available */}
                    {session?.user?.createdAt
                      ? new Date(session?.user?.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </dd>
                </div>
                <div className="flex items-center space-x-2">
                  <dt className="font-medium text-gray-900">
                    Update Profile:
                  </dt>
                  <Link
                    href="/update-profile"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p className="text-gray-900">
                  Want to explore more?
                </p>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Go to Home &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
