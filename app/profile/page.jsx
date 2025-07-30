"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Ads from "@/components/community";
import { auth } from "@/auth";

function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const session = await auth();
      setSession(session);
      if (!session) {
        router.push("/blog");
      }
    }
    fetchSession();
  }, [router]);

  // const handleMoreBlogClick = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     router.push("/blog");
  //   }, 3000);
  // };

  return (
    <div className="min-h-screen bg-gray-400/5 text-white py-12 lg:px-12 mb-10">
      /* Header info bar */
        <div className="bg-gray-400/5 h-auto w-full py-5 border-t border-x mt-10 rounded-md">
          <h1 className="text-center text-white/90 text-lg font-semibold">
            Hello!
            <span className="text-green-600 font-serif">
          {session?.user?.name}
            </span>{" "}
            Your access is confirmed.
          </h1>
          <h2 className="text-center text-white/70 text-sm mt-1">
            We are building a better way.{" "}
          </h2>
          
          <h1
            className="font-bold font-serif cursor-pointer text-green-600 text-center"
            onClick={() => {
            const el = document.getElementById("Shared-mind");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          SHARE YOUR THOUGHT ⬇
        </h1>
      </div>

      {/* Main profile container */}
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-6 mt-10 border border-gray-800">
        {/* Profile Cover */}
        <div className="relative bg-gray-400/5 rounded-lg shadow-inner">
          <div className="absolute -bottom-12 left-6 flex items-center space-x-6">
            {/* Profile Image (no grayscale) */}
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full shadow-xl object-cover border-4 border-r-green-600 border-s-green-600 relative"
            />
            <div className="top-0 mx-auto mt-2 absolute">⭐</div>
            {/* User Name (normal color) */}
            <div>
              <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
                {session?.user?.name}
              </h2>
            </div>
          </div>
        </div>
        {/* Spacer for profile image overlay */}
        <div className="h-16"></div>
        <Link href="/community">
          <div className="space-y-6 text-center">  
          </div>
        </Link>

        {/* Profile Details Section */}
        <div className="bg-gray-400/5 p-6 rounded-lg shadow-md border-x ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-green-600 uppercase tracking-wide text-xs">
                Name
              </p>
              <p className="text-white font-semibold">
                {session?.user?.name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-green-600 uppercase tracking-wide text-xs">
                Email
              </p>
              <p className="text-white font-semibold">
                {session?.user?.email || "Not available"}
              </p>
            </div>
          </div>

          {/* <div className="mt-8 flex justify-center">
            <Link
              href="/upload-to-blog"
              className="px-5 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition"
            >
              Upload to Wiz
            </Link>
          </div> */}

          <div className="mt-6 text-center text-gray-500 text-sm">
            Want to explore more?{" "}
            <Link
              href="/"
              className="underline hover:text-white cursor-pointer text-green-600"
            >
              Go to Home →
            </Link>
          </div>
        </div>

          <div className=" mt-10">
            <div id="Shared-mind"></div>
            <h1 className="font-bold font-serif">Have something to Share?</h1>
            <h2 className="font-mono">
              <span className="text-green-600">{session?.user?.name}</span> We
              value your thoughts and ideas! feel free to share your opinions,
              Suggestions, or topics you'd love to see on our blog.
            </h2>
            <h3>📩Reach out to us directly on WhatsApp:</h3>
            <a
              href="https://wa.me/+2348142995114?text=Hello,%20my%20name%20is%20[Your%20Name].%20I'd%20like%20to%20share%20some%20information%20with%20Wiz-Blog."
              target="_self"
              rel="noopener noreferrer"
              className="font-bold text-green-600 cursor-pointer hover:underline"
            >
              Click here to chat
            </a>
          </div>
          {/* View all posts link */}
        <div className="items-center justify-center mx-auto">
          <div className=" text-right">
            <Link
              href="/blog"
              className="text-green-600 hover:text-white underline"
            >
              View All Posts →
            </Link>
          </div>

          <div className=" text-right mt-2">
            <Link
              href="/gallery"
              className="text-green-600 hover:text-white underline"
            >
              Visit The Gallery →
            </Link>
          </div>
        </div>
      </div>
      {/* {uid && <UpdateProfile uid={uid} currentName={currentName} />} */}
    </div>
  );
}

export default ProfilePage;
