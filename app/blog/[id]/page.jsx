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
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(body || "");
  return (
    <div
      className={`prose max-w-none text-gray-900 ${
        !isHTML ? "whitespace-pre-line space-y-4" : ""
      }`}
      dangerouslySetInnerHTML={{
        __html: isHTML ? body : body?.replace(/\n/g, "<br />"),
      }}
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
      }
    }
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked) setLiked(true);
  }, [id]);

  const handleShareClick = () => setShowShareMenu(!showShareMenu);

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

  if (!blog) return <div className="text-center py-10">Loading blog...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen px-3 sm:px-5 md:px-10 lg:px-20 py-10 mx-auto text-gray-900 font-sans leading-relaxed space-y-20"
    >
    
<div className="w-full relative h-64 sm:h-80 md:h-[30rem] mt-15">

  {/* Image */}
  {blog.imageUrl && (
    <Image
      src={blog.imageUrl}
      alt={blog.title}
      fill
      style={{ objectFit: "cover" }}
      className="z-10 lg:mt-20"
    />
  )}

  {/* Gradient overlay for better text visibility */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-20"></div>

  {/* Title + Subtitle */}
  <div className="absolute top-0 left-0 w-full p-6 sm:p-5 md:p-7 z-30 text-black mt-60 lg:text-white max-lg:text-white max-md:text-black">
    <h1 className="text-3xl md:text-2xl font-bold font-playfair tracking-wide drop-shadow-lg">
      {blog.title}
    </h1>
    {subtitle && (
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mt-1 font-playfair drop-shadow-md border py-2 px-3 shadow-2xl mask-b-from-60% ">
        {subtitle}
      </h2>
    )}
  </div>

</div>
      {/* Blog content */}
      <div className="blog-content prose max-w-none px-2 sm:px-4 space-y-5 gap-5 font-serif text-sm max-md:mt-110">
<hr/>
        <BlogDisplay body={blog.body } />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-5 text-sm px-2 sm:px-4">
        <button
          onClick={handleLikeClick}
          className={`flex items-center justify-center text-sm py-2 px-4 sm:px-5 transition-all rounded-md ${
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
          className="border flex items-center gap-2 text-gray-400 font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-gray-800 transition relative"
        >
          <Share className="h-4 w-4" />
          {showShareMenu && (
            <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg p-4 flex flex-col gap-3 text-sm w-56 z-50 border border-green-600">
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
          className="border flex items-center gap-2 text-gray-400 font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-gray-800 transition"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Latest news section */}
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center px-4 py-3 w-full border bg-gray-900 text-white shadow-xl">
        Latest News
      </h1>

      {/* News grid */}
      <div className="grid sm:grid-cols-2 gap-8 mt-20 px-2 sm:px-4">
        {[
          // Two news items
          {
            img: "/shari.png",
            title: "Three Key Moments for Shari’a in Nigeria",
            author: "Alex Thurston",
            desc: "The re-implementation of shari’a, however, caused conflict. Muslims and Christians clashed in several Northern states. Shari’a became a campaign issue in 2003.",
            href: "/",
          },
          {
            img: "/strug.png",
            title:
              "Violent Dissent, Intra-Muslim Struggles, and Political Crisis in Northern Nigeria",
            author: "Alex Thurston",
            desc: "Political struggles in Northern Nigeria have often been religious struggles as well. New leaders have often sought political and religious authority simultaneously.",
            href: "/",
          },
        ].map((news, i) => (
          <div key={i} className="relative shadow-2xl">
            <div className="relative w-full h-48 sm:h-[220px]">
              <Image
                src={news.img}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 rounded-md shadow-lg">
              <Link href={news.href}>
                <h2 className="text-sm sm:text-base font-bold text-black hover:underline">
                  {news.title}
                </h2>
              </Link>
              <p className="text-xs sm:text-sm text-gray-800 mt-1">
                by {news.author}
              </p>
              <p className="mt-2 text-gray-900 text-xs sm:text-sm">
                {news.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* More news button */}
      <div className="text-center mt-28">
        <button
          onClick={handleMoreBlogClick}
          className="text-sm sm:text-base font-bold text-green-600 tracking-widest border border-green-600 px-4 sm:px-5 py-2 shadow-black shadow-xl rounded-lg hover:bg-green-600 hover:text-black transition duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "More News"}
        </button>
      </div>
    </motion.div>
  );
}
