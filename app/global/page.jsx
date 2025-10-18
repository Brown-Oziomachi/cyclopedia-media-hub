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
    <div className="max-w-7xl mx-auto px-4 mt-28 lg:mt-36 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold">Latest News</h1>
        <p className=" text-sm mt-1">
          Explore the global headlines and in-depth insights
        </p>
        <hr className="mt-3" />
      </div>

      {/* Top Featured Section */}
      <div className="overflow-x-auto overflow-y-visible lg:overflow-visible">
        <div className="flex lg:grid lg:grid-cols-3 gap-5  lg:w-full">
          {posts.slice(0, 3).map((b) => (
            <Link
              key={b.id}
              href={`/news/${createFullSlug(b.title, b.id)}`}
              className=""
            >
              <div className="relative w-72 lg:w-full h-40">
                {b.imageUrl && (
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="object-cover w-full h-full rounded-t-xl"
                  />
                )}
                <div
                  className={`absolute top-0 left-0 ${getCategoryColor(
                    b.category
                  )} text-xs font-semibold px-3 py-1 rounded-md`}
                >
                  {b.category || "Other"}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {b.createdAt?.toDate().toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Middle Grid Section */}
      {posts.length > 4 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(4, 10).map((post) => (
            <Link
              key={post.id}
              href={`/news/${createFullSlug(post.title, post.id)}`}
              className="relative rounded-xl shadow hover:shadow-xl overflow-hidden transition-all duration-300  flex flex-col"
            >
              <div className="relative flex items-start gap-4 p-4">
                {/* Image */}
                {post.imageUrl && (
                  <div className="w-1/3">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                )}
                {/* Title and subtitle */}
                <div className="w-2/3 flex flex-col">
                  <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-sm  mt-1 line-clamp-2">
                      {post.subtitle}
                    </p>
                  )}
                  <p className="text-xs  mt-2">
                    {post.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Category badge on top-left of the card */}
              <div
                className={`absolute top-3 left-3 ${getCategoryColor(
                  post.category
                )}  text-xs font-semibold px-3 py-1 rounded-md`}
              >
                {post.category || "Other"}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter Section */}
      <div className="mx-auto text-center mt-16 mb-16 bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
        <h2 className="text-3xl font-extrabold mb-3">
          Stay Ahead of the Hidden Truths
        </h2>
        <p className="text-base md:text-lg text-gray-200 mb-6">
          Join thousands of readers who get our investigative reports and
          evidence-based insights straight to their inbox every week.
        </p>
        <a
          href="/newsletter"
          className="inline-block bg-white text-purple-700 hover:bg-purple-700 hover:text-white  font-semibold px-6 py-3 rounded-md transition-all duration-300"
        >
          Subscribe to Our Newsletter
        </a>
      </div>

      {/* More News Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.slice(10, 500).map((post) => (
          <Link
            key={post.id}
            href={`/news/${createFullSlug(post.title, post.id)}`}
            className="rounded-lg overflow-hidden shadow hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            <div className="relative h-40">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div
                className={`absolute top-0 left-0 ${getCategoryColor(
                  post.category
                )} text-xs font-semibold px-3 py-1 rounded-md`}
              >
                {post.category || "Other"}
              </div>
            </div>
            <div className="p-3">
              <h2 className="font-semibold text-sm uppercase line-clamp-2">
                {post.title}
              </h2>
              {post.subtitle && (
                <p className="text-xs line-clamp-2 mt-1">{post.subtitle}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {post.createdAt?.toDate().toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {lastDoc && (
        <div className="">
          <button
            onClick={fetchMoreBlogs}
            className=" px-6 py-3 transition items-center mb-5 justify-center mt-6 bg-purple-700 rounded-lg mx-auto text-white hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex"
            disabled={loading}
          >
            {loading ? "Loading News..." : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}
