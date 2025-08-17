"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db1 } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch first batch
  useEffect(() => {
    const q = query(
      collection(db1, "blogs"),
      orderBy("createdAt", "desc"),
      limit(12)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(docs);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  // ✅ Fetch next batch
  const fetchMoreBlogs = () => {
    if (!lastDoc) return;

    setLoading(true);
    const q = query(
      collection(db1, "blogs"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(6)
    );

    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs((prev) => [...prev, ...docs]);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
      setLoading(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-30 lg:mt-40">
      <h1 className="text-center font-bold text-4xl col-span-full">Latest News</h1>
      <hr className="col-span-full" />
      <h2 className="text-xs text-center mb-10 col-span-full">
        Explore the global News
      </h2>

      {blogs.map((blog) => (
        <Link key={blog.id} href={`/blog/${blog.id}`} className="block">
          <div className="flex flex-col bg-white overflow-hidden shadow-md cursor-pointer">
            {blog.imageUrl && (
              <div className="relative w-full h-60 sm:h-56">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              {/* Title */}
              <h2 className="text-sm font-bold text-black hover:underline uppercase">
                {blog.title}
              </h2>
              {blog.description && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.description}
                </p>

              )}
            </div>
          </div>
        </Link>
      ))}

      {/* Load More Button */}
      {lastDoc && (
        <div className="col-span-full text-center mt-6">
          <button
            onClick={fetchMoreBlogs}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Loading News..." : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}
