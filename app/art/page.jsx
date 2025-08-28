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

const PoliticsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "art"),
          orderBy("createdAt", "desc"),
          limit(50)
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

    fetchArtPosts();
  }, []);

  return (
    <main className="w-full">
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center max-lg:mt-40 lg:mt-50 mb-2">
          Creativity, Heritage, and Expression
        </h1>
        <p className="text-sm lg:text-base text-center mx-auto mb-10">
          Explore the vibrant world of art, music, literature, and cultural
          traditions. <br className="max-md:hidden" />
          Discover how creativity shapes societies and celebrates human
          expression across generations.
        </p>

        {/* Fetched Politics Posts */}
        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className=" text-center text-gray-500 animate-pulse">Please check your network connection....</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className=" rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className=" text-sm line-clamp-3">{post.subtitle}</p>
                  {/* <div className="mt-2 text-xs text-blue-600 font-medium">
                    {post.tags?.join(", ")}
                  </div> */}
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

export default PoliticsPage;
