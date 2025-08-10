"use client";

import { Suspense } from "react";
import { useState } from "react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [visibleCount, setVisibleCount] = useState(4); // 4 items shown initially

  const showMore = () => {
    setVisibleCount((prev) => prev + 1);
  };

  return (
    <main className="w-full bg-white">
<h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 text-black mb-2">
  The Battle for Truth
</h1>
<p className="text-sm lg:text-base text-center text-gray-700 max-w-3xl mx-auto">
  Unmask the forces behind curated narratives, censorship, propaganda, and digital manipulation. Who controls the story — and what aren’t they telling you?
</p>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-10">
            <Image
              src="/sup.jpg"
              alt="News 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Trump administration profile: Steve Witkoff
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              By Natalie Jonas — July 23, 2025
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              President Trump’s special envoy to the Middle East has become the
              frontman in negotiations in three global...
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/sup.jpg"
              alt="News 2"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Political unrest in Asia rising
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By Admin — July 24, 2025</p>
            <p className="mt-2 text-gray-900 text-xs">
              Protests have erupted again in key regions as officials push back
              against economic reforms...
            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/sup.jpg"
              alt="News 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Climate Change Impacts 2025
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By Zoe King — July 25, 2025</p>
            <p className="mt-2 text-gray-900 text-xs">
              A new UN report highlights rising sea levels and policy challenges
              across developing nations...
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/sup.jpg"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Breakthrough in Cancer Research
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By Dr. May — July 25, 2025</p>
            <p className="mt-2 text-gray-900 text-xs">
              Scientists claim progress in targeting rare cancer cells through
              mRNA innovations...
            </p>
          </div>
        </div>

        {/* === VIEW MORE BUTTON === */}
        <div className="col-span-full flex justify-center mt-24">
          <button
            onClick={showMore}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            View More
          </button>
        </div>
      </div>
     
    </main>
  );
};

export default Page;

