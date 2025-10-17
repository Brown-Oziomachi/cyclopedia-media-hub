"use client";
import Link from "next/link";
import { useState } from "react";

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          "🎉 Subscription Successful. You’re now part of The Cyclopedia Newsroom — delivering truth, insight, and independence every day. Expect timely updates and breaking news delivered straight to your inbox."
        );
        setFormData({ firstName: "", email: "" });
      } else {
        setMessage(` Error: ${data.error}`);
      }
    } catch (err) {
      setMessage(" Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 mt-20 lg:mt-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white rounded-3xl shadow-2xl p-10">
        {/* LEFT SIDE: Text */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Join <span className="text-yellow-300">The Cyclopedia</span>{" "}
            Newsletter
          </h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Original, independent reporting — from{" "}
            <span className="font-semibold">Politics</span> to{" "}
            <span className="font-semibold">Technology</span> and{" "}
            <span className="font-semibold">Culture</span> — delivered weekly to
            your inbox. Stay informed with facts, not noise.
          </p>

          <Link
            href="https://thecyclopedia.substack.com/subscribe"
            className="inline-block mt-4 text-sm font-medium bg-white text-purple-700 px-5 py-2 rounded-lg hover:bg-yellow-300 transition-all duration-300"
          >
            Support Independent Journalism
          </Link>
        </div>

        {/* RIGHT SIDE: Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 w-full max-w-md bg-white text-gray-800 p-8 rounded-2xl shadow-lg space-y-4"
        >
          <h2 className="text-xl font-semibold text-center text-purple-700">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-sm text-center text-gray-500 mb-2">
            Get our latest stories straight to your inbox.
          </p>

          <input
            type="text"
            name="firstName"
            placeholder="Full Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-cyan-700 text-white font-medium py-3 rounded-lg transition-all duration-300"
          >
            {loading ? "Subscribing..." : "Subscribe Now"}
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-3 ${
                message.startsWith("🎉") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
