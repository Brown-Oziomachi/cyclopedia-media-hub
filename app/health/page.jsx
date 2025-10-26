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

    const createSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    };

    const createFullSlug = (title, id) => {
      return `${createSlug(title)}--${id}`;
    };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <section className="max-w-full mx-auto py-12 ">
      <section
        className="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center overflow-hidden lg:mt-30"
        style={{
          backgroundImage: "url(/stethoscope.png)",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/30 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-teal-600/30 blur-3xl rounded-full bottom-10 right-20"></div>

        <div className="relative z-10 px-4 lg:mt-35">
          <p className="inline-block text-emerald-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Health
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Wellness, Medicine, and the Human Spirit
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Explore the world of health — from groundbreaking medical research
            and holistic wellness to mental resilience and human care. Discover
            what it truly means to heal and thrive.
          </p>
        </div>
      </section>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:mt-1 p-10">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/news/${createFullSlug(post.title, post.id)}`}
          >
            <div
              className={`relative rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer
          ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                Health
              </div>
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
