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
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { checkAgeVerification } from "@/hooks/useAgeVerification";
import SideNewsTicker from "@/components/SideNewsTicker";
import FollowUsPopup from "@/components/FollowUsPopup";
import Icons from "@/components/Icon";

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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isVerifying, setIsVerifying] = useState(true);
  const [showFloatingAd, setShowFloatingAd] = useState(true);
  const [isAdMinimized, setIsAdMinimized] = useState(false);
  const menuRef = useRef(null);

  // Category colors mapping
  const categoryColors = {
    politics: "bg-red-600",
    religion: "bg-red-600",
    history: "bg-red-600",
    education: "bg-red-600",
    health: "bg-red-600",
    sports: "bg-red-600",
    technology: "bg-red-600",
    entertainment: "bg-red-600",
    business: "bg-red-700",
    "sex-education": "bg-red-600",
    other: "bg-red-500",
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase() || "other";
    return categoryColors[cat] || categoryColors.other;
  };

  // Auto show/hide floating ad every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFloatingAd((prev) => !prev);
      setIsAdMinimized(false);
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  // Fetch blog and check age verification
  useEffect(() => {
    if (!slugParam) return;

    async function verifyAndFetchBlog() {
      try {
        const docId = extractIdFromSlug(slugParam);
        const blogRef = doc(db1, "blogs", docId);
        const blogDoc = await getDoc(blogRef);

        if (blogDoc.exists()) {
          const data = blogDoc.data();

          if (data.category === "sex-education") {
            if (authLoading) return;

            if (!user) {
              router.push("/signup?redirect=sex-education");
              return;
            }

            const verified = await checkAgeVerification(user.uid);
            if (!verified) {
              router.push("/age-verification?redirect=sex-education");
              return;
            }
          }

          setBlog({ id: docId, ...data });
          setLikes(data.likes || 0);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsVerifying(false);
      }
    }

    verifyAndFetchBlog();
  }, [slugParam, user, authLoading, router]);

  // Update URL if needed
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

  const handleShareClick = () => setShowShareMenu(!showShareMenu);

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

  if (isVerifying || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  if (!blog) return <div className="text-center py-20">Loading news...</div>;

  return (
    <>
      {/* FLOATING AD - Bottom Right Corner */}
      {showFloatingAd && !isAdMinimized && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-slide-up">
          <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400">
            {/* Close Button */}
            <button
              onClick={() => setShowFloatingAd(false)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-all"
            >
              ✕
            </button>

            {/* Minimize Button */}
            <button
              onClick={() => setIsAdMinimized(true)}
              className="absolute top-3 right-14 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-all"
            >
              −
            </button>

            {/* Sponsored Badge */}
            <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
              AD
            </div>

            <div className="p-6 pt-12">
              {/* Emoji */}
              <div className="text-6xl text-center mb-4">🎰</div>

              {/* Headline */}
              <h3 className="text-white font-bold text-xl text-center mb-3">
                WIN ₦200K Bonus!
              </h3>

              {/* Subtext */}
              <p className="text-white/90 text-sm text-center mb-4">
                Join Nigeria's #1 Sports Betting Platform Now!
              </p>

              {/* CTA Button */}
              <a
                href="https://www.betwinner.com?aff=83cdf48899a9ca9715e686a4e71f5b60854e5cc65aabc58f5f"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg text-center transition-all transform hover:scale-105 mb-3"
              >
                Claim Bonus Now →
              </a>

              {/* Sports Link */}
              <Link
                href="/sports"
                className="block w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 rounded-lg text-center transition-all text-sm"
              >
                View Sports News
              </Link>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-center gap-2">
                <img
                  src="/hid.png"
                  alt="The Cyclopedia"
                  className="h-5 w-5 rounded-full"
                />
                <span className="text-white/80 text-xs font-semibold">
                  The Cyclopedia
                </span>
              </div>

              <p className="text-white/60 text-xs text-center mt-2">
                18+ | Gamble Responsibly
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Ad Button */}
      {isAdMinimized && (
        <button
          onClick={() => setIsAdMinimized(false)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-110 transition-all animate-bounce"
        >
          <span className="text-2xl">🎰</span>
          <span>Win ₦200K!</span>
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        className="min-h-screen px-0 md:px-10 lg:px-20 py-5 mx-auto font-sans space-y-10"
      >
        {blog.category === "sex-education" && (
          <div className="w-full bg-blue-600 text-white text-center py-2 px-4 text-sm">
            ⚠️ This content is restricted to adults 18 years and older
          </div>
        )}

        {/* News Header */}
        <div>
          <div className="w-full overflow-hidden">
            <div className="w-full bg-gradient-to-r from-blue-900 via-gray-800 to-black overflow-hidden text-white my-8 lg:my-25 text-center py-2 px-4 shadow-md">
              <p className="text-sm md:text-base font-medium tracking-wide">
                Stay informed —{" "}
                <a
                  href="https://thecyclopedia.substack.com/subscribe"
                  className="underline underline-offset-4 hover:text-yellow-700 text-yellow-400 transition-colors duration-300"
                >
                  support independent journalism
                </a>{" "}
                and help us continue delivering reliable news and in-depth
                analysis.
              </p>
            </div>

            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl uppercase lg:mt-10 font-extrabold mt-13 mb-5  lg:w-3/4 mx-auto leading-snug">
                {blog.title}
              </h1>

              {blog.createdAt && (
                <p className="text-sm font-serif font-black mb-0 ">
                  Published on:{" "}
                  <span className=" font-medium">
                    {blog.createdAt.toDate().toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </p>
              )}

              <Icons />
              {blog.imageUrl && (
                <div className="relative w-full max-w-4xl mx-auto mb-6">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-auto object-cover"
                  />

                  <Link href="/global">
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-sm md:text-base font-semibold px-3 py-1 rounded-r">
                      The Cyclopedia
                    </div>
                  </Link>
                  <Link href="/pp-feedbacks">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm md:text-base font-semibold px-3 py-1 rounded-l">
                      Rate ⭐⭐⭐⭐
                    </div>
                  </Link>
                </div>
              )}

              {blog.subtitle && (
                <h2 className="text-lg md:text-xl italic font-medium max-w-3xl mx-auto border-l-4 border-purple-600 pl-4">
                  {blog.subtitle}
                </h2>
              )}
            </div>
          </div>
          <SideNewsTicker news={sampleNews} />

          <div className="flex flex-wrap gap-6 mt-6 items-center justify-center mx-auto">
            <FollowUsPopup />

            <Link
              href="/live"
              className="group flex items-center gap-2 cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <p className="font-semibold text-sm uppercase tracking-wide text-red-600 group-hover:text-red-700 transition-colors duration-300">
                Live
              </p>
              <Play className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-300" />
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={handleShareClick}
                className="flex items-center gap-2 font-semibold text-sm border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm"
              >
                <Share className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-3 flex flex-col gap-2 text-sm z-50">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-600 transition-colors"
                  >
                    Share on Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline hover:text-blue-800 transition-colors"
                  >
                    Share on LinkedIn
                  </a>
                  <a
                    href={`mailto:?subject=Check this out&body=${window.location.href}`}
                    className="hover:underline text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                  >
                    Share via Email
                  </a>
                </div>
              )}
            </div>
            <button
              onClick={handleCopyLink}
              className="flex gap-2 items-center justify-center border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm"
            >
              <span className="text-sm font-semibold">Copy</span>
              <LinkIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="max-w-none px-2 sm:px-4 space-y-5 blog-content">
          <>
            <hr className="border-gray-200 dark:border-gray-700" />
            <BlogDisplay body={blog.body} />
          </>
        </div>

        <div className="relative mx-auto text-center mt-20 mb-20 max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-700/5 to-purple-700 backdrop-blur-lg border-purple-500/30 shadow-2xl"></div>

          <div className="relative py-16 px-8 font-black">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Truth in Your Inbox
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Get concise, evidence-based journalism that cuts through the
              noise. Subscribe and uncover what really matters — every week.
            </p>
            <a
              href="/newsletter"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Subscribe Now
            </a>
            <a
              href="/pp-feedbacks"
              className="inline-block ml-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Feedback
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 mt-10 p-5">Related News</h2>

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
                      <div
                        className={`absolute top-0 left-0 ${getCategoryColor(
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

          <div className="overflow-x-auto mt-6">
            <div className="flex space-x-4">
              {blogs.slice(3, 8).map((b) => (
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
                        <div
                          className={`absolute top-0 left-0 ${getCategoryColor(
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
                      <div
                        className={`absolute top-0 left-0 ${getCategoryColor(
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

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </>
  );
}