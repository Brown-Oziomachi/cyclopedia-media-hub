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

const FamilyLawPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamilyLawPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "family-law"),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Family Law posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching family law posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyLawPosts();
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
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-purple-700 via-pink-700 to-rose-800 overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-600/40 blur-3xl rounded-full top-10 left-20 animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-rose-600/40 blur-3xl rounded-full bottom-10 right-20 animate-pulse delay-1000"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4 lg:mt-30">
          <p className="inline-block text-purple-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Family Law
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            Protecting Family Bonds
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Comprehensive guidance on divorce, custody, adoption, child support, and all matters affecting families.
          </p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 lg:py-40 py-20">
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
                  <span className="text-xs font-semibold text-purple-600 uppercase mb-2 tracking-wider">
                    Featured Article
                  </span>
                  <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Family Law
                  </div>
                  <h2 className="text-2xl uppercase lg:text-3xl font-bold mb-4 hover:text-purple-600 transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-base">
                    {posts[0].subtitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {posts[0].createdAt?.toDate().toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {posts.length > 1 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {posts.slice(1, 7).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex gap-3 p-4">
                    {post.imageUrl && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-base font-bold line-clamp-3 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {post.subtitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.createdAt?.toDate().toDateString()}
                    </p>
                  </div>
                  <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Family Law
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mx-auto text-center mt-16 mb-16 bg-gradient-to-r from-purple-700 to-pink-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
          <h2 className="text-3xl font-extrabold mb-3">
            Navigate Family Legal Matters
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-6">
            Stay informed with expert advice on family law, custody rights, and relationship legal matters.
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            Subscribe to Our Newsletter
          </a>
        </div>

        <hr className="mb-10" />

        {loading ? (
          <p className="text-center py-10">Loading family law posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            No family law posts found. Check back soon for updates.
          </p>
        ) : (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.slice(7, 50).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
                className="relative rounded-lg shadow-xl transition overflow-hidden hover:shadow-2xl"
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
                <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  Family Law
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FamilyLawPage;