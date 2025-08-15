import React from "react";

const Footer = () => {
  return (
    <footer className="py-10 text-gray-500 text-sm bg-black border-t border-gray-800 items-center justify-center">
      <div className="max-w-xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        {/* Left: Site links */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Cyclopedia</h2>
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
              <a href="/global" className="hover:text-purple-400 transition">
                News
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Continental links */}
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
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-center">
        <img src="/hid.png" alt="logo" className="h-20 w-20 mx-auto mb-3" />
        <p>&copy; 2025 Cyclopedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
