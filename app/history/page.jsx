"use client";

import { useEffect, useState } from "react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch history blogs from db1
  useEffect(() => {
    const fetchHistoryPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "history"),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched History posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching history posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryPosts();
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
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-yellow-800 via-amber-900 to-yellow-950 overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute w-[400px] h-[400px] bg-black/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-black/30 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4 lg:mt-50">
          <p className="inline-block text-yellow-900 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            History
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg font-serif">
            Uncovering the Hidden Past
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Delve into the depths of forgotten events, suppressed truths, and
            powerful legacies that continue to shape our present. Explore
            history from perspectives often left out of mainstream narratives.
          </p>
        </div>
      </section>

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
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  History
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

      {posts.length > 1 && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {posts.slice(1, 5).map((post) => (
            <Link
              key={post.id}
              href={`/news/${createFullSlug(post.title, post.id)}`}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Image and Title Side by Side */}
                <div className="flex gap-3 p-4">
                  {/* Image on the left */}
                  {post.imageUrl && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}

                  {/* Title on the right */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold line-clamp-3 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>

                {/* Description below */}
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 uppercase dark:text-gray-400 line-clamp-2 mb-2">
                    {post.subtitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {post.createdAt?.toDate().toDateString()}
                  </p>
                </div>

                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  History
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* CARD 1 */}
        <div className="relative rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image
              src="/slavery.png"
              alt="News 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Americans Say Government Should Address Slavery Effects",
                "QUnWDFG1eBq2x4ejSLcs"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Americans Say Government Should Address Slavery Effects
              </h2>
            </Link>
            <p className="text-xs mt-1">by Cyclopedia</p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            History
          </div>
        </div>

        <div className="relative rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image src="/his.png" alt="News 2" fill className="object-cover" />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "History of Missional Church",
                "ggrMyhU1qWNwmX8sfubI"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                History of Missional Church
              </h2>
            </Link>
            <p className="text-xs mt-1">by Cyclopedia</p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            History
          </div>
        </div>

        {/* CARD 3 */}
        <div className="relative rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image src="/mart.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "80 Years of Living and Writing in the Shadow of the Bomb",
                "ttRDjI40RVXDo1Em5GUr"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                80 Years of Living and Writing in the Shadow of the Bomb
              </h2>
            </Link>
            <p className="text-xs mt-1">By Martin Halpern</p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            History
          </div>
        </div>

        {/* CARD 4 */}
        <div className="relative rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image
              src="/plague.png"
              alt="News 4"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "AIDS and the Hidden Catholic Church",
                "jeixznhQcoRJKNT9X6eE"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                AIDS and the Hidden Catholic Church
              </h2>
            </Link>
            <p className="text-xs mt-1">By Cyclopedia</p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            History
          </div>
        </div>
      </div>

      <div className="mx-auto text-center mt-16">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
