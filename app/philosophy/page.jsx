"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
     const fetchphilosophysPosts = async () => {
       try {
         const postsRef = collection(db1, "blogs");
         const q = query(
           postsRef,
           where("category", "==", "philosophy"),
           orderBy("createdAt", "desc"),
           limit(6)
         );
 

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchphilosophysPosts();
  }, []);

  return (
    <main className="w-full bg-white">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 lg:mt-50 text-black mb-2">
        The Battle for Truth
      </h1>
      <p className="text-sm lg:text-base text-center text-gray-700 mx-auto">
        Exploring philosophical debates, critical thinking, and truth-seeking.
      </p>

         <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Latest in Philosophy</h2>
        {loading ? (
          <p className="text-gray-600">Loading latest posts</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600"></p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border rounded-lg shadow p-4">
                <Link href={`/blog/${post.id}`}>
                  <h3 className="font-bold text-lg hover:underline">{post.title}</h3>
                </Link>
                <p className="text-sm text-gray-600">{post.excerpt || "No description available."}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === STATIC CARDS === */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-10">
            <Image src="/plun.png" alt="News 1" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/I19iaUfjERIHIPAce3ps">
              <h2 className="text-sm font-bold text-black hover:underline">
                The Forgotten Plunder of Iraq
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By: cyclopedia</p>
            <p className="mt-2 text-gray-900 text-xs">
              Few talk or think about Iraq these days and the media ignores this important but demolished nation.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/uks.png" alt="News 2" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/NDX3C3o7duRdz7844LU6">
              <h2 className="text-sm font-bold text-black hover:underline">
                UK media are covering up British spy flights for Israel
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">Published in collaboration with The National</p>
            <p className="mt-2 text-gray-900 text-xs">
              Britain’s obedient defence correspondents are refusing to report a story of clear public interest.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/medi.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/OjdVfovsON2pJsJU9yJr">
              <h2 className="text-sm font-bold text-black hover:underline">
                HOW THE WESTERN MEDIA HELPED BUILD THE CASE FOR GENOCIDE IN GAZA
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By cyclopedia</p>
            <p className="mt-2 text-gray-900 text-xs">
              From obscuring the West’s role in starving Gaza to propaganda, journalists are playing the role of propagandists.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/ed.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/yr4GRaz6USfU5E9s2INA">
              <h2 className="text-sm font-bold text-black hover:underline">
                UK MEDIA ARE SUPPRESSING MENTIONS OF ISRAEL’S ‘GENOCIDE’ IN GAZA
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By DES FREEDMAN</p>
            <p className="mt-2 text-gray-900 text-xs">
              British media barely cover allegations by UN officials that Israel is promoting genocide.
            </p>
          </div>
        </div>
      </div>

      {/* === FIREBASE POSTS === */}
   

      {/* View More Button */}
      <div className="mx-auto text-center">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
