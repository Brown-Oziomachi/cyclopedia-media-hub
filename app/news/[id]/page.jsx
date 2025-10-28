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
  increment,
  setDoc,
} from "firebase/firestore";
import {
  Share,
  LinkIcon,
  Play,
  Heart,
  Bookmark,
  Eye,
  Clock,
  Ban,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { checkAgeVerification } from "@/hooks/useAgeVerification";
import SideNewsTicker from "@/components/SideNewsTicker";
import FollowUsPopup from "@/components/FollowUsPopup";
import Icons from "@/components/Icon";

// ============================================
// VIEW TRACKING UTILITIES
// ============================================

/**
 * Generates a unique visitor ID stored in localStorage
 */
const getVisitorId = () => {
  if (typeof window === "undefined") return null;
  
  let visitorId = localStorage.getItem("visitor_id");
  
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("visitor_id", visitorId);
  }
  
  return visitorId;
};

/**
 * Checks if this visitor has already viewed this article
 */
const hasViewedArticle = (blogId) => {
  if (typeof window === "undefined") return false;
  
  const viewedArticles = JSON.parse(localStorage.getItem("viewed_articles") || "{}");
  const lastViewed = viewedArticles[blogId];
  
  if (!lastViewed) return false;
  
  // Consider it a new view after 24 hours
  const twentyFourHours = 24 * 60 * 60 * 1000;
  return (Date.now() - lastViewed) < twentyFourHours;
};

/**
 * Marks an article as viewed
 */
const markArticleAsViewed = (blogId) => {
  if (typeof window === "undefined") return;
  
  const viewedArticles = JSON.parse(localStorage.getItem("viewed_articles") || "{}");
  viewedArticles[blogId] = Date.now();
  localStorage.setItem("viewed_articles", JSON.stringify(viewedArticles));
};

/**
 * Tracks a view for an article
 */
