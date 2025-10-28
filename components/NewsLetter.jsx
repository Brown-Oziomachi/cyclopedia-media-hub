"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Sparkles,
  TrendingUp,
  Shield,
  Bell,
  CheckCircle,
  Gift,
  Zap,
} from "lucide-react";

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
          "🎉 Welcome to The Cyclopedia! Check your inbox for a confirmation email and get ready for premium insights delivered weekly."
        );
        setFormData({ firstName: "", email: "" });
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const benefits = [
    {
      icon: "✨",
      title: "Exclusive Content",
      desc: "Access stories before they go public",
    },
    {
      icon: "📈",
      title: "Weekly Insights",
      desc: "Deep dives into trending topics",
    },
    {
      icon: "🛡️",
      title: "No Spam, Ever",
      desc: "Unsubscribe anytime with one click",
    },
    {
      icon: "🎁",
      title: "Subscriber Perks",
      desc: "Early access to events & interviews",
    },
  ];

  const stats = [
    { number: "3,000+", label: "Active Readers" },
    { number: "41%", label: "Open Rate" },
    { number: "Weekly", label: "Fresh Content" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>

      <div className="relative max-w-7xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4 lg:mt-45 mt-20">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            Join 50,000+ Informed Readers
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
            Stay Ahead of the
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              News Cycle
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get the stories that matter, before everyone else. No fluff, just
            facts.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT SIDE: Benefits & Social Proof */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-3xl font-bold text-cyan-400">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Bell className="w-6 h-6 text-cyan-400" />
                What You'll Get
              </h3>
              <div className="grid gap-4">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group cursor-pointer"
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-4xl">💬</div>
                <div>
                  <h1 className="text-lg font-bold">
                    The Cyclopedia is a Game Changer for News Consumption
                  </h1>
                  <p className="text-white italic mb-2">
                    I've been using The Cyclopedia for the past few weeks and
                    I'm genuinely impressed with the platform. The design is
                    clean and intuitive, making it easy to navigate through
                    different news categories and regions. What really stands
                    out is how the team has organized content by regions and
                    topics.{" "}
                    <span className="text-cyan-400 underline">
                      <Link href="https://cyclopedia-media-hub.vercel.app/profile/view?id=AsXfyRgesjNIVXbLmK7UNtsCoOB2">
                        Read More
                      </Link>
                    </span>
                  </p>
                  <p className="text-sm text-gray-300">
                    — Marvelous Bekky, Subscriber since 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Subscription Form */}
          <div className="lg:sticky lg:top-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 transform hover:scale-[1.02] transition-transform"
            >
              {/* Form Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Subscribe Now
                </h2>
                <p className="text-gray-600">
                  Join our community of informed readers. It's free!
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John Doe"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Get Free Updates
                    </>
                  )}
                </button>
              </div>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium text-center ${
                    message.startsWith("🎉")
                      ? "bg-green-100 text-green-800 border-2 border-green-300"
                      : "bg-red-100 text-red-800 border-2 border-red-300"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Privacy Note */}
              <p className="text-xs text-center text-gray-500">
                🔒 We respect your privacy. Unsubscribe anytime.
                <br />
                No spam, no selling your data. Ever.
              </p>

              {/* Support Link */}
              <Link
                href="https://thecyclopedia.substack.com/subscribe"
                className="block text-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
              >
                Want to support us? Become a paid subscriber →
              </Link>
            </form>
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Instant Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
