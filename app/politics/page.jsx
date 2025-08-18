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
          limit(20)
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

  return (
    <main className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center max-lg:mt-40 lg:mt-50 text-black mb-2">
          Power, Policy, and People
        </h1>
        <p className="text-sm lg:text-base text-center text-gray-700 mx-auto mb-10">
          Navigate the world of governance, elections, secret deals, and
          political <br className="max-md:hidden" />
          maneuvers that influence global direction. See what lies behind the
          decisions made in your name.
        </p>

        {/* Fetched Politics Posts */}
        {loading ? (
          <p className="text-center py-10">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">No politics posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className=" rounded-lg shadow-xl  transition overflow-hidden"
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
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.subtitle}
                  </p>
                  {/* <div className="mt-2 text-xs text-blue-600 font-medium">
                    {post.tags?.join(", ")}
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Static Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative w-full h-48">
              <Image
                src="/erik.png"
                alt="News 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/Tc0W4qUPzj7ytY7UB5fs">
                <h2 className="text-sm font-bold text-black hover:underline">
                  Erik Prince Calls for U.S. to Colonize Africa and Latin
                  America
                </h2>
              </Link>
              <p className="text-xs text-gray-800 mt-1">
                Jon Schwarz February 10 2024
              </p>
              <p className="mt-2 text-gray-900 text-xs">
                If so many of these countries around the world are incapable of
                governing themselves...
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative w-full h-48">
              <Image
                src="/mdi.png"
                alt="News 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/18is4vszdgKCKhPdcDZo">
                <h2 className="text-sm font-bold text-black hover:underline">
                  US Opinion Is Shifting on Palestine; Can Political Leaders
                  Shift With It?
                </h2>
              </Link>
              <p className="text-xs text-gray-800 mt-1">By Cyclopedia</p>
              <p className="mt-2 text-gray-900 text-xs">
                Growing support for Palestine means that more U.S. voters will
                base their decisions...
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative w-full h-48">
              <Image
                src="/emp.png"
                alt="News 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/IaxcmJfiF1fEizKHpD3E">
                <h2 className="text-sm font-bold text-black hover:underline">
                  How Britain allowed Pinochet to escape justice for atrocities
                </h2>
              </Link>
              <p className="text-xs text-gray-800 mt-1">
                JOHN McEVOY 4 March 2025
              </p>
              <p className="mt-2 text-gray-900 text-xs">
                25 years ago, the UK government allowed Chile’s former dictator
                to evade extradition...
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative w-full h-48">
              <Image
                src="/oil.png"
                alt="News 4"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/5njbEcuqy6lFrrYdMS2p">
                <h2 className="text-sm font-bold text-black hover:underline">
                  US Turning Oil-Rich Nigeria into Proxy for its Africa Wars
                </h2>
              </Link>
              <p className="text-xs text-gray-800 mt-1">
                By T.J. Coles The Grayzone
              </p>
              <p className="mt-2 text-gray-900 text-xs">
                AFRICOM is doing under the cover of counterterrorism...
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto text-center mt-10">
          <ViewMoreSearchPopup />
        </div>
      </div>
    </main>
  );
};

export default PoliticsPage;



