"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";


const ProfileDropdownNavbar = () => {
  const [showNav, setShowNav] = useState(false); // Mobile menu toggle
  const { data: session } = useSession(); // User session data
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown toggle for profile options

  const navItems = [
    { text: "HOME", url: "/" },
    { text: "ABOUT", url: "/about" },
    { text: "BLOG", url: "/blog" },
    { text: "CONTACT", url: "/contact" },
    { text: "SERVICES", url: "/#services-section" },
    { text: "NEWS", url: "/news" },
    { text: "DEVELOPERS", url: "/developers" },
  ];

  return (
    <main className="fixed w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-lg z-50">
      <section className="px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="WebWiz Logo"
              className="rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="text-md text-gray-200 font-semibold hover:text-cyan-400 hover:underline transition-all duration-300 z-50"
            >
              {item.text}
            </Link>
          ))}
        </div>

        {/* User Profile Dropdown */}
        {session ? (
          <div className="relative flex items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              
              <img
                src={session?.user?.image}
                alt={session?.user?.name.slice(0, 1).toUpperCase()}
                className="w-10 h-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 z-50"
              />
              
              <IoIosArrowDown className="text-2xl text-cyan-400" />
            </div>
            {dropdownVisible && (
              <div
                className="absolute top-12 right-0 w-40 bg-gray-800 rounded-lg shadow-lg p-3 z-50"
                onMouseLeave={() => setDropdownVisible(false)} // Close dropdown when mouse leaves
              >
                <Link
                  href="/profile"
                  className="block text-sm text-gray-200 hover:text-cyan-400 py-2 px-3 rounded-lg hover:bg-gray-700 transition"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block text-sm text-gray-200 hover:text-cyan-400 py-2 px-3 rounded-lg hover:bg-gray-700 transition"
                >
                  Settings
                </Link>
                <Link
                  href="/notifications"
                  className="block text-sm text-gray-200 hover:text-cyan-400 py-2 px-3 rounded-lg hover:bg-gray-700 transition"
                >
                  Notifications
                </Link>
                <button
                  onClick={signOut}
                  className="w-full bg-cyan-500 text-white py-2 px-3 rounded-lg hover:bg-cyan-600 transition duration-300 mt-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="hidden lg:inline-block text-md py-2 px-6  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-200 rounded-lg hover:text-cyan-400 hover:bg-cyan-500 transition-all duration-300 shadow-md"
          >
            Sign In
          </Link>
        )}

         {/* Hamburger Menu */}
      <button
        onClick={() => setShowNav(!showNav)}
        className="lg:hidden text-3xl text-orange-400 focus:outline-none z-50"
      >
        {showNav ? <RiCloseFill className="text-white" /> : <IoIosMenu className="text-white" />}
      </button>

      <div
  className={`fixed top-0 left-0 w-full h-full mt-15 bg-black/80 text-white flex flex-col items-center justify-center z-50 overflow-hidden transition-transform ${
    showNav ? "translate-y-0" : "translate-y-full"
  }`}
>
<div className="   flex items-center justify-center">
      {/* Moon */}
      <div className=" right-50 h-10 w-10 brightness-200 overflow-hidden rounded-full bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse"></div>
</div>
  {/* Show Sign-In Avatar */}
  {session?.user?.image && (
    <img
      src={session.user.image}
      alt={session.user.name}
      className="rounded-b-full mb-10 shadow-2xl max-w-[150px] max-h-[150px] object-cover" // Ensure avatar stays within boundaries
    />
  )}

  {/* Navigation Items */}
  {navItems.map((item, index) => (
    <Link
      key={index}
      href={item.url}
      onClick={() => setShowNav(false)}
      className="text-lg font-semibold mb-4 hover:text-orange-400 transition duration-300"
    >
      {item.text}
    </Link>
  ))}

  {/* Sign In/Sign Out Button */}
  {session ? (
    <button
      onClick={signOut}
      className="lg:inline-block text-md py-2 px-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-200 rounded-lg hover:text-cyan-400 hover:bg-cyan-500 transition-all duration-300 shadow-md overflow-hidden"
    >
      Sign Out
    </button>
  ) : (
    <Link
      onClick={() => setShowNav(false)}
      href="/auth/signin"
      className="lg:inline-block text-md py-2 px-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-200 rounded-lg hover:text-cyan-400 hover:bg-cyan-500 transition-all duration-300 shadow-md overflow-hidden"
    >
      Sign In
    </Link>
  )}
</div>
</section>
</main>
  )
}
export default ProfileDropdownNavbar;
