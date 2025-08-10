"use client";

import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db1 } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Share, LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";

const BlogDisplay = ({ body }) => {
  return (
    <div
      className="prose max-w-none text-gray-900"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};

export default function BlogDetails() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      const cyclopediaRef = doc(db1, "blogs", id);
      const cyclopediaDoc = await getDoc(cyclopediaRef);
      if (cyclopediaDoc.exists()) {
        const data = cyclopediaDoc.data();
        setBlog({ id, ...data });
        setLikes(data.likes || 0);
        setSubtitle(data.subtitle || "");
        console.log("Fetched blog body:", data.body);
      }
    }
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked) setLiked(true);
  }, [id]);

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleLikeClick = async () => {
    if (!id) return;
    const newLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(newLikes);
    localStorage.setItem(`liked-${id}`, (!liked).toString());
    try {
      const blogRef = doc(db1, "blogs", id);
      await updateDoc(blogRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleMoreBlogClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/global");
    }, 3000);
  };

  if (!blog) return <div>Loading blog...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen px-2 py-19 max-w-6xl mx-auto text-gray-900 font-sans leading-relaxed space-y-20"
    >
      <div className="w-full relative h-80 max-md:mt-60 lg:mt-10">
        {blog.imageUrl && (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            style={{ objectFit: "cover" }}
            className="z-10"
          />
        )}

        <div className="absolute bottom-80 left-0 w-full lg:mt-10 bg-opacity-75 bg-white bg-opacity-90 text-black p-4 z-20">
          <h1 className="text-3xl font-bold font-playfair lg:text-4xl tracking-wide">
            {blog.title}
          </h1>
          {subtitle && (
            <h2 className="text-xs font-semibold mt-1 font-playfair lg:text-2xl text-gray-700 ">
              {subtitle}
            </h2>
          )}
        </div>
      </div>

      <div>
        <BlogDisplay body={blog.body} />
      </div>

      <div className="flex gap-5 text-sm">
        <button
          onClick={handleLikeClick}
          className={`flex items-center justify-center text-sm py-2 px-5 transition-all ${
            liked
              ? "text-green-600 hover:text-green-700"
              : "text-gray-400 hover:text-red-600"
          }`}
          aria-label="Like Button"
        >
          {liked ? "Liked" : "Likes"} ({likes})
        </button>

        <button
          onClick={handleShareClick}
          className="border items-center gap-2 text-gray-400 font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition relative"
        >
          <Share className="h-4 w-4" />
          {showShareMenu && (
            <div className="absolute top-full left-0 bg-gray-400/5 shadow-xl rounded-lg p-4 flex flex-col gap-3 text-sm w-56 z-50 border border-green-600">
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Share on LinkedIn
              </a>
              <button
                onClick={handleShareClick}
                className="text-green-600 text-xs underline"
              >
                Close
              </button>
            </div>
          )}
        </button>

        <button
          onClick={handleCopyLink}
          className="border flex items-center gap-2 text-gray-400 font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>

      <h1 className="text-3xl lg:text-5xl font-bold text-center px-5 w-full border py-3 bg-gray-900 z-50 text-white shadow-b-black shadow-black shadow-2xl ">
        Latest News
      </h1>

      {/* Sample News Cards */}
      <div className="grid md:grid-cols-2 gap-8 mt-20">
        <div className="relative shadow-2xl">
          <div className="relative w-full h-[220px]">
            <Image src="/shari.png" alt="News 2" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Three Key Moments for Shari’a in Nigeria
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Alex Thurston</p>
            <p className="mt-2 text-gray-900 text-xs">
              The re-implementation of shari’a, however, caused conflict. Muslims and Christians clashed in several Northern states. Shari’a became a campaign issue in 2003.
            </p>
          </div>
        </div>

        <div className="relative shadow-2xl">
          <div className="relative w-full h-[220px]">
            <Image src="/strug.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Violent Dissent, Intra-Muslim Struggles, and Political Crisis in Northern Nigeria
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Alex Thurston</p>
            <p className="mt-2 text-gray-900 text-xs">
              Political struggles in Northern Nigeria have often been religious struggles as well. New leaders have often sought political and religious authority simultaneously.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-24">
        <button
          onClick={handleMoreBlogClick}
          className="text-sm font-bold text-green-600 tracking-widest border border-green-600 px-5 py-2 shadow-black shadow-xl rounded-lg hover:bg-green-600 hover:text-black transition duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "More News"}
        </button>
      </div>
    </motion.div>
  );
}

