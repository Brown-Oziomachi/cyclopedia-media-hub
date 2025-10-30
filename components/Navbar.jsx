"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Menu,
  Search,
  X,
  ChevronDown,
  Twitter,
  Instagram,
  Youtube,
  User,
  LogOut,
  CircleUser,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LiveClock from "@/components/LiveClock";
import ViewMoreSearchPopup from "./ViewIcon";
import UserProfileButton from "./UserProfile";
import { useAuth } from "@/components/AuthProvider";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import NotificationBell from "./NotificationBell";
import RssSubscribeButton from "./RssSubscribeButton";

const ProfileDropdownNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { user } = useAuth();
  const [showRegionsDropdown, setShowRegionsDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [showMobileToggle, setShowMobileToggle] = useState(true);
  const [lastScrollMobile, setLastScrollMobile] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isDropdownOpen = showNav || openDropdown !== null || showUserMenu;
  const statusRef = useRef(null);
  const showRegionsDropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const toggleDropdown = (regionName) => {
    setOpenDropdown(openDropdown === regionName ? null : regionName);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (
        showRegionsDropdownRef.current &&
        !showRegionsDropdownRef.current.contains(event.target)
      ) {
        setShowRegionsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (!isDropdownOpen) {
        setShowHeader(currentScroll < lastScroll || currentScroll < 50);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, isDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowMobileToggle(
        currentScroll < lastScrollMobile || currentScroll < 50
      );
      setLastScrollMobile(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollMobile]);

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
    setShowNav(false);
    const searchQuery = query;
    setQuery("");
    router.push(
      `/search?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      setShowNav(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { text: "About us", url: "/about" },
    { text: "Contact us", url: "/contact" },
  ];

  const countriesByRegion = {
    Africa: [
      "Nigeria",
      "Kenya",
      "South Africa",
      "Egypt",
      "Ghana",
      "Mali",
      "Niger",
      "Somalia",
    ],
    Asia: ["Israel", "Iraq", "India", "Iran"],
    America: ["USA", "Canada", "Brazil", "Mexico"],
    Europe: ["UK", "Germany", "France", "Italy"],
  };

  const regions = [
    { name: "Africa", url: "/africa" },
    { name: "Asia", url: "/asia" },
    { name: "America", url: "/america" },
    { name: "Europe", url: "/europe" },
  ];

  const categories = [
    { name: "Politics", url: "/politics" },
    { name: "Latest News", url: "/global" },
    { name: "Law + Justice", url: "/law-justice" },
    { name: "Sports + News", url: "/sports" },
    { name: "Sex + Education", url: "/sex-education" },
    { name: "Religion", url: "/religion" },
    { name: "History", url: "/history" },
    { name: "Science", url: "/science" },
    { name: "Media", url: "/media" },
    { name: "Education", url: "/education" },
    { name: "Health", url: "/health" },
    { name: "Art + Culture", url: "/art" },
    { name: "Technology", url: "/technology" },
    { name: "Sports News", url: "/sports" },
    { name: "Live Now", url: "/live" },
    { name: "Africa", url: "/african/continent" },
  ];

  const userEmail = user?.email || "";
  const userName = user?.name || userEmail.split("@")[0];
  const userInitial = userName.charAt(0).toUpperCase();
  const displayImage = user?.profileImage;

  return (
    <main className="fixed top-0 left-0 w-full z-50">
      <header
        className={`w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } shadow-2xl border-b border-gray-800`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <LiveClock />
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/newsletter"
                className="text-xs uppercase tracking-wider hover:text-cyan-400 transition-colors font-semibold"
              >
                Newsletter
              </Link>
              <span className="text-gray-600">|</span>
              <a
                href="https://thecyclopedia.substack.com/subscribe"
                className="text-xs uppercase tracking-wider hover:text-cyan-400 transition-colors font-semibold"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Section */}
            <div ref={statusRef} className="flex items-center gap-3">
              <h1 className="font-black text-2xl lg:text-4xl cursor-pointer transition-all hover:tracking-wider duration-300">
                <Link
                  href="/"
                  onClick={() => setShowNav(false)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  THE CYCL
                </Link>
                <Link
                  href="/about"
                  className="inline-block hover:scale-125 transition-transform mx-1"
                >
                  <span className="bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full px-2 py-1 text-sm">
                    👁️
                  </span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setShowNav(false)}
                  className="hover:text-purple-400 transition-colors"
                >
                  PEDIA
                </Link>
              </h1>
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <ViewMoreSearchPopup />
                <NotificationBell />
                <RssSubscribeButton variant="icon" />
              </div>

              {/* Regions Dropdown */}
              <div className="relative" ref={showRegionsDropdownRef}>
                <button
                  onClick={() => setShowRegionsDropdown((v) => !v)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg shadow-lg font-semibold text-sm transition-all duration-300 hover:shadow-cyan-500/50"
                >
                  Regions{" "}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showRegionsDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showRegionsDropdown && (
                  <div className="absolute right-0 bg-gray-900 shadow-2xl rounded-lg mt-2 w-56 border border-gray-700 z-50 overflow-hidden">
                    {regions.map((region) => (
                      <Link
                        key={region.name}
                        href={region.url}
                        className="block px-4 py-3 text-gray-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 font-medium"
                        onClick={() => setShowRegionsDropdown(false)}
                      >
                        {region.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* User Profile Section - Desktop */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-4 py-2 bg-red-600 hover:to-purple-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                  >
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={userName}
                        className="w-9 h-9 rounded-full border-2 border-white object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-white">
                        {userInitial}
                      </div>
                    )}
                    <span className="font-semibold text-sm max-w-[100px] truncate">
                      {userName}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50">
                      <div className="px-4 py-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-b border-gray-700">
                        <p className="font-semibold text-white">{userName}</p>
                        <p className="text-xs text-gray-400 truncate">
                          {userEmail}
                        </p>
                      </div>
                      <Link
                        href="/profiles"
                        className="block px-4 py-3 hover:bg-gray-800 transition-colors text-gray-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-3 hover:bg-gray-800 transition-colors text-gray-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 hover:bg-red-600/20 transition-colors text-red-400 border-t border-gray-700 font-semibold flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-6 py-2.5 text-white rounded-full font-semibold transition-all duration-300 shadow-lg "
                >
                  <CircleUser size={38} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <section className="hidden lg:block bg-[#0c0b0bfa] backdrop-blur-md border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <nav className="flex gap-2 overflow-x-auto no-scrollbar">
                {navItems.map((item) => (
                  <Link
                    key={item.text}
                    href={item.url}
                    className="px-4 py-2 hover:bg-purple-600 rounded-lg whitespace-nowrap text-sm font-semibold transition-all duration-200"
                  >
                    {item.text}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 11).map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.url}
                    className="px-3 py-1.5 text-xs font-medium hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 rounded-md transition-all duration-200 whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* Mobile Header Controls */}
      <div
        className={`lg:hidden fixed top-4 right-4 left-4 flex items-center justify-between z-50 transition-transform duration-300 bg-[#0c0b0bfa] backdrop-blur-sm rounded-lg px-2 py-2 border border-gray-700 ${
          showMobileToggle ? "translate-y-0" : "-translate-y-20"
        }`}
      >
        {/* Left side - Logo for mobile */}
        <Link href="/" className="flex items-center gap-1 flex-shrink-0">
          <Image
            src="/hid.png"
            alt="Cyclopedia Logo"
            width={24}
            height={24}
            className="rounded-full brightness-125"
          />
          <h1 className="font-bold text-white whitespace-nowrap text-lg">
            THE CYCL<span className="text-cyan-400">👁️</span>PEDIA
          </h1>
        </Link>

        {/* Right side - Controls */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <div className="scale">
            <ThemeToggle />
          </div>
          <div className="scale">
            <ViewMoreSearchPopup />
          </div>
          <div className="scale">
            <NotificationBell setShowNav={setShowNav} />
          </div>
          <div className="scale">
            <RssSubscribeButton variant="icon" />
          </div>
          <button
            onClick={() => setShowNav(!showNav)}
            className="text-white bg-gradient-to-r from-purple-600 to-cyan-600 p-1 rounded-lg ml-0.5"
            aria-label="Toggle navigation"
          >
            {showNav ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showNav && (
        <nav className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col text-white p-6 z-[50] pt-20 overflow-y-auto">
          {/* Close button and Sign In/Out at top */}
          <div className="absolute top-6 left-6"></div>
          <div className="absolute top-6 right-6 flex items-center gap-3">
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-white bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 rounded-lg shadow-lg hover:from-red-700 hover:to-pink-700 transition-all flex items-center gap-2 font-semibold text-sm"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setShowNav(false)}
                className="text-white px-4 py-2 rounded-lg shadow-lg hover:from-purple-700 hover:to-cyan-700 transition-all flex items-center gap-2 font-semibold text-sm"
              >
                <CircleUser size={38} />
              </Link>
            )}
            <button
              onClick={() => setShowNav(false)}
              className="text-white bg-gradient-to-r from-red-600 to-pink-600 p-2 rounded-lg shadow-lg hover:from-red-700 hover:to-pink-700 transition-all"
              aria-label="Close navigation"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative flex items-center w-full mb-6 mt-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              placeholder="Search the latest..."
              className="px-4 py-3 pr-12 rounded-lg shadow-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full border border-gray-700"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 bg-gradient-to-r from-purple-600 to-cyan-600 px-3 py-2 rounded-md text-white font-semibold transition-all hover:shadow-lg"
            >
              <Search />
            </button>
          </div>

          <ul className="space-y-4 font-semibold">
            <UserProfileButton setShowNavOpen={setShowNav} />
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={cat.url}
                  onClick={() => setShowNav(false)}
                  className="block hover:text-cyan-400 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-6 border-gray-700" />

          <ul className="space-y-4">
            {regions.map((region) => (
              <li key={region.name}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(region.name);
                  }}
                  className="flex items-center gap-2 hover:text-cyan-400 font-semibold transition-colors"
                >
                  {region.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === region.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === region.name ? "max-h-96 mt-2" : "max-h-0"
                  }`}
                >
                  <ul className="pl-4 space-y-2">
                    {countriesByRegion[region.name].map((country) => (
                      <li key={country}>
                        <button
                          onClick={() => {
                            const searchQuery = `${region.name} ${country}`;
                            router.push(
                              `/search?q=${encodeURIComponent(
                                searchQuery.toLowerCase()
                              )}`
                            );
                            setShowNav(false);
                            setOpenDropdown(null);
                          }}
                          className="text-gray-400 hover:text-white transition-colors"
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

          <hr className="my-6 border-gray-700" />

          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.text}
                href={item.url}
                onClick={() => setShowNav(false)}
                className="hover:text-cyan-400 transition-colors font-semibold"
              >
                {item.text}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex gap-4 justify-center">
              <a
                href="https://x.com/cyclopedia_news"
                className="text-cyan-400 hover:scale-110 transition-transform"
              >
                <Twitter size={28} />
              </a>
              <a
                href="https://www.instagram.com/cyclopedia_news"
                className="text-pink-500 hover:scale-110 transition-transform"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://www.youtube.com/@cyclopedia-media"
                className="text-red-600 hover:scale-110 transition-transform"
              >
                <Youtube size={28} />
              </a>
            </div>

            {user ? (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg border border-gray-700">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={userName}
                    className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl border-2 border-cyan-400">
                    {userInitial}
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{userName}</p>
                  <p className="text-xs text-gray-400">{userEmail}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/newsletter"
                  onClick={() => setShowNav(false)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold px-6 py-3 rounded-lg text-center hover:shadow-lg transition-all"
                >
                  Join Us
                </Link>
                <a
                  href="https://thecyclopedia.substack.com/subscribe"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-6 py-3 rounded-lg text-center hover:shadow-lg transition-all"
                >
                  Support
                </a>
              </div>
            )}
          </div>
        </nav>
      )}
    </main>
  );
};

export default ProfileDropdownNavbar;
