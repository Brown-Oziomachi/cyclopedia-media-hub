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
      <div className="max-w-7xl mx-auto px- py-10">
        
        <p className="text-sm lg:text-base text-center text-gray-300 mx-auto mb-10">
          Explore stories on governance, elections, policies, and deals shaping
          Nigeria’s future. <br className="max-md:hidden" />
          Uncover the truths behind decisions that affect the people every day.
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
