"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import Link from "next/link";

export default function HealthPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db1, "blogs"),
          where("category", "==", "health")
        );
        const querySnap = await getDocs(q);
        const data = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 ">
      <h1 className="text-3xl font-bold mb-8 mt-20">Health Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <div
              className={`rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer
                ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                {post.subtitle && (
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {post.subtitle}
                  </p>
                )}
                   <p className="text-xs mt-2">
                  {post.createdAt?.toDate().toDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
