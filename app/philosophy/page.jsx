"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
     const fetchphilosophysPosts = async () => {
       try {
         const postsRef = collection(db1, "blogs");
         const q = query(
           postsRef,
           where("category", "==", "philosophy"),
           orderBy("createdAt", "desc"),
           limit(6)
         );
 

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchphilosophysPosts();
 }, []);
  
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
    <main className="w-full">
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-teal-700 via-emerald-800 to-green-900 overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute w-[400px] h-[400px] bg-green-900/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-teal-700/40 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-emerald-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Health
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            The Battle for Truth
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Exploring philosophical debates, critical thinking, and
            truth-seeking in the realm of health — where science, ethics, and
            the human spirit meet.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-12">
        {loading ? (
          <p className="text-gray-600">Loading latest posts</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600 text-center">
            Please check your network connection
          </p>
        ) : (
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.id} className=" rounded-lg shadow-2xl p-4">
                <Link href={`/news/${createFullSlug(post.title, post.id)}`}>
                  <h3 className="font-bold text-lg hover:underline">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm ">
                  {post.subtitle || "No description available."}
                </p>
                <p className="text-xs mt-2">
                  {post.createdAt?.toDate().toDateString()}
                </p>
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  Philosophy
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === STATIC CARDS === */}

      {/* View More Button */}
      <div className="mx-auto text-center">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
