"use client";

import { useEffect, useState } from "react";
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

const NigeriaPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFloatingAd, setShowFloatingAd] = useState(true);
  const [isAdMinimized, setIsAdMinimized] = useState(false);

  useEffect(() => {
    const fetchNigeriaPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "sports"),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Politics posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching politics posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNigeriaPosts();
  }, []);

  // Auto show/hide floating ad every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFloatingAd((prev) => !prev);
      setIsAdMinimized(false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const createFullSlug = (title, id) => {
    return `${createSlug(title)}--${id}`;
  };

  return (
    <main className="w-full b">
      <section
        className="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url(/foot.jpg)",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Colored Light Effects */}
        <div className="absolute w-[400px] h-[400px] bg-green-600/30 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-lime-500/30 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-lime-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Sports
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Speed, Strength, and Strategy
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Explore the world of sports — thrilling matches, record-breaking
            performances, <br className="max-md:hidden" />
            and the athletes who push the limits to achieve greatness on every
            field.
          </p>
        </div>
      </section>

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

      <div className="max-w-7xl mx-auto px- lg:py-40 py-20">
        {posts[0] && (
          <div className="mb-12">
            <Link
              href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}
            >
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ">
                {posts[0].imageUrl && (
                  <div className=" h-64 lg:h-96">
                    <img
                      src={posts[0].imageUrl}
                      alt={posts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-purple-600 uppercase mb-2 tracking-wider">
                    Latest News
                  </span>
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    NG News
                  </div>
                  <h2 className="text-2xl uppercase lg:text-3xl font-bold mb-4 hover:text-purple-600 transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-base">
                    {posts[0].subtitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {posts[0].createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {posts.length > 1 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {posts.slice(1, 6).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Image and Title Side by Side */}
                  <div className="flex gap-3 p-4">
                    {/* Image on the left */}
                    {post.imageUrl && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}

                    {/* Title on the right */}
                    <div className="flex-1">
                      <h3 className="text-base font-bold line-clamp-3 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description below */}
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 uppercase dark:text-gray-400 line-clamp-2 mb-2">
                      {post.subtitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.createdAt?.toDate().toDateString()}
                    </p>
                  </div>

                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Sports news
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* IN-CONTENT BANNER AD */}
        <div className="mb-12 relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 transform hover:scale-[1.02] transition-all duration-300">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-2xl"></div>

          {/* Content */}
          <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            {/* Left Side - Text Content */}
            <div>
              {/* Sponsored Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full mb-4">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                SPONSORED
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                WIN BIG on Every Match! 🏆
              </h2>

              {/* Subheadline */}
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                Join Nigeria's #1 Sports Betting Platform. Get ₦200,000 Welcome
                Bonus + Free Bets on Your First Deposit!
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 text-white/90">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    ✓
                  </span>
                  <span>Live betting on 50,000+ matches daily</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    ✓
                  </span>
                  <span>Instant withdrawals to your bank account</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    ✓
                  </span>
                  <span>Best odds guaranteed on all sports</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    ✓
                  </span>
                  <span>24/7 Customer support in English & Hausa</span>
                </li>
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.betwinner.com?aff=83cdf48899a9ca9715e686a4e71f5b60854e5cc65aabc58f5f"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl text-lg"
                >
                  <span>Claim ₦200K Bonus</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>

                <Link
                  href="/sports"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-4 rounded-lg hover:bg-white/30 transition-all border-2 border-white/30"
                >
                  View Sports News
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 flex items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <span>Trusted by 2M+ Users</span>
              </div>

              {/* Disclaimer */}
              <p className="text-white/60 text-xs mt-4">
                18+ Only | Gamble Responsibly | T&Cs Apply
              </p>
            </div>

            {/* Right Side - Visual Elements */}
            <div className="hidden md:block">
              {/* Sports Icons Animation */}
              <div className="relative h-[400px]">
                {/* Center Logo/Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all">
                    <div className="text-center">
                      <div className="text-8xl mb-4">🎰</div>
                      <div className="bg-yellow-400 text-black font-bold text-2xl px-6 py-3 rounded-lg mb-3">
                        ₦200,000
                      </div>
                      <p className="text-white text-sm font-semibold">
                        Welcome Bonus
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Sport Icons */}
                <div
                  className="absolute top-0 left-0 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-bounce"
                  style={{ animationDelay: "0s", animationDuration: "3s" }}
                >
                  <span className="text-4xl">⚽</span>
                </div>
                <div
                  className="absolute top-20 right-0 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-bounce"
                  style={{ animationDelay: "0.5s", animationDuration: "3s" }}
                >
                  <span className="text-4xl">🏀</span>
                </div>
                <div
                  className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-bounce"
                  style={{ animationDelay: "1s", animationDuration: "3s" }}
                >
                  <span className="text-4xl">🎾</span>
                </div>
                <div
                  className="absolute bottom-0 right-20 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-bounce"
                  style={{ animationDelay: "1.5s", animationDuration: "3s" }}
                >
                  <span className="text-4xl">🏈</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Brand Strip */}
          <div className="relative z-10 border-t border-white/20 bg-black/30 backdrop-blur-sm px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/hid.png"
                  alt="The Cyclopedia"
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-white font-bold text-sm">
                    Powered by The Cyclopedia
                  </p>
                  <p className="text-white/70 text-xs">
                    Your Trusted Sports News Source
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <span className="px-3 py-1 bg-white/10 rounded-full">
                  Licensed
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full">
                  Secure
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full">
                  Fast Payouts
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto text-center mt-16 mb-16 bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
          <h2 className="text-3xl font-extrabold mb-3">
            Stay Ahead of the Hidden Truths
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-6">
            Join thousands of readers who get our investigative reports and
            evidence-based insights straight to their inbox every week.
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            Subscribe to Our Newsletter
          </a>
        </div>

        <hr className="mb-10" />
        {/* Fetched Politics Posts */}
        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            No sports posts found. Please check your network connection
          </p>
        ) : (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.slice(7, 50).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
                className="relative rounded-lg shadow-xl  transition overflow-hidden"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-sm font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {post.subtitle}
                  </p>
                  <p className="text-xs mt-2">
                    {post.createdAt?.toDate().toDateString()}
                  </p>
                </div>
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  sports News
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Static Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Add your static cards here */}
        </div>

        <div className="mx-auto text-center mt-10">
          <ViewMoreSearchPopup />
        </div>
      </div>

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
    </main>
  );
};

export default NigeriaPage;