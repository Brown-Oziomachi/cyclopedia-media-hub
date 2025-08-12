"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, LogIn, ChevronsDownUp, ChevronRight } from "lucide-react";
import { Drawer, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput"; // Assuming you have this component

const ProfileDropdownNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const [showRegionsDropdown, setShowRegionsDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();


    const handleSearch = (e) => {
      e.preventDefault();
      if (!query.trim()) return;

      setShowNav(false); // Close nav here

      // Navigate to search page with query param
      router.push(
        `/search?q=${encodeURIComponent(query.trim().toLowerCase())}`
      );
    };
  
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [searchParams]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (query.trim()) {
  //     router.push(`/search?q=${query}`);
  //     setShowNav(false);
  //   }
  // };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", url: "/" },
    { text: "News", url: "/#News-cpd" },
    { text: "About", url: "/about" },
    { text: "Contact", url: "/contact" },
  ];

  const regions = [
    { name: "Africa", emoji: "🌍", url: "/africa" },
    { name: "Asia", emoji: "🌏", url: "/asia" },
    { name: "America", emoji: "🌎", url: "/america" },
    { name: "Europe", emoji: "🌍", url: "/europe" },
    { name: "Middle East", emoji: "🕌", url: "/middle-east" },
    { name: "Oceania", emoji: "🌊", url: "/oceania" },
    { name: "Global", emoji: "🌐", url: "/global" },
  ];

  return (
    <main className="fixed top-0 left-0 w-full bg-black text-white shadow-lg z-50">
      <p className="text-center bg-white text-black text-xs py-1 font-semibold">
        INFORMATION IS FREEDOM
      </p>

      {/* Top bar with Regions dropdown (hidden on mobile) */}
      <div className="relative max-md:hidden px-4 py-1 text-black">
        <button
          onClick={() => setShowRegionsDropdown((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow hover:bg-gray-100 font-medium text-sm"
          aria-haspopup="true"
          aria-expanded={showRegionsDropdown}
        >
          Regions <ChevronDown className="h-4 w-4" />
        </button>

        {showRegionsDropdown && (
          <div
            className="absolute bg-white shadow-lg rounded-md mt-2 w-56 max-h-60 overflow-y-auto ring-1 ring-black ring-opacity-5 z-50"
            role="menu"
            aria-orientation="vertical"
          >
            {regions.map((region) => (
              <Link
                key={region.name}
                href={region.url}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setShowRegionsDropdown(false)}
              >
                {region.emoji} {region.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main navbar */}
      <section className="flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/hid.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full border-3 border-purple-500"
          />
        </Link>

        {/* Title */}
        <h1 className="font-playfair text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text tracking-wide select-none">
          Cyclopedia
        </h1>

        {/* Desktop nav links */}
        <section className="hidden lg:flex bg-gray-900 text-white select-none shadow-md px-2 py-1">
          <nav className="flex space-x-1 max-w-full overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.text}
                href={item.url}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 whitespace-nowrap text-sm font-semibold transition"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </section>

        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center ml-auto mr-6"
          role="search"
          aria-label="Site Search"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tags like politics, cyclopedia..."
            className="px-3 py-1 rounded-l-md border border-white text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64"
            aria-label="Search input"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 px-4 py-1 rounded-r-md text-white font-semibold transition"
          >
            Search
          </button>
        </form>

        {/* Profile / Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {session ? (
            <>
              <button
                onClick={toggleDrawer(true)}
                className="flex items-center gap-2 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={drawerOpen}
                aria-label="Open profile menu"
              >
                <img
                  src={session.user.image || "/default-avatar.png"}
                  alt={session.user.name}
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-600 shadow hover:shadow-lg transition duration-300 object-cover"
                />
                <span className="text-sm font-semibold text-gray-200">
                  {session.user.name}
                </span>
                <ChevronDown className="text-xl text-cyan-400" />
              </button>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    bgcolor: "black",
                    width: 350,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    color: "white",
                  },
                }}
              >
                <div>
                  <h1 className="text-green-600 text-center text-2xl font-serif font-bold">
                    Hello!!
                  </h1>
                  <p className="font-semibold text-base text-white text-center">
                    {session.user.name}
                  </p>
                  <p className="text-gray-400 text-xs text-center mb-4">
                    {session.user.email}
                  </p>

                  <hr className="my-4 border-gray-600" />

                  <nav className="flex flex-col space-y-2 text-gray-300 text-sm">
                    <Link
                      href="/blog?genre=news"
                      className="hover:text-cyan-400"
                    >
                      News
                    </Link>
                    <Link href="/news" className="hover:text-cyan-400">
                      Notifications
                    </Link>
                    <h1
                      className="font-bold font-serif cursor-pointer text-green-700 text-center mt-5"
                      onClick={() => {
                        const el = document.getElementById("services-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Have something to Share? ⬇
                      <img src="/share.jpg" alt="Share" className="mt-5" />
                    </h1>
                  </nav>
                </div>

                <button
                  onClick={signOut}
                  className="mt-6 w-full py-2 rounded bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold hover:opacity-90"
                >
                  Sign Out
                </button>
              </Drawer>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:bg-cyan-500 transition"
            >
              Sign In <LogIn className="inline-block ml-2" size={16} />
            </Link>
          )}
        </div>

        {/* Mobile menu & profile */}
        <div className="flex lg:hidden items-center gap-10">
          {session && (
            <button
              onClick={toggleDrawer(true)}
              className="bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Open profile drawer"
            >
              <img
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name}
                width={36}
                height={36}
                className="rounded-full border border-gray-500 object-cover"
              />
            </button>
          )}

          <button
            onClick={() => setShowNav((v) => !v)}
            className="text-3xl text-orange-400 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {showNav ? (
              <ChevronsDownUp className="text-purple-600" />
            ) : (
              <ChevronDown className="text-white" />
            )}
          </button>
        </div>
      </section>

      {/* Mobile Navigation Drawer */}
      {showNav && (
        <nav
          className="fixed inset-0 bg-white bg-opacity-95 flex flex-col text-black p-5 z-[100] mt-27 overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {/* Small screen search */}
          <form
            onSubmit={handleSearch}
            className="flex lg:hidden items-center ml-auto mr-6"
            role="search"
            aria-label="Site Search"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tags like politics, cyclopedia..."
              className="px-5 py-2 rounded-l-md border border-black text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64"
              aria-label="Search input"
            />
            <button
              type="submit"
              // onClick={() => setShowNav(false)}
              className="bg-purple-500 hover:bg-purple-600 px-4 py-1 rounded-r-md text-white font-semibold transition"
            >
              Search
            </button>
          </form>

          <ul className="space-y-3 text-sm font-medium text-gray-800 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            <li>
              <Link href="/politics" onClick={() => setShowNav(false)}>
                Politics
              </Link>
            </li>
            <li>
              <Link href="/religion" onClick={() => setShowNav(false)}>
                Religion
              </Link>
            </li>
            <li>
              <Link href="/history" onClick={() => setShowNav(false)}>
                History
              </Link>
            </li>
          </ul>

          <Link
            href="/#read-more"
            onClick={() => {
              setShowNav(false);
              setShowRegionsDropdown(false);
            }}
            className="shadow-black w-1/2 shadow-xl cursor-pointer text-2xl border border-cyan-400 rounded-3xl bg-purple-600 text-white lg:text-center font-semibold font-serif mt-5 mx-auto"
          >
            <div className="flex items-center justify-center text-purple-300">
              <ChevronRight />
              <p className="text-xs font-extralight ml-1">Explore more</p>
            </div>
          </Link>

          <hr className="my-4 border-gray-600" />

          <Link
            href="/newsletter"
            onClick={() => setShowNav(false)}
            className="text-gray-400 text-sm mb-4"
          >
            Newsletter
          </Link>

          <hr className="my-4 border-gray-600" />

          {/* Regions Links for mobile */}
          <div className="grid space-y-3 text-gray-400 text-sm">
            {regions.map((region) => (
              <Link
                key={region.name}
                href={region.url}
                onClick={() => setShowNav(false)}
              >
                {region.name}
              </Link>
            ))}
          </div>
          <hr className="my-4 border-gray-600" />

          <nav className="flex flex-col gap-6 mt-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                onClick={() => setShowNav(false)}
                className="text-sm font-semibold hover:text-cyan-400 transition duration-200"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="mt-10 w-full gap-5 flex flex-col mx-auto items-center">
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setShowNav(false);
                }}
                className="py-3 w-3/4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:bg-cyan-500 text-white font-medium"
              >
                Sign Out
              </button>
            ) : (
              <>
                {/* <Link
                  href="/contact"
                  onClick={() => setShowNav(false)}
                  className="py-3 w-3/4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:bg-cyan-500 text-white font-medium text-center"
                >
                  Join Us
                </Link> */}
                <Link
                  href="/auth/signin"
                  onClick={() => setShowNav(false)}
                  className="py-3 w-3/4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:bg-cyan-500 text-white font-medium text-center"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </main>
  );
};

export default ProfileDropdownNavbar;
