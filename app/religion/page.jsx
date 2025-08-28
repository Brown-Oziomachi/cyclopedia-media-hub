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

  return (
    <main className="w-full ">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 lg:mt-50 mb-2">
        Faith, Belief, and Beyond
      </h1>
      <p className="text-sm text-center   lg:text-base ">
        Explore ancient scriptures, divine mysteries, and the role of religion{" "}
        <br className="max-md:hidden" />
        in shaping societies and ideologies. A closer look at beliefs that unite
        — and divide — billions.
      </p>

      {/* ✅ Dynamic Firestore Religion Posts */}
      <p className="p-5">Latest Updates:</p>

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
        <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group rounded-xl overflow-hidden shadow-md  hover:shadow-2xl hover:border-purple-600 transition"
            >
              <div className="relative w-full h-[220px]">
                <Image
                  src={post.imageUrl || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 ">
                <Link href={`/blog/${post.id}`}>
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
          Please check your network connection for latest
          updates...
        </motion.p>
      )}

      {/* ✅ Static Cards (kept intact) */}
      <div className="max-w-7xl mx-auto py-0">
        <h1 className="text-center text-2xl font-bold mb-8  dark:text-white">
          Explore more News
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* === NEWS CARD 1 === */}
          <div className=" rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="relative w-full h-56">
              <Image
                src="/rel.png"
                alt="News 1"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/enupjwyWCCP7OS0h77TQ">
                <h2 className="text-base font-bold  hover:underline">
                  From Missionaries to Settler-Colonialists for Christian
                  Supremacy
                </h2>
              </Link>
              <p className="text-xs  mt-1 hover:scale-105">
                by Bradley Onishi — October 1, 2024
              </p>
              <p className="mt-2 text-sm ">
                Homeland, “our people,” and the call for a new Caesar in
                Evangelical discourse.
              </p>
            </div>
          </div>

          {/* === NEWS CARD 2 === */}
          <div className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="relative w-full h-56">
              <Image
                src="/shari.png"
                alt="News 2"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/yQ5FJS6IFfe7zpQ8gzk7">
                <h2 className="text-base font-bold hover:underline">
                  Three Key Moments for Shari’a in Nigeria
                </h2>
              </Link>
              <p className="text-xs mt-1">by Alex Thurston</p>
              <p className="mt-2 text-sm ">
                The re-implementation of shari’a caused conflict. Muslims and
                Christians clashed in several Northern states. Shari’a became a
                campaign issue in 2003.
              </p>
            </div>
          </div>

          {/* === NEWS CARD 3 === */}
          <div className=" rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="relative w-full h-56">
              <Image
                src="/strug.png"
                alt="News 3"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/sVYggqD0kTZjrZsC7GIb">
                <h2 className="text-base font-bold  hover:underline">
                  Violent Dissent, Intra-Muslim Struggles, and Political Crisis
                  in Northern Nigeria
                </h2>
              </Link>
              <p className="text-xs  mt-1">by Alex Thurston</p>
              <p className="mt-2 text-sm ">
                Political struggles in Northern Nigeria have often been
                religious struggles as well. New leaders sought both political
                and religious authority simultaneously.
              </p>
            </div>
          </div>

          {/* === NEWS CARD 4 === */}
          <div className=" rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="relative w-full h-56">
              <Image
                src="/bible.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/VfaKVglfMBiX8qNlgaQd">
                <h2 className="text-base font-bold hover:underline">
                  Christianity Without God
                </h2>
              </Link>
              <p className="text-xs  mt-1">by Alex Thurston</p>
              <p className="mt-2 text-sm ">
                The Psalms for Our Time, Ray Waddle, traces today’s rapidly
                growing megachurches back to a short-lived theological movement
                in the 1960s called “Death of God” (DOG) theology, which aimed
                to remake religion for the modern age.
              </p>
            </div>
          </div>

          {/* === CARD 1 === */}
          <div className=" rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/mod.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/NhDvvZoRYdUU6hrpMABv">
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
          </div>

          {/* === CARD 2 === */}
          <div className=" rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/muslim.jpg"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/u4GeCPrM7sddaF5dEKsD">
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
          </div>

          {/* === CARD 3 === */}
          <div className="rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/image.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/75ZM0N5NXt3cMFHkbUKS">
                <h2 className="text-sm font-bold hover:underline">
                  How They Met Their Mother
                </h2>
              </Link>
              <p className="text-xs  mt-1">by Kelsey Osgood — August 1, 2023</p>
              <p className="mt-2 text-xs">
                In the Church of Jesus Christ of Latter-day Saints, the divine
                figure of Heavenly Mother is shrouded in secrecy. Some Mormons
                are trying to bring Her out into the light.
              </p>
            </div>
          </div>

          {/* === CARD 4 === */}
          <div className=" rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/Ame.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/dTksJYvlMiYC3QJ2BVa3">
                <h2 className="text-sm font-bold hover:underline">
                  Americans Leaving Religion
                </h2>
              </Link>
              <p className="text-xs  mt-1">
                By Ryan T. Cragun & Jesse M. Smith — May 7, 2025
              </p>
              <p className="mt-2  text-xs">
                An excerpt from “Goodbye Religion: The Causes and Consequences
                of Secularization”
              </p>
            </div>
          </div>

          {/* === CARD 5 === */}
          <div className=" rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/miss.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/wuagVdBpN45n8CuQa65d">
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
          </div>

          {/* === CARD 6 === */}
          <div className="rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/arab.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/FM2i8368RY3xpHvH9D6K">
                <h2 className="text-sm font-bold hover:underline">
                  Blasphemy in Saudi Arabia, Religious Freedom
                </h2>
              </Link>
              <p className="text-xs mt-1">Published on August 1, 2013</p>
              <p className="mt-2  text-xs">
                Daily round-up of religion in the news.
              </p>
            </div>
          </div>

          {/* === CARD 7 === */}
          <div className=" rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/BLM.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/0oE5AkuF09zxe4F8u3gb">
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
          </div>

          {/* === CARD 8 === */}
          <div className=" rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="relative w-full h-[220px]">
              <Image
                src="/cath.png"
                alt="News 4"
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/jeixznhQcoRJKNT9X6eE">
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
          </div>

          {/* ✅ Repeat this card structure for the rest of your news cards (mod.png, muslim.jpg, Ame.png, etc.) */}
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
