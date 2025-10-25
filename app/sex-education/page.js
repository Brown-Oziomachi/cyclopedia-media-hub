"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
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
import { checkAgeVerification } from "@/hooks/useAgeVerification";
import ViewMoreSearchPopup from "../view/page";

const SexEducationPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Age verification check
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/signup?redirect=sex-education");
      return;
    }

    // Check age verification
    const verifyAge = async () => {
      const verified = await checkAgeVerification(user.uid);
      if (!verified) {
        router.push("/age-verification?redirect=sex-education");
        return;
      }

      // If verified, fetch content
      fetchSexEducationPosts();
    };

    verifyAge();
  }, [user, authLoading, router]);

  const fetchSexEducationPosts = async () => {
    try {
      const postsRef = collection(db1, "blogs");
      const q = query(
        postsRef,
        where("category", "==", "sex-education"),
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
      console.error("Error fetching sex education posts:", error);
    } finally {
      setLoading(false);
    }
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

  if (authLoading || loading) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading comprehensive sex education resources...</p>
        </div>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No sex education resources found yet.</p>
          <p className="text-gray-400 mt-2">
            Please check back soon for comprehensive educational content
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center overflow-hidden lg:mt-30">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-block bg-red-600 text-white text-xs font-bold px-4 py-2 rounded mb-6 uppercase tracking-wider">
            Sex Education
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
            Comprehensive Sex Education
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Evidence-based, medically accurate information about sexual health, relationships, consent, and wellbeing
          </p>
          <p className="text-sm text-white/80 mt-6 font-semibold">
            ⚠️ Content restricted to adults 18 years and older
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Article (First Post) */}
        {posts[0] && (
          <div className="mb-12">
            <Link href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}>
              <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl reverse-theme overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
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
                    Featured Resource
                  </span>
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Sex Education
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

        {/* Secondary Articles (Posts 1-3) */}
        {posts.length > 1 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {posts.slice(1, 4).map((post) => (
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
                    <p className="text-sm text-gray-600 uppercase dark:text-gray-400 line-clamp-2 mb-2">
                      {post.subtitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.createdAt?.toDate().toDateString()}
                    </p>
                  </div>

                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                    Sex Education
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mx-auto text-center mt-16 mb-16 bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-14 px-6 rounded-2xl shadow-xl max-w-3xl">
          <h2 className="text-3xl font-extrabold mb-3">
            Stay Informed on Sexual Health
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-6">
            Join thousands of adults receiving evidence-based sexual health and relationship information delivered to your inbox.
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-white text-purple-700 hover:bg-purple-700 hover:text-white font-semibold px-6 py-3 rounded-md transition-all duration-300"
          >
            Subscribe to Our Newsletter
          </a>
        </div>

        {/* Main Content Grid */}
        {posts.length > 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Educational Resources</h2>
              <div className="hidden md:block">
                <ViewMoreSearchPopup />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.slice(4, 12).map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${createFullSlug(post.title, post.id)}`}
                >
                  <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 h-full">
                    {post.imageUrl && (
                      <div className="h-40">
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
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                      Sex Ed
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="md:hidden text-center mt-8">
              <ViewMoreSearchPopup />
            </div>
          </div>
        )}

        {/* Additional Resources */}
        {posts.length > 12 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">More Educational Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(12).map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${createFullSlug(post.title, post.id)}`}
                >
                  <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
                    {post.imageUrl && (
                      <div className="h-48">
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
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                      Sex Ed
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
};

export default SexEducationPage;