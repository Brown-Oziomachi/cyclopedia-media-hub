"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { db1 } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

export default function EducationTicker() {
  // 🔹 Define the category used on this page

  const [activeIndex, setActiveIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducationPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "education"),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Education posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching education posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationPosts();
  }, []);

  // Static cards you already had
  

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      
      <h1 className="text-4xl font-serif font-bold mb-12 mt-40 text-center">
        Student Education in <span className="text-purple-600">Cyclopedia</span>
      </h1>
      {/* Marquee list */}
     

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
      `}</style>

      {/* 🔹 Dynamic posts fetched by CATEGORY */}
      {loading ? (
        <p className="text-center py-10">Loading latest posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center">No education posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className=" shadow-xl transition overflow-hidden"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.subtitle}
                </p>
                <p className="text-xs mt-2">
                  {post.createdAt?.toDate().toDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
