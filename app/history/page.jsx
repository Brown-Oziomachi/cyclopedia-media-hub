"use client";

import { Suspense } from "react";
import { useState } from "react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Image from "next/image";
import Link from "next/link";
import ViewMoreSearchPopup from "../view/page";

const Page = () => {
  const [visibleCount, setVisibleCount] = useState(4); // 4 items shown initially

  const showMore = () => {
    setVisibleCount((prev) => prev + 1);
  };

  return (
    <main className="w-full bg-white">
      <h1 className="text-3xl lg:text-5xl font-bold text-center text-black mb-2 mt-30 lg:mt-50 font-serif">
        Uncovering the Hidden Past
      </h1>
      <p className="text-sm lg:text-base text-center text-gray-700 mx-auto">
        Delve into the depths of forgotten events, suppressed truths, and <br className="max-md:hidden"/>
        powerful legacies that continue to shape our present. Explore history
        from perspectives often left out of mainstream narratives.
      </p>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-10">
            <Image
              src="/slavery.png"
              alt="News 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/QUnWDFG1eBq2x4ejSLcs">
              <h2 className="text-sm font-bold text-black hover:underline">
                Americans Say Government Should Address Slavery Effects
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Cyclopedia </p>

            <p className="mt-2 text-gray-900 text-xs">
              Americans Perceive History of Slavery Affecting Black People Today
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/his.png" alt="News 2" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/ggrMyhU1qWNwmX8sfubI">
              <h2 className="text-sm font-bold text-black hover:underline">
                History of Missional Church{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Cyclopedia </p>
            <p className="mt-2 text-gray-900 text-xs">
              We need a new overstory when it comes to the way we understand
              evangelism and discipleship. In most church settings, people think
              of evangelism as something you do with lost people, while
              discipleship is for those who have already decided to follow Jesus
            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/mart.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/ttRDjI40RVXDo1Em5GUr">
              <h2 className="text-sm font-bold text-black hover:underline">
                80 Years of Living and Writing in the Shadow of the Bomb{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By: Martin Halpern </p>
            <p className="mt-2 text-gray-900 text-xs">
              My acute focus on the danger of nuclear war may stem in part from
              the accident of my birthday on August 9, 1945.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/plague.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/jeixznhQcoRJKNT9X6eE">
              <h2 className="text-sm font-bold text-black hover:underline">
                AIDS and the Hidden Catholic Church{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By Cyclopedia</p>
            <p className="mt-2 text-gray-900 text-xs">
              Catholic leaders responded to the AIDS epidemic in complex ways
            </p>
          </div>
        </div>
        {/* === VIEW MORE BUTTON === */}
       
      </div>

     
      <div className="mx-auto text-center">
      <ViewMoreSearchPopup />
      </div>

    </main>
  );
};

export default Page;
