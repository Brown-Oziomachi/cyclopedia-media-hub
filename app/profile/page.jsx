"use client";

import { auth } from "@/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

function ProfilePage() {
  // State for user session
  const [session, setSession] = useState(null);
  // State for user's blog posts
  const [userBlogs, setUserBlogs] = useState([]);
  const [loadingUserBlogs, setLoadingUserBlogs] = useState(true);
  // State for feedback text
  const [feedback, setFeedback] = useState("");

  // Fetch session on component mount
  useEffect(() => {
    async function fetchSession() {
      try {
        const sess = await auth();
        console.log("User Session Data:", sess); // Debugging log
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
          const q = query(
            collection(db1, "blog"),
            where("author.email", "==", session.user.email)
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6 mt-10">
      
          <>
            <div className="text-center">
              <img
                className="h-20 w-20 mx-auto rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform duration-300"
                src={session?.user?.image || "/default-avatar.png"} // Default image fallback
                alt="Profile Avatar"
              />
              <h1 className="mt-4 text-2xl font-semibold text-white">
                {session?.user?.name || "Explorer"}
              </h1>
              <p className="text-gray-300">
                {session?.user?.email || "Your journey begins here"}
              </p>
            </div>

            <div className="mt-6 space-y-4 text-gray-200">
              <p>
                <strong>📍 Location:</strong>{" "}
                {session?.user?.location?.city || "Not specified"}
              </p>
              <p>
                <strong>📅 Account Created:</strong>{" "}
                {session?.user?.createdAt
                  ? new Date(session?.user?.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
          </>
       

        <div className="mt-6 flex justify-center">
          <Link
            href="/upload-to-blog"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
          >
            ✏️ Upload to Wiz
          </Link>
        </div>

        {/* --- User Blog Posts Section --- */}
        <div className="mt-10 w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Blog Posts</h2>
          {loadingUserBlogs ? (
            <p className="text-gray-300">Loading your blogs...</p>
          ) : userBlogs.length > 0 ? (
            <ul className="space-y-4">
              {userBlogs.map((blog) => (
                <li key={blog.id} className="bg-white/20 p-4 rounded shadow">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">
              You haven't published any blog posts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
