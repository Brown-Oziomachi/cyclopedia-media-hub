"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import ViewMoreSearchPopup from "../view/page";

const PoliticsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper functions
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const createFullSlug = (title, id) => {
    return `${createSlug(title)}--${id}`;
  };

  useEffect(() => {
    const fetchTechnologyPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");

        // Main query: category + createdAt
        let q = query(
          postsRef,
          where("category", "==", "technology"),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        let querySnapshot;

        try {
          querySnapshot = await getDocs(q);
        } catch (err) {
          console.warn(
            "Composite index for (category + createdAt) missing. Falling back to latest posts only."
          );

          // Fallback query (no category filter)
          q = query(postsRef, orderBy("createdAt", "desc"), limit(5));
          querySnapshot = await getDocs(q);
        }

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologyPosts();
  }, []);

  return (
    <main className="w-full">
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute w-[400px] h-[400px] bg-black/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-black/30 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-indigo-700 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Technology
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Tomorrow’s World, Today
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Discover breakthroughs shaping our future — from AI and space
            exploration to biotechnology and clean energy. Step into a world
            where innovation meets imagination, redefining what it means to be
            human in the digital age.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-10">
        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 animate-pulse">
            No posts found. Please check your network or Firestore data.
          </p>
        ) : (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
                className="relative rounded-lg shadow-xl transition overflow-hidden"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-sm font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm line-clamp-3">{post.subtitle}</p>
                  <p className="text-xs mt-2">
                    {post.createdAt?.toDate
                      ? post.createdAt.toDate().toDateString()
                      : ""}
                  </p>
                </div>
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  Technology
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mx-auto text-center mt-10">
          <ViewMoreSearchPopup />
        </div>
      </div>
    </main>
  );
};

export default PoliticsPage;
