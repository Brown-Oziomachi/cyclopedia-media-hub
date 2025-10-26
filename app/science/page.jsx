"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";
import { db1 } from "@/lib/firebaseConfig";

const Page = () => {
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
    const fetchSciencePosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "science"),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Science posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching science posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSciencePosts();
  }, []);

  return (
    <main className="w-full">
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-blue-600 via-cyan-700 to-indigo-800 overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute w-[400px] h-[400px] bg-black/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-black/30 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4 lg:mt-35">
          <p className="inline-block text-cyan-700 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Science
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Tomorrow’s World, Today
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Discover breakthroughs shaping our future — AI, space travel,
            biotechnology, and more. Dive into the wonders, challenges, and
            ethical frontiers of the modern age, where science meets
            imagination.
          </p>
        </div>
      </section>

      {/* 🔹 Dynamic Firestore Posts */}
      {posts.length > 0 && (
        <div className="max-w-7xl mx-auto py-10">
          <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
              >
                <div className="relative rounded-lg shadow-xl transition overflow-hidden">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Science
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <h3 className="text-xs mt-2">{post.subtitle}</h3>
                    <p className="text-xs mt-2">
                      {post.createdAt?.toDate().toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 🔹 Static Science Cards */}
      <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === Static NEWS CARD 1 === */}
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <Image
              src="/reli.png"
              alt="News 1"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4 rounded-b-xl">
            <Link
              href={`/news/${createFullSlug(
                "Review: Religion, Science, and Empire",
                "5ucZczUCM0xYIsUEbamY"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Review: Religion, Science, and Empire
              </h2>
            </Link>
            <p className="text-xs mt-1">By Anand Venkatkrishnan</p>
            <p className="mt-2 text-xs">
              Anand Venkatkrishnan reviews Religion, Science, and Empire by
              Peter Gottschalk.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Science
          </div>
        </div>

        {/* === Static NEWS CARD 2 === */}
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <Image
              src="/sciat.png"
              alt="News 2"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4 rounded-b-xl">
            <Link
              href={`/news/${createFullSlug(
                "Science or Academic Atheism?",
                "IDins9X9XoPgmhW9FTBi"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Science or Academic Atheism?
              </h2>
            </Link>
            <p className="text-xs mt-1">Published on August 8, 2011</p>
            <p className="mt-2 text-xs">
              What happens when we give scientists the authority to speak about
              God?
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Science
          </div>
        </div>

        {/* === Static NEWS CARD 3 === */}
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <Image
              src="/heal.png"
              alt="News 3"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4 rounded-b-xl">
            <Link
              href={`/news/${createFullSlug(
                "Healed and Whole Forever: On Psychedelic Science & Spirituality",
                "BlKwDu4niv82rMzxTDVF"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Healed and Whole Forever: On Psychedelic Science & Spirituality
              </h2>
            </Link>
            <p className="text-xs mt-1">Published on January 25, 2016</p>
            <p className="mt-2 text-xs">
              Patricia Kubala explores the connection between drugs, healing,
              and spirituality.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Science
          </div>
        </div>

        {/* === Static NEWS CARD 4 === */}
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <Image
              src="/jews.png"
              alt="News 4"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4 rounded-b-xl">
            <Link
              href={`/news/${createFullSlug(
                "Christian Science as Jewish Tradition",
                "tx8eWd93N7HyChUseSob"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Christian Science as Jewish Tradition
              </h2>
            </Link>
            <p className="text-xs mt-1">By Noah Berlatsky (June 11, 2024)</p>
            <p className="mt-2 text-xs">
              Why did so many American Jewish women find Christian Science
              appealing?
            </p>
          </div>
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Science
          </div>
        </div>
      </div>

      {/* 🔹 View More */}
      <div className="mx-auto text-center mt-12">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
