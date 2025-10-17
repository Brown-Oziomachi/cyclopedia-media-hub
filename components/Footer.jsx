import Link from "next/link";
import React from "react";

const Footer = () => {

 

  return (
    <footer className="py-10 text-gray-500 text-sm bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-start lg:items-start gap-8">
        {/* Left: Site links */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4"> The Cyclopedia</h2>

          <ul className="space-y-2 font-mono">
            <li>
              <a href="/politics" className="hover:text-purple-400 transition">
                Politics
              </a>
            </li>
            <li>
              <a href="/religion" className="hover:text-purple-400 transition">
                Religion
              </a>
            </li>
            <li>
              <a href="/history" className="hover:text-purple-400 transition">
                History
              </a>
            </li>
            <li>
              <a href="/science" className="hover:text-purple-400 transition">
                Science
              </a>
            </li>
            <li>
              <a href="/media" className="hover:text-purple-400 transition">
                Media
              </a>
            </li>
            <li>
              <a href="/sports" className="hover:text-purple-400 transition">
                Sports News
              </a>
            </li>
            <li>
              <a href="/global" className="hover:text-purple-400 transition">
                Latest News
              </a>
            </li>
          </ul>
        </div>

        {/* Middle: Continental links */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Continental</h2>
          <ul className="space-y-2 font-mono">
            <li>
              <a href="/africa" className="hover:text-purple-400 transition">
                Africa
              </a>
            </li>
            <li>
              <a href="/asia" className="hover:text-purple-400 transition">
                Asia
              </a>
            </li>
            <li>
              <a href="/europe" className="hover:text-purple-400 transition">
                Europe
              </a>
            </li>
            <li>
              <a href="/america" className="hover:text-purple-400 transition">
                America
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Other sections or quick links */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Explore</h2>
          <ul className="space-y-2 font-mono">
            <li>
              <a
                href="/technology"
                className="hover:text-purple-400 transition"
              >
                Technology
              </a>
            </li>
            <li>
              <a href="/education" className="hover:text-purple-400 transition">
                Education
              </a>
            </li>
            <li>
              <a href="/art" className="hover:text-purple-400 transition">
                Art & Culture
              </a>
            </li>
            <li>
              <a href="/health" className="hover:text-purple-400 transition">
                Health
              </a>
            </li>
            <li>
              <a
                href="/philosophy"
                className="hover:text-purple-400 transition"
              >
                Philosophy
              </a>
            </li>
            <li>
              <a href="/nigeria" className="hover:text-purple-400 transition">
                Nigeria
              </a>
            </li>
            <li>
              <a
                href="/africacont"
                className="hover:text-purple-400 transition"
              >
                Africa
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 font-mono">
            <li>
              <a href="/about" className="hover:text-purple-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-purple-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/newsletter"
                className="hover:text-purple-400 transition"
              >
                Newsletter
              </a>
            </li>
            <li>
              <Link
                href="https://thecyclopedia.substack.com/subscribe"
                className="hover:text-purple-400 transition"
              >
                Support
              </Link>
            </li>
            <li>
              <a
                href="/feedback"
                className="hover:text-purple-400 transition"
              >
                FeedBack
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/">
          <img src="/hid.png" alt="logo" className="h-20 w-20 mx-auto mb-3" />
        </Link>
        <p>
          &copy; {new Date().getFullYear()} The Cyclopedia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
