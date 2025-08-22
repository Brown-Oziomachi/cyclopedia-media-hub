"use client";

import { useEffect, useState } from "react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
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
 
         console.log("Fetched Politics posts:", data);
         setPosts(data);
       } catch (error) {
         console.error("Error fetching politics posts:", error);
       } finally {
         setLoading(false);
       }
     };
 
     fetchHistoryPosts();
   }, []);
 

  return (
    <main className="w-full">
      {/* === HEADER === */}
      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-2 mt-30 lg:mt-50 font-serif">
        Uncovering the Hidden Past
      </h1>
      <p className="text-sm lg:text-base text-center text-gray-700 mx-auto">
        Delve into the depths of forgotten events, suppressed truths, and{" "}
        <br className="max-md:hidden" />
        powerful legacies that continue to shape our present. Explore history
        from perspectives often left out of mainstream narratives.
      </p>

      <div className="max-w-7xl mx-auto px-4 mt-32">
        <h2 className="text-2xl font-bold mb-6">Latest History Articles</h2>
        {loading ? (
          <p className="text-gray-500">Loading latest Posts </p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500"></p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => (
              <div
                key={post.id}
                href={`/blog/${post.id}`}
                className=" border rounded-lg shadow hover:shadow-lg p-4"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold  mb-2">{post.title}</h3>
                {post.subtitle && (
                  <p className=" text-sm mb-3">{post.subtitle}</p>
                )}
                <Link
                  href={`/blogs/${post.id}`}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === FEATURED STATIC CARDS === */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* CARD 1 */}
        <div className=" rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image
              src="/slavery.png"
              alt="News 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/QUnWDFG1eBq2x4ejSLcs">
              <h2 className="text-sm font-bold hover:underline">
                Americans Say Government Should Address Slavery Effects
              </h2>
            </Link>
            <p className="text-xs mt-1">
              by Cyclopedia
            </p>
            <p className="mt-2 text-xs ">
              Americans Perceive History of Slavery Affecting Black People Today
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className=" rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image src="/his.png" alt="News 2" fill className="object-cover" />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/ggrMyhU1qWNwmX8sfubI">
              <h2 className="text-sm font-bold hover:underline">
                History of Missional Church
              </h2>
            </Link>
            <p className="text-xs mt-1">
              by Cyclopedia
            </p>
            <p className="mt-2 text-xs ">
              We need a new overstory when it comes to the way we understand
              evangelism and discipleship...
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className=" rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image src="/mart.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/ttRDjI40RVXDo1Em5GUr">
              <h2 className="text-sm font-bold  hover:underline">
                80 Years of Living and Writing in the Shadow of the Bomb
              </h2>
            </Link>
            <p className="text-xs mt-1">
              By Martin Halpern
            </p>
            <p className="mt-2 text-xs ">
              My acute focus on the danger of nuclear war may stem in part from
              the accident of my birthday on August 9, 1945.
            </p>
          </div>
        </div>

        {/* CARD 4 */}
        <div className=" rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-[220px]">
            <Image
              src="/plague.png"
              alt="News 4"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/jeixznhQcoRJKNT9X6eE">
              <h2 className="text-sm font-bold hover:underline">
                AIDS and the Hidden Catholic Church
              </h2>
            </Link>
            <p className="text-xs  mt-1">
              By Cyclopedia
            </p>
            <p className="mt-2 text-xs ">
              Catholic leaders responded to the AIDS epidemic in complex ways
            </p>
          </div>
        </div>
      </div>

      {/* === FIRESTORE BLOGS === */}

      {/* === VIEW MORE BUTTON === */}
      <div className="mx-auto text-center mt-16">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
