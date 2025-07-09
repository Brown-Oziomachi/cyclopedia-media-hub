"use client";

import { Github, Instagram, Linkedin, LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ProfileCard = () => {
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true)
  const images = [
    "coderr.png",
    "bros.png",
    "men.png",
    "soft.jpg",
    "brown.jpg",
    "coded.jpg",
    "webman.jpg"
    // Add more image file names as needed
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // scroll by 80% of visible width

      if (direction === "left") {
        scrollRef.current.scrollTo({
          left: Math.max(scrollLeft - scrollAmount, 0),
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollTo({
          left: Math.min(scrollLeft + scrollAmount, scrollWidth),
          behavior: "smooth",
        });
      }
    }
  };
useEffect(() =>{
  const timer = setTimeout(() => {
    setLoading(false)
  }, 2000);

  return ()=> clearTimeout(timer)
},[])

  return (
     <>
     {loading ? (
            <div className="flex flex-col justify-center items-center h-screen space-x-10">
              <h1 className="text-4xl font-extrabold mb-6">
                <span className="text-green-600 mt-10"></span></h1>
              <LoaderCircle size={50} className="animate-spin text-green-600 mt-15 mx-auto" />
               <img
                src="logo.jpg"
                alt="My Logo"
                className="h-30 lg:h-30 animate-pulse absolute top-60 left-0 right-0 bottom-0 mx-auto"
              />
            </div>
          ) : (   
    <main className="z-50 max-w-5xl mx-auto bg-gray-400/5  rounded-xl shadow-xl mb-12 overflow-hidden text-white font-sans">
      {/* Header Section */}
      <div className="relative h-64 mt-17 rounded-b-xl overflow-hidden">
        <img
          src="/web21.jpg"
          alt="Header Background"
          className="w-full lg:h-150 brightness-75 opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            <span className="text-green-600">B</span>row<span className="text-green-600">n</span> <span className="text-green-600">C</span>od<span className="text-green-600">e</span>
          <p className="absolute text-sm font-light text-center">"The act of programming is the skill of controlling complexity"</p>
          </h1>
        </div>
      </div>
          <div className="absolute top-60 mx-auto max-md:right-45 mt-5"><img src="ng.png" alt="" className=" border-s-3 mx-auto h-10 w-10 ml-auto items-center justify-center"/>
          </div>
      <div>
        <img src="logo.jpg" alt="logo" className="absolute top-18 left-1 w-10 h-10"/>
      </div>
      {/* Profile Section */}
      <section className="p-8 lg:flex lg:justify-between lg:items-center space-y-8 lg:space-y-0">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md mx-auto lg:mx-0">
          <Link href="/blog">
          <img
            src="/web19.jpg"
            alt="Profile Picture"
            className="lg:ml-30 w-40 h-40 lg:h-52 lg:w-52 object-cover rounded-full border-3 border-s-green-600 border-r-green-600 shadow-lg transition-transform hover:scale-105"
          />
          </Link>
          <div className="mt-6 space-y-1">
            <h3 className="text-2xl font-serif font-semibold text-center">Brown Oziomachi. A</h3>
            <h4 className="cursor-pointer text-2xl border border-green-600 rounded-3xl bg-green-600 text-white lg:text-center font-semibold font-serif" 
            onClick={() => {
              const el = document.getElementById("contact-me");
               el.scrollIntoView({ behavior: "smooth" });
                    }}
                    >
                      Contact me ⬇
                    </h4>
                    <h1 className="text-green-600 border-t border-x mt-2 lg:text-center font-bold font-mono space-y-5">
                      Join My <a href="/community" className="text-green-600 underline hover:text-cyan-400 transition">Community</a>
                    </h1>
                    {/* Framer Motion Animations */}
                    <div className="flex items-center justify-center gap-5 mt-1"></div>
                      <motion.h4
                      className="text-sm px-5 rounded-md bg-green-600 text-white animate-pulse"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      whileHover={{ scale: 1.08, backgroundColor: "#059669" }}
                      >
                      <Link href="https://whatsapp.com/channel/0029Vb6BDcsJZg401UUoHA0T"
                        target="_self"
                        className="text-sm hover:text-orange-500 text-white"
                      >
                        WhatsApp Channel
                      </Link>
                      </motion.h4>
                      <hr className="border w-2/2" />
                      <motion.h4
                      className="text-sm text-gray-300 rounded-md bg-green-600 px-5 animate-pulse"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      whileHover={{ scale: 1.08, backgroundColor: "#059669" }}
                      >
                      <a href="https://facebook.com/groups/195029009448884/"
                        target="_self"
                        className="text-white hover:text-orange-500"
                      >
                        Facebook Group
                      </a>
                      </motion.h4>
                    </div>
                    <motion.h2
                      className="text-xl font-bold mt-2 text-gray-500"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 }}
                    >
                      Full-Stack Developer <span className="text-green-600">|</span> Python Developer <span className="text-green-600">|</span> Data Scientist
                    </motion.h2>
                    <motion.p
                      className="text-gray-400 mt-3 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                    >
                      Passionate about crafting scalable and intuitive user experiences with modern web
                      technologies.
                    </motion.p>
                    {/* New Feature: Quick Links */}
                    <motion.div
                      className="flex gap-4 mt-4 justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                    
                    </motion.div>
                  </div>
        {/* Social Links */}
        <div className="flex space-x-8 justify-center lg:justify-start text-2xl">
          <a
            href="http://www.linkedin.com/in/brownoziomachi72a5a3229"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
          <a
            href="https://www.instagram.com/webwiz_creation_webdevelopers/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram />
          </a>
          <a
            href="https://github.com/Brown-Oziomachi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="GitHub"
          >
            <Github />
          </a>
        </div>
      </section>

      <hr className="border-green-600 mx-8" />

      {/* Skills Section */}
      <section className="px-8 py-10">
        <h1 className="text-center text-3xl font-extrabold mb-6 tracking-widest">Skills</h1>
        <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "Node.js",
            "React",
            "Next.js",
            "Tailwind CSS",
          ].map((skill, index) => (
            <span
              key={index}
              className="bg-gray-400/5 border-x border-x-green-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-cyan-800 transition duration-300 select-none cursor-default font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>


      {/* Services Section */}
      <section className="px-8 py-10 bg-gray-400/5 border-y border-y-green-600 rounded-lg mx-8 text-center text-white">
        <h2 className="text-4xl font-bold mb-5 tracking-widest">Services Offered</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-10">
          I offer a range of services to meet your web development needs.
        </p>
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Custom Websites",
              description: "Build unique websites tailored to your business needs.",
            },
            {
              title: "Web Maintenance",
              description: "Ensure your website stays functional and updated.",
            },
            {
              title: "SEO Optimization",
              description: "Improve your website’s visibility on search engines.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className=" border-x border-x-green-600 bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-xl hover:bg-opacity-20 transition"
            >
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </section>


  {/* Hobbies Section */}
  <section className="px-8 py-10">
    <h2 className="text-center text-3xl font-extrabold mb-6 tracking-widest">Hobbies</h2>
    <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto ">
      {["Coding", "Gaming", "Praying", "Traveling", "Reading"].map((hobby, index) => (
        <span
          key={index}
          className="bg-gray-400/5 border-y border-y-green-600 text-white py-2 px-6 rounded-xl shadow-md hover:bg-gray-800 transition duration-300 select-none cursor-default font-medium"
        >
          {hobby}
        </span>
      ))}
    </div>
  </section>
  <hr className="border-green-600 mx-8 mt-12" />
  {/* Gallery Section with sliding arrows */}
  <section className="px-8 py-10 relative">
    <h2 className="text-center text-3xl font-extrabold mb-8 tracking-widest">Gallery Me</h2>

    {/* Left Arrow */}
    <button
      onClick={() => scroll("left")}
      aria-label="Scroll Left"
      className="absolute top-1/2 left-2 -translate-y-1/2 bg-green-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg z-20 transition"
    >
      &#8592;
    </button>

    {/* Right Arrow */}
    <button
      onClick={() => scroll("right")}
      aria-label="Scroll Right"
      className="absolute top-1/2 right-2 -translate-y-1/2 bg-green-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg z-20 transition"
    >
      &#8594;
    </button>

    <div
      ref={scrollRef}
      className="overflow-x-auto whitespace-nowrap snap-x snap-mandatory scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-800 scroll-smooth"
    >
      <div className="inline-flex gap-6 px-4">
        {images.map((image, index) => (
          <div
            key={index}
            className=" border-green-600 border-2 overflow-hidden rounded-lg shadow-lg snap-start w-64 h-48 flex-shrink-0 transform transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src={`/${image}`}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </section>
  <hr className="border-green-600 mx-8 mt-12" />
  {/* Contact Section */}
  <section className="px-8 py-5 mb-12 text-center max-w-3xl mx-auto">
    <div id="contact-me"></div>
    <h2 className="text-3xl font-extrabold mb-6 tracking-widest">Contact Me</h2>
    <p className="text-gray-400 mb-8 text-lg leading-relaxed">
      Interested in collaborating or hiring me? Feel free to reach out!
    </p>
    <div className="flex justify-center gap-5">
      <a
        href="mailto:browncemmanuel@gmail.com"
        className="bg-gray-00/50 border-x border-x-green-600 text-white py-5 rounded-lg shadow-lg hover:bg-cyan-800 transition duration-300"
      >
        Email Me ✉️
      </a>
      <a
        href="https://docs.google.com/document/d/1qOyfN6tep1N_eR8wgfoKTPxCeH7FP3e7J-VKJjwbeAI/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm bg-gray-400/5 border-x border-x-green-600 text-white py-5 px-2 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
      >
        Resume ☑️
      </a>
      <a
        href="https://wa.me/qr/RX4M5D4PGB7CO1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm bg-gray-400/5 border-x border-x-green-600 text-white py-5 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
      >
        Private Chat ☑️
      </a>
    </div>
  </section>
  </main>
  )}
  </>
  );
}
export default ProfileCard;
