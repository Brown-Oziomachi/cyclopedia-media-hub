"use client";
import Link from "next/link";
import { useState } from "react";

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        setMessage("🎉 Thanks for subscribing! Please check your email.");
        setFormData({ firstName: "", lastName: "", email: "" });
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* LEFT SIDE: Text */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold text-center">“Stay Informed. Stay Ahead.”</h1>
          <h1 className="mt-10">
            “Cyclopedia brings you carefully researched, unbiased insights into{" "}
            <Link href="/politics" className="font-black">
              Politics,
            </Link>{" "}
            technology, culture, and hidden truths — delivered straight to your
            inbox. <br />
            <br /> We go beyond the noise and headlines to uncover the stories
            that matter, giving you clear analysis, deeper context, and fresh
            perspectives you won’t find anywhere else. <br />
            <br /> Subscribe today and join a community that values truth,
            knowledge, and awareness in a world overflowing with
            misinformation.”
          </h1>
        </div>

        {/* RIGHT SIDE: Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 max-w-md mx-auto p-6 bg-white shadow rounded-2xl space-y-4"
        >
          <h2 className="text-xl font-semibold text-center mt-4 lg:mt-0">
            Subscribe to our Newsletter
          </h2>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>

          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
