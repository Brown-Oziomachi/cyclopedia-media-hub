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
import ViewMoreSearchPopup from "@/app/view/page";

const PoliticsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticsPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "africa"),
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

    fetchPoliticsPosts();
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

  if (loading) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading africa news...</p>
        </div>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No africa posts found.</p>
          <p className="text-gray-400 mt-2">
            Please check your network connection
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-yellow-700 via-amber-800 to-black overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute w-[400px] h-[400px] bg-amber-900/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-yellow-800/40 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <p className="inline-block text-amber-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Africa
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            The Pulse of a Continent
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Journey through the heart of Africa — its cultures, innovations,
            leaders, and untold stories. Celebrate a continent rich in history,
            diversity, and unstoppable potential.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12 ">
        </div>
        {posts[0] && (
          <div className="relative mb-12">
            <Link href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}>
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ">
                {posts[0].imageUrl && (
                  <div className="relative h-64 lg:h-96">
                    <img
                      src={posts[0].imageUrl}
                      alt={posts[0].title}
                      className=" w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                  Africa News
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-purple-600 uppercase mb-2 tracking-wider">
                    Latest News
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 uppercase hover:text-purple-600 transition-colors">
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
          <div className="relative grid md:grid-cols-3 gap-6 mb-12">
            {posts.slice(1, 4).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {post.imageUrl && (
                    <div className="relative h-48">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Africa News
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {post.subtitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.createdAt?.toDate().toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mx-auto text-center mt-16 mb-16 bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
          <h2 className="text-3xl font-extrabold mb-3">
            Stay Ahead of the Hidden Truths
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-6">
            Join thousands of readers who get our investigative reports and
            evidence-based insights straight to their inbox every week.
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            Subscribe to Our Newsletter
          </a>
        </div>

        {posts.length > 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest Africa News</h2>
              <div className="hidden md:block">
                <ViewMoreSearchPopup />
              </div>
            </div>

            {/* Latest News Grid */}
            <div className=" relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.slice(4, 12).map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${createFullSlug(post.title, post.id)}`}
                >
                  <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300  h-full">
                    {post.imageUrl && (
                      <div className="relative h-40">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-3 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {post.createdAt?.toDate().toDateString()}
                      </p>
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                        Africa News
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Search Button */}
            <div className="md:hidden text-center mt-8">
              <ViewMoreSearchPopup />
            </div>
          </div>
        )}

        {/* More Politics Stories (if there are more than 12 posts) */}
        {posts.length > 12 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">More Africa Stories</h2>
            <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(12).map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${createFullSlug(post.title, post.id)}`}
                >
                  <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 ">
                    {post.imageUrl && (
                      <div className="relative h-48">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-base font-semibold mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {post.subtitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {post.createdAt?.toDate().toDateString()}
                      </p>
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                        Africa News
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default PoliticsPage;
