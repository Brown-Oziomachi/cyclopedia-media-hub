import Link from "next/link";
import React from "react";
import RssSubscribeButton from "./RssSubscribeButton";

const Footer = () => {
  return (
    <footer className="py-10 text-gray-500 text-sm bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:flex lg:justify-between lg:items-start gap-8 mb-10">
          {/* Left: Site links */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">
              The Cyclopedia
            </h2>
            <ul className="space-y-2 font-mono">
              <li>
                <Link
                  href="/politics"
                  className="hover:text-purple-400 transition"
                >
                  Politics
                </Link>
              </li>
              <li>
                <Link
                  href="/religion"
                  className="hover:text-purple-400 transition"
                >
                  Religion
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="hover:text-purple-400 transition"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  href="/science"
                  className="hover:text-purple-400 transition"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href="/media"
                  className="hover:text-purple-400 transition"
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  href="/sports"
                  className="hover:text-purple-400 transition"
                >
                  Sports News
                </Link>
              </li>
              <li>
                <Link
                  href="/global"
                  className="hover:text-purple-400 transition"
                >
                  Latest News
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle: Continental links */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Continental</h2>
            <ul className="space-y-2 font-mono">
              <li>
                <Link
                  href="/africa"
                  className="hover:text-purple-400 transition"
                >
                  Africa
                </Link>
              </li>
              <li>
                <Link href="/asia" className="hover:text-purple-400 transition">
                  Asia
                </Link>
              </li>
              <li>
                <Link
                  href="/europe"
                  className="hover:text-purple-400 transition"
                >
                  Europe
                </Link>
              </li>
              <li>
                <Link
                  href="/america"
                  className="hover:text-purple-400 transition"
                >
                  America
                </Link>
              </li>
            </ul>
          </div>

          {/* Hidden on mobile, shown on lg */}
          <div className="hidden lg:block">
            <h2 className="text-white font-bold text-lg mb-4">Explore</h2>
            <ul className="space-y-2 font-mono">
              <li>
                <Link
                  href="/technology"
                  className="hover:text-purple-400 transition"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="hover:text-purple-400 transition"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link href="/art" className="hover:text-purple-400 transition">
                  Art & Culture
                </Link>
              </li>
              <li>
                <Link
                  href="/health"
                  className="hover:text-purple-400 transition"
                >
                  Health
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/philosophy"
                  className="hover:text-purple-400 transition"
                >
                  Philosophy
                </Link>
              </li> */}
              <li>
                <Link
                  href="/nigeria"
                  className="hover:text-purple-400 transition"
                >
                  Nigeria
                </Link>
              </li>
              <li>
                <Link
                  href="/african/continent"
                  className="hover:text-purple-400 transition"
                >
                  Africa
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 font-mono">
              <li>
                <Link
                  href="/about"
                  className="hover:text-purple-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-purple-400 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="hover:text-purple-400 transition"
                >
                  Report
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="hover:text-purple-400 transition"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="https://thecyclopedia.substack.com/subscribe"
                  className="hover:text-purple-400 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/pp-feedbacks"
                  className="hover:text-purple-400 transition"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/law-justice/find-lawyer"
                  className="hover:text-purple-400 transition"
                >
                  Find a lawyer
                </Link>
              </li>
              <li>
                <Link
                  href="/law-justice/find-lawyer/lawyer-directory/lawyer-registration-form"
                  className="hover:text-purple-400 transition"
                >
                  Be our lawyer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10 lg:hidden">
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Explore</h2>
            <ul className="space-y-2 font-mono">
              <li>
                <Link
                  href="/technology"
                  className="hover:text-purple-400 transition"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="hover:text-purple-400 transition"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link href="/art" className="hover:text-purple-400 transition">
                  Art & Culture
                </Link>
              </li>
              <li>
                <Link
                  href="/health"
                  className="hover:text-purple-400 transition"
                >
                  Health
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/philosophy"
                  className="hover:text-purple-400 transition"
                >
                  Philosophy
                </Link>
              </li> */}
              <li>
                <Link
                  href="/nigeria"
                  className="hover:text-purple-400 transition"
                >
                  Nigeria
                </Link>
              </li>
              <li>
                <Link
                  href="/african/continent"
                  className="hover:text-purple-400 transition"
                >
                  Africa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 font-mono">
              <li>
                <Link
                  href="/about"
                  className="hover:text-purple-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-purple-400 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="hover:text-purple-400 transition"
                >
                  Report
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="hover:text-purple-400 transition"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="https://thecyclopedia.substack.com/subscribe"
                  className="hover:text-purple-400 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/pp-feedbacks"
                  className="hover:text-purple-400 transition"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/law-justice/find-lawyer"
                  className="hover:text-purple-400 transition"
                >
                  Find a lawyer
                </Link>
              </li>
              <li>
                <Link
                  href="/law-justice/find-lawyer/lawyer-directory/lawyer-registration-form"
                  className="hover:text-purple-400 transition"
                >
                  Be our lawyer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center border-t border-gray-800 pt-6">
          <Link href="/">
            <img
              src="/truth.png"
              alt="logo"
              className="h-16 w-16 mx-auto mb-3"
            />
          </Link>
          <p>
            &copy; {new Date().getFullYear()} The Cyclopedia. All rights
            reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <Link
              href="/privacy-policy"
              className="text-gray-600 hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="/terms-of-services"
              className="text-gray-500 hover:text-white transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
