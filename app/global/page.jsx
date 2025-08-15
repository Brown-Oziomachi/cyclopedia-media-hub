"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db1 } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [lastIndex, setLastIndex] = useState(0); // track last index for pagination
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (initial = false) => {
    setLoading(true);
    try {
      const blogsRef = collection(db1, "blogs");
      const snapshot = await getDocs(blogsRef);
      const allBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (initial) {
        setBlogs(allBlogs.slice(0, 15));
        setLastIndex(15);
      } else {
        const nextBlogs = allBlogs.slice(lastIndex, lastIndex + 3);
        setBlogs((prev) => [...prev, ...nextBlogs]);
        setLastIndex((prev) => prev + 3);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(true); // initial fetch
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-30 lg:mt-40">
      <h1 className="text-center  font-bold text-4xl">Global</h1>
      <hr />
      <h2 className="text-xs text-center mb-10">
        Explore the global News  
      </h2>

      {blogs.map((blog) => (
        <Link key={blog.id} href={`/blog/${blog.id}`} className="block">
          <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-md cursor-pointer">
            {blog.imageUrl && (
              <div className="relative w-full h-48 sm:h-56">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-base font-bold text-black hover:underline uppercase">
                {blog.title}
              </h2>
              <div className="flex gap-2 items-center mt-2 flex-wrap">
                <span className="text-orange-600 text-sm uppercase">
                  TAGGED:
                </span>
                {blog.tags?.map((tag, i) => (
                  <Link
                    key={i}
                    href={`/search?q=${tag.toLowerCase()}`}
                    className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}

      {lastIndex < blogs.length + 3 && ( // show button only if there are more blogs
        <div className="col-span-full text-center mt-6">
          <button
            onClick={() => fetchBlogs(false)}
            className="bg-purple-600 hover:bg-purple-600 text-white px-6 py-3 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}
