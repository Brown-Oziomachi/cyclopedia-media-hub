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
import SideNewsTicker from "@/components/SideNewsTicker";
import FollowUsPopup from "@/components/FollowUsPopup";
import AdminProfile from "@/components/AdminProfile";

// Helper function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Helper function to extract ID from slug (format: title-slug--docId)
const extractIdFromSlug = (slug) => {
  const parts = slug.split("--");
  return parts.length > 1 ? parts[parts.length - 1] : slug;
};

// Helper function to create full slug with ID
const createFullSlug = (title, id) => {
  return `${createSlug(title)}--${id}`;
};

// Blog content renderer
const BlogDisplay = ({ body }) => {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(body || "");
  const html = isHTML ? body : body?.replace(/\n/g, "<br />") || "";

  return (
    <div
      className={` ${!isHTML ? "whitespace-pre-line space-y-4" : ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default function NewsDetails() {
  const { id: slugParam } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const menuRef = useRef(null);
  const handleShareClick = () => setShowShareMenu(!showShareMenu);

  // Category colors mapping
  const categoryColors = {
    politics: "bg-blue-600",
    religion: "bg-purple-600",
    history: "bg-amber-600",
    education: "bg-green-600",
    health: "bg-red-600",
    sports: "bg-orange-600",
    technology: "bg-cyan-600",
    entertainment: "bg-pink-600",
    business: "bg-gray-700",
    other: "bg-gray-500",
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase() || "other";
    return categoryColors[cat] || categoryColors.other;
  };

  useEffect(() => {
    if (!slugParam) return;
    async function fetchBlog() {
      try {
        const docId = extractIdFromSlug(slugParam);
        const blogRef = doc(db1, "blogs", docId);
        const blogDoc = await getDoc(blogRef);

        if (blogDoc.exists()) {
          const data = blogDoc.data();
          setBlog({ id: docId, ...data });
          setLikes(data.likes || 0);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchBlog();
  }, [slugParam]);

  useEffect(() => {
    if (blog && slugParam && !slugParam.includes("--")) {
      const fullSlug = createFullSlug(blog.title, blog.id);
      router.replace(`/news/${fullSlug}`);
    }
  }, [blog, slugParam]);


  // Check if liked
  useEffect(() => {
    if (!blog) return;
    const storedLiked = localStorage.getItem(`liked-${blog.id}`);
    if (storedLiked) setLiked(true);
  }, [blog]);

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
    if (!blog) return;
    async function fetchBlogs() {
      const snapshot = await getDocs(collection(db1, "blogs"));
      const allBlogs = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b) => b.id !== blog.id)
        .sort(
          (a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0)
        );
      setBlogs(allBlogs.slice(0, 9));
    }
    fetchBlogs();
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleLikeClick = async () => {
    if (!blog) return;
    const newLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(newLikes);
    localStorage.setItem(`liked-${blog.id}`, (!liked).toString());
    try {
      const blogRef = doc(db1, "blogs", blog.id);
      await updateDoc(blogRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const sampleNews = [
    {
      title: "Elections 2025: What You Should Know",
      link: "/news/elections",
      category: "Politics",
    },
    {
      title: "Tech Giants Battle Over AI Dominance",
      link: "/news/ai-war",
      category: "Technology",
    },
    {
      title: "Global Markets Face Turbulence",
      link: "/news/markets",
      category: "Business",
    },
  ];

  if (!blog) return <div className="text-center py-20">Loading news...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen px-0 md:px-10 lg:px-20 py-5 mx-auto font-sans space-y-10"
    >
      {/* News Header */}
      <div>
        <div className="w-full mt-1">
          {/* Title & Subtitle above the image */}
          <div className="mb-4 p-1">
            <h1 className="text-3xl md:text-4xl lg:w-1/2 font-bold mt-10 p-2 lg:mt-25 lg:mx-auto">
              {blog.title}
            </h1>
            {blog.subtitle && (
              <h2 className="text-md md:text-lg mt-1 lg:mx-auto lg:w-1/2 text-center font-semibold border-2 py-2 px-2">
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
            <div className="absolute inset-0 rounded-lg"></div>
          </div>
        </div>
        <SideNewsTicker news={sampleNews} />

        <div>
          <div className="flex gap-6 mt-4 items-center justify-center size-10 mx-auto">
            <FollowUsPopup />
            <div className="flex justify-center">
              <Link href="/live">
                <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
                  {/* Animated Live Dot */}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>

                  {/* Live Text */}
                  <p className="font-semibold text-sm uppercase tracking-wide animate-pulse">
                    Live
                  </p>

                  {/* Play Icon */}
                  <Play className="h-4 w-4" />
                </div>
              </Link>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={handleShareClick}
                className="flex items-center gap-2 font-semibold border border-gray-300 dark:border-gray-700 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Share className="h-4 w-4" />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3 text-sm z-50">
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
                    className="hover:underline"
                  >
                    Share via Email
                  </a>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleCopyLink}
                className="flex gap-2 items-center justify-center border border-gray-300 dark:border-gray-700 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Copy
                <LinkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="max-w-none px-2 sm:px-4 space-y-5 blog-content">
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <BlogDisplay body={blog.body} />
        </>
      </div>

      {/* Like Button */}
      <div className="flex gap-3 sm:gap-5">{/* ... */}</div>

      {/* Newsletter Card */}
      <Link href="/newsletter">
        <div className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-800 lg:w-1/3 mx-auto rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-bold mb-2 text-white">Stay Updated!</h3>
          <p className="mb-4 text-gray-200">
            Subscribe to our newsletter and never miss an update.
          </p>

          {/* Animated Button */}
          <motion.button
            className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Subscribe Now
          </motion.button>
        </div>
      </Link>
      <AdminProfile />
      {/* Related News */}
      <div>
        <h2 className="text-xl font-bold mb-4 mt-10 p-5">Related News</h2>

        {/* First row - grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((b) => (
            <Link
              key={b.id}
              href={`/news/${createFullSlug(b.title, b.id)}`}
              className="block"
            >
              <div className="flex flex-col rounded-md overflow-hidden shadow-md cursor-pointer">
                {b.imageUrl && (
                  <div className="relative w-full h-48 sm:h-56">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="object-cover w-full h-full"
                    />
                    {/* Category badge */}
                    <div
                      className={`absolute top-2 left-2 ${getCategoryColor(
                        b.category
                      )} text-white text-xs font-semibold px-3 py-1 rounded-md z-10`}
                    >
                      {b.category || "Other"}
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold hover:underline uppercase">
                    {b.title}
                  </h2>
                  <h3 className="text-sm">{b.subtitle}</h3>
                  <p className="text-xs mt-2">
                    {b.createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Middle row - scrollable small cards */}
        <div className="overflow-x-auto mt-6">
          <div className="flex space-x-4">
            {blogs.slice(3, 6).map((b) => (
              <Link
                key={b.id}
                href={`/news/${createFullSlug(b.title, b.id)}`}
                className="flex-shrink-0 w-64"
              >
                <div className="flex flex-col rounded-md overflow-hidden shadow-md cursor-pointer">
                  {b.imageUrl && (
                    <div className="relative w-full h-32">
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="object-cover w-full h-full"
                      />
                      {/* Category badge */}
                      <div
                        className={`absolute top-2 left-2 ${getCategoryColor(
                          b.category
                        )} text-white text-xs font-semibold px-2 py-1 rounded-md z-10`}
                      >
                        {b.category || "Other"}
                      </div>
                    </div>
                  )}
                  <div className="p-3">
                    <h2 className="text-sm font-bold hover:underline uppercase truncate">
                      {b.title}
                    </h2>
                    <h3 className="text-xs">{b.subtitle}</h3>
                    <p className="text-xs mt-1">
                      {b.createdAt?.toDate().toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Last row - 3 more cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.slice(6, 9).map((b) => (
            <Link
              key={b.id}
              href={`/news/${createFullSlug(b.title, b.id)}`}
              className="block"
            >
              <div className="flex flex-col rounded-md overflow-hidden shadow-md cursor-pointer">
                {b.imageUrl && (
                  <div className="relative w-full h-40 sm:h-48">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="object-cover w-full h-full"
                    />
                    {/* Category badge */}
                    <div
                      className={`absolute top-2 left-2 ${getCategoryColor(
                        b.category
                      )} text-white text-xs font-semibold px-3 py-1 rounded-md z-10`}
                    >
                      {b.category || "Other"}
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold hover:underline uppercase">
                    {b.title}
                  </h2>
                  <h3 className="text-sm">{b.subtitle}</h3>
                  <p className="text-xs mt-2">
                    {b.createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
