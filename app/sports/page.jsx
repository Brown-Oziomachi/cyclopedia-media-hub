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

const SportsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticsPosts = async () => {
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

    fetchPoliticsPosts();
  }, []);

  return (
    <main className="w-full">
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center max-lg:mt-40 lg:mt-50 mb-2">
          Speed, Strength, and Strategy
        </h1>
        <p className="text-sm lg:text-base text-center mx-auto mb-10">
          Explore the world of sports, thrilling matches, record-breaking
          performances, <br className="max-md:hidden" />
          and the athletes who push the limits to achieve greatness on every
          field.
        </p>

        {/* Fetched Politics Posts */}
        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className=" text-center text-gray-500 animate-pulse">
            Please check your network connection....
          </p>
        ) : (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
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
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Sports
                  </div>
                  <h2 className="text-sm font-semibold mb-2">{post.title}</h2>
                  <p className=" text-sm line-clamp-3">{post.subtitle}</p>
                  <p className="text-xs mt-2">
                    {post.createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Static Cards */}

        <div className="mx-auto text-center mt-10">
          <ViewMoreSearchPopup />
        </div>
      </div>
    </main>
  );
};

export default SportsPage;



