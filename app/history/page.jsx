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
      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-2 mt-30 lg:mt-50 font-serif">
        Uncovering the Hidden Past
      </h1>
      <p className="text-sm lg:text-base text-center mx-auto">
        Delve into the depths of forgotten events, suppressed truths, and{" "}
        <br className="max-md:hidden" />
        powerful legacies that continue to shape our present. Explore history
        from perspectives often left out of mainstream narratives.
      </p>

      <div className="max-w-7xl mx-auto mt-32">
        <h2 className="text-2xl font-bold mb-6">Latest History Articles</h2>
        {loading ? (
          <p>Loading latest Posts...</p>
        ) : posts.length === 0 ? (
          <p>Please check your network connection</p>
        ) : (
          <div className="relative grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts[0] && (
              <Link
                href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}
                className="relative block rounded-xl shadow-xl hover:shadow-2xl transition overflow-hidden mb-10"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Large Image */}
                  <div className="relative h-80 md:h-96">
                    {posts[0].imageUrl && (
                      <img
                        src={posts[0].imageUrl}
                        alt={posts[0].title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-md z-10">
                      History
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold leading-tight mb-4 hover:text-purple-600 transition">
                      {posts[0].title}
                    </h3>
                    {posts[0].subtitle && (
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {posts[0].subtitle}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {posts[0].createdAt?.toDate().toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>

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
