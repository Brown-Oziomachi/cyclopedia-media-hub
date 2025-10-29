"use client";
import React, { useEffect, useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";

export const allLegalMetadata = {
  title: "All Legal | The Cyclopedia",
  description: "Comprehensive legal news coverage on The Cyclopedia. Explore court cases, legal reforms, justice issues, and law-related stories from around the world.",
  referrer: "strict-origin-when-cross-origin",
};

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const createFullSlug = (title, id) => {
  return `${createSlug(title)}--${id}`;
};

export default function AllLegalIssues() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the legal/justice-related categories
  const legalCategories = [
    "Criminal Law",
    "Family Law",
    "Personal Injury",
    "Real Estate Law",
    "Employment Law",
    "Litigation & Appeals",
    "Car Accidents",
    "Divorce",
    "Medical Malpractice",
    "Custody & Visitation",
    "Landlord-Tenant Law",
    "Estate Planning",
    "Justice",
    "Law",
    "Legal",
  ];

  useEffect(() => {
    const fetchLegalPosts = async () => {
      try {
        const q = query(collection(db1, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const allBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter posts by category that match legal/justice topics
        const filtered = allBlogs.filter(
          (post) =>
            post.category &&
            legalCategories.some(
              (cat) =>
                post.category.toLowerCase().includes(cat.toLowerCase()) ||
                cat.toLowerCase().includes(post.category.toLowerCase())
            )
        );

        setPosts(filtered);
      } catch (error) {
        console.error("Error fetching legal posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLegalPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading legal posts...</p>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-blue-800 via-indigo-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-900/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-indigo-700/40 blur-3xl rounded-full bottom-10 right-20"></div>

        <div className="relative z-10 px-4 lg:mt-30">
          <p className="inline-block text-blue-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Legal & Justice
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Justice & Law
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Explore stories on legal matters, justice, court decisions, and law-related issues shaping society.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:py-40 py-20">
        {/* Featured Post */}
        {posts[0] && (
          <div className="mb-12">
            <Link href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}>
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {posts[0].imageUrl && (
                  <div className="h-64 lg:h-96">
                    <img
                      src={posts[0].imageUrl}
                      alt={posts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-blue-600 uppercase mb-2 tracking-wider">
                    Latest Legal News
                  </span>
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    {posts[0].category || "Legal"}
                  </div>
                  <h2 className="text-2xl uppercase lg:text-3xl font-bold mb-4 hover:text-blue-600 transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-base">
                    {posts[0].subtitle || posts[0].content?.replace(/<[^>]+>/g, "").slice(0, 200)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {posts[0].createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Secondary Posts (2-6) - Image Overlay Design */}
        {posts.length > 1 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {posts.slice(1, 6).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-80 group">
                  {/* Background Image */}
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    {post.category || "Legal"}
                  </div>
                  
                  {/* Text Content on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                      {post.subtitle || post.content?.replace(/<[^>]+>/g, "").slice(0, 100)}
                    </p>
                    <p className="text-xs text-gray-300">
                      {post.createdAt?.toDate().toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mx-auto text-center mt-16 mb-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
          <h2 className="text-3xl font-extrabold mb-3">
            Stay Updated on Legal Matters
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-6">
            Get the latest legal news and insights delivered to your inbox.
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            Subscribe to Our Newsletter
          </a>
        </div>

        <hr className="mb-10" />

        {/* Remaining Posts Grid - Image Overlay Design */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No related legal posts found.
          </p>
        ) : (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.slice(6).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
                className="relative rounded-lg shadow-xl transition overflow-hidden h-64 group"
              >
                {/* Background Image */}
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  {post.category || "Legal"}
                </div>
                
                {/* Text Content on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h2 className="text-base font-semibold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                    {post.subtitle || post.content?.replace(/<[^>]+>/g, "").slice(0, 120)}
                  </p>
                  <p className="text-xs text-gray-300">
                    {post.createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}