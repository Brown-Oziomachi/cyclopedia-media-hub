"use client";

import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Loader } from "lucide-react";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
 
        <main className="min-h-screen font-sans">
          <header className="flex flex-col justify-center items-center min-h-screen text-center px-6 md:px-20">
            <h1 className="text-5xl font-extrabold mt-30 lg:mt-50 mb-8 tracking-tigh mask-b-from-70%">
              About{" "}
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text font-serif mask-t-from-black to-70%">
               The Cyclopedia
              </span>
            </h1>
            <img
              src="hid.png"
              alt="Cyclopedia image"
              className="shadow-2xl rounded-b-4xl mask-b-from-5%"
            />
            <p className=" mb-2 -mt-10 text-xs">
              Uncovering the Unseen, Revealing the Real.
            </p>
            <p className="max-w-3xl leading-relaxed text-sm">
              <span className="text-3xl text-purple-400">We</span> are not just
              another media outlet. We are a movement of minds — built for those
              who question, research, and seek the truth behind the curtain.
            </p>
          </header>

          <section className="px-4 md:px-10 py-10 ">
            <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
              Who We Are
            </h2>

            <div className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory pb-4 ">
              {/* Card 1 */}
              <div className="snap-start flex-shrink-0 w-64 rounded-xl p-4 shadow-md border border-purple-400 ">
                <h3 className="text-lg font-semibold mb-2">👁 Our Identity</h3>
                <p className="text-sm ">
                  We are independent thinkers, digital truth-seekers, and
                  investigators who believe the world is deeper than headlines.
                </p>
                <ul className="mt-2 text-sm list-disc list-inside ">
                  <li>Story analysts</li>
                  <li>Alternative historians</li>
                  <li>Independent journalists</li>
                  <li>Cultural observers</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="snap-start flex-shrink-0 w-64 rounded-xl p-4 shadow-md border border-purple-400">
                <h3 className="text-lg font-semibold mb-2">🎯 Our Purpose</h3>
                <p className="text-sm">
                  We ask questions and connect dots others ignore. Because
                  truth isn’t always comfortable — but it’s necessary.
                </p>
              </div>

              {/* Card 3 */}
              <div className="snap-start flex-shrink-0 w-64  rounded-xl p-4 shadow-md border border-purple-400">
                <h3 className="text-lg font-semibold mb-2">✒ Why We Exist</h3>
                <p className="text-sm">
                  Because information is often filtered. We re-examine history,
                  narratives, and the facts you were taught.
                </p>
              </div>
            </div>
          </section>

          {/* Journey Section */}
          <section className="px-4 md:px-20 py-10 text-center">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Journey</h2>
            <p className="max-w-3xl mx-auto text-sm ">
             The Cyclopedia was founded out of a need for honest inquiry and open
              minds. We began as a small community sharing unconventional
              insights and evolved into a platform for collective awareness. Our
              journey continues — and you’re part of it.
            </p>
          </section>
          <div>
      {/* Footer */}
      <footer className="py-10 text-center text-sm  border-t border">
        &copy; 2025 The Cyclopedia. All rights reserved.
       </footer>
       </div>
        </main>
  );
};

export default About;
