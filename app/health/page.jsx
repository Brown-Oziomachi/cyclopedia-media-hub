"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

export default function HealthSubHeadings() {
  const subHeadings = [
    {
      title: "Nutrition & Balanced Diet",
      subtitle: "Tips and research on healthy eating habits.",
      img: "https://source.unsplash.com/80x80/?nutrition,food",
      href: "/health/nutrition",
    },
    {
      title: "Mental Health & Wellness",
      subtitle: "Learn about mental wellness and stress management.",
      img: "https://source.unsplash.com/80x80/?mental-health,wellness",
      href: "/health/mental-health",
    },
    {
      title: "Fitness & Exercise Routines",
      subtitle: "Discover exercise routines for all levels.",
      img: "https://source.unsplash.com/80x80/?fitness,exercise",
      href: "/health/fitness",
    },
    {
      title: "Preventive Healthcare",
      subtitle: "Insights on screenings, vaccinations, and healthy habits.",
      img: "https://source.unsplash.com/80x80/?healthcare,prevention",
      href: "/health/preventive-care",
    },
    {
      title: "Medical Breakthroughs",
      subtitle: "Stay updated on the latest innovations in medicine.",
      img: "https://source.unsplash.com/80x80/?medical,innovation",
      href: "/health/medical-breakthroughs",
    },
    {
      title: "Healthy Aging & Longevity",
      subtitle: "Tips for living a longer, healthier life.",
      img: "https://source.unsplash.com/80x80/?aging,longevity",
      href: "/health/healthy-aging",
    },
    {
      title: "Holistic & Alternative Medicine",
      subtitle: "Explore natural remedies and alternative therapies.",
      img: "https://source.unsplash.com/80x80/?holistic,medicine",
      href: "/health/holistic-medicine",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [blogs, setBlogs] = useState([]);
    const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchHealthPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "health"),
          orderBy("createdAt", "desc"),
          limit(6)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Health posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching Health posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthPosts();
  }, []);


  return (
    <section className="relative px-4 py-12 max-w-6xl mx-auto overflow-hidden">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-green-700 relative z-10 mt-30">
        CYCLOPEDIA Health
      </h1>

      <div className="mt-12 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          Latest Health Articles
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading latest post</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500"></p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-white border rounded-lg shadow hover:shadow-lg"
              >
                {posts.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                {post.subtitle && (
                  <p className="text-gray-600 text-sm mb-3">{post.subtitle}</p>
                )}
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Subheadings */}
      <ul className="space-y-4 relative z-10">
        {subHeadings.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveIndex(index)}
            className={`p-4 rounded-lg border transition-shadow cursor-pointer
              ${
                activeIndex === index
                  ? "bg-green-100 border-green-400 shadow-lg"
                  : "bg-white border-gray-200 shadow-md hover:shadow-xl"
              }`}
          >
            <Link href={item.href}>
              <h2 className="flex items-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.subtitle}</p>
                </div>
              </h2>
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Blogs from Firestore */}

      {/* Magical glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-green-100 to-green-50 opacity-30 rounded-lg pointer-events-none animate-pulse"></div>
    </section>
  );
}
