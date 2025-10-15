"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
     const fetchphilosophysPosts = async () => {
       try {
         const postsRef = collection(db1, "blogs");
         const q = query(
           postsRef,
           where("category", "==", "philosophy"),
           orderBy("createdAt", "desc"),
           limit(6)
         );
 

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchphilosophysPosts();
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
    <main className="w-full">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 lg:mt-50 mb-2">
        The Battle for Truth
      </h1>
      <p className="text-sm lg:text-base text-center text-gray-700 mx-auto">
        Exploring philosophical debates, critical thinking, and truth-seeking.
      </p>

      <div className="max-w-7xl mx-auto py-12">
        {loading ? (
          <p className="text-gray-600">Loading latest posts</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600 text-center">Please check your network connection</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.id} className=" rounded-lg shadow-2xl p-4">
                <Link href={`/news/${createFullSlug(post.title, post.id)}`}>
                  <h3 className="font-bold text-lg hover:underline">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm ">
                  {post.subtitle || "No description available."}
                </p>
                <p className="text-xs mt-2">
                  {post.createdAt?.toDate().toDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === STATIC CARDS === */}

      {/* View More Button */}
      <div className="mx-auto text-center">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
