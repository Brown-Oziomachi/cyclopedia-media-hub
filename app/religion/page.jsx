"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ViewMoreSearchPopup from "../view/page";
import { motion } from "framer-motion";


// ✅ Firebase
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchReligionPosts = async () => {
     try {
       const postsRef = collection(db1, "blogs");
       const q = query(
         postsRef,
         where("category", "==", "religion"),
         orderBy("createdAt", "desc"),
         limit(6)
       );
       const querySnapshot = await getDocs(q);
       const data = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));

       setPosts(data);
     } catch (error) {
       console.error("Error fetching Religion posts:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchReligionPosts();
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
    <main className="w-full ">
      
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute w-[400px] h-[400px] bg-black/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-black/30 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-red-700 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Religion
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Faith, Belief & Beyond
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Explore ancient scriptures, divine mysteries, and the role of
            religion in shaping societies and ideologies. A closer look at
            beliefs that unite — and divide — billions.
          </p>
        </div>
      </section>
      <p className="p-5">Latest Updates:</p>
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
                  religion
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
        // Skeleton Loader
        <div className="max-w-7xl mx-auto  py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl overflow-hidden shadow-lg"
            >
              <div className=" h-[220px] w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-4  w-3/4"></div>
                <div className="h-3 rounded w-full"></div>
                <div className="h-3  rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        // Blog Cards
        <div className=" max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.slice(1, 5).map((post) => (
            <div
              key={post.id}
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:border-purple-600 transition"
            >
              <div className="relative w-full h-[220px]">
                <Image
                  src={post.imageUrl || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  Religion
                </div>
              </div>
              <div className="p-4">
                <Link href={`/news/${createFullSlug(post.title, post.id)}`}>
                  <h2 className="text-sm font-bold line-clamp-2 hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {post.subtitle}
                  </p>
                </Link>
                <p className="text-xs mt-2">
                  {post.createdAt?.toDate().toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <motion.p
          className=" text-gray-500 text-center "
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Please check your network connection for latest updates...
        </motion.p>
      )}

      <div className="mx-auto text-center mt-16 mb-16 bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
        <h2 className="text-3xl font-extrabold mb-3">
          Stay Ahead of the Hidden Truths
        </h2>
        <p className="text-base md:text-lg text-gray-200 mb-6">
          Join thousands of readers who get our investigative reports and
          evidence-based insights straight to their inbox every week.
        </p>
        <a
          href="/newsletter"
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-all duration-300"
        >
          Subscribe to Our Newsletter
        </a>
      </div>

      <div className="max-w-7xl mx-auto py-0">
        <h1 className="text-center text-2xl font-bold mb-8  dark:text-white">
          Explore more News
        </h1>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* === NEWS CARD 1 === */}
          <div className="relative rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            {/* Image and Title Side by Side */}
            <div className="flex gap-3 p-4">
              {/* Image on the left */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src="/rel.png"
                  alt="News 1"
                  fill
                  className="object-cover rounded"
                />
              </div>

              {/* Title on the right */}
              <div className="flex-1">
                <Link
                  href={`/news/${createFullSlug(
                    "From Missionaries to Settler-Colonialists for Christian Supremacy",
                    "enupjwyWCCP7OS0h77TQ"
                  )}`}
                >
                  <h2 className="text-sm font-bold hover:underline line-clamp-3">
                    From Missionaries to Settler-Colonialists for Christian
                    Supremacy
                  </h2>
                </Link>
              </div>
            </div>

            {/* Description below */}
            <div className="px-4 pb-4">
              <p className="text-xs mt-1">
                by Bradley Onishi — October 1, 2024
              </p>
              <p className="mt-2 text-sm line-clamp-2">
                Homeland, "our people," and the call for a new Caesar in
                Evangelical discourse.
              </p>
            </div>

            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
              Religion
            </div>
          </div>

          <div className="relative rounded-xl  shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="flex gap-3 p-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src="/shari.png"
                  alt="News 2"
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <Link
                  href={`/news/${createFullSlug(
                    "Three Key Moments for Shari'a in Nigeria",
                    "yQ5FJS6IFfe7zpQ8gzk7"
                  )}`}
                >
                  <h2 className="text-sm font-bold hover:underline line-clamp-3">
                    Three Key Moments for Shari'a in Nigeria
                  </h2>
                </Link>
              </div>
            </div>

            {/* Description below */}
            <div className="px-4 pb-4">
              <p className="text-xs mt-1">by Alex Thurston</p>
              <p className="mt-2 text-sm line-clamp-2">
                The re-implementation of shari'a caused conflict. Muslims and
                Christians clashed in several Northern states. Shari'a became a
                campaign issue in 2003.
              </p>
            </div>

            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
              Religion
            </div>
          </div>
        </div>
        {/* === NEWS CARD 3 === */}
        <div className="relative rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <div className="relative w-full h-96">
            <Image
              src="/strug.png"
              alt="News 3"
              fill
              className=" group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Violent Dissent, Intra-Muslim Struggles, and Political Crisis in Northern Nigeria",
                "sVYggqD0kTZjrZsC7GIb"
              )}`}
            >
              <h2 className="text-base font-bold  hover:underline">
                Violent Dissent, Intra-Muslim Struggles, and Political Crisis in
                Northern Nigeria
              </h2>
            </Link>
            <p className="text-xs  mt-1">by Alex Thurston</p>
            <p className="mt-2 text-sm ">
              Political struggles in Northern Nigeria have often been religious
              struggles as well. New leaders sought both political and religious
              authority simultaneously.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <div className="relative w-full h-56">
            <Image
              src="/bible.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Christianity Without God",
                "VfaKVglfMBiX8qNlgaQd"
              )}`}
            >
              <h2 className="text-base font-bold hover:underline">
                Christianity Without God
              </h2>
            </Link>
            <p className="text-xs  mt-1">by Alex Thurston</p>
            <p className="mt-2 text-sm ">
              The Psalms for Our Time, Ray Waddle, traces today’s rapidly
              growing megachurches back to a short-lived theological movement in
              the 1960s called “Death of God” (DOG) theology, which aimed to
              remake religion for the modern age.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/mod.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Modified Christianity",
                "NhDvvZoRYdUU6hrpMABv"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Modified Christianity
              </h2>
            </Link>
            <p className="text-xs mt-1">By Robert Christgau</p>
            <p className="mt-2 text-xs">
              A left critic on what secular humanists don't get about
              Christianity in America.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/muslim.jpg"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Islamophobia and Americans’ Problems with Face Masks",
                "u4GeCPrM7sddaF5dEKsD"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Islamophobia and Americans’ Problems with Face Masks
              </h2>
            </Link>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              by Liz Bucar — September 3, 2020
            </p>
            <p className="mt-2 text-xs">
              We could better embrace COVID masks if we took the time to
              understand people’s motivations who cover their faces for
              religious reasons.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/image.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "How They Met Their Mother",
                "75ZM0N5NXt3cMFHkbUKS"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                How They Met Their Mother
              </h2>
            </Link>
            <p className="text-xs  mt-1">by Kelsey Osgood — August 1, 2023</p>
            <p className="mt-2 text-xs">
              In the Church of Jesus Christ of Latter-day Saints, the divine
              figure of Heavenly Mother is shrouded in secrecy. Some Mormons are
              trying to bring Her out into the light.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/Ame.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Americans Leaving Religion",
                "dTksJYvlMiYC3QJ2BVa3"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Americans Leaving Religion
              </h2>
            </Link>
            <p className="text-xs  mt-1">
              By Ryan T. Cragun & Jesse M. Smith — May 7, 2025
            </p>
            <p className="mt-2  text-xs">
              An excerpt from “Goodbye Religion: The Causes and Consequences of
              Secularization”
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/miss.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "More than Missionary — A Life in the Struggle for Reproductive Freedom",
                "wuagVdBpN45n8CuQa65d"
              )}`}
            >
              <h2 className="text-sm font-bold  hover:underline">
                More than Missionary — A Life in the Struggle for Reproductive
                Freedom
              </h2>
            </Link>
            <p className="text-xs  mt-1">by Gillian Frank — May 7, 2025</p>
            <p className="mt-2  text-xs">
              The doctors and religious organizers who risk everything.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/arab.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Blasphemy in Saudi Arabia, Religious Freedom",
                "FM2i8368RY3xpHvH9D6K"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Blasphemy in Saudi Arabia, Religious Freedom
              </h2>
            </Link>
            <p className="text-xs mt-1">Published on August 1, 2013</p>
            <p className="mt-2  text-xs">
              Daily round-up of religion in the news.
            </p>
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
              Religion
            </div>
          </div>
        </div>

        {/* === CARD 7 === */}
        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/BLM.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link
              href={`/news/${createFullSlug(
                "Tragedy, Spirituality, and Black Justice",
                "0oE5AkuF09zxe4F8u3gb"
              )}`}
            >
              <h2 className="text-sm font-bold hover:underline">
                Tragedy, Spirituality, and Black Justice
              </h2>
            </Link>
            <p className="text-xs  mt-1">
              by Vincent Lloyd & Terrence L. Johnson — April 5, 2023
            </p>
            <p className="mt-2  text-xs">
              A conversation about religion in Black protest movements.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>

        {/* === CARD 8 === */}
        <div className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
          <div className="relative w-full h-[220px]">
            <Image
              src="/cath.png"
              alt="News 4"
              fill
              className="object-cover group-hover:scale-105"
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
            <p className="text-x mt-1">
              by Michael J. O’Loughlin — June 3, 2020
            </p>
            <p className="mt-2  text-xs">
              Catholic leaders responded to the AIDS epidemic in complex ways.
            </p>
          </div>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
            Religion
          </div>
        </div>
      </div>

      {/* === VIEW MORE BUTTON === */}
      <div className="mx-auto text-center">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
