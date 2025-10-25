"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Menu, X, Play, TrendingUp, Rocket, ExternalLink } from "lucide-react";
import { SideSportsNews } from "@/components/SportsSideNews";

const SportsPage = () => {
  const params = useParams();
  const router = useRouter();
  const sportParam = params?.sport || "all";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [spaceVideos, setSpaceVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [sportsNews, setSportsNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);

  const sportsCategories = [
    {
      id: "all",
      name: "All Sports",
      icon: "🏆",
      color: "from-red-500 to-orange-600",
      searchQuery: "sports highlights 2025",
    },
    {
      id: "football",
      name: "Football",
      icon: "⚽",
      color: "from-green-500 to-emerald-600",
      searchQuery: "football soccer highlights 2025",
    },
    {
      id: "basketball",
      name: "Basketball",
      icon: "🏀",
      color: "from-orange-500 to-amber-600",
      searchQuery: "basketball NBA highlights 2025",
    },
    {
      id: "tennis",
      name: "Tennis",
      icon: "🎾",
      color: "from-yellow-500 to-lime-600",
      searchQuery: "tennis highlights 2025",
    },
    {
      id: "athletics",
      name: "Athletics",
      icon: "🏃",
      color: "from-blue-500 to-cyan-600",
      searchQuery: "athletics track field 2025",
    },
    {
      id: "swimming",
      name: "Swimming",
      icon: "🏊",
      color: "from-cyan-500 to-blue-600",
      searchQuery: "swimming highlights 2025",
    },
    {
      id: "boxing",
      name: "Boxing",
      icon: "🥊",
      color: "from-red-600 to-pink-600",
      searchQuery: "boxing highlights 2025",
    },
  ];

  const currentSport =
    sportsCategories.find((s) => s.id === sportParam) || sportsCategories[0];

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const createFullSlug = (title, id) => {
    return `${createSlug(title)}--${id}`;
  };

  // Fetch latest sports videos from YouTube API
  useEffect(() => {
    const fetchSportsVideos = async () => {
      setLoadingVideos(true);
      try {
        const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

        // Check if API key is valid
        if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === "AIzaSyDummy") {
          console.error("⚠️ YouTube API key not configured properly");
          setSpaceVideos([]);
          setLoadingVideos(false);
          return;
        }

        const searchQuery =
          currentSport.searchQuery || "sports highlights 2025";
        console.log("🔍 Searching YouTube for:", searchQuery);

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(
            searchQuery
          )}&type=video&order=date&videoDuration=medium&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("❌ YouTube API Error:", errorData);
          setSpaceVideos([]);
          setLoadingVideos(false);
          return;
        }

        const data = await response.json();
        console.log("✅ YouTube API Response:", data);

        if (data.items && data.items.length > 0) {
          const videos = data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            date: item.snippet.publishedAt,
            thumbnail:
              item.snippet.thumbnails.high?.url ||
              item.snippet.thumbnails.medium?.url,
            // YouTube embed URL - will play with sound when clicked
            embedUrl: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1&rel=0&controls=1&showinfo=0&modestbranding=1`,
            watchUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            channelTitle: item.snippet.channelTitle,
          }));
          console.log("✅ Processed", videos.length, "videos");
          setSpaceVideos(videos);
        } else {
          console.log("⚠️ No videos found");
          setSpaceVideos([]);
        }
      } catch (error) {
        console.error("❌ Error fetching videos:", error);
        setSpaceVideos([]);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchSportsVideos();
    setCurrentVideoIndex(0);
  }, [sportParam]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [sportParam]);

  useEffect(() => {
    const fetchSportsPosts = async () => {
      setLoading(true);
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
      } catch (error) {
        console.error("Error fetching sports posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsPosts();
  }, []);

  // Fetch latest sports news for sidebar
  useEffect(() => {
    const fetchSportsNews = async () => {
      setLoadingNews(true);
      try {
        const newsRef = collection(db1, "blogs");
        const q = query(
          newsRef,
          where("category", "==", "sports"),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const newsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSportsNews(newsData);
      } catch (error) {
        console.error("Error fetching sports news:", error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchSportsNews();
  }, []);

  useEffect(() => {
    if (sportParam === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) => post.subcategory?.toLowerCase() === sportParam.toLowerCase()
      );
      setFilteredPosts(filtered);
    }
  }, [sportParam, posts]);

  const handleSportSelect = (sportId) => {
    setSidebarOpen(false);
    if (sportId === "all") {
      router.push("/sports");
    } else {
      router.push(`/sports/${sportId}`);
    }
  };

  const handleVideoSelect = (index) => {
    console.log("🎬 Playing video:", spaceVideos[index]?.title);
    setCurrentVideoIndex(index);
    setShowVideo(true);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full relative">
      {/* Hero Section with Video */}
      <section className="relative w-full h-[500px] lg:mt-30 mt-10 flex items-center justify-center text-center overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            showVideo && spaceVideos.length > 0 ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: "url(/sport.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* YouTube Video Player */}
        {showVideo &&
          spaceVideos.length > 0 &&
          spaceVideos[currentVideoIndex] && (
            <div className="absolute inset-0">
              <iframe
                key={spaceVideos[currentVideoIndex].id}
                className="w-full h-full"
                src={spaceVideos[currentVideoIndex].embedUrl}
                title={spaceVideos[currentVideoIndex].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              {/* Video Info Overlay */}
              <div className="absolute bottom-8 left-8 z-20 max-w-xl pointer-events-auto bg-black/70 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-gray-400 text-xs">
                    {spaceVideos[currentVideoIndex].channelTitle}
                  </span>
                  <a
                    href="/sports"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-semibold"
                  >
                    Watch on The Cyclopedia <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

        {/* Decorative Blurs */}
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/20 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-red-600/20 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content - Only show when video is NOT playing */}
        {(!showVideo || spaceVideos.length === 0) && (
          <div className="relative z-10 px-4">
            <div className="inline-flex items-center gap-2 text-yellow-400 bg-white/90 font-semibold text-sm px-4 py-2 rounded-full mb-4 tracking-wide uppercase">
              <span className="text-2xl">{currentSport.icon}</span>
              <span>{currentSport.name}</span>
            </div>
            <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
              {sportParam === "all"
                ? "Speed, Strength, and Strategy"
                : `${currentSport.name} Excellence`}
            </h1>
            <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
              {sportParam === "all"
                ? "Explore the world of sports — thrilling matches, record-breaking performances, and the athletes who push the limits to achieve greatness on every field."
                : `Discover the latest ${currentSport.name.toLowerCase()} news, highlights, and stories from around the world.`}
            </p>
          </div>
        )}

        {/* Live Sports Button */}
        <Link href="/live" className="absolute top-5 right-5 z-20">
          <div className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all">
            <span className="text-red-300 text-2xl animate-pulse">•</span>
            <span className="font-bold">Live Sports</span>
          </div>
        </Link>

        {/* Cyclopedia TV Badge */}
        <div className="absolute top-14 right-5 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg">
          <img src="/hid.png" alt="Logo" className="h-5 w-5 rounded-full" />
          <span className="text-white text-xs font-medium">Cyclopedia TV</span>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-10 right-5 z-30 p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl transition-all"
          aria-label="Toggle sports menu"
        >
          <Menu size={24} />
        </button>
      </section>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white text-black shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Sports Categories</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg transition bg-red-600 hover:bg-red-700"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="h-px  mb-6"></div>

          <div className="space-y-3">
            {sportsCategories.map((sport) => {
              const sportPosts =
                sport.id === "all"
                  ? posts
                  : posts.filter(
                      (p) =>
                        p.subcategory?.toLowerCase() === sport.id.toLowerCase()
                    );

              const isActive = sportParam === sport.id;

              return (
                <button
                  key={sport.id}
                  onClick={() => handleSportSelect(sport.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                    isActive
                      ? `bg-gradient-to-r ${sport.color} text-white shadow-lg scale-105`
                      : "bg-black text-white hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{sport.icon}</span>
                    <span className="font-semibold text-lg">{sport.name}</span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isActive ? "bg-white/20" : "bg-gray-700"
                    }`}
                  >
                    {sportPosts.length}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-8 p-4 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="text-red-500" size={20} />
              <span className="font-bold">Quick Stats</span>
            </div>
            <div className="text-sm text-black/80">
              <div className="flex justify-between mb-2">
                <span>Total Articles:</span>
                <span className="font-bold text-white">{posts.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Category:</span>
                <span className="font-bold text-white">
                  {filteredPosts.length}
                </span>
              </div>
            </div>
          </div>

          {/* Latest Sports News Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="text-yellow-400" size={20} />
              <h3 className="font-bold text-lg">Latest Sports News</h3>
            </div>

            {loadingNews ? (
              <div className="text-center py-6">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-400 border-t-transparent"></div>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sportsNews.slice(0, 8).map((news) => (
                  <Link
                    key={news.id}
                    href={`/news/${createFullSlug(news.title, news.id)}`}
                    onClick={() => setSidebarOpen(false)}
                    className="block p-3 bg-black hover:bg-gray-700 rounded-lg transition-all group"
                  >
                    <div className="flex gap-3">
                      {news.imageUrl && (
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 mb-1">
                          {news.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {news.createdAt?.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href = "/all-sports">
            <div className="text-center text-red-600 py-10 rounded-md ">All News →</div>
          </Link>

          {/* Betting Affiliate Banner - Monetization */}
          <div className="mt-8 p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
            <div className="text-center mb-3">
              <span className="text-2xl">🎰</span>
              <h3 className="font-bold text-lg mt-2">Bet & Win!</h3>
              <p className="text-xs text-gray-400 mt-1">
                Join the best sports betting platform
              </p>
            </div>
            <a
              href="https://www.betwinner.com?aff=83cdf48899a9ca9715e686a4e71f5b60854e5cc65aabc58f5f"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-lg text-center transition-all transform hover:scale-105"
            >
              Get $200 Bonus →
            </a>
            <p className="text-xs text-gray-500 text-center mt-2">
              18+ | Gamble Responsibly
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Side News Ticker */}
      <SideSportsNews />

      {/* Main Content */}
      <div id="sports-content" className="max-w-7xl mx-auto py-10 px-4">
        {/* Category Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{currentSport.icon}</span>
            <div>
              <h2 className="text-3xl font-bold">{currentSport.name}</h2>
              <p className="text-gray-500 text-sm">
                {filteredPosts.length} articles available
              </p>
            </div>
          </div>
        </div>

        {/* Latest Videos Section */}
        <div className="mb-16 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 border border-indigo-500/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Rocket className="text-indigo-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold">
                  Latest {currentSport.name} Videos
                </h3>
                <p className="text-sm text-gray-500">
                  Click any video to play at the top
                </p>
              </div>
            </div>
          </div>

          {loadingVideos ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-500">
                Loading {currentSport.name.toLowerCase()} videos...
              </p>
            </div>
          ) : spaceVideos.length === 0 ? (
            <div className="text-center py-10 bg-yellow-900/20 rounded-xl border border-yellow-500/30 p-6">
              <Rocket className="mx-auto mb-4 text-yellow-400" size={48} />
              <p className="text-yellow-400 font-semibold mb-2">
                No videos available
              </p>
              <p className="text-gray-400 text-sm">
                Check your YouTube API key configuration
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Open browser console (F12) for details
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaceVideos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(index)}
                  className={`group relative rounded-xl overflow-hidden bg-gray-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left ${
                    currentVideoIndex === index ? "ring-4 ring-yellow-400" : ""
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div
                      className={`absolute top-3 right-3 p-2 rounded-full ${
                        currentVideoIndex === index
                          ? "bg-yellow-400"
                          : "bg-indigo-600"
                      } text-white`}
                    >
                      <Play size={16} />
                    </div>
                    {currentVideoIndex === index && (
                      <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        NOW PLAYING
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        {new Date(video.date).toLocaleDateString()}
                      </span>
                      <span className="text-indigo-400 group-hover:text-indigo-300">
                        Click to play
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sports Betting Affiliate Banner - Top Placement */}
        <div className="mb-12 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                EXCLUSIVE OFFER
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Bet on {currentSport.name} & Win Big! 🏆
              </h3>
              <p className="text-white/90 mb-4">
                Get up to $200 welcome bonus + Free bets on your first deposit.
                Join thousands of winners today!
              </p>
              <ul className="text-white/80 text-sm space-y-2 mb-6">
                <li>
                  ✓ Live betting on all {currentSport.name.toLowerCase()}{" "}
                  matches
                </li>
                <li>✓ Best odds guaranteed</li>
                <li>✓ Cash out anytime</li>
                <li>✓ 24/7 Customer support</li>
              </ul>
              <a
                href="https://www.betwinner.com?aff=83cdf48899a9ca9715e686a4e71f5b60854e5cc65aabc58f5f"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Claim $200 Bonus Now →
              </a>
              <p className="text-white/60 text-xs mt-3">
                18+ | T&Cs apply | Gamble Responsibly
              </p>
            </div>
            <div className="hidden md:block text-center">
              <div className="text-8xl mb-4">🎰</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-white font-bold text-2xl mb-2">
                  Join 1M+ Users
                </p>
                <p className="text-white/80 text-sm">Trusted since 2010</p>
              </div>
            </div>
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
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                {filteredPosts[0].imageUrl && (
                  <div className="relative h-64 lg:h-96 overflow-hidden">
                    <img
                      src={filteredPosts[0].imageUrl}
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-4 left-4 bg-gradient-to-r ${currentSport.color} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}
                    >
                      {filteredPosts[0].subcategory || "Sports"}
                    </div>
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      FEATURED
                    </div>
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-2xl lg:text-4xl font-bold mb-4 hover:text-red-600 transition-colors uppercase">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-4 text-base leading-relaxed">
                    {filteredPosts[0].subtitle}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      {filteredPosts[0].createdAt?.toDate().toDateString()}
                    </span>
                    <span>•</span>
                    
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

       
          <>
              <div className="text-center mt-10">
                <button
                  onClick={() => router.push("/all-sports")}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  View All Sports
                </button>
              </div>
          </>
      </div>
    </main>
  );
};

export default SportsPage;