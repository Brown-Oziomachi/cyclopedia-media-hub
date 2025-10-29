
"use client";

import { useState } from "react";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import { LoaderCircle, ThumbsUp, Mail, Phone, MapPin, MessageCircle, Send, Building2, Clock, Globe } from "lucide-react";
import ChatDropdown from "@/components/Chat";
import Link from "next/link";

const valSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  number: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactPage() {
  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await valSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      setProcessing(true);

      // Firebase Database Integration
      const docData = {
        name: formValues.name,
        tel: formValues.number,
        email: formValues.email,
        address: formValues.address,
        message: formValues.message,
        timestamp: new Date().toLocaleDateString(),
      };

      await addDoc(collection(db1, "clients Contacts"), docData);
      
      setModalVisibility(true);
      setFormValues({
        name: "",
        number: "",
        email: "",
        address: "",
        message: "",
      });
    } catch (err) {
      if (err.inner) {
        // Validation errors
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        // Firebase errors
        console.error("Firebase Error:", err.code, err.message);
        alert(`Error: ${err.message}`);
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 lg:mt-40 mt-10 bg-[#0c0b0bfa]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 rounded-full px-4 py-2 mb-6">
            <MessageCircle
              size={18}
              className="text-purple-600 dark:text-purple-400"
            />
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Let's Start a Conversation
          </h1>
          <p className="text-lg md:text-xl opacity-80  mx-auto leading-relaxed">
            Whether you have a question, feedback, or a partnership opportunity
            — <br />
            we're here to listen and help you discover the truth.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Side - Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Info Card */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/hid.png"
                  alt="The Cyclopedia"
                  className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur"
                />
                <div>
                  <h2 className="text-2xl font-bold">The Cyclopedia</h2>
                  <p className="text-sm opacity-90">Truth. Light. Clarity.</p>
                </div>
              </div>

              <p className="leading-relaxed opacity-95">
                A trusted platform for curated insights, investigative
                journalism, and evidence-based information. Join us in building
                a global system of knowledge and transparency.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="bg-[#0c0b0bfa] text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Phone
                      size={24}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <a
                      href="tel:+2348142995114"
                      className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                    >
                      +234 814 299 5114
                    </a>
                    <p className="text-sm opacity-60 mt-1">
                      Mon-Fri, 9AM - 6PM WAT
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#0c0b0bfa] text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <Mail
                      size={24}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:cyclopedinews@gmail.com"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium break-all"
                    >
                      cyclopedinews@gmail.com
                    </a>
                    <p className="text-sm opacity-60 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-[#0c0b0bfa] text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <MapPin
                      size={24}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="opacity-80">Kano, Nigeria</p>
                    <p className="text-sm opacity-60 mt-1">West Africa</p>
                  </div>
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-[#0c0b0bfa] text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <MessageCircle
                      size={24}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Live Chat</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                        Chat with our team
                      </span>
                    </div>
                    <p className="text-sm opacity-60 mt-1">
                      Instant support available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-[#0c0b0bda] text-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Clock
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
                <h3 className="font-semibold">Business Hours</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="opacity-70">Monday - Friday</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-70">Saturday</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-70">Sunday</span>
                  <span className="font-semibold text-red-500">Closed</span>
                </div>
                <p className="text-xs opacity-60 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                  West Africa Time (WAT)
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#0c0b0bfa] text-white rounded-2xl p-8 lg:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
                  <p className="opacity-70">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formValues.name}
                      onChange={handleChange}
                      placeholder="thecyclopedia reader"
                      className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-800 transition outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="number"
                      type="text"
                      value={formValues.number}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-800 transition outline-none"
                    />
                    {errors.number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="thecyclopediareader@example.com"
                      className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-800 transition outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="address"
                      type="text"
                      value={formValues.address}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-800 transition outline-none"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formValues.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-800 transition outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <LoaderCircle className="animate-spin" size={20} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-center opacity-60">
                  By submitting this form, you agree to our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-16 lg:py-24 bg-[#0c0b0bfa] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Work With Us?
            </h2>
            <p className="opacity-70 text-lg">
              The Cyclopedia is committed to transparency, accuracy, and
              meaningful connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-[#0c0b0bda] text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                <Building2
                  size={32}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Trusted Platform</h3>
              <p className="opacity-70">
                A reliable source for investigative journalism and curated
                insights.
              </p>
            </div>

            <div className="text-center p-6 bg-[#0c0b0bda] text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                <Globe
                  size={32}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Reach</h3>
              <p className="opacity-70">
                Connecting readers and partners across the world.
              </p>
            </div>

            <div className="text-center p-6 bg-[#0c0b0bda] text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                <MessageCircle
                  size={32}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Responsive Support</h3>
              <p className="opacity-70">
                Quick responses and dedicated assistance for all inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {modalVisibility && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 text-center shadow-2xl max-w-md w-full">
            <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <ThumbsUp
                className="text-green-600 dark:text-green-400"
                size={40}
              />
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Message Sent Successfully!
            </h2>
            <p className="opacity-70 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setModalVisibility(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}