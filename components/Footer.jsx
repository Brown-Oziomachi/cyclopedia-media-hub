"use client";

import Link from "next/link";
import { useState } from "react";
import { MailCheck } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Subscribed!");
        setEmail("");
      } else {
        alert(data.error || "Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error. Please try again.");
    }
  };

  return (
    <footer className="bg-black text-white py-14 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <img src="/logo.png" alt="Webwiz Logo" className="w-28 mb-4" />
          <p className="text-gray-400 text-sm">
            &copy; 2025 Webwiz Creation. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <Link
              href="https://www.facebook.com/profile.php?id=61575479727679"
              className="text-gray-300 hover:text-white"
            >
              Facebook
            </Link>
            <Link
              href="http://www.linkedin.com/in/brownoziomachi72a5a3229"
              className="text-gray-300 hover:text-white"
            >
              LinkedIn
            </Link>
            <Link
              href="https://www.instagram.com/webwiz_creation_webdevelopers/"
              className="text-gray-300 hover:text-white"
            >
              Instagram
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            Email:{" "}
            <span className="text-gray-300">webwizcreation.web@gmail.com</span>
          </p>
          <p className="mt-2">
            Phone: <span className="text-gray-300">+234 8142 995114</span>
          </p>
          <p className="mt-2 text-gray-400">Address: FCT Abuja City, Nigeria</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe to Updates</h3>
          {/* Mailchimp subscription form */}
      <form
        action="https://app.us13.list-manage.com/subscribe/post?u=43a30bccc98acfbb16a52d1eb&amp;id=4f4f321a7e&amp;f_id=00bb5fe1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
      >
        <input
          type="email"
          name="EMAIL"
          placeholder="Your email"
          required
          className="flex-grow px-4 py-3 rounded-md bg-gray-900 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
        </button>
      </form>
          <p className="text-sm text-gray-400 mt-3">
            Get exclusive tips and updates in your inbox.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mb-20 pt-6 text-center">
        <h4 className="text-md font-semibold mb-10">Quick Links</h4>
        <ul className="flex justify-center flex-wrap gap-6 text-sm text-gray-300">
          <li>
            <Link href="/privacypolicy" className="hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/termsofservices" className="hover:text-white">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
