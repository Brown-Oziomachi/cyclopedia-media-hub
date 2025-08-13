"use client";

import { Suspense } from "react";
import { useState } from "react";

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
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 lg:mt-50 text-black mb-2">
        Tomorrow’s World, Today
      </h1>
      <p className="text-sm lg:text-base text-center text-gray-700  mx-auto">
        Discover breakthroughs shaping our future — AI, space travel, <br className="max-md:hidden"/>
        biotechnology, and more. Dive into the wonders and ethical questions of
        the modern age.
      </p>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/reli.png" alt="News 1" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/5ucZczUCM0xYIsUEbamY">
              <h2 className="text-sm font-bold text-black hover:underline">
                Review: Religion, Science, and Empire
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              By Anand Venkatkrishnan
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Anand Venkatkrishnan reviews Religion, Science, and Empire by
              Peter Gottschalk.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/sciat.png"
              alt="News 2"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/IDins9X9XoPgmhW9FTBi">
              <h2 className="text-sm font-bold text-black hover:underline">
                Science or Academic Atheism?
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Published on August 8, 2011
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              What happens when we give scientists the authority to speak about
              God?
            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/heal.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/BlKwDu4niv82rMzxTDVF">
              <h2 className="text-sm font-bold text-black hover:underline">
                Healed and Whole Forever: On Psychedelic Science & Spirituality
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Published on January 25, 2016
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Published on January 25, 2016 Patricia Kubala explores the
              connection between drugs, healing, and spirituality online.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/jews.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/tx8eWd93N7HyChUseSob">
              <h2 className="text-sm font-bold text-black hover:underline">
                Christian Science as Jewish Tradition
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Noah Berlatsky Published on June 11, 2024
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Why did so many American Jewish women find Christian Science
              appealing?
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto text-center">
        <ViewMoreSearchPopup />
      </div>
    </main>
  );
};

export default Page;
