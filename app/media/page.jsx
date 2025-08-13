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
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 lg:mt-50  text-black mb-2">
        The Battle for Truth
      </h1>
      <p className="text-sm lg:text-base text-center text-gray-700  mx-auto">
        Unmask the forces behind curated narratives, censorship, propaganda,{" "}
        <br className="max-md:hidden" />
        and digital manipulation. Who controls the story — and what aren’t they
        telling you?
      </p>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-10">
            <Image src="/plun.png" alt="News 1" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/I19iaUfjERIHIPAce3ps">
              <h2 className="text-sm font-bold text-black hover:underline">
                The Forgotten Plunder of Iraq{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By: cyclopedia</p>
            <p className="mt-2 text-gray-900 text-xs">
              Few talk or think about Iraq these days and the media ignores this
              important but demolished nation.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/uks.png" alt="News 2" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/NDX3C3o7duRdz7844LU6">
              <h2 className="text-sm font-bold text-black hover:underline">
                UK media are covering up British spy flights for Israel{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Published in collaboration with The National{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Britain’s obedient defence correspondents are refusing to report a
              story of clear public interest in the middle of a genocide.
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
              <h2 className="text-sm font-bold text-black hover:underline lowercase">
                HOW THE WESTERN MEDIA HELPED BUILD THE CASE FOR GENOCIDE IN GAZA{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By cyclopedia</p>
            <p className="mt-2 text-gray-900 text-xs">
              From obscuring the West’s role in starving Gaza to sensationalised
              accounts of mass rape by Hamas, journalists are playing the role
              of propagandists, not reporters.
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
                UK MEDIA ARE SUPPRESSING MENTIONS OF ISRAEL’S ‘GENOCIDE’ IN GAZA{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              DES FREEDMAN 18 December 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Analysis of British media reporting shows they are barely covering
              allegations by UN officials and others that Israel is promoting
              genocide against Palestinians. This is in complete contrast to
              their reporting of Russia in Ukraine.
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

