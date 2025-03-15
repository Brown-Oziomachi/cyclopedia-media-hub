"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { IoIosClose } from "react-icons/io5";

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const navItems = [
        {
            text: "Home",
            url: "/",
        },
        {
            text: "About",
            url:  "#",
        },
        {
            text: "Projects",
            url:  "#",
        },
        {
            text: "Contact",
            url:  "#",
        },

    ];
    return (
        <main>
          <section className="flex items-center justify-between py-3 px-5 shadow-md">
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              alt="logo"
              className="z-50"
            />
    
            <div className="flex items-center gap-8 max-lg:hidden">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="text-lg text-black font-semibold hover:text-blue-500 transition-all"
                >
                  {item.text}
                </Link>
              ))}
              </div>

              <button
          onClick={() => setShowNav(!showNav)}
          className="lg:hidden text-3xl text-blue-500 z-50"
        >
        {showNav ? <RiMenu3Line /> : <IoIosClose />}
        </button>
      </section>
      <div
        className={`lg:hidden h-screen flex flex-col items-center py-16 justify-between fixed top-0 left-0 w-full bg-white overflow-hidden ${
          showNav ? "flex" : "hidden"
        }`}
      >
        {navItems.map((item, i) => (
          <Link
            key={i}
            className="text-lg text-black font-semibold hover:text-blue-500 transition-all"
            href={item.url}
          >
            {item.text}
          </Link>
        ))}
      </div>
        </main>
      );
    };
 

export default Navbar
