"use client";

import { Suspense } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ViewMoreSearchPopup from "../view/page";

const Page = () => {
  const [visibleCount, setVisibleCount] = useState(4); // 4 items shown initially

  const showMore = () => {
    setVisibleCount((prev) => prev + 1);
  };

  return (
    <main className="w-full bg-white">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-30 lg:mt-50 text-black mb-2">
        Faith, Belief, and Beyond
      </h1>
      <p className="text-sm text-center  text-gray-700 lg:text-base ">
        Explore ancient scriptures, divine mysteries, and the role of religion <br className="max-md:hidden"/>
        in shaping societies and ideologies. A closer look at beliefs that unite
        — and divide — billions.
      </p>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-10">
            <Image src="/rel.png" alt="News 1" fill className="object-cover" />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/enupjwyWCCP7OS0h77TQ">
              <h2 className="text-sm font-bold text-black hover:underline">
                From Missionaries to Settler-Colonialists for Christian
                Supremacy
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Bradley Onishi Published on October 1, 2024{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Homeland, “our people,” and the call for a new Caesar in
              Evangelical discourse
            </p>
          </div>
        </div>
        {/* === NEWS CARD 2 === */}
        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/shari.png"
              alt="News 2"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20   left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/yQ5FJS6IFfe7zpQ8gzk7">
              <h2 className="text-sm font-bold text-black hover:underline">
                Three Key Moments for Shari’a in Nigeria
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Alex Thurston</p>
            <p className="mt-2 text-gray-900 text-xs">
              The re-implementation of shari’a, however, caused conflict.
              Muslims and Christians clashed in several Northern states. Shari’a
              became a campaign issue in 2003.
            </p>
          </div>
        </div>
        {/* === NEWS CARD 3 === */}
        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/strug.png"
              alt="News 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/sVYggqD0kTZjrZsC7GIb">
              <h2 className="text-sm font-bold text-black hover:underline">
                Violent Dissent, Intra-Muslim Struggles, and Political Crisis in
                Northern Nigeria{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Alex Thurston </p>
            <p className="mt-2 text-gray-900 text-xs">
              Political struggles in Northern Nigeria have often been religious
              struggles as well. New leaders have often sought political and
              religious authority simultaneously.
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20 ">
            <Image
              src="/bible.png"
              alt="News 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4 ">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/VfaKVglfMBiX8qNlgaQd">
              <h2 className="text-sm font-bold text-black hover:underline">
                Christianity Without God
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">by Alex Thurston </p>
            <p className="mt-2 text-gray-900 text-xs">
              The Psalms for Our Time, Ray Waddle, traces today’s rapidly
              growing megachurches back to a short-lived theological movement in
              the 1960s called “Death of God” (DOG) theology, which aimed to
              remake religion for the modern age.
            </p>
          </div>
        </div>
        {/* === NEWS CARD 4 === */}
        <div className="relative">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/mod.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/NhDvvZoRYdUU6hrpMABv">
              <h2 className="text-sm font-bold text-black hover:underline">
                Modified Christianity
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">By Robert Christgau</p>
            <p className="mt-2 text-gray-900 text-xs">
              A left critic on what secular humanists don't get about
              Christianity in America. By Robert Christgau.
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/muslim.jpg"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/u4GeCPrM7sddaF5dEKsD">
              <h2 className="text-sm font-bold text-black hover:underline">
                Islamophobia and Americans’ Problems with Face Masks{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Liz Bucar Published on September 3, 2020
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              We could better embrace COVID masks if we took the time to
              understand people’s motivations who cover their faces for
              religious reasons
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/image.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/75ZM0N5NXt3cMFHkbUKS">
              <h2 className="text-sm font-bold text-black hover:underline">
                How They Met Their Mother
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Kelsey Osgood Published on August 1, 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              In the Church of Jesus Christ of Latter-day Saints, the divine
              figure of Heavenly Mother is shrouded in secrecy. Some Mormons are
              trying to bring Her out into the light.
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/Ame.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/dTksJYvlMiYC3QJ2BVa3">
              <h2 className="text-sm font-bold text-black hover:underline">
                Americans Leaving Religion
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              ns Leaving Religion by Ryan T. Cragun Jesse M. Smith Published on
              May 7, 2025{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              An excerpt from “Goodbye Religion: The Causes and Consequences of
              Secularization”
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/miss.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/wuagVdBpN45n8CuQa65d">
              <h2 className="text-sm font-bold text-black hover:underline">
                More than Missionary A Life in the Struggle for Reproductive
                Freedom{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Liz Bby Gillian Frank Published on May 7, 2025ucar Published on
              September 3, 2020
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              The doctors and religious organizers who risk everything
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/arab.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/FM2i8368RY3xpHvH9D6K">
              <h2 className="text-sm font-bold text-black hover:underline">
                Blasphemy in Saudi Arabia, Religious Freedom{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Published on August 1, 2013
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Daily round-up of religion in the news.
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image src="/BLM.png" alt="News 4" fill className="object-cover " />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/0oE5AkuF09zxe4F8u3gb">
              <h2 className="text-sm font-bold text-black hover:underline">
                Tragedy, Spirituality, and Black Justice
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Vincent Lloyd & Terrence L. Johnson Published on April 5, 2023{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              A conversation about religion in Black protest movements
            </p>
          </div>
        </div>

        <div className="relative focuse-ring-purple-600 hover:purple-600 hover:shadow-purple-600 hover:shadow-2xl">
          <div className="relative w-full h-[220px] mt-20">
            <Image
              src="/cath.png"
              alt="News 4"
              fill
              className="object-cover "
            />
          </div>
          <div className="absolute z-10 -bottom-20 left-4 right-4 bg-white p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/jeixznhQcoRJKNT9X6eE">
              <h2 className="text-sm font-bold text-black hover:underline">
                AIDS and the Hidden Catholic Church
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              by Michael J. O’Loughlin Published on June 3, 2020
            </p>
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

