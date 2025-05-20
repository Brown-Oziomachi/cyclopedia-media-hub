"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db1 } from "@/lib/firebaseConfig";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showContentType, setShowContentType] = useState("blog");
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db1, "blog"));
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
        } else if (showContentType === "reels") {
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
    } else if (type === "reels") {
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
    } else if (showContentType === "reels") {
      basePosts = blogPosts.filter((post) => post.isReel);
    }

    const filtered = basePosts.filter((post) => post.genre === category);
    setFilteredPosts(filtered);
  };

  const openVideo = (url) => {
    let embedUrl = "";

    try {
      const parsedUrl = new URL(url);

      // YouTube
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      // Facebook
      else if (parsedUrl.hostname.includes("facebook.com")) {
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
      }

      // Vimeo
      else if (parsedUrl.hostname.includes("vimeo.com")) {
        const videoId = parsedUrl.pathname.split("/").pop();
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      }

      // Direct video files (MP4, WebM, OGG)
      else if (url.match(/\.(mp4|webm|ogg)$/i)) {
        embedUrl = url;
      }

      // Fallback
      else {
        console.warn("Unsupported video URL:", url);
        return;
      }

      setActiveVideo(embedUrl);
    } catch (err) {
      console.error("Invalid video URL:", url, err);
    }
  };

  const extractYouTubeId = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      } else if (
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtube.com"
      ) {
        return parsedUrl.searchParams.get("v");
      }
    } catch (err) {
      console.error("Error extracting YouTube ID", err);
    }
    return null;
  };
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-8 py-30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold tracking-tight mt-5">
            Discover Inspiring {showContentType === "blog" ? "Blog " : "Videos"}
          </h1>
          <p className="text-xl text-gray-400 mt-3 ">
            Explore unique insights, stories, and expert opinions
          </p>
        </header>



        {/* Toggle */}
        <div className="flex gap-4 mb-6 justify-center">
          {["blog", "video", "reels"].map((type) => (
            <button
              key={type}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                showContentType === type
                  ? type === "reels"
                    ? "bg-pink-500 text-black"
                    : type === "video"
                    ? "bg-yellow-600 text-black"
                    : "bg-white text-black"
                  : type === "reels"
                  ? "bg-pink-800 text-black hover:bg-pink-600"
                  : "bg-yellow-800 text-black hover:bg-white"
              }`}
              onClick={() => handleContentTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={`Search ${showContentType} by genre...`}
            className="w-full px-4 py-2 rounded-md text-white focus:ring focus:ring-yellow-500 border border-white bg-amber-50/30"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              let basePosts = [];

              if (showContentType === "blog") {
                basePosts = blogPosts.filter((post) => !post.isVideo);
              } else if (showContentType === "video") {
                basePosts = blogPosts.filter(
                  (post) => post.isVideo && !post.isReel
                );
              } else if (showContentType === "reels") {
                basePosts = blogPosts.filter((post) => post.isReel);
              }

              if (searchTerm) {
                const filtered = basePosts.filter(
                  (post) =>
                    post.genre && post.genre.toLowerCase().includes(searchTerm)
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

        {/* Modal */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl px-4">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-2 right-2 text-white text-3xl z-50"
              >
                &times;
              </button>
              <div className="aspect-video w-full">
                {activeVideo.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video controls className="w-full h-full rounded-xl shadow-lg">
                    <source src={activeVideo} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={activeVideo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl shadow-lg"
                    title="video player"
                    frameBorder="0"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        {!loading && filteredPosts.length > 0 && showContentType !== "reels" && (
          <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-950 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-fit"
              >
                <span className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full">
                  {post.genre || "General"}
                </span>
                <h1 className="text-xs text-gray-400 text-center absolute top-4 right-4">
                  THE <span className="text-orange-400">SUN</span> WEB
                </h1>

                {showContentType === "blog" ? (
                  <Link href={`/blog/${post.id}`} className="block">
                    {post.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="py-5">
                      <h2 className="text-xl font-bold mb-3 mt-5">{post.title}</h2>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.body}</p>
                      <p className="text-xs text-gray-400 text-right">
                        Posted on{" "}
                        {post.timestamp?.seconds
                          ? new Date(post.timestamp.seconds * 1000).toLocaleDateString()
                          : "Unknown Date"}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="block cursor-pointer"
                    onClick={() => openVideo(post.videoURL)}
                  >
                    <div className="h-48 bg-black flex items-center justify-center">
                      <img
                        src={
                          post.thumbnail
                            ? post.thumbnail
                            : post.videoURL?.includes("youtube.com") ||
                              post.videoURL?.includes("youtu.be")
                            ? `https://img.youtube.com/vi/${extractYouTubeId(
                                post.videoURL
                              )}/hqdefault.jpg`
                            : "/video-placeholder.jpg"
                        }
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="text-2xl font-bold mb-3 mt-5">{post.title}</h2>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                        {post.description || post.body}
                      </p>
                      <p className="text-xs text-gray-400 text-right">
                        Posted on{" "}
                        {post.timestamp?.seconds
                          ? new Date(post.timestamp.seconds * 1000).toLocaleDateString()
                          : "Unknown Date"}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </section>
        )}

        {/* Reels */}
        {!loading && filteredPosts.length > 0 && showContentType === "reels" && (
          <section className="flex flex-col gap-8 max-w-xl mx-auto">
            {filteredPosts.map((reel) => (
              <div
                key={reel.id}
                className="relative cursor-pointer rounded-xl shadow-lg overflow-hidden bg-black"
                onClick={() => openVideo(reel.videoURL)}
              >
                <div className="aspect-[9/16] w-full relative">
                  <img
                    src={
                      reel.thumbnail
                        ? reel.thumbnail
                        : reel.videoURL?.includes("youtube.com") ||
                          reel.videoURL?.includes("youtu.be")
                        ? `https://img.youtube.com/vi/${extractYouTubeId(reel.videoURL)}/hqdefault.jpg`
                        : "/video-placeholder.jpg"
                    }
                    alt={reel.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h2 className="text-white text-lg font-bold line-clamp-2">{reel.title}</h2>
                    <p className="text-gray-300 text-sm line-clamp-2 mt-1">
                      {reel.description || reel.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {loading && (
          <div className="flex justify-center items-center h-[30vh]">
            <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className=" text-center z-0">
  <ins
    className="adsbygoogle"
    style={{ display: "block" }}
    data-ad-client="ca-pub-8408243121163767" // Your AdSense client ID
    data-ad-slot="8408243121163767" // Your ad slot ID
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
</div>
    </main>
  );
};

export default BlogPage;
