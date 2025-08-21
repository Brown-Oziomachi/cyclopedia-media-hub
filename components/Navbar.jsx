"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, LogIn, ChevronRight,  ChevronUp } from "lucide-react";
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
const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
const [showMobileToggle, setShowMobileToggle] = useState(true);
const [lastScrollMobile, setLastScrollMobile] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 const [openDropdown, setOpenDropdown] = useState(null);
const isDropdownOpen = showNav || openDropdown !== null;

  const toggleDropdown = (regionName) => {
    setOpenDropdown(openDropdown === regionName ? null : regionName);
  };

useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (!isDropdownOpen) { // Only hide/show if dropdown is not open
      if (currentScroll < lastScroll) {
        setShowHeader(true); // scrolling up → show header
      } else {
        setShowHeader(false); // scrolling down → hide header
      }
    }

    setLastScroll(currentScroll);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScroll, isDropdownOpen]);


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowHeader(currentScroll < lastScroll);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [searchParams]);

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

  useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScrollMobile) {
      // Scrolling down → hide toggle
      setShowMobileToggle(false);
    } else {
      // Scrolling up → show toggle
      setShowMobileToggle(true);
    }
    setLastScrollMobile(currentScroll);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollMobile]);
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
    { text: "About us", url: "/about" },
    { text: "Contact us", url: "/contact" },
  ];

  const countriesByRegion = {
  Africa: ["Nigeria", "Kenya", "South Africa", "Egypt", "Ghana", "Mali", "Niger", "Somalia"],
  Asia: ["Israel", "Iraq", "India", "Iran"],
  America: ["USA", "Canada", "Brazil", "Mexico"],
  Europe: ["UK", "Germany", "France", "Italy"],
};

const regions = [
  { name: "Africa", url: "/africa" },
  { name: "Asia",  url: "/asia" },
  { name: "America", url: "/america" },
  { name: "Europe",  url: "/europe" },
];

   
  return (
    <main className="fixed top-10 left-0 w-full bg-black text-white z-50 ">
      <header
        className={`fixed top-0 left-0 w-full bg-black transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-20"
        } shadow-lg z-50`}
          onClick={(e) => e.stopPropagation()} // Prevents nav toggle scroll effect

      >
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/hid.png"
                alt="Logo"
                width={30}
                height={30}
                className="rounded-full border-2 border-purple-500 hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
            <Link href="/">
              <h1
                className="text-white font-bold text-2xl cursor-pointer hover:text-purple-400 transition"
                onClick={() => setShowNav(false)}
              >
               THE CYCLOPEDIA
              </h1>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex relative items-center mx-auto justify-center"
            role="search"
            aria-label="Site Search"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search...."
              className="px-3 py-2 rounded-l-md shadow-2xl shadow-purple-500 bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400 w-72"
              aria-label="Search input"
            />
            <button
              type="submit"
              className="bg-black hover:from-purple-600 hover:to-cyan-500 px-4 py-2 rounded-r-md text-white font-semibold transition z-50 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Regions Dropdown (desktop only) */}
          <div className="relative hidden lg:block px-4 py-1 text-black">
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
        </div>
        {/* Desktop Navigation & Categories */}
        <section className="hidden lg:flex items-center justify-between bg-black text-gray-300 px-2 py-1">
          <nav className="flex space-x-4 max-w-full overflow-x-auto no-scrollbar mt-5">
            {navItems.map((item) => (
              <Link
                key={item.text}
                href={item.url}
                className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap text-sm font-semibold transition"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-2 mt-5">
            <Link
              href="/politics"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Politics
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
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Science
            </Link>
            <Link
              href="/media"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
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
              Art & Culture
            </Link>
            <Link
              href="/technology"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Technology
            </Link>
            <Link
              href="/sports"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Sports News
            </Link>
            <Link
              href="/live"
              className="px-3 py-2 hover:bg-purple-600 rounded cursor-pointer text-sm font-medium"
            >
              Live Now
            </Link>
          </div>
        </section>
      </header>

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
      <div
        className={`lg:hidden fixed top-4 right-4 flex items-center gap-4 z-50 transition-transform duration-300 ${
          showMobileToggle ? "translate-y-0" : "-translate-y-20"
        }`}
      >
        {" "}
        {session && (
          <button
            onClick={toggleDrawer(true)}
            className="rounded-full focus:ring-2 focus:ring-cyan-400"
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
          onClick={() => setShowNav(!showNav)}
          className="text-white text-3xl"
          aria-label="Toggle navigation"
        >
          {showNav ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {showNav && (
        <nav

          className="fixed inset-0  bg-black bg-opacity-95 flex flex-col text-black p-5 z-[50] mt-11 overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {/* Small screen search */}
          <form
            onSubmit={handleSearch}
            className="relative flex items-center w-full max-w-lg mx-auto top-0 z-40"
            role="search"
            aria-label="Site Search"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the latest..."
              className="px-3 py-3 pr-20 rounded-md shadow-2xl bg-white text-black focus:outline-none w-full"
              aria-label="Search input"
            />

            {/* Search Button inside */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black px-3 py-2 rounded-md text-white font-semibold transition"
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
              <Link href="/sports" onClick={() => setShowNav(false)}>
                Sports news
              </Link>
            </li>
            <li>
              <Link href="/live" onClick={() => setShowNav(false)}>
                Live Now
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
         {/* Regions Links for mobile */}
<ul className="grid items-center text-white gap-6">
  {regions.map((region) => (
    <li key={region.name} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent nav from closing
          toggleDropdown(region.name);
        }}
        className="flex items-center gap-1 hover:text-gray-300 font-semibold"
      >
        {region.emoji} {region.name}{" "}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            openDropdown === region.name ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Animated Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          openDropdown === region.name ? "max-h-96 mt-2" : "max-h-0"
        } text-white rounded shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          {countriesByRegion[region.name].map((country) => (
            <li key={country}>
              <button
                onClick={() => {
                  const searchQuery = `${region.name} ${country}`;
                  setQuery(searchQuery); 
                  router.push(`/search?q=${encodeURIComponent(searchQuery.toLowerCase())}`);
                  setShowNav(false); 
                  setOpenDropdown(null); 
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 text-white"
              >
                {country}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </li>
  ))}
</ul>


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
                {/* <Link
                  href="/auth/signin"
                  onClick={() => setShowNav(false)}
                  className="py-3 w-3/4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:bg-cyan-500 text-white font-medium text-center"
                >
                  Sign In
                </Link> */}
              </>
            )}
          </div>
        </nav>
      )}
      
    </main>
  );
};

export default ProfileDropdownNavbar;
