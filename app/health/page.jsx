"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

export default function HealthSubHeadings() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "health"),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Health posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching Health posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthPosts();
  }, []);

  return (
    <section className="relative px-4 py-12 max-w-6xl mx-auto overflow-hidden">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-green-700 relative z-10 mt-30">
        CYCLOPEDIA Health
      </h1>

      <div className="mt-12 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          Latest Health Articles
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading latest post...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No health posts available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-white border rounded-lg shadow hover:shadow-lg"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                {post.subtitle && (
                  <p className="text-gray-600 text-sm mb-3">{post.subtitle}</p>
                )}
                <Link
                  href={`/blogs/${post.id}`} // ✅ fixed from blog.id → post.id
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Magical glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-green-100 to-green-50 opacity-30 rounded-lg pointer-events-none animate-pulse"></div>
    </section>
  );
}
