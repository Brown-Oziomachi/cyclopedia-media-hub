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
    <section className="max-w-4xl mx-auto py-10">
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-sky-700 via-blue-800 to-cyan-900 overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-900/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-cyan-800/40 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-sky-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Education
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Unlocking Minds, Shaping Futures
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Explore the evolution of learning — from classrooms to digital
            spaces. Discover how innovation, policy, and passion are redefining
            education for generations to come.
          </p>
        </div>
      </section>

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

      {loading ? (
        <p className="text-center py-10">Loading latest posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center">
          Please check your network connection.
        </p>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${createFullSlug(post.title, post.id)}`}
              className="relative shadow-xl transition overflow-hidden"
            >
              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                Education
              </div>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className=" w-full h-48 object-cover"
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
