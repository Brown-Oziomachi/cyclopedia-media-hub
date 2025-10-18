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
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center max-lg:mt-40 lg:mt-50 mb-2">
          Innovation, Tech, and the Future
        </h1>
        <p className="text-sm lg:text-base text-center mx-auto mb-10">
          Explore breakthroughs in AI, robotics, space exploration, and digital
          innovations. <br className="max-md:hidden" />
          Discover how technology is shaping our world and transforming everyday
          life.
        </p>

        {/* Posts */}
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
