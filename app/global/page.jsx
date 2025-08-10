"use client";

import {Suspense } from "react";
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

      <div className="max-w-7xl mx-auto px-4 py-10 mt-13 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     
        {/* === NEWS CARD 1 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/ghana.png"
              alt="News 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                What Ghana's Anti-LGBTQ Bill Means for Queer Christians
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Ugonna-Ora Owoh Published on June 13, 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              A new law could criminalize anyone who identifies as LGBTQ
            </p>
          </div>
        </div>
        {/* === NEWS CARD 2 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/Ghanas.png"
              alt="News 2"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                What Ghana's Anti-LGBTQ Bill Means for Queer Christians(Part 2)
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Ugonna-Ora Owoh Published on June 13, 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              “We uphold the Bible as our Principal guide and consider the
              LGBTQI+ in all its forms as unacceptable behavior that our God
              frowns upon.”
            </p>
          </div>
        </div>
        {/* === NEWS CARD 3 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/good.png" alt="News 3" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Schooling Muslims in Northern Nigeria: Politics, Policies and
                Conclusions
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Alex Thurston</p>
            <p className="mt-2 text-gray-900 text-xs">
              by Alex Thurston Government-run Islamic schools, then, are to be a
              source of “counter-radicalization” as well as a means of moving
              almajirai into more “productive” schools. But the policy is
              unlikely to succeed.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/kuti.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline ">
                Revolutionary Musical Artist Seun Kuti Carries Fela’s Afrobeat
                Torch Into a New Era{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              By Jeremy Scahill January 28 2018
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Like his father, Seun Kuti describes himself as a revolutionary
              and he is a fierce critic of the corruption of Nigeria's rulers
              and the U.S. and transnational corporations that prop them up.{" "}
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/sup.jpg" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Breakthrough in Cancer Research
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              By Dr. May — July 25, 2025
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Scientists claim progress in targeting rare cancer cells through
              mRNA innovations...
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/fem.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Defending against Feminism
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Amanda Hendrix-Komoto Published on October 4, 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Feminism called for women to shape political and business worlds
              beyond the home. Latter-day Saint leaders worried that feminism
              would desex women by masculinizing them and distance them from
              their god-ordained role.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/mom.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Mothers in Zion
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Amanda Hendrix-Komoto Published on October 4, 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              The longstanding pressures Mormon women face to be mothers
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/poly.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Defending Polygamy
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Amanda Hendrix-Komoto Published on October 4, 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              In the nineteenth century, many Americans believed polygamy was as
              horrible as slavery. The 1856 Republican National Convention
              referred to polygamy and slavery as...
            </p>
          </div>
        </div>

         <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/year.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
Columbus Day Is the Most Important Day of Every Year
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
Jon Schwarz
October 12 2015,            </p>
            <p className="mt-2 text-gray-900 text-xs">
           We shouldn’t celebrate Columbus Day. But if we want to comprehend the world — and we should, since our lives depend on it — we have to understand it.


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

