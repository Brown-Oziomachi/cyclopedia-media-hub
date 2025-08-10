"use client";

import { Suspense } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [visibleCount, setVisibleCount] = useState(4); // 4 items shown initially

  const showMore = () => {
    setVisibleCount((prev) => prev + 1);
  };

  return (
    <main className="w-full bg-white">
<h1 className="text-3xl lg:text-5xl font-bold text-center text-black mb-2 mt-30 font-serif">
Europe</h1>


      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-10">
            <Image
              src="/teen.png"
              alt="News 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
Teenagers no longer answer the phone: is it a lack of manners or a new trend?
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
Published: August 6, 2025 4.39pm CEST            </p>
            <p className="mt-2 text-gray-900 text-xs">
            Teenagers have phones glued to their hands… but often don’t answer when you call. Shutterstock

            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/pro.png"
              alt="News 2"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
US and European economies depend heavily on immigrants – decades of data reveal just how much
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">Published: July 23, 2025 12.35pm CEST
</p>
            <p className="mt-2 text-gray-900 text-xs">
              Protest against Donald Trump’s immigration policies at the University of Texas on February 12, 2025. Vic Hinterlang/Shutterstock

            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/summer.png"
              alt="News 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
2025’s first summer heatwave was early, and deadly, for all of Western Europe
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">Published: July 16, 2025 1.29pm CEST
</p>
            <p className="mt-2 text-gray-900 text-xs">
             Share articlePrint article The first heatwave of the summer hit Spain, Portugal, France, Italy and Germany early in the year, breaking June temperature records in many areas.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/va.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
Trump Prepares to Revoke Lifesaving Abortion Care for Veterans
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
Jessica Washington
July 29 2025, 4:42 p.m</p>
            <p className="mt-2 text-gray-900 text-xs">
              A pending VA rule appears designed to strip crucial health care from hundreds of thousands of veterans in states with abortion bans.
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
       <div className="border-t gap-6 border-gray-300">
        <ul className="m-10 flex-nowrap gap-5 items-center justify-center lg:flex lg:items-center">
          <li>
            <a href="/politics" className="underline">Politics</a>
          </li>
          <li>
            <a href="/religion" className="underline">Religion</a>
          </li>
          <li>
            <a href="/history" className="underline">History</a>
          </li>
          <li>
            <a href="/science" className="underline">Science</a>
          </li>
          <li>
            <a href="/media" className="underline">Media</a>
          </li>
          <li>
            <a href="/news" className="underline">News</a>
          </li>
        </ul>
      </div>
       <div>
        {/* Footer */}
        <footer className="py-10 text-center text-gray-500 text-sm bg-black border-t border-gray-800">
          &copy; 2025 Cyclopedia. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default Page;

