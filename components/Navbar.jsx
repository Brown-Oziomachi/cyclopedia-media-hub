"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogIn, ChevronRight, Menu, Search, X, ChevronDown, Twitter, Instagram, Youtube } from "lucide-react";
import { Drawer, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput"; // Assuming you have this component
import ThemeToggle from "./ThemeToggle";
import StatusModal from "@/components/StatusModal";
import LiveClock from "@/components/LiveClock";
import ViewMoreSearchPopup from "./ViewIcon";
import UserProfileDropdown from "./UserProfile";
import UserProfileButton from "./UserProfile";


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
  const statusRef = useRef(null)
  const showRegionsDropdownRef = useRef(null)

 const statusItems = [
    { type: "image", url: "/demo-status1.jpg" },
    { type: "video", url: "/demo-status2.mp4" },
    { type: "audio", url: "/demo-status3.mp3" },
  ];

  const toggleDropdown = (regionName) => {
    setOpenDropdown(openDropdown === regionName ? null : regionName);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showRegionsDropdownRef.current &&
        showRegionsDropdownRef.current.contains(event.target)
      ) {
        setShowRegionsDropdown(false);
      }
    }
    if (showRegionsDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showRegionsDropdown])

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
      setQuery("");
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <div ref={statusRef} className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/hid.png"
                alt="Cyclopedia Logo"
                width={30}
                height={30}
                className="rounded-full brightness-125 "
              />
            </Link>
            <Link href="/">
              <h1
                className=" font-bold text-xl lg:text-3xl cursor-pointer transition rounded-sm "
                onClick={() => setShowNav(false)}
              >
                THE CYCL
                <Link href="/about">
                  <span className="bg-white rounded-full w-0 h-0 mask-b-from-20% hover:invisible">
                    👁️
                  </span>
                </Link>
                PEDIA
              </h1>
            </Link>
            <span />
            <ThemeToggle />
            <ViewMoreSearchPopup />
          </div>
          <LiveClock />
          <div className="ml-10 hover:bg-red-600 border border-black hover:text-white px-20 py-2 max-lg:hidden">
            <Link href="/newsletter" className="text-gray-400  mb-4 hover:text-white">
              Newsletter
            </Link>
            </div>
          <div className="ml-auto -mt-5 max-lg:hidden">
            <UserProfileButton setShowNavOpen={setShowNav} />{" "}
          </div>

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
                className="px-4 py-2 hover:bg-purple-700 whitespace-nowrap text-sm font-semibold transition"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-2 mt-5">
            <Link
              href="/politics"
              className="px-3 py-2 hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Politics
            </Link>
            <Link
              href="/sex-education"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Sex education
            </Link>
            <Link
              href="/religion"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Religion
            </Link>
            <Link
              href="/history"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              History
            </Link>
            <Link
              href="/science"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Science
            </Link>
            <Link
              href="/media"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Media
            </Link>
            <Link
              href="/education"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Education
            </Link>
            <Link
              href="/health"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Health
            </Link>
            <Link
              href="/art"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Art + Culture
            </Link>
            <Link
              href="/technology"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Technology
            </Link>
            <Link
              href="/sports"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Sports News
            </Link>
            <Link
              href="/live"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Live Now
            </Link>
            <Link
              href="/african/continent"
              className="px-3 py-2  hover:bg-red-600 rounded cursor-pointer text-sm font-medium"
            >
              Africa
            </Link>
          </div>
        </section>
      </header>

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
          className="t text-3xl"
          aria-label="Toggle navigation"
        >
          {showNav ? <X /> : <Menu />}
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

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black px-3 py-2 rounded-md text-white font-semibold transition"
            >
              <Search />
            </button>
          </form>
          <UserProfileButton setShowNavOpen={setShowNav} />{" "}
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
              <Link href="/sex-education" onClick={() => setShowNav(false)}>
                Sex Education
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
            <li>
              <Link href="/nigeria" onClick={() => setShowNav(false)}>
                Nigeria
              </Link>
            </li>
            <li>
              <Link href="/african/continent" onClick={() => setShowNav(false)}>
                Africa
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
          <Link
            href="https://thecyclopedia.substack.com/subscribe"
            onClick={() => setShowNav(false)}
            className="text-gray-400 text-sm mb-4"
          >
            Substack | Subscription
          </Link>
          <hr className="my-2 border-gray-600" />
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
                            router.push(
                              `/search?q=${encodeURIComponent(
                                searchQuery.toLowerCase()
                              )}`
                            );
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
                <h1 className="py-3 text-white text-xl text-center font-bold">
                  __THE CYCLOPEDIA
                </h1>
                <p className=" text-white font-medium text-center">
                  The Cyclopedia was founded out of a need for honest inquiry
                  and open minds. We began as a small community sharing
                  unconventional insights and evolved into a platform for
                  collective awareness. Our journey continues — and you’re part
                  of it.
                </p>

                <div className="flex space-x-5 mb-10">
                  <a
                    href="https://x.com/cyclopedia_news?t=yU4JjJPlLO7Zp9GVoEaF5A&s=09"
                    target="_self"
                    className="text-white hover:scale-110 transition-transform"
                  >
                    <Twitter size={32} />
                  </a>

                  <a
                    href="https://www.instagram.com/cyclopedia_news?igsh=MThvdDEwa3c3aGpsMQ=="
                    target="_self"
                    className="text-pink-500 hover:scale-110 transition-transform"
                  >
                    <Instagram size={32} />
                  </a>

                  <a
                    href="https://www.youtube.com/@cyclopedia-media"
                    target="_self"
                    className="text-red-600 hover:scale-110 transition-transform"
                  >
                    <Youtube size={32} />
                  </a>
                </div>
                <div className="flex gap-10 items-center justify-around mb-20">
                  <a
                    className="bg-red-600 text-white font-black px-5 py-2 rouded-lg"
                    href="/newsletter"
                  >
                    Join Us
                  </a>
                  <a
                    className="bg-blue-600 text-white font-black px-5 py-2 rouded-lg"
                    href="https://thecyclopedia.substack.com/subscribe"
                  >
                    Support Us
                  </a>
                </div>
              </>
            )}
          </div>
        </nav>
      )}
    </main>
  );
};

export default ProfileDropdownNavbar;
