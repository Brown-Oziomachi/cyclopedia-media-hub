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

const SideNewsTicker = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticsPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "politics"),
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

    fetchPoliticsPosts();
  }, []);

  if (loading) return null;

  return (
    <div className="w-full mx-auto overflow-hidden text-blue-500 rounded-lg shadow-lg z-0">
      <div className="flex whitespace-nowrap animate-marquee">
        {posts.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`} 
            className="px-6 py-1 font-medium hover:underline flex-shrink-0"
          >
            {item.title}
            <span className="ml-2 text-xs text-gray-400">
              [{item.category || "General"}]
            </span>
          </Link>
        ))}

        {posts.map((item) => (
          <Link
            key={`dup-${item.id}`}
            href={`/news/${item.id}`} 
            className="px-6 py-1 font-medium hover:underline flex-shrink-0"
          >
            {item.title}
            <span className="ml-2 text-xs text-gray-400">
              [{item.category || "General"}]
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNewsTicker;
