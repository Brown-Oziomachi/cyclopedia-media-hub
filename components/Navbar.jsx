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

   const [showHeader, setShowHeader] = useState(true);
   const [lastScroll, setLastScroll] = useState(0);

   useEffect(() => {
     const handleScroll = () => {
       const currentScroll = window.scrollY;
       if (currentScroll < lastScroll) {
         // Scrolling up
         setShowHeader(true);
       } else {
         // Scrolling down
         setShowHeader(false);
       }
       setLastScroll(currentScroll);
     };

     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, [lastScroll]);

  
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
    { text: "Latest News", url: "/global" },
    { text: "About us", url: "/about" },
    { text: "Contact us", url: "/contact" },
  ];

  const regions = [
    { name: "Africa", emoji: "🌍", url: "/africa" },
    { name: "Asia", emoji: "🌏", url: "/asia" },
    { name: "America", emoji: "🌎", url: "/america" },
    { name: "Europe", emoji: "🌍", url: "/europe" },
  ];

   
  return (
    <main className="fixed top-10 left-0 w-full bg-black text-white z-50">
      <header className="fixed  -top-5 left-0 w-full  z-50 transition-transform duration-300">
        <div className="flex items-center text-center w-full text-2xl justify-center mt-5 h-10 bg-black gap-5 relative top-0">
          <Link href="/">
            <p
              className="text-[35px]   z-40 bg-black text-center font-bold text-white  "
              onClick={() => setShowNav(false)}
            >
              CYCLOPEDIA
            </p>
          </Link>
          <Link href="/">
            <Image
              src="/hid.png"
              alt="Logo"
              width={30}
              height={30}
              className="rounded-full border-3 border-purple-500 bg-black "
              onClick={() => setShowNav(false)}
            />
          </Link>
        </div>
        <div
          className={`bg- text-white text-center py-1 font-bold h-10 ${
            showHeader ? "-translate-y-5" : "-translate-y-4"
          }`}
        ></div>

        <nav
          className={` text-white flex flex-items-center md:z-50 justify-between py-1 ${
            showHeader ? "translate-y-1" : "-translate-y-25"
          } transition-transform duration-300 `}
        >
          {/* Main navbar */}
        </nav>

        {/* Sticky search input */}
      </header>
      <form
        onSubmit={handleSearch}
        className="hidden lg:absolute items-center mx-auto -mt-1 justify-center "
        role="search"
        aria-label="Site Search"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search...."
          className="px-1 py-1 rounded-l-md shadow-2xl ml-40 z-50 shadow-purple-500 text-white focus:outline-none focus:ring-2 max-lg:focus:ring-purple-400 w-64"
          aria-label="Search input"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 lg:hidden to-cyan-400 hover:bg-purple-600 px-2 py-2 rounded-r-md text-white font-semibold transition"
        >
          Search
        </button>
      </form>

      <section className=" lg:z-50 flex items-center justify-between px-5 py-3 bg-black">
        {/* Logo */}

        {/* Title */}

        {/* Top bar with Regions dropdown (hidden on mobile) */}
        <div className="relative max-md:hidden px-4 py-1 text-black max-lg:hidden">
          <button
            onClick={() => setShowRegionsDropdown((v) => !v)}
            className="inline-flex z-50 items-center gap-2 px-4 py-2 bg-white rounded-md shadow hover:bg-gray-100 font-medium text-sm"
            aria-haspopup="true"
            aria-expanded={showRegionsDropdown}
          >
            Regions <ChevronDown className="h-4 w-4 z-50 " />
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

        <section className="hidden z-50 w-full -mt-7 lg:bg-black lg:flex text-gray-300 select-none  px-2 py-1 lg:ml-">
          <nav className="flex space-x-4 max-w-full overflow-x-auto no-scrollbar">
            {/* Nav Items */}
            {navItems.map((item) => (
              <Link
                key={item.text}
                href={item.url}
                className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap text-sm font-semibold transition"
              >
                {item.text}
              </Link>
            ))}

            {/* Categories */}
          </nav>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/politics"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              politics
            </Link>
            <Link
              href="/religion"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Religion
            </Link>
            <Link
              href="/history"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              History
            </Link>
            <Link
              href="/science"
              className="px-3 py-2  hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Science
            </Link>
            <Link
              href="/media"
              className="px-3 py-2  hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Media
            </Link>
            <Link
              href="/education"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Education
            </Link>
            <Link
              href="/health"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Health
            </Link>
            <Link
              href="/art"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Art&Culture
            </Link>
            <Link
              href="/technology"
              className="px-3 py-2 hover:bg-purple-600  rounded cursor-pointer text-sm font-medium"
            >
              Technology
            </Link>
            <Link
              href="/live"
              className="px-3 py-2 hover:bg-purple-600  rounded cursor-pointer text-sm font-medium"
            >
              Livestream
            </Link>
          </div>
        </section>

        {/* Profile / Auth Buttons
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
                  className="mt- w-full py-2 rounded bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold hover:opacity-90"
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
        </div> */}

        {/* Mobile menu & profile */}
        <div className="flex lg:hidden items-center gap-10 ">
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
            className="text-3xl  z-[70] -mt-10  bg-black"
            aria-label="Toggle navigation menu"
          >
            {showNav ? (
              <ChevronsDownUp
                className={`text-purple-600 "${
                  showHeader ? "translate-y-0" : "-translate-y-10"
                }`}
              />
            ) : (
              <ChevronDown
                className={`text-white" ${
                  showHeader ? "translate-y-0" : "-translate-y-0"
                }`}
              />
            )}
          </button>
        </div>
      </section>

      {/* Mobile Navigation Drawer */}
      {showNav && (
        <nav
          className="fixed inset-0  bg-black bg-opacity-95 flex flex-col text-black p-5 z-[50] mt-9 overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {/* Small screen search */}
          <form
            onSubmit={handleSearch}
            className="flex lg:hidden items-center ml-auto mr-6 z-40 "
            role="search"
            aria-label="Site Search"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What's on your mind?"
              className="px-1 py-2 rounded-l-md shadow-2xl z-50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
              aria-label="Search input"
            />
            <button
              type="submit"
              // onClick={() => setShowNav(false)}
              className="bg-gradient-to-r z-40 from-purple-500 to-cyan-400 hover:bg-purple-600 px-4 py-3 rounded-r-md text-white font-semibold transition"
            >
              Search
            </button>
          </form>

          <ul className="space-y-3 font-bold mt-5 text-gray-400">
            <li>
              <Link href="/global" onClick={() => setShowNav(false)}>
                Latest news
              </Link>
            </li>
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
            <li>
              <Link href="/science" onClick={() => setShowNav(false)}>
                Science
              </Link>
            </li>
            <li>
              <Link href="/media" onClick={() => setShowNav(false)}>
                Media
              </Link>
            </li>
            <li>
              <Link href="/live" onClick={() => setShowNav(false)}>
                Livestream
              </Link>
            </li>
          </ul>

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

          <nav className="flex flex-col gap-6 mt-8 text-gray-300">
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
