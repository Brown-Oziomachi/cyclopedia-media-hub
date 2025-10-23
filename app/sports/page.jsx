"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import ViewMoreSearchPopup from "../view/page";
import { Menu, X, ChevronDown, Play, Pause } from "lucide-react";

const SportsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const sportsCategories = [
    { id: "all", name: "All Sports"},
    { id: "football", name: "Football"},
    { id: "basketball", name: "Basketball" },
    { id: "tennis", name: "Tennis"},
    { id: "athletics", name: "Athletics"},
    { id: "swimming", name: "Swimming"},
    { id: "boxing", name: "Boxing" },
  ];

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const createFullSlug = (title, id) => {
    return `${createSlug(title)}--${id}`;
  };

  useEffect(() => {
    // Show video after 2 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchSportsPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "sports"),
          orderBy("createdAt", "desc"),
          limit(50)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching sports posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsPosts();
  }, []);

  useEffect(() => {
    if (selectedSport === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.subcategory?.toLowerCase() === selectedSport.toLowerCase()
      );
      setFilteredPosts(filtered);
    }
  }, [selectedSport, posts]);

  const handleSportSelect = (sportId) => {
    setSelectedSport(sportId);
    setSidebarOpen(false);
    document.getElementById("sports-content")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="w-full relative">
      <section className="relative w-full h-[500px] lg:mt-35 mt-10 flex items-center justify-center text-center overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: "url(/sport.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {showVideo && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source
                src="video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0"></div>

            <button
              onClick={toggleVideo}
              className="absolute bottom-8 right-8 p-4 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all z-20"
            >
              {isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white" />
              )}
            </button>
          </div>
        )}

        {/* Decorative Blurs */}
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/20 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-red-600/20 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-yellow-400 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Sports
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Speed, Strength, and Strategy
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Explore the world of sports — thrilling matches, record-breaking
            performances, and the athletes who push the limits to achieve
            greatness on every field.
          </p>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-8 right-8 z-30 p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-2xl transition-all flex items-center gap-2"
        >
          <Menu size={24} />
          <span className="hidden sm:inline font-semibold">Categories</span>
        </button>
      </section>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-amber-50 text-white shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sports Categories
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-2">
            {sportsCategories.map((sport) => {
              const sportPosts =
                sport.id === "all"
                  ? posts
                  : posts.filter(
                      (p) =>
                        p.subcategory?.toLowerCase() === sport.id.toLowerCase()
                    );

              return (
                <button
                  key={sport.id}
                  onClick={() => handleSportSelect(sport.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                    selectedSport === sport.id
                      ? "bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg"
                      : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sport.icon}</span>
                    <span className="font-semibold">{sport.name}</span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedSport === sport.id
                        ? "bg-white/20"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    {sportPosts.length}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div id="sports-content" className="max-w-7xl mx-auto py-10 px-4">
        {/* Selected Category Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {sportsCategories.find((s) => s.id === selectedSport)?.name ||
                "All Sports"}
            </h2>
           
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts[0] && (
          <div className="mb-12">
            <Link
              href={`/news/${createFullSlug(
                filteredPosts[0].title,
                filteredPosts[0].id
              )}`}
            >
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {filteredPosts[0].imageUrl && (
                  <div className="h-64 lg:h-96">
                    <img
                      src={filteredPosts[0].imageUrl}
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-red-600 uppercase mb-2 tracking-wider">
                    Featured Story
                  </span>
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 z-10">
                    {filteredPosts[0].subcategory || "Sports"}
                  </div>
                  <h2 className="text-2xl uppercase lg:text-3xl font-bold mb-4 hover:text-red-600 transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-base">
                    {filteredPosts[0].subtitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {filteredPosts[0].createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading sports news...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20  rounded-2xl">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No posts found for{" "}
              {sportsCategories.find((s) => s.id === selectedSport)?.name}
            </p>
            <button
              onClick={() => setSelectedSport("all")}
              className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              View All Sports
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
                className="group relative rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden "
              >
                {post.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1  shadow-lg">
                      {post.subcategory || "Sports"}
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
                    {post.subtitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {post.createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mx-auto text-center mt-10">
          <ViewMoreSearchPopup />
        </div>
      </div>
    </main>
  );
};

export default SportsPage;
