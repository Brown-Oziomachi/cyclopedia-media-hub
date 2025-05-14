"use client";
import UpdateProfile from "@/components/UpdateProfile";
// import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

function ProfilePage() {
  
  const [session, setSession] = useState([])
  const [userBlogs, setUserBlogs] = useState([]);
  const [loadingUserBlogs, setLoadingUserBlogs] = useState(true);
  
 
  useEffect(() => {
    async function fetchSession() {
      const session = await auth();
      console.log("Session fetched:", session); // Debugging session
      setSession(session);
    }
    fetchSession();
  }, []);
 const uid = session?.user?.id;
const currentName = session?.user?.name;


  // Fetch user blogs when session is available
  // and user is logged in
  useEffect(() => {
    if (!session) return;
    if (session.error) {
      console.error("Session error:", session.error); // Debugging session error
      return;
    }
    if (!session.user) {
      console.log("No user in session"); // Debugging no user
      return;
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email) {
      async function fetchUserBlogs() {
        setLoadingUserBlogs(true);
        try {
          console.log("Fetching blogs for:", session.user.email); // Debugging email
          const q = query(
            collection(db1, "blog"),
            where("author.email", "==", session.user.email)
          );
          const querySnapshot = await getDocs(q);
          console.log("Query Snapshot:", querySnapshot.docs); // Debugging Firestore response

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-400 py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 mt-10">
        {/* Profile Cover */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-400 h-40 rounded-lg shadow-md">
          <p className="text-3xl text-center shadow-2xl text-orange-400">Welcome to Webwiz Creation website</p>{" "}
          <div className="absolute -bottom-10 left-4 flex items-center space-x-4">
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {session?.user?.name || "User Name"}
              </h1>
              <p className="text-gray-300">
                {session?.user?.email || "@example.com"}
              </p>
            </div>
          </div>
        </div>
        {/* User Info Section */}

        {/* Profile Update Form */}
        <div className="mt-20">
        
      {uid && <UpdateProfile uid={uid} currentName={currentName} />}
    </div>
            
        {/* Upload to Blog Section */}
        <div className="mt-10">
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

        {/* Blog Posts Section */}
        <div className="mt-10 w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Your Blog Posts
          </h2>
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
  );
}

export default ProfilePage;
