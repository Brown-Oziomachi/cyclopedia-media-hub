"use client";

import { Suspense } from "react";
import { useState,} from "react";
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
        Africa{" "}
      </h1>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-10">
            <Image
              src="/afir1.png"
              alt="News 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 lg:left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Cold case Kenya: An unsolved murder and the secret army files
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By PHIL MILLER</p>
            <p className="mt-2 text-gray-900 text-xs">
              A pregnant woman was allegedly murdered by a British soldier in
              the 1990s. Even now, the army refuses to release its files about
              her death.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/afri2.png"
              alt="News 2"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20   lg:left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Dozens of soldiers suspected of paying for sex in Kenya{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              PHIL MILLER 15 July 2024{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              The British army’s favourite training ground in Africa is causing
              controversy yet again.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/" alt="News 3" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 lg:right-4 bg-white p-4 ">
            <Link href="/afri5.png">
              <h2 className="text-sm font-bold text-black hover:underline">
                Killed by a ‘candle’: How Tony Blair’s army led a civilian to
                his death
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              PHIL MILLER 14 May 2024{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              A Kenyan man working for the British military was blown up 17
              years ago. The true circumstances of his tragic death can finally
              be told for the first time.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/afri4.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 lg:right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Trump Appears to Be Targeting Muslim and “Non-White” Students
                for Deportation
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Jonah Valdez April 8 2025{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Students from Muslim-majority countries as well as Asia and Africa
              are having their visas revoked with little or no explanation.
            </p>
          </div>
        </div>

        {/* === VIEW MORE BUTTON === */}
              <div className="col-span-full flex justify-center mt-24">
                  <Link href="/africa">
                    <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                      View More
                    </button>
                  </Link>
              </div>
            </div>

          </main>
  );
};

export default Page;

