"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { BellRing, ChevronDown, ListCollapse, LogIn, LogOut, Menu, Newspaper, Rss,  UserRoundPen } from "lucide-react";
import logo from "../public/logo.png";
import ChatDropdown from "./Chat";


const ProfileDropdownNavbar = () => {
  const [showNav, setShowNav] = useState(false); // Mobile menu toggle
  const { data: session } = useSession(); // User session data
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown toggle for profile options

  const navItems = [
    { text: "HOME", url: "/",  },
    { text: "ABOUT", url: "/about", },
    { text: "BLOG", url: "/blog",},
    { text: "UPLOAD BLOG", url: "/upload-to-blog", },
    { text: "UPLOAD VIDEO", url: "/upload-to-video",},
    { text: "CONTACT", url: "/contact", },
    { text: "SERVICES", url: "/#services-section", },
    { text: "NEWS", url: "/news", icon: "/News" },
    { text: "DEVELOPERS", url: "/developers", },
    { text: "PROJECTS", url: "/projects", },
    { text: "YOUTUBE", url: "/youtubevideos", },

    
  ];
  return (
    <main className="fixed w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-lg z-50">
      <section className="px-5 py-4 flex items-center justify-between">
        <span className="flex items-center justify-center border-gray-800 font-extralight border px-2 rounded-md">
        {/* Logo */}
          <Link href="/">
            <Image
              src={logo}
              width={50}
              height={50}
              alt="WebWiz Logo"
              className="rounded-full shadow-xl hover:scale-110 transition-transform duration-100 z-50 "
            />
          </Link>
            <h1 className="text-white -ml-5">WebWiz</h1>
        </span>
       
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
      
          {session ? (
            <div className="relative flex items-center gap-4">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                
                <div className="relative">
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt={session?.user?.name}
              width={40}
              height={40}
              className="rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900"></span>
                </div>
                <span className="text-sm font-semibold text-gray-200 hover:text-cyan-400 transition-colors duration-300 hidden md:inline-block">
            {session?.user?.name}
                </span>
                <ChevronDown className={`text-xl text-cyan-400 transition-transform duration-200 ${dropdownVisible ? 'rotate-180' : ''}`} />
              </button>
              {dropdownVisible && (
                <div
            className="absolute top-12 right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-xl overflow-hidden z-50"
                >
            <div className="py-2 px-4 border-b border-gray-700">
              <p className="text-sm text-gray-300 truncate">{session?.user?.email}</p>
            </div>
            <Link
            onClick={() => setShowNav(false)}
              href="/profile"
              className="block py-2 px-4 text-sm text-gray-200 hover:bg-gray-700 hover:text-cyan-400 transition-colors duration-200"
            >
              <UserRoundPen className="inline-block mr-2 text-gray-400" size={16} />
              My Profile
            </Link>
            <Link
            onClick={() => setShowNav(false)}
              href="/blog"
              className="block py-2 px-4 text-sm text-gray-200 hover:bg-gray-700 hover:text-cyan-400 transition-colors duration-200"
            >
              <Rss className="inline-block mr-2 text-gray-400" size={16} />
              Blog
            </Link>
            <Link
              href="/news"
              className="block py-2 px-4 text-sm text-gray-200 hover:bg-gray-700 hover:text-cyan-400 transition-colors duration-200"
            >
              <Newspaper className="inline-block mr-2 text-gray-400" size={16} />
              News
            </Link>
            <Link
            onClick={() => setShowNav(false)}
              href="/blog"
              className="relative flex py-2 px-4 text-sm text-gray-200 hover:bg-gray-700 hover:text-cyan-400 transition-colors duration-200"
            >
              
              <BellRing className=" mr-2 text-gray-400" size={16} />
              <p className="text-red-600 absolute top-0 left-2 font-bold text-sm">50</p>
              Notifications
            </Link>
            <div className="py-2">
              <button
                onClick={signOut}
                className="flex w-full text-left py-2 px-4 text-sm text-gray-200 hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                <LogOut className="inline-block mr-2 text-gray-400" size={16}/>
                Sign Out
              </button>
            </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="hidden lg:inline-block text-md py-2 px-6  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-200 rounded-lg hover:text-cyan-400 hover:bg-cyan-500 transition-all duration-300 shadow-md"
            >
              <LogIn   className="inline-block mr-2 text-gray-400 " size={16}/>
              Sign In
            </Link>
          )}

      <button
        onClick={() => setShowNav(!showNav)}
        className="lg:hidden text-3xl text-orange-400 focus:outline-none z-50"
      >
        {showNav ? <ListCollapse  className="text-white" /> : <Menu  className="text-white" />}
      </button>

      <div
  className={`fixed top-0 left-0 w-full h-full bg-black/80 text-white flex flex-col items-center justify-center z-0 overflow-hidden transition-transform ${
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
