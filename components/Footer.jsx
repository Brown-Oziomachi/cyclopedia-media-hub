"use client";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import React, {useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col ">
      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-400 py-10">
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-10 text-center lg:text-left">
          
          {/* Company Info */}
          <div>
            <img src="/logo.png" alt="Webwiz Logo" className="w-28 h-auto mx-auto lg:mx-0 mb-4" />
            <span>&copy; 2025 Webwiz Creation. All rights reserved.</span>
            <div className="mt-2">
              Follow us: 
              <span className="text-cyan-400 hover:underline ml-2">Twitter</span> | 
              <span className="text-cyan-400 hover:underline">LinkedIn</span> | 
              <span className="text-cyan-400 hover:underline">Instagram</span>
            </div>
          </div>
  
          {/* Contact Info */}
          <div className="space-x-5 grid grid-cols-1 lg:grid gap-4">
            <h3 className="text-lg font-semibold text-white mb-4 ">Contact Us</h3>
            <span>
              Email: <span className="text-cyan-400 hover:underline">webwizcreation.web@gmail.com</span>
            </span>
            <span>
              Phone: <span className="text-cyan-400 hover:underline">+234 8142 995114</span>
            </span>
            <span>Address: FCT Abuja City, Nigeria</span>
          </div>
  
          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <form
              className="flex justify-center lg:justify-start"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  alert(`Thank you for subscribing with ${email}!`);
                  setEmail('');
                } else {
                  alert('Please enter a valid email address.');
                }
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md border border-gray-600 focus:outline-none bg-gray-700 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className=" flex gap-2 px-4 py-2 bg-cyan-500 text-white rounded-r-md hover:bg-cyan-600 transition duration-300"
              >
                Subscribe
                <MailCheck />
              </button>
            </form>
            <span className="mt-4 text-sm">
              Join our newsletter for updates and exclusive insights.
            </span>
          </div>
        </div>
  
        {/* Quick Links Section */}
        <div className="container mx-auto px-6 lg:px-20 mt-10 text-center lg:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="flex flex-wrap justify-center lg:justify-start gap-4">
            <li>
              <Link href="/privacypolicy">
                <span className="text-cyan-400 hover:underline">Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link href="/termsofservices">
                <span className="text-cyan-400 hover:underline">Terms of Service</span>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <span className="text-cyan-400 hover:underline">FAQ</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
  </div>
  )
}  

export default Footer;
