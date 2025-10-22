"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

const SportsPage = () => {
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
    const fetchPoliticsPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "sports"),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched sports posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching sports posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticsPosts();
  }, []);

  return (
    <main className="w-full">
      <section
        className="relative w-full h-[500px] lg:mt-35 flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url(/sport.jpg)",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/20 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-red-600/20 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-yellow-400 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Sports
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Speed, Strength, and Strategy
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Explore the world of sports — thrilling matches, record-breaking
            performances, and the athletes who push the limits to achieve
            greatness on every field.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-10">
        {posts[0] && (
          <div className="mb-12">
            <Link href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}>
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ">
                {posts[0].imageUrl && (
                  <div className=" h-64 lg:h-96">
                    <img
                      src={posts[0].imageUrl}
                      alt={posts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-purple-600 uppercase mb-2 tracking-wider">
                    Latest News
                  </span>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Politics
                  </div>
                  <h2 className="text-2xl uppercase lg:text-3xl font-bold mb-4 hover:text-purple-600 transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-base">
                    {posts[0].subtitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {posts[0].createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className=" text-center text-gray-500 animate-pulse">
            Please check your network connection....
          </p>
        ) : (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.slice(1, 5).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
                className="relative rounded-lg shadow-xl  transition overflow-hidden"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Sports
                  </div>
                  <h2 className="text-sm font-semibold mb-2">{post.title}</h2>
                  <p className=" text-sm line-clamp-3">{post.subtitle}</p>
                  <p className="text-xs mt-2">
                    {post.createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Static Cards */}

        <div className="mx-auto text-center mt-10">
          <ViewMoreSearchPopup />
        </div>
      </div>
    </main>
  );
};

export default SportsPage;



