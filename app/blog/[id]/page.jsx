"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db1 } from "@/lib/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { Share, LinkIcon, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";

// Blog content renderer
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
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
   const menuRef = useRef(null);
   const handleShareClick = () => setShowShareMenu(!showShareMenu);

  
  // Fetch blog
  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      const blogRef = doc(db1, "blogs", id);
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        const data = blogDoc.data();
        setBlog({ id, ...data });
        setLikes(data.likes || 0);
      }
    }
    fetchBlog();
  }, [id]);

  // Check if liked
  useEffect(() => {
    if (!id) return;
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked) setLiked(true);
  }, [id]);


   // Close menu when clicking outside
   useEffect(() => {
     function handleClickOutside(event) {
       if (menuRef.current && !menuRef.current.contains(event.target)) {
         setShowShareMenu(false);
       }
     }
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, []);


  // Fetch related blogs
  useEffect(() => {
    if (!id) return;
    async function fetchBlogs() {
      const snapshot = await getDocs(collection(db1, "blogs"));
      const allBlogs = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b) => b.id !== id)
        .sort((a, b) => (b.date || 0) - (a.date || 0));
      setBlogs(allBlogs.slice(0, 4));
    }
    fetchBlogs();
  }, [id]);


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

  if (!blog) return <div className="text-center py-20">Loading news...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen px-0 md:px-10 lg:px-20 py-5 mx-auto text-gray-900 font-sans space-y-10"
    >
      {/* Blog Header */}
      {/* Blog Header */}
      <div className="bg-black ">
        <div className="w-full mt-1 ">
          {/* Title & Subtitle above the image */}
          <div className="mb-4  p-1">
            <h1 className="text-3xl md:text-4xl lg:w-1/2 font-bold text-white mt-10 p-2 lg:mt-25 lg:mx-auto">
              {blog.title}
            </h1>
            {blog.subtitle && (
              <h2 className="text-md md:text-lg mt-1 lg:mx-auto lg:w-1/2 text-center font-semibold text-white border-2 py-2 px-2  border-white">
                {blog.subtitle}
              </h2>
            )}
          </div>

          {/* Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-[30rem] rounded-lg overflow-hidden">
            {blog.imageUrl && (
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent rounded-lg"></div>
          </div>
        </div>


        <div>

          <div className="flex gap-6 mt-4 items-center justify-center">
         <div className="flex justify-center">
  <Link href="/live">
    <div className="flex items-center gap-2  hover:scale-105 transition-transform cursor-pointer">
      
      {/* Animated Live Dot */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
      </span>

      {/* Live Text */}
      <p className="text-white font-semibold uppercase tracking-wide animate-pulse">
        Live
      </p>

      {/* Play Icon */}
      <Play className="text-white h-5 w-5" />
    </div>
  </Link>
</div>


            <div>
          <button
            onClick={handleCopyLink}
            className="flex text-white gap-2 items-center justify-center border-amber-50 border py-1 px-2"
          >
            Copy
            <LinkIcon className="h-4 w-4" />
          </button>
        </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={handleShareClick}
              className="flex items-center gap-2 font-semibold text-white bg-black border  py-1 px-2 hover:bg-gray-800 transition"
            >
              <Share className="h-4 w-4" />
              Share
            </button>

            {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-white border p-4 flex flex-col gap-3 text-sm z-50">
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Share on Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Share on LinkedIn
                </a>
                <a
                  href={`mailto:?subject=Check this out&body=${window.location.href}`}
                  className="text-gray-800 hover:underline"
                >
                  Share via Email
                </a>
              </div>
            )}
          </div>
      
        </div>
      </div>
</div>
      {/* Blog Content */}
      <div className="blog-content prose max-w-none px-2 sm:px-4 space-y-5 font-serif">
        <hr />
        <BlogDisplay body={blog.body} />
      </div>

      {/* Like Button */}
      <div className="flex gap-3 sm:gap-5">
        {/* <button
          onClick={handleLikeClick}
          className={`flex items-center justify-center text-sm py-2 px-4 rounded-md ${
            liked ? "text-green-600" : "text-gray-400"
          }`}
        >
          {liked ? `Liked (${likes})` : `Likes (${likes})`}
        </button> */}
      </div>

      {/* Newsletter Card */}
      <Link href="/newsletter">
        <div className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-800 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-bold mb-2">Stay Updated!</h3>
          <p className="mb-4">
            Subscribe to our newsletter and never miss an update.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition">
            Subscribe Now
          </button>
        </div>
      </Link>

      {/* Related Blogs */}
      <div>
        <h2 className="text-xl font-bold mb-4 mt-10">Related</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {blogs.map((b) => (
            <Link key={b.id} href={`/blog/${b.id}`} className="block">
              <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-md cursor-pointer">
                {b.imageUrl && (
                  <div className="relative w-full h-48 sm:h-56">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold text-black hover:underline uppercase">
                    {b.title}
                  </h2>
                  <div className="flex gap-2 items-center mt-2 flex-wrap">
                    <span className="text-orange-600 text-sm uppercase">
                      TAGGED:
                    </span>
                    {b.tags?.map((tag) => (
                      <Link
                        key={tag}
                        href={`/search?q=${tag.toLowerCase()}`}
                        className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
