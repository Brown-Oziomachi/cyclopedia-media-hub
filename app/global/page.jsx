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
  getDocs,
} from "firebase/firestore";

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  // Category colors mapping
  const categoryColors = {
    politics: "bg-red-600",
    religion: "bg-red-600",
    history: "bg-red-600",
    education: "bg-red-600",
    health: "bg-red-600",
    sports: "bg-red-600",
    technology: "bg-red-600",
    entertainment: "bg-red-600",
    business: "bg-red-600",
    other: "bg-red-500",
  };

  // ✅ Fetch first batch with real-time updates
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
        setPosts(docs);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch next batch
  const fetchMoreBlogs = async () => {
    if (!lastDoc) return;

    setLoading(true);
    const q = query(
      collection(db1, "blogs"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(6)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts((prev) => [...prev, ...docs]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    }

    setLoading(false);
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase() || "other";
    return categoryColors[cat] || categoryColors.other;
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-30 lg:mt-40">
      <h1 className="text-center font-bold text-4xl col-span-full">
        Latest News
      </h1>
      <hr className="col-span-full" />
      <h2 className="text-xs text-center mb-10 col-span-full">
        Explore the global News
      </h2>

      {/* Middle row - scrollable small cards */}
      <div className="overflow-x-auto mb-2 lg:mt-2">
        <div className="max-md:flex space-x-2">
          {posts.slice(3, 6).map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.id}`}
              className="flex-shrink-0 w-56 relative"
            >
              <div className="flex flex-col rounded-md overflow-hidden shadow-md cursor-pointer">
                {b.imageUrl && (
                  <div className="relative w-full h-24">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="object-cover w-full h-full"
                    />
                    {/* Category badge */}
                    <div
                      className={`absolute top-2 left-2 ${getCategoryColor(
                        b.category
                      )} text-white text-xs font-semibold px-2 py-1 rounded-md z-10`}
                    >
                      {b.category || "Other"}
                    </div>
                  </div>
                )}
                <div className="p-2">
                  <h2 className="text-sm font-bold hover:underline uppercase truncate">
                    {b.title}
                  </h2>
                  <h3 className="text-xs">{b.subtitle}</h3>
                  <p className="text-xs mt-1">
                    {b.createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main grid posts */}
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className="block relative"
        >
          <div className="flex flex-col overflow-hidden shadow-md cursor-pointer mt-3 max-md:-mt-10">
            {post.imageUrl && (
              <div className="relative w-full h-48 sm:h-40">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
                {/* Category badge */}
                <div
                  className={`absolute top-2 left-2 ${getCategoryColor(
                    post.category
                  )} text-white text-xs font-semibold px-3 py-1 rounded-md z-10`}
                >
                  {post.category || "Other"}
                </div>
              </div>
            )}
            <div className="p-3">
              <h2 className="text-sm font-bold hover:underline uppercase">
                {post.title}
              </h2>
              {post.subtitle && (
                <p className="text-sm line-clamp-3">{post.subtitle}</p>
              )}
              <h3>
                <p className="text-xs mt-2">
                  {post.createdAt?.toDate().toDateString()}
                </p>
              </h3>
            </div>
          </div>
        </Link>
      ))}

      {/* Load More Button */}
      {lastDoc && (
        <div className="col-span-full text-center mt-6 mb-5">
          <button
            onClick={fetchMoreBlogs}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Loading News..." : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}
