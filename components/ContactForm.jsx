"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("Subscribing...");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message);
        setEmail("");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        setStatus(data.error || "Failed to subscribe.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("Failed to subscribe.");
    }
  };

  return (
    <div className="relative bg-gray-100 p-8 rounded-xl shadow-md max-w-5xl mx-auto lg:mt-40 max-md:mt-15 grid lg:grid-cols-2 gap-8 items-center">
      {/* LEFT - Text */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Stay updated with Cyclopedia
        </h2>
        <p className="text-gray-700 mb-4">
          Subscribe to our newsletter to get the latest news, insights, and
          exclusive content straight to your inbox. Join thousands of readers
          staying informed with Cyclopedia.
        </p>
        <p className="text-gray-600 text-sm">No spam. Unsubscribe anytime.</p>
      </div>

      {/* RIGHT - Form */}
      <div>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-6 py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
        {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-down">
          Thanks for subscribing! 🎉
        </div>
      )}
    </div>
  );
}
