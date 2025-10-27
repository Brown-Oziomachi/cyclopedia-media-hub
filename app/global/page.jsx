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

  // Define legal/justice categories to exclude
  const legalCategories = [
    "criminal-law",
    "family-law",
    "personal injury",
    "real estate law",
    "employment-law",
    "litigation-appeals",
    "car accidents",
    "divorce",
    "medical-malpractice",
    "custody & visitation",
    "landlord-tenant-law",
    "estate planning",
    "justice",
    "law",
    "legal",
    "family-law",
    "landlord-tenant-law",
  ];

  // Helper function to check if post is legal/justice related
  const isLegalPost = (category) => {
    if (!category) return false;
    const cat = category.toLowerCase();
    return legalCategories.some(
      (legal) => cat.includes(legal) || legal.includes(cat)
    );
  };

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

  // ✅ Fetch first batch with real-time updates (filtered)
  useEffect(() => {
    const q = query(
      collection(db1, "blogs"),
      orderBy("createdAt", "desc"),
      limit(50) // Fetch more to account for filtering
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docs = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => !isLegalPost(post.category)); // Filter out legal posts

        setPosts(docs.slice(0, 12)); // Take first 12 after filtering
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMoreBlogs = async () => {
    if (!lastDoc) return;

    setLoading(true);
    const q = query(
      collection(db1, "blogs"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(20) // Fetch more to account for filtering
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docs = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((post) => !isLegalPost(post.category)); // Filter out legal posts

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
    <div className="max-w-7xl mx-auto mt-10 lg:mt-36 space-y-12">
      <section
        className="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Gradient Blurs - representing different sections */}
        <div className="absolute w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full top-10 left-10"></div>
        <div className="absolute w-[350px] h-[350px] bg-blue-500/30 blur-3xl rounded-full bottom-20 right-20"></div>
        <div className="absolute w-[250px] h-[250px] bg-emerald-400/30 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block bg-white/80 text-transparent bg-clip-text font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500">
            Global Spotlight
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Latest News
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            A fusion of stories from every corner — politics, culture, sports,
            health, and innovation. <br className="max-md:hidden" />
            Dive into the pulse of the world and uncover the narratives shaping
            our collective reality.
          </p>
        </div>
      </section>

      {/* Top 3 Posts - Image Overlay Design */}
      <div className="overflow-x-auto overflow-y-visible lg:overflow-visible">
        <div className="flex lg:grid lg:grid-cols-3 gap-5 lg:w-full">
          {posts.slice(0, 3).map((b) => (
            <Link
              key={b.id}
              href={`/news/${createFullSlug(b.title, b.id)}`}
              className="group"
            >
              <div className="relative w-72 lg:w-full h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Background Image */}
                {b.imageUrl && (
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div
                  className={`absolute top-3 left-3 ${getCategoryColor(
                    b.category
                  )} text-white text-xs font-semibold px-3 py-1 rounded-md z-10`}
                >
                  {b.category || "Other"}
                </div>

                {/* Text Content on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-base md:text-lg line-clamp-3 group-hover:text-blue-300 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2">
                    {b.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Middle Grid Section - Image Overlay Design */}
      {posts.length > 4 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(4, 10).map((post) => (
            <Link
              key={post.id}
              href={`/news/${createFullSlug(post.title, post.id)}`}
              className="relative rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 h-80 group"
            >
              {/* Background Image */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              
              {/* Category Badge */}
              <div
                className={`absolute top-3 left-3 ${getCategoryColor(
                  post.category
                )} text-white text-xs font-semibold px-3 py-1 rounded-md z-10`}
              >
                {post.category || "Other"}
              </div>

              {/* Text Content on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-semibold text-base md:text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h3>
                {post.subtitle && (
                  <p className="text-sm text-gray-200 mt-2 line-clamp-2">
                    {post.subtitle}
                  </p>
                )}
                <p className="text-xs text-gray-300 mt-2">
                  {post.createdAt?.toDate().toLocaleString()}
                </p>
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
          className="inline-block bg-white text-purple-700 hover:bg-purple-700 hover:text-white font-semibold px-6 py-3 rounded-md transition-all duration-300"
        >
          Subscribe to Our Newsletter
        </a>
      </div>

      {/* More News Section - Image Overlay Design */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.slice(10, 500).map((post) => (
          <Link
            key={post.id}
            href={`/news/${createFullSlug(post.title, post.id)}`}
            className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            {/* Background Image */}
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            
            {/* Category Badge */}
            <div
              className={`absolute top-3 left-3 ${getCategoryColor(
                post.category
              )} text-white text-xs font-semibold px-3 py-1 rounded-md z-10`}
            >
              {post.category || "Other"}
            </div>

            {/* Text Content on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="font-semibold text-sm uppercase line-clamp-2 group-hover:text-blue-300 transition-colors">
                {post.title}
              </h2>
              {post.subtitle && (
                <p className="text-xs text-gray-200 line-clamp-2 mt-1">
                  {post.subtitle}
                </p>
              )}
              <p className="text-xs text-gray-300 mt-2">
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
            className="px-6 py-3 transition items-center mb-5 justify-center mt-6 bg-purple-700 rounded-lg mx-auto text-white hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex"
            disabled={loading}
          >
            {loading ? "Loading News..." : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}