"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { BellRing, ChevronDown, ListCollapse, LogIn, Menu } from "lucide-react";
import logo from "../public/logo.png";
import { Drawer, Box } from "@mui/material";

const ProfileDropdownNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", url: "/" },
    { text: "About", url: "/about" },
    { text: "Blog", url: "/blog" },
    // { text: "POST", url: "/upload-to-blog" },
    { text: "Contact", url: "/contact" },
    { text: "Services", url: "/#services-section" },
    // { text: "News", url: "/news" },
    { text: "Developers", url: "/developers" },
    { text: "Project", url: "/projects" },
    { text: "Youtube", url: "/youtubevideos" },
  ];

  return (
    <main className="fixed w-full bg-black border-x shadow-xl border-b border z-50">
      <section className="px-5 py-4 flex items-center justify-between z-50">
        <span className="relative flex items-center px-2 py-1 rounded-md gap-6 z-50 bg-black">
          {/* Animated SVG border */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="98"
              height="98"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              strokeDasharray="392"
              strokeDashoffset="392"
              style={{
                animation: "draw-border 4s linear infinite", // loop forever
              }}
            />
          </svg>

          {/* Logo + Text content */}
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="/Logo"
              width={30}
              height={30}
              className="z-10 shadow-md hover:shadow-lg transition-shadow duration-300 object-cover animate-pulse brightness-125 shadow-black shadow-2xl"
            />
          </Link>

          <h1 className="z-10 text-white -ml-5 border-b border-t border-t-green-600 border-b-green-600">
            WebWiz
          </h1>
        </span>

        {/* Desktop Navigation */}
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

        {/* Desktop Avatar + Drawer */}
        <div className="hidden lg:flex items-center gap-4">
          {session ? (
            <>
              <button
                onClick={toggleDrawer(true)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="relative">
                  <img
                    src={session?.user?.image || "/default-avatar.png"}
                    alt={session?.user?.name}
                    width={40}
                    height={40}
                    className="rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 object-cover ml-auto z-0"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900"></span>
                </div>
                <span className="text-sm font-semibold text-gray-200 hover:text-cyan-400 transition-colors duration-300 lg:hidden md:inline-block">
                  {session?.user?.name}
                </span>
                <ChevronDown className="text-xl text-cyan-400 transition-transform duration-200" />
              </button>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    width: 350,
                    bgcolor: "black",
                    height: "50em",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                    
                  <div className="">
                    <Link
                      href="/blog"
                      className="hover:text-cyan-400 transition-colors duration-200"
                    >
                      <h1 className="text-green-600 text-center text-2xl font-serif font-bold">
                        Hello!!
                      </h1>
                      <p className="font-semibold text-base truncate text-white text-center ">
                        {session.user.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate mb-4 text-center">
                        {session.user.email}
                      </p>
                    </Link>
                    
                    <hr className="my-4 border-gray-600" />
                    <nav className="flex flex-col space-y-2 text-gray-300 text-sm font-normal">
                      {/* <Link
                        href="/profile"
                        className="hover:text-cyan-400 transition-colors duration-200 shadow-2xl shadow-black"
                      >
                        My Profile
                      </Link> */}
                      <Link
                        href="/blog"
                        className="hover:text-cyan-400 transition-colors duration-200"
                      >
                        Blog
                      </Link>
                      <Link
                        href="/news"
                        className="hover:text-cyan-400 transition-colors duration-200"
                      >
                        News
                      </Link>
                      <Link
                        href="/blog"
                        className="hover:text-cyan-400 transition-colors duration-200"
                      >
                        Notifications
                      </Link>
                      <div>
                        <h1
                          className="font-bold font-serif cursor-pointer text-green-700 text-center mt-5"
                          onClick={() => {
                            const el =
                              document.getElementById("services-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Have something to Share? ⬇
                          <div>
                            <img
                              src="/share.jpg"
                              alt="owner image"
                              className="mt-5"
                            />
                          </div>
                        </h1>
                      </div>
                    </nav>
                  </div>
                  <button
                    onClick={signOut}
                    className="mt-6 w-full py-2 rounded bg-gray-400/5 border-x border-x-green-600 text-white text-sm font-semibold transition"
                    aria-label="Sign out"
                  >
                    Sign Out
                  </button>
                </Box>
              </Drawer>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="text-md py-2 px-6 bg-gray-400/5 border-x text-gray-200 rounded-lg hover:text-cyan-400 hover:bg-cyan-500 transition-all duration-300 shadow-md"
            >
              Sign In
              <LogIn className="inline-block ml-5 text-gray-400" size={16} />
            </Link>
          )}
        </div>

        <div className="flex">
          {/* Mobile Avatar Drawer Toggle */}
          {session && (
            <button
              onClick={toggleDrawer(true)}
              className="lg:hidden focus:outline-none mr-4 z-50 items-center justify-center"
            >
              <img
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name}
                width={36}
                height={36}
                className="rounded-full shadow-md hover:shadow-lg object-cover border border-gray-500"
              />
            </button>
          )}
          <div>
            <Link href="/myprofile">
              <img
                src="/web21.jpg"
                alt=""
                className=" rounded-full"
                width={36}
                height={36}
              />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setShowNav(!showNav)}
          className="lg:hidden text-3xl text-orange-400 focus:outline-none z-50"
          aria-label="Toggle navigation menu"
        >
          {showNav ? (
            <ListCollapse className="text-green-600 border" />
          ) : (
            <Menu className="text-white border rounded-sm" />
          )}
        </button>
      </section>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-neutral-900 opacity-200 text-white flex flex-col  p-10 z-40 transition-transform duration-500 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-center mb-5">
          <img src="/logo.jpg" alt="logo" className="h-20 w-20 mt-10" />{" "}
        </div>

        {/* {session?.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name}
            className="rounded-full mb-5 shadow-2xl max-w-[80px] max-h-[80px] object-cover"
          />
        )} */}

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

        {session ? (
          <button
            onClick={() => {
              signOut();
              setShowNav(false);
            }}
            className="shadow-2xl shadow-black text-xl py-3 px-6 bg-gray-400/5 border-x border-x-green-600 text-gray-200 rounded-lg hover:text-cyan-400 hover:bg-cyan-500 transition-all duration-300  mt-"
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/auth/signin"
            onClick={() => setShowNav(false)}
            className="shadow-2xl shadow-black py-3 px-6 text-xl bg-gray-400/5 border-x border-x-green-600  rounded-lg hover:text-cyan-400 hover:bg-cyan-500 transition-all duration-300  mt-4 w-80 text-center font-bold text-green-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </main>
  );
};

export default ProfileDropdownNavbar;
