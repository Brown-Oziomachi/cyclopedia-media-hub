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
      <h1 className="text-3xl lg:text-5xl font-bold text-center max-lg:mt-40  lg:mt-50 text-black mb-2">
        Power, Policy, and People
      </h1>
      <p className="text-sm lg:text-base text-center text-gray-700  mx-auto">
        Navigate the world of governance, elections, secret deals, and political{" "}
        <br className="max-md:hidden" />
        maneuvers that influence global direction. See what lies behind the
        decisions made in your name.
      </p>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-10">
            <Image src="/erik.png" alt="News 1" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/Tc0W4qUPzj7ytY7UB5fs">
              <h2 className="text-sm font-bold text-black hover:underline">
                Erik Prince Calls for U.S. to Colonize Africa and Latin America{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Jon Schwarz February 10 2024,{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              If so many of these countries around the world are incapable of
              governing themselves, it’s time for us to just put the imperial
              hat back on, to say, we’re going to govern those countries
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/mdi.png" alt="News 2" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/18is4vszdgKCKhPdcDZo">
              <h2 className="text-sm font-bold text-black hover:underline">
                US Opinion Is Shifting on Palestine; Can Political Leaders Shift
                With It?{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By Cyclopedia</p>
            <p className="mt-2 text-gray-900 text-xs">
              Growing support for Palestine means that more U.S. voters will
              base their future political decisions on how the U.S. engages with
              Israel and its disregard for Palestinian rights.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/emp.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/IaxcmJfiF1fEizKHpD3E">
              <h2 className="text-sm font-bold text-black hover:underline">
                How Britain allowed Pinochet to escape justice for atrocities{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              JOHN McEVOY 4 March 2025{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              25 years ago, the UK government allowed Chile’s former dictator to
              evade extradition to Spain. Declassified files reveal how the
              decision was made.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/oil.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/5njbEcuqy6lFrrYdMS2p">
              <h2 className="text-sm font-bold text-black hover:underline">
                US Turning Oil-Rich Nigeria into Proxy for its Africa Wars{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              By T.J. Coles The Grayzone{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              T.J. Coles reports on what AFRICOM is doing under the cover of
              counterterrorism.
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
