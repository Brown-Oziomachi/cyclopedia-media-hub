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
    const fetchPoliticsPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "politics"),
          orderBy("createdAt", "desc"),
          limit(50)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading politics news...</p>
        </div>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No politics posts found.</p>
          <p className="text-gray-400 mt-2">
            Please check your network connection
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <div className="relative w-full mt-30 h-[500px] bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96  bg-black rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-block bg-white text-red-700 text-xs font-bold px-4 py-2 rounded mb-6 uppercase tracking-wider">
            Politics
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
            Politics
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Navigate the world of governance, elections, and political maneuvers
            that shape our world. Deep dives into the decisions made in your
            name.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Story (First Post) */}
        {posts[0] && (
          <div className="mb-12">
            <Link href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}>
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl reverse-theme overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ">
                {posts[0].imageUrl && (
                  <div className=" h-64 lg:h-96">
                    <img
                      src={posts[0].imageUrl}
                      alt={posts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-purple-600 uppercase mb-2 tracking-wider">
                    Latest News
                  </span>
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Politics
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

        {/* Secondary Stories (Posts 1-3) */}
        {posts.length > 1 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {posts.slice(1, 4).map((post) => (
              <Link
                key={post.id}
                href={`/news/${createFullSlug(post.title, post.id)}`}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Image and Title Side by Side */}
                  <div className="flex gap-3 p-4">
                    {/* Image on the left */}
                    {post.imageUrl && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}

                    {/* Title on the right */}
                    <div className="flex-1">
                      <h3 className="text-base font-bold line-clamp-3 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description below */}
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 uppercase dark:text-gray-400 line-clamp-2 mb-2">
                      {post.subtitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.createdAt?.toDate().toDateString()}
                    </p>
                  </div>

                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Politics
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
            className="inline-block bg-white text-purple-700 hover:bg-purple-700 hover:text-white  font-semibold px-6 py-3 rounded-md transition-all duration-300"
          >
            Subscribe to Our Newsletter
          </a>
        </div>

        {posts.length > 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest Politics News</h2>
              <div className="hidden md:block">
                <ViewMoreSearchPopup />
              </div>
            </div>

            {/* Latest News Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.slice(4, 12).map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${createFullSlug(post.title, post.id)}`}
                >
                  <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300  h-full">
                    {post.imageUrl && (
                      <div className=" h-40">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold uppercase mb-2 line-clamp-3 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {post.createdAt?.toDate().toDateString()}
                      </p>
                    </div>
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                      Politics
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
            <h2 className="text-2xl font-bold mb-6">More Politics Stories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(12).map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${createFullSlug(post.title, post.id)}`}
                >
                  <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 ">
                    {post.imageUrl && (
                      <div className=" h-48">
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
                    </div>
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                      Politics
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Editor's Picks Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Editor's Picks</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ">
              <div className="relative w-full h-48">
                <Image
                  src="/erik.png"
                  alt="News 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <Link
                  href={`/news/${createFullSlug(
                    "Erik Prince Calls for U.S. to Colonize Africa and Latin America",
                    "Tc0W4qUPzj7ytY7UB5fs"
                  )}`}
                >
                  <h2 className="text-sm font-bold uppercase hover:text-purple-600 transition-colors mb-2">
                    Erik Prince Calls for U.S. to Colonize Africa and Latin
                    America
                  </h2>
                </Link>
                <p className="text-xs text-gray-500 mb-2">
                  Jon Schwarz • February 10 2024
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  If so many of these countries around the world are incapable
                  of governing themselves...
                </p>
              </div>
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                Politics
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ">
              <div className="relative w-full h-48">
                <Image
                  src="/mdi.png"
                  alt="News 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <Link
                  href={`/news/${createFullSlug(
                    "US Opinion Is Shifting on Palestine; Can Political Leaders Shift With It?",
                    "18is4vszdgKCKhPdcDZo"
                  )}`}
                >
                  <h2 className="text-sm font-bold uppercase transition-colors mb-2">
                    US Opinion Is Shifting on Palestine; Can Political Leaders
                    Shift With It?
                  </h2>
                </Link>
                <p className="text-xs text-gray-500 mb-2">By Cyclopedia</p>
                <p className="text-xs line-clamp-2">
                  Growing support for Palestine means that more U.S. voters will
                  base their decisions...
                </p>
              </div>
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                Politics
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ">
              <div className="relative w-full h-48">
                <Image
                  src="/emp.png"
                  alt="News 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <Link
                  href={`/news/${createFullSlug(
                    "How Britain allowed Pinochet to escape justice for atrocities",
                    "IaxcmJfiF1fEizKHpD3E"
                  )}`}
                >
                  <h2 className="text-sm font-bold uppercase hover:text-purple-600 transition-colors mb-2">
                    How Britain allowed Pinochet to escape justice for
                    atrocities
                  </h2>
                </Link>
                <p className="text-xs text-gray-500 mb-2">
                  JOHN McEVOY • 4 March 2025
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  25 years ago, the UK government allowed Chile's former
                  dictator to evade extradition...
                </p>
              </div>
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                Politics
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ">
              <div className="relative w-full h-48">
                <Image
                  src="/oil.png"
                  alt="News 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <Link
                  href={`/news/${createFullSlug(
                    "US Turning Oil-Rich Nigeria into Proxy for its Africa Wars",
                    "5njbEcuqy6lFrrYdMS2p"
                  )}`}
                >
                  <h2 className="text-sm font-bold uppercase hover:text-purple-600 transition-colors mb-2">
                    US Turning Oil-Rich Nigeria into Proxy for its Africa Wars
                  </h2>
                </Link>
                <p className="text-xs text-gray-500 mb-2">
                  By T.J. Coles • The Grayzone
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  AFRICOM is doing under the cover of counterterrorism...
                </p>
              </div>
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                Politics
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PoliticsPage;
