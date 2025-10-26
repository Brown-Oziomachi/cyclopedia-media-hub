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

const PoliticsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "art"),
          orderBy("createdAt", "desc"),
          limit(50)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Politics posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching politics posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtPosts();
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
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-purple-700 via-rose-700 to-fuchsia-800 overflow-hidden">
  <div className="absolute inset-0 bg-black/30"></div>
  <div className="absolute w-[400px] h-[400px] bg-rose-900/40 blur-3xl rounded-full top-10 left-20"></div>
  <div className="absolute w-[300px] h-[300px] bg-purple-800/40 blur-3xl rounded-full bottom-10 right-20"></div>

  <div className="relative z-10 px-4 lg:mt-35">
    <p className="inline-block text-rose-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
      Art & Culture
    </p>
    <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
      Creativity, Heritage, and Expression
    </h1>
    <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
      Explore the vibrant world of art, music, literature, and cultural traditions.{" "}
      Discover how creativity shapes societies and celebrates human expression across generations.
    </p>
  </div>
</section>

      <div className="max-w-7xl mx-auto py-10">
        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className=" text-center text-gray-500 animate-pulse">
            Please check your network connection....
          </p>
        ) : (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
                className=" rounded-lg shadow hover:shadow-lg transition overflow-hidden"
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
                  <p className=" text-sm line-clamp-3">{post.subtitle}</p>
                </div>
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  Art & Culture
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
