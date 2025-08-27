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

  useEffect(() => {
    const fetchNigeriaPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "nigeria"),
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

  return (
    <main className="w-full b">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center max-lg:mt-40 lg:mt-50  mb-2">
          Power, Policy, and People
        </h1>
        <p className="text-sm lg:text-base text-center text-gray-300 mx-auto mb-10">
          Navigate the world of governance, elections, secret deals, and
          political <br className="max-md:hidden" />
          maneuvers that influence global direction. See what lies behind the
          decisions made in your name.
        </p>

        {/* Fetched Politics Posts */}
        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            No politics posts found. Please check your network connection
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className=" rounded-lg shadow-xl  transition overflow-hidden"
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
    </main>
  );
};

export default NigeriaPage;
