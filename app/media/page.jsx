"use client";

import { useState, useEffect } from "react";
import { db1 } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";


const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaPosts = async () => {
      try {
        const postsRef = collection(db1, "blogs");
        const q = query(
          postsRef,
          where("category", "==", "media"),
          orderBy("createdAt", "desc"),
          limit(15)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching media posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaPosts();
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
    return <p className="h-screen text-center py-50">Loading latest news...</p>;
  }

  return (
    <main className="w-full  transition-colors duration-300">
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-br from-red-800 via-gray-900 to-black overflow-hidden">
        {/* Background Overlays */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute w-[400px] h-[400px] bg-red-900/40 blur-3xl rounded-full top-10 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-gray-800/40 blur-3xl rounded-full bottom-10 right-20"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4 lg:mt-50">
          <p className="inline-block text-red-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Media
          </p>
          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase mb-4 drop-shadow-lg">
            The Battle for Truth
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Unmask the forces behind curated narratives, censorship, propaganda,
            and digital manipulation. Discover who truly controls the story —
            and what they don’t want you to know.
          </p>
        </div>
      </section>

      {posts[0] && (
        <div className="mb-12">
          <Link href={`/news/${createFullSlug(posts[0].title, posts[0].id)}`}>
            <div className="relative grid lg:grid-cols-2 gap-6 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ">
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
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
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

      {loading ? (
        <p className="text-center py-10 ">Loading latest posts...</p>
      ) : posts.length === 0 ? (
        <p className=" text-center">No media posts found.</p>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-16 px-4">
          {posts.slice(1, 5).map((post) => (
            <Link
              key={post.id}
              href={`/news/${createFullSlug(post.title, post.id)}`}
              className="relative rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-base font-semibold mb-2">{post.title}</h2>
                <p className="text-sm line-clamp-3">{post.subtitle}</p>
              </div>
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                Media
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[
          {
            img: "/plun.png",
            title: "The Forgotten Plunder of Iraq",
            link: `/news/${createFullSlug(
              "The Forgotten Plunder of Iraq",
              "IaxcmJfiF1fEizKHpD3E"
            )}`,
            author: "By Cyclopedia",
            desc: "Few talk or think about Iraq these days and the media ignores this important but demolished nation.",
          },
          {
            img: "/uks.png",
            title: "UK media covering up British spy flights for Israel",
            link: `/news/${createFullSlug(
              "UK media covering up British spy flights for Israel",
              "NDX3C3o7duRdz7844LU6"
            )}`,
            author: "Published with The National",
            desc: "Britain’s obedient defence correspondents are refusing to report a story of clear public interest.",
          },
          {
            img: "/medi.png",
            title: "How Western Media Built the Case for Genocide in Gaza",
            link: `/news/${createFullSlug(
              "How Western Media Built the Case for Genocide in Gaza",
              "OjdVfovsON2pJsJU9yJr"
            )}`,
            author: "By Cyclopedia",
            desc: "From obscuring the West’s role in starving Gaza to sensationalised accounts, journalists became propagandists.",
          },
          {
            img: "/ed.png",
            title: "UK Media Suppressing Mentions of Israel’s Genocide",
            link: `/news/${createFullSlug(
              "UK Media Suppressing Mentions of Israel’s Genocide",
              "yr4GRaz6USfU5E9s2INA"
            )}`,
            author: "By Des Freedman",
            desc: "Analysis shows British media downplayed UN allegations against Israel compared to Russia in Ukraine.",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className=" relative rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-48">
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <Link href={card.link}>
                <h2 className="text-sm font-bold hover:underline">
                  {card.title}
                </h2>
              </Link>
              <p className="text-xs mt-1">{card.author}</p>
              <p className="mt-2 text-xs flex-grow">{card.desc}</p>
            </div>
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
              Religion
            </div>
          </div>
        ))}
      </div>
      {/* === VIEW MORE === */}
      <div className="mx-auto text-center mt-10">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
