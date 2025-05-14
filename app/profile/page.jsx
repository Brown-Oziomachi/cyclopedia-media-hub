"use client";

import { auth } from "@/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import UpdateProfile from "@/components/UpdateProfile";

function ProfilePage() {
  // State for user session
  const [session, setSession] = useState(null);
  // State for user's blog posts
  const [userBlogs, setUserBlogs] = useState([]);
  const [loadingUserBlogs, setLoadingUserBlogs] = useState(true);

  // Fetch session on component mount
  useEffect(() => {
    async function fetchSession() {
      try {
        const sess = await auth();
        console.log("User Session Data:", sess);
        setSession(sess);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }
    fetchSession();
  }, []);

  // Fetch user's blog posts once session is available
  useEffect(() => {
    if (session?.user?.email) {
      async function fetchUserBlogs() {
        setLoadingUserBlogs(true);
        try {
          // Fetch posts authored by the user by matching email.
          // Additionally, order posts based on a 'createdAt' field.
          const q = query(
            collection(db1, "blog"),
            where("author.email", "==", session.user.email),
            orderBy("createdAt", "desc") // Optional, if you store a createdAt timestamp
          );
          const querySnapshot = await getDocs(q);
          const blogs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserBlogs(blogs);
        } catch (error) {
          console.error("Error fetching user blogs:", error);
        } finally {
          setLoadingUserBlogs(false);
        }
      }
      fetchUserBlogs();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-orange-400 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white mt-10">Your Dashboard</h1>
        <p className="mt-2 text-lg text-gray-200">
          Welcome to your personal dashboard
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-lg rounded-xl shadow-xl p-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <img
            src={session?.user?.image || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform duration-300"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">
              {session?.user?.name || "User"}
            </h2>
            <p className="text-gray-200">
              {session?.user?.email || "Email not provided"}
            </p>
          </div>
        </div>

        <div className="mt-6 text-gray-200">
          <div className="mb-2">
            <span className="font-semibold">Location: </span>
            <span>{session?.user?.location?.city || "Not Specified"}</span>
          </div>
          <div>
            <span className="font-semibold">Account Created: </span>
            <span>
              {session?.user?.createdAt
                ? new Date(session.user.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>
        </div>

        <Link
          href="/upload-to-blog"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl shadow hover:bg-blue-600 transition-colors duration-300"
        >
          ✏️ Upload to Wiz
        </Link>

        {/* Blog Posts Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Your Posts</h2>
          {loadingUserBlogs ? (
            <p className="text-gray-200">Loading your posts...</p>
          ) : userBlogs.length > 0 ? (
            <ul className="space-y-4">
              {userBlogs.map((blog) => (
                <li
                  key={blog.id}
                  className="bg-white/30 p-4 rounded-lg shadow hover:bg-white/40 transition-colors duration-300"
                >
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-blue-200 hover:text-blue-300"
                  >
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-200">
              You haven't published any blog posts yet.
            </p>
          )}

          <div className="mt-4 text-right">
            <Link
              href="/blog"
              className="text-blue-100 hover:text-blue-200 underline"
            >
              View All Posts →
            </Link>
          </div>
        </div>
      </div>

      {/* Update Profile Section */}
      {session?.user?.id && (
        <div className="max-w-4xl mx-auto mt-8">
          <UpdateProfile uid={session.user.id} currentName={session.user.name} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
