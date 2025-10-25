"use client";
import { useEffect, useState } from "react";
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

export const SideSportsNews = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsPosts = async () => {
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

        console.log("Fetched sports posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching sports posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsPosts();
  }, []);

  if (loading) return null;

  // World Cup reminder message
  const worldCupMessage = {
    id: "world-cup-reminder",
    title:
      "⚽ FIFA World Cup 2026 Coming Soon! Visit The Cyclopedia for Complete Coverage",
    category: "World Cup",
    isSpecial: true,
  };

  // Combine World Cup message with posts
  const allItems = [worldCupMessage, ...posts];

  return (
    <div className="w-full mx-auto overflow-hidden rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="bg-red-600 px-4 py-2 flex items-center gap-2">
        <img src="hid.png" alt="Logo" className="h-6 w-6" />
        <span className="text-white font-bold text-lg">The Cyclopedia</span>
        <span className="text-white text-sm ml-2">- World Sports News</span>
      </div>

      {/* Scrolling News Ticker */}
      <div className="bg-white relative overflow-hidden py-3">
        <div className="flex animate-scroll">
          {/* First set of items */}
          {allItems.map((item) => (
            <Link
              key={item.id}
              href={item.isSpecial ? "/" : `/news/${item.id}`}
              className={`px-6 py-1 font-medium hover:underline flex-shrink-0 inline-flex items-center ${
                item.isSpecial
                  ? "text-red-600 font-bold text-lg"
                  : "text-blue-600"
              }`}
            >
              {item.title}
              <span className="ml-2 text-xs text-gray-400">
                [{item.category || "General"}]
              </span>
              <span className="mx-4 text-gray-300">|</span>
            </Link>
          ))}

          {/* Duplicate set for seamless loop */}
          {allItems.map((item) => (
            <Link
              key={`dup-${item.id}`}
              href={item.isSpecial ? "/" : `/news/${item.id}`}
              className={`px-6 py-1 font-medium hover:underline flex-shrink-0 inline-flex items-center ${
                item.isSpecial
                  ? "text-red-600 font-bold text-lg"
                  : "text-blue-600"
              }`}
            >
              {item.title}
              <span className="ml-2 text-xs text-gray-400">
                [{item.category || "General"}]
              </span>
              <span className="mx-4 text-gray-300">|</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
          display: flex;
          width: fit-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
