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
    <main className="w-full ">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 lg:mt-50 mb-2">
        Tomorrow’s World, Today
      </h1>
      <p className="text-sm lg:text-base text-center mx-auto">
        Discover breakthroughs shaping our future — AI, space travel,{" "}
        <br className="max-md:hidden" />
        biotechnology, and more. Dive into the wonders and ethical questions of
        the modern age.
      </p>

      {/* 🔹 Dynamic Firestore Posts */}
      {posts.length > 0 && (
        <div className="max-w-7xl mx-auto py-10">
          <h2 className="text-2xl font-bold mb-4">Latest latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="relative rounded-lg  shadow-xl transition overflow-hidden">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold ">{post.title}</h2>
                    <h3 className="text-xs mt-2">{post.subtitle}</h3>
                    <p className="text-xs text-gray-600 border mt-1">
                      {post.tags?.join(", ")}
                    </p>
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
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/5ucZczUCM0xYIsUEbamY">
              <h2 className="text-sm font-bold  hover:underline">
                Review: Religion, Science, and Empire
              </h2>
            </Link>
            <p className="text-xs mt-1">
              By Anand Venkatkrishnan
            </p>
            <p className="mt-2 text-xs ">
              Anand Venkatkrishnan reviews Religion, Science, and Empire by
              Peter Gottschalk.
            </p>
          </div>
        </div>

        {/* === Static NEWS CARD 2 === */}
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ">
          <div className="relative w-full h-[220px]">
            <Image
              src="/sciat.png"
              alt="News 2"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4 rounded-b-xl">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/IDins9X9XoPgmhW9FTBi">
              <h2 className="text-sm font-bold hover:underline">
                Science or Academic Atheism?
              </h2>
            </Link>
            <p className="text-xs mt-1">
              Published on August 8, 2011
            </p>
            <p className="mt-2 text-xs ">
              What happens when we give scientists the authority to speak about
              God?
            </p>
          </div>
        </div>

        {/* === Static NEWS CARD 3 === */}
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ">
          <div className="relative w-full h-[220px]">
            <Image
              src="/heal.png"
              alt="News 3"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4 rounded-b-xl">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/BlKwDu4niv82rMzxTDVF">
              <h2 className="text-sm font-bold  hover:underline">
                Healed and Whole Forever: On Psychedelic Science & Spirituality
              </h2>
            </Link>
            <p className="text-xs  mt-1">
              Published on January 25, 2016
            </p>
            <p className="mt-2 text-xs ">
              Patricia Kubala explores the connection between drugs, healing,
              and spirituality.
            </p>
          </div>
        </div>

        {/* === Static NEWS CARD 4 === */}
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ">
          <div className="relative w-full h-[220px]">
            <Image
              src="/jews.png"
              alt="News 4"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4 rounded-b-xl">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/tx8eWd93N7HyChUseSob">
              <h2 className="text-sm font-bold hover:underline">
                Christian Science as Jewish Tradition
              </h2>
            </Link>
            <p className="text-xs mt-1">
              By Noah Berlatsky (June 11, 2024)
            </p>
            <p className="mt-2 text-xs">
              Why did so many American Jewish women find Christian Science
              appealing?
            </p>
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
