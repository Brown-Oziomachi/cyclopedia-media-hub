"use client";

import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db1 } from "@/lib/firebaseConfig";

const Page = ({ session }) => {
  const [blog, setBlog] = useState([]); // Stores all blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Stores filtered blogs based on category
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedCategory, setSelectedCategory] = useState(null); // Tracks currently selected category

  // Fetch blog posts from Firebase
  const fetchBlog = async () => {
    setLoading(true);
    try {
      const blogData = [];
      const querySnapshot = await getDocs(collection(db1, "blog"));
      querySnapshot.forEach((doc) => {
        const blog = { id: doc.id, ...doc.data() };
        blogData.push(blog);
      });
      setBlog(blogData); // Store all blog data
      setFilteredBlogs(blogData); // Initially, show all blogs
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  // Filter blogs by category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = blog.filter((item) => item.genre === category);
    setFilteredBlogs(filtered);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white px-8 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold">Discover Amazing Blog Posts</h1>
          <p className="mt-4 text-xl text-gray-400">
            Inspiration, Stories, and Insights
          </p>
        </header>

        {/* Popular Categories Section */}
        <div className="mb-12">
          <h2 className="text-center text-3xl font-extrabold mb-6">
            Popular Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Technology", "Lifestyle", "Coding", "Health", "Finance", "Travel"].map(
              (category, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ${
                    selectedCategory === category
                      ? "bg-yellow-600 text-black"
                      : "bg-yellow-500 text-black hover:bg-yellow-600"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        {/* Display Selected Category */}
        {selectedCategory && (
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-300">
              Showing posts for:{" "}
              <span className="text-yellow-500 font-bold">{selectedCategory}</span>
            </h3>
          </div>
        )}

        {/* Blog Section */}
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {filteredBlogs.map((item, index) => (
              <article
                key={index}
                className="p-6 rounded-lg bg-gradient-to-b from-gray-900 to-gray-700 shadow-lg relative"
              >
                <img
                  src={item.imageUrl || "/default-image.jpg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-4 py-10"
                />
                <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full">
                  {item.genre || "General"}
                </span>
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold mb-3 text-center">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
                  <p className="line-clamp-3 text-sm text-gray-300 mb-4 text-center">
                    {item.body}
                  </p>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Posted on {item.timestamp || "Unknown Date"}
                </p>
                <Link
                  href={`/blog/${item.id}`}
                  className="mt-5 block px-4 py-2 bg-yellow-500 text-black rounded-full text-center font-semibold hover:bg-yellow-600 transition-all"
                >
                  Read More <MdKeyboardDoubleArrowRight className="inline-block ml-1" />
                </Link>
              </article>
            ))}
          </section>
        ) : (
          <div className="text-center text-lg text-gray-300">
            No blog posts available for the selected category.
          </div>
        )}

        {/* About Section */}
        <div className="mt-20 bg-gray-800 p-6 rounded-lg text-center">
          <h2 className="text-3xl font-extrabold mb-4">About Our Blog</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Dive into stories and insights that inspire, educate, and entertain.
            From technology and web development to lifestyle and creativity, we
            bring diverse perspectives together in one place.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
