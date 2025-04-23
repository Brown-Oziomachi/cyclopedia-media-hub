"use client"
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { RiLoader2Line } from "react-icons/ri";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { db1 } from "@/lib/firebaseConfig";

// Component to render blog details
const BlogDetails = ({ params }) => {
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [blog, setBlog] = useState(null); // State for blog data

  // Function to handle fetching a single blog post
  const handleSingleFetch = async (id) => {
    if (!id) return null; // Return null if no ID is provided
    try {
      const blogRef = doc(db1, "blog", id);
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        return { id, ...blogDoc.data() }; // Return blog data with ID
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
    return null; // Ensure the function always returns something
  };

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true); // Show loading spinner
      const data = await handleSingleFetch(params?.id); // Pass blog ID from params
      setBlog(data); // Set fetched blog data
      setLoading(false); // Hide loading spinner
    };
    fetchBlog(); // Call the async function
  }, [params?.id]); // Dependency ensures it reruns if the ID changes

  // Return loading spinner if content is not loaded yet
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <Ring2 size="50" speed="1.10" color="blue" />
        <p className="ml-4 text-gray-300">Loading blog content...</p>
      </div>
    );
  }

  // Render blog content if available
  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <RiLoader2Line className="animate-spin text-4xl text-gray-400" />
        <p className="ml-4 text-gray-300">No blog content found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-5 py-10 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-cyan-900 via-gray-900 to-blue-900 rounded-lg p-8 shadow-lg">
        {/* Blog Image */}
        <img
          src={blog.imageUrl || "/default-image.jpg"} // Default image fallback
          alt={blog.title}
          className="w-full h-64 object-cover rounded-md mb-6 shadow-md"
        />
        {/* Blog Title */}
        <h1 className="text-4xl font-extrabold text-white mb-4">{blog.title}</h1>
        {/* Blog Metadata */}
        <div className="text-md text-gray-400 mb-1">Written by: {blog.author}</div>
        <div className="text-xs text-gray-500 mb-6">
          Published on: {blog.timestamp || "Unknown Date"}
        </div>
        {/* Blog Content */}
        <div className="leading-7 text-lg text-gray-300 whitespace-pre-line">
          {blog.body}
        </div>
      </div>

      {/* Back to Blog Link */}
      <div className="mt-10 text-center">
        <Link href="/blog">
          <button className="text-lg font-bold px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Back to Blog
          </button>
        </Link>
      </div>
    </main>
  );
};

export default BlogDetails;