const trackView = async (blogId) => {
  try {
    const visitorId = getVisitorId();
    const alreadyViewed = hasViewedArticle(blogId);
    
    // Always increment total views
    const blogRef = doc(db1, "blogs", blogId);
    await updateDoc(blogRef, {
      views: increment(1),
      lastViewed: new Date()
    });
    
    // Only increment unique views if first time viewing (within 24h)
    if (!alreadyViewed) {
      await updateDoc(blogRef, {
        uniqueViews: increment(1)
      });
      markArticleAsViewed(blogId);
    }
    
    // Optional: Track individual view in a subcollection for analytics
    if (typeof window !== "undefined") {
      const viewRef = doc(db1, `blogs/${blogId}/views`, `${Date.now()}_${visitorId}`);
      await setDoc(viewRef, {
        visitorId,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || "direct"
      });
    }
    
    return { success: true, wasUnique: !alreadyViewed };
  } catch (error) {
    console.error("Error tracking view:", error);
    return { success: false, wasUnique: false };
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const extractIdFromSlug = (slug) => {
  const parts = slug.split("--");
  return parts.length > 1 ? parts[parts.length - 1] : slug;
};

const createFullSlug = (title, id) => {
  return `${createSlug(title)}--${id}`;
};

// Blog content renderer
const BlogDisplay = ({ body }) => {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(body || "");
  const html = isHTML ? body : body?.replace(/\n/g, "<br />") || "";

  return (
    <div
      className={`prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-lg ${
        !isHTML ? "whitespace-pre-line" : ""
      }`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function NewsDetails() {
  const { id: slugParam } = useParams();
  const { data: session } = useSession();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [views, setViews] = useState(0);
  const [uniqueViews, setUniqueViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isTrackingView, setIsTrackingView] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const menuRef = useRef(null);
  const [showFloatingAd, setShowFloatingAd] = useState(true);
  const [isAdMinimized, setIsAdMinimized] = useState(false);

  // Category colors with modern palette
  const categoryColors = {
    politics: "from-red-600 to-red-700",
    religion: "from-purple-600 to-purple-700",
    history: "from-amber-600 to-amber-700",
    education: "from-blue-600 to-blue-700",
    health: "from-green-600 to-green-700",
    sports: "from-orange-600 to-orange-700",
    technology: "from-cyan-600 to-cyan-700",
    entertainment: "from-pink-600 to-pink-700",
    business: "from-slate-600 to-slate-700",
    "sex-education": "from-rose-600 to-rose-700",
    "civil-rights": "from-indigo-600 to-indigo-700",
    immigration: "from-teal-600 to-teal-700",
    "real-estate": "from-emerald-600 to-emerald-700",
    other: "from-gray-600 to-gray-700",
  };

  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase() || "other";
    return categoryColors[cat] || categoryColors.other;
  };

  // Calculate reading time
  useEffect(() => {
    if (blog?.body) {
      const words = blog.body.split(/\s+/).length;
      const minutes = Math.ceil(words / 200);
      setReadingTime(minutes);
    }
  }, [blog]);

  // Auto show/hide floating ad every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFloatingAd((prev) => !prev);
      setIsAdMinimized(false);
    }, 30000);

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
          setViews(data.views || 0);
          setUniqueViews(data.uniqueViews || 0);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsVerifying(false);
      }
    }

    verifyAndFetchBlog();
  }, [slugParam, user, authLoading, router]);

  // Track view after blog loads
  useEffect(() => {
    if (!blog || isTrackingView) return;

    async function recordView() {
      setIsTrackingView(true);
      
      // Wait 3 seconds to ensure it's not a bounce
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const result = await trackView(blog.id);
      
      if (result.success) {
        // Optimistically update the view counts
        setViews(prev => prev + 1);
        if (result.wasUnique) {
          setUniqueViews(prev => prev + 1);
        }
      }
    }

    recordView();
  }, [blog, isTrackingView]);

  // Update URL if needed
  useEffect(() => {
    if (blog && slugParam && !slugParam.includes("--")) {
      const fullSlug = createFullSlug(blog.title, blog.id);
      router.replace(`/news/${fullSlug}`);
    }
  }, [blog, slugParam]);

  // Check if liked/bookmarked
  useEffect(() => {
    if (!blog) return;
    const storedLiked = localStorage.getItem(`liked-${blog.id}`);
    const storedBookmarked = localStorage.getItem(`bookmarked-${blog.id}`);
    if (storedLiked) setLiked(true);
    if (storedBookmarked) setBookmarked(true);
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
      setBlogs(allBlogs.slice(0, 12));
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

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    localStorage.setItem(`bookmarked-${blog.id}`, (!bookmarked).toString());
  };

  if (isVerifying || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-600">
        <div className="text-center">
          <Ban className="mx-auto border rounded-full bg-white text-red-600" size={80} />
          <p className="text-xl">
            The Cyclopedia has temporarily suspended this news update. <br />{" "}
            The original source of this information on Nairaland has been
            removed. <br />
            We advise our readers to stay informed and remain safe.
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:underline mt-4 inline-block underline"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen lg:mt-50 mt-20"
      >
        {/* Age restriction banner */}
        {blog.category === "sex-education" && (
          <div className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-center py-3 px-4 text-sm font-semibold shadow-lg">
            ⚠️ This content is restricted to adults 18 years and older
          </div>
        )}

        {/* Support banner */}
        <div className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-4 px-4 shadow-md">
          <p className="text-sm md:text-base font-medium text-center">
            Support independent journalism —{" "}
            <a
              href="https://thecyclopedia.substack.com/subscribe"
              className="underline underline-offset-4 hover:text-yellow-300 text-center text-yellow-400 transition-colors duration-300 font-semibold"
            >
              Support our work
            </a>{" "}
            for in-depth analysis and reliable reporting
          </p>
        </div>

        {/* Main article container */}
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`inline-block bg-gradient-to-r ${getCategoryColor(
                blog.category
              )} text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg`}
            >
              {blog.category || "News"}
            </span>
          </div>

          {/* Article title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Metadata bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
          >
            {blog.createdAt && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <time dateTime={blog.createdAt.toDate().toISOString()}>
                  {blog.createdAt.toDate().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            )}

            {/* REAL VIEW COUNTER */}
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4" />
              <span>
                {views.toLocaleString()} view{views !== 1 ? "s" : ""}
                {uniqueViews > 0 && (
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    ({uniqueViews.toLocaleString()} unique)
                  </span>
                )}
              </span>
            </div>

            <div className="flex-1"></div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={handleShareClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <Share className="h-4 w-4" />
                  <span className="text-sm font-semibold">Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 border bg-white dark:text-black border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-3 flex flex-col gap-2 text-sm z-50">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${
                        window.location.href
                      }&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        𝕏
                      </div>
                      <span className="font-medium">Share on Twitter</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${
                        window.location.href
                      }&title=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                        in
                      </div>
                      <span className="font-medium">Share on LinkedIn</span>
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <LinkIcon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">Copy link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="mt-8 space-y-4 mb-10">
            <div className="flex gap-10 justify-center">
              <a
                href="https://x.com/cyclopedia_news"
                className="text-cyan-400 hover:scale-110 transition-transform"
              >
                <Twitter size={28} />
              </a>
              <a
                href="https://www.instagram.com/cyclopedia_news"
                className="text-pink-500 hover:scale-110 transition-transform"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://www.youtube.com/@cyclopedia-media"
                className="text-red-600 hover:scale-110 transition-transform"
              >
                <Youtube size={28} />
              </a>
            </div>
          </div>

          {/* Featured image */}
          {blog.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-full mb-12 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0"></div>
            </motion.div>
          )}

          {blog.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-medium leading-relaxed mb-8 border-l-4 border-red-600 pl-6"
            >
              {blog.subtitle}
            </motion.p>
          )}

          {/* Social proof bar */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <FollowUsPopup />
            <Link
              href="/live"
              className="group flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="font-bold text-sm uppercase tracking-wide text-red-600">
                Live News
              </span>
            </Link>
          </div>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16 max-md:p-1"
          >
            <BlogDisplay body={blog.body} />
          </motion.div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative overflow-hidden rounded-3xl mb-16"
          >
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

            <div className="relative py-16 px-8 text-center border">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Ahead of the News
              </h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                Get expert analysis, breaking news, and in-depth stories
                delivered to your inbox every week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/newsletter"
                  className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Subscribe Now
                </Link>
                <Link
                  href="/pp-feedbacks"
                  className="inline-block bg-white/10 backdrop-blur-sm font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
                >
                  Give Feedback
                </Link>
              </div>
            </div>
          </motion.div>
        </article>

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

        {/* Related articles */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Related</h2>

            {/* Featured related articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.slice(0, 6).map((b) => (
                <Link
                  key={b.id}
                  href={`/news/${createFullSlug(b.title, b.id)}`}
                  className="group"
                >
                  <article className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {b.imageUrl && (
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={b.imageUrl}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Dark gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        {/* Category badge */}
                        <div
                          className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(
                            b.category
                          )} text-xs font-bold px-3 py-1 rounded-full shadow-lg text-white`}
                        >
                          {b.category || "News"}
                        </div>

                        {/* Title, subtitle, and date on image */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                            {b.title}
                          </h3>
                          {b.subtitle && (
                            <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                              {b.subtitle}
                            </p>
                          )}
                          <time className="text-xs text-gray-300">
                            {b.createdAt?.toDate().toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
            <h3 className="text-3xl font-bold mb-8">Explore More News</h3>

            {/* More articles grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {blogs.slice(6, 12).map((b) => (
                <Link
                  key={b.id}
                  href={`/news/${createFullSlug(b.title, b.id)}`}
                  className="group"
                >
                  <article className="rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">
                    {b.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={b.imageUrl}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        {/* Title on image */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                            {b.title}
                          </h3>
                          <time className="text-xs text-gray-200 mt-2 block">
                            {b.createdAt?.toDate().toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}