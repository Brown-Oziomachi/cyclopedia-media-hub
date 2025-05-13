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
      const sess = await auth();
      setSession(sess);
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

  // Handler for the feedback form
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("User Feedback:", feedback);
    // Extend this to send feedback to your backend or store it in Firestore
    setFeedback("");
    alert("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6 mt-10">
        {session ? (
          <>
            <div className="text-center">
              <img
                className="h-20 w-20 mx-auto rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform duration-300"
                src={session?.user?.image || "/default-avatar.png"}
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
        ) : (
          <p className="text-gray-300 text-center">Loading profile...</p>
        )}

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

      {/* --- New Section: Your Blog Posts --- */}
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

      {/* --- New Section: Feedback Form --- */}
      <div className="mt-10 w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Leave Us Feedback</h2>
        <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full p-3 rounded-md bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-500"
            placeholder="Your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
