"use client";

import {Suspense } from "react";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db1 } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Unknown Date";

  if (timestamp.seconds && typeof timestamp.seconds === "number") {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }

  if (typeof timestamp.toDate === "function") {
    try {
      return timestamp.toDate().toLocaleDateString();
    } catch {
      return "Unknown Date";
    }
  }

  if (timestamp instanceof Date) {
    return timestamp.toLocaleDateString();
  }

  try {
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }
  } catch {
    return "Unknown Date";
  }

  return "Unknown Date";
};

const BlogPage = () => {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showContentType, setShowContentType] = useState("blog");
  const [adShown, setAdShown] = useState({
    video: false,
    reel: false,
  });

  const handleClick = (type) => {
    if (type === "reel" && !adShown[type]) {
      window.open("https://otieu.com/4/9366150", "_blank");
      setAdShown((prev) => ({ ...prev, [type]: true }));
      return;
    }
    handleContentTypeChange(type);
  };

  const genres = [
    "Cyclopedia"
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db1, "blogs"));
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogPosts(blogs);

        let basePosts = [];
        if (showContentType === "blog") {
          basePosts = blogs.filter((post) => !post.isVideo);
        } else if (showContentType === "video") {
          basePosts = blogs.filter((post) => post.isVideo && !post.isReel);
        } else if (showContentType === "reel") {
          basePosts = blogs.filter((post) => post.isReel);
        }

        setFilteredPosts(basePosts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [showContentType]);

  const handleContentTypeChange = (type) => {
    setShowContentType(type);
    setSelectedCategory(null);

    let basePosts = [];
    if (type === "blog") {
      basePosts = blogPosts.filter((post) => !post.isVideo);
    } else if (type === "video") {
      basePosts = blogPosts.filter((post) => post.isVideo && !post.isReel);
    } else if (type === "reel") {
      basePosts = blogPosts.filter((post) => post.isReel);
    }

    setFilteredPosts(basePosts);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);

    let basePosts = [];
    if (showContentType === "blog") {
      basePosts = blogPosts.filter((post) => !post.isVideo);
    } else if (showContentType === "video") {
      basePosts = blogPosts.filter((post) => post.isVideo && !post.isReel);
    } else if (showContentType === "reel") {
      basePosts = blogPosts.filter((post) => post.isReel);
    }

    const filtered = basePosts.filter(
      (post) =>
        post.genre && post.genre.toLowerCase() === category.toLowerCase()
    );
    setFilteredPosts(filtered);
  };

  const extractYouTubeId = (url) => {
    if (!url) return null;
    try {
      const regExp =
        /^.*(?:youtu.be\/|v\/|embed\/|watch\?v=)([^#\&\?]{11}).*/;
      const match = url.match(regExp);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const openVideo = (post) => {
    if (!post.videoURL || typeof post.videoURL !== "string") {
      alert("Video URL is missing or invalid.");
      return;
    }
    const videoURL = encodeURIComponent(post.videoURL);
    const title = encodeURIComponent(post.title || "");
    const desc = encodeURIComponent(post.description || post.body || "");

    router.push(
      `/video/${post.id}?url=${videoURL}&title=${title}&desc=${desc}`
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <>
        <main className="min-h-screen bg-black text-white px-2 py-20">
          <div className="max-w-7xl mx-auto ">
            <ScrollProgressBar />

            <header className="text-center mb-12 bg-amber-950 text-white rounded-bl-full">
              <div className="lg:flex items-center justify-center gap-20 bg-amber-950 rounded-br-full ">
                <div className="max-lg:relative">
                  <h1 className="text-6xl font-bold tracking-tight max-lg:inset-0 max-lg:top-8 lg:py-10 lg:hidden text-gray-400 mb-5">
                    <div id="ups-go"></div>
                    <div
                      onClick={() => {
                        const el = document.getElementById("ups-go");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {/* small Screen */}
                    </div>
                    {showContentType === "" ? " " : ""}
                  </h1>
                </div>
                <div className="z-0 max-md:mt-2 lg:-mt-30 w-90 fixed ">
                  <input
                    type="text"
                    placeholder={`Search ${showContentType} by genre... Cyclopedia`}
                    className="px-2 py-2 rounded-full text-white focus:ring-purple-800 border w-full max-w-md mx-auto mb-10 bg-amber-950 border-gray-700 focus:outline-none focus:ring-2"
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      let basePosts = [];

                      if (showContentType === "blog") {
                        basePosts = blogPosts.filter((post) => !post.isVideo);
                      } else if (showContentType === "video") {
                        basePosts = blogPosts.filter(
                          (post) => post.isVideo && !post.isReel
                        );
                      } else if (showContentType === "reel") {
                        basePosts = blogPosts.filter((post) => post.isReel);
                      }

                      if (searchTerm) {
                        const filtered = basePosts.filter(
                          (post) =>
                            post.genre &&
                            post.genre.toLowerCase().includes(searchTerm)
                        );
                        setFilteredPosts(filtered);
                        setSelectedCategory(null);
                      } else {
                        setFilteredPosts(basePosts);
                        setSelectedCategory(null);
                      }
                    }}
                  />
                </div>

                <div
                  className="flex overflow-x-auto whitespace-nowrap gap-1 py-20 px-4"
                  style={{ scrollbarWidth: "none" }}
                >
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition cursor-pointer ${
                        selectedCategory === genre
                          ? "bg-green-500 text-black"
                          : "bg-gray-400/5 border-x border-x-green-600 text-white hover:bg-gray-400/10"
                      }`}
                      onClick={() => filterByCategory(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                  {selectedCategory && (
                    <button
                      className="flex-shrink-0 px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700"
                      onClick={() => {
                        setSelectedCategory(null);
                        let basePosts = [];
                        if (showContentType === "blog") {
                          basePosts = blogPosts.filter((post) => !post.isVideo);
                        } else if (showContentType === "video") {
                          basePosts = blogPosts.filter(
                            (post) => post.isVideo && !post.isReel
                          );
                        } else if (showContentType === "reel") {
                          basePosts = blogPosts.filter((post) => post.isReel);
                        }
                        setFilteredPosts(basePosts);
                      }}
                    >
                      Clear Genre Filter
                    </button>
                  )}
                </div>

                {/* big Screen */}
                <p className="text-sm py-1 text-gray-400 font-mono">
                  <h1 className="text-6xl font-bold tracking-tight space-x-5 lg:border-x-green-600 max-lg:inset-0 max-lg:top-8 lg:py-10 max-lg:hidden">
                    {showContentType === "" ? " " : ""}
                  </h1>
                </p>
              </div>
              <p>
                {" "}
                Explore unique insights, research, trends, stories, histories,
                news, politics and expert opinions.
              </p>
              <div></div>
              {/* Only show community section on blog, not video or reel */}
              {showContentType === "blog" && <div></div>}
              <div>
                <h1
                  className="font-bold font-serif cursor-pointer text-green-600"
                  onClick={() => {
                    const el = document.getElementById("services-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Have something to Share? ⬇
                </h1>
              </div>
            </header>

            {/* Posts */}
            {!loading && filteredPosts.length > 0 && showContentType !== "gallery" && (
              <section className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-xl hover:shadow-2xl transition-all duration-300 shadow-black shadow-2xl relative"
                  >
                    <span className="absolute top-0 -mt-5 left-7 bg-green-600 text-white z-10 text-xs px-3 py-1 rounded-lg shadow-2xl shadow-black">
                      {post.genre || "General"}
                    </span>
                    <h1 className="text-xs text-white text-center absolute top-5 right-7 z-30">
                      <span className="text-green-600">Cyclopedia-</span>Blog
                    </h1>

                    {showContentType === "blog" ? (
                      <Link href={`/blog/${post.id}`} className="block">
                        <div className="z-50 p-5 bg-gray-950 backdrop-blur-md rounded-b-xl shadow-2xl shadow-black hover:bg-gray-400/5 h-50 items-center justify-center">
                          <h3 className="w-30 h-25 rounded-t-xl object-right ml-auto">
                            {post.imageUrl && (
                              <div className="overflow-hidden">
                                <img
                                  src={post.imageUrl}
                                  alt="Cyclopedia Poster"
                                  className="w-40 h-28 rounded-t-xl object-right ml-auto"
                                />
                              </div>
                            )}
                          </h3>
                          <h2 className="text-sm font-bold bg-black shadow-2xl shadow-black text-white text-left -mt-28 w-1/2">
                            {post.title}
                          </h2>

                          {/* Render body as HTML */}
                          <div
                            className="text-xs text-white line-clamp-2 mt-3 bg-black p- z-50 w-1/2"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                          />

                          {/* Format timestamp */}
                          <p className="text-gray-500 text-sm py-2">
                            {formatTimestamp(post.timestamp)}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div>
                        {(() => {
                          const videoId = extractYouTubeId(post.videoURL);

                          const thumbnailUrl = post.thumbnail
                            ? post.thumbnail
                            : videoId
                            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                            : "/video-placeholder.jpg";

                          return (
                            <>
                              <img
                                src={thumbnailUrl}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                              />
                              <div className="p-5">
                                <h2 className="text-2xl font-bold mb-3 mt-5 text-center">
                                  {post.title}
                                </h2>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                                  {post.description || post.body}
                                </p>
                                <p className="text-xs text-gray-400 text-right">
                                  Posted on {formatTimestamp(post.timestamp)}
                                </p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </article>
                ))}
              </section>
            )}

            {loading && (
              <div className="flex justify-center items-center h-[30vh]">
                <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {!loading && filteredPosts.length === 0 && (
              <p className="text-center text-gray-400 mt-10">No posts found.</p>
            )}
          </div>

          <div id="services-section"></div>
          <div className="mt-10 ">
            <h1 className="font-bold font-serif text-green-600">
              Have something to Share?
            </h1>
            <h2 className="font-mono ">
              We value your thoughts and ideas! feel free to share your
              opinions, Suggestions, or topics you'd love to see on our blog.
              <h3>📩Reach out to us directly on WhatsApp:</h3>
            </h2>
            <a
              href="https://wa.me/+2348142995114?text=Hello,%20my%20name%20is%20[Your%20Name].%20I'd%20like%20to%20share%20some%20information%20with%20Wiz-Blog."
              target="_self"
              rel="noopener noreferrer"
              className="font-bold text-green-600 cursor-pointer hover:underline"
            >
              Click here to chat
            </a>
          </div>
        </main>
    </>
  );
};

export default BlogPage;

