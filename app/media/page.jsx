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

  if (loading) {
    return <p className="text-center py-10">Loading latest news...</p>;
  }

  return (
    <main className="w-full  transition-colors duration-300">
      {/* === PAGE HEADER === */}
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-20 lg:mt-40 mb-4">
        The Battle for Truth
      </h1>
      <p className="text-sm lg:text-base text-center  mx-auto">
        Unmask the forces behind curated narratives, censorship, propaganda,{" "}
        <br className="max-md:hidden" />
        and digital manipulation. Who controls the story — and what aren’t they
        telling you?
      </p>

      {/* === FIRESTORE POSTS === */}
      {loading ? (
        <p className="text-center py-10 ">Loading latest posts...</p>
      ) : posts.length === 0 ? (
        <p className=" text-center">No media posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-16 px-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden "
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-base font-semibold mb-2 ">{post.title}</h2>
                <p className=" text-sm line-clamp-3">{post.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* === STATIC FEATURED CARDS === */}
      <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[
          {
            img: "/plun.png",
            title: "The Forgotten Plunder of Iraq",
            link: "https://cyclopedia-media-hub.vercel.app/blog/I19iaUfjERIHIPAce3ps",
            author: "By Cyclopedia",
            desc: "Few talk or think about Iraq these days and the media ignores this important but demolished nation.",
          },
          {
            img: "/uks.png",
            title: "UK media covering up British spy flights for Israel",
            link: "https://cyclopedia-media-hub.vercel.app/blog/NDX3C3o7duRdz7844LU6",
            author: "Published with The National",
            desc: "Britain’s obedient defence correspondents are refusing to report a story of clear public interest.",
          },
          {
            img: "/medi.png",
            title: "How Western Media Built the Case for Genocide in Gaza",
            link: "https://cyclopedia-media-hub.vercel.app/blog/OjdVfovsON2pJsJU9yJr",
            author: "By Cyclopedia",
            desc: "From obscuring the West’s role in starving Gaza to sensationalised accounts, journalists became propagandists.",
          },
          {
            img: "/ed.png",
            title: "UK Media Suppressing Mentions of Israel’s Genocide",
            link: "https://cyclopedia-media-hub.vercel.app/blog/yr4GRaz6USfU5E9s2INA",
            author: "By Des Freedman",
            desc: "Analysis shows British media downplayed UN allegations against Israel compared to Russia in Ukraine.",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
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
