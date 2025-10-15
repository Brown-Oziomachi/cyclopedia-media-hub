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

  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase() || "other";
    return categoryColors[cat] || categoryColors.other;
  };

    const createSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    };

    const createFullSlug = (title, id) => {
      return `${createSlug(title)}--${id}`;
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

      <div className="overflow-x-auto mb-2 lg:mt-2">
        <div className="max-md:flex space-x-2">
          {posts.slice(0, 3).map((b) => (
            <Link
              key={b.id}
              href={`/news/${createFullSlug(b.title, b.id)}`}
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

      {posts.length > 1 && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {posts.slice(4, 11).map((post) => (
            <Link
              key={post.id}
              href={`/news/${createFullSlug(post.title, post.id)}`}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Image and Title Side by Side */}
                <div className="flex gap-3 p-4">
                  {/* Image on the left */}
                  {post.imageUrl && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}

                  {/* Title on the right */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold line-clamp-3 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>

                {/* Description below */}
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 uppercase dark:text-gray-400 line-clamp-2 mb-2">
                    {post.subtitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {post.createdAt?.toDate().toDateString()}
                  </p>
                </div>

                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  Politics
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mx-auto text-center  mb-16 bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
        <h2 className="text-3xl font-extrabold mb-3">
          Stay Ahead of the Hidden Truths
        </h2>
        <p className="text-base md:text-lg text-gray-200 mb-6">
          Join thousands of readers who get our investigative reports and
          evidence-based insights straight to their inbox every week.
        </p>
        <a
          href="/newsletter"
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-all duration-300"
        >
          Subscribe to Our Newsletter
        </a>
      </div>

      {posts.slice(10, 25).map((post) => (
        <Link
          key={post.id}
          href={`/news/${createFullSlug(post.title, post.id)}`}
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
