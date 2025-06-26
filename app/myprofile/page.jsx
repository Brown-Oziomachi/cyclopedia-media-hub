"use client";

import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

const ProfileCard = () => {
  const scrollRef = useRef(null);

  const images = [
    "coderr.png",
    "bros.png",
    "men.png",
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

  return (
    <main className="z-50 max-w-5xl mx-auto bg-gray-400/5  rounded-xl shadow-xl mb-12 overflow-hidden text-white font-sans">
      {/* Header Section */}
      <div className="relative h-64 mt-17 rounded-b-xl overflow-hidden">
        <img
          src="/web21.jpg"
          alt="Header Background"
          className="w-full lg:h-150 brightness-75 opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            Brown Code
          <p className="absolute text-sm font-light text-center">"The act of programming is the skill of controlling complexity"</p>
          </h1>
        </div>
      </div>

      {/* Profile Section */}
      <section className="p-8 lg:flex lg:justify-between lg:items-center space-y-8 lg:space-y-0">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md mx-auto lg:mx-0">
          <img
            src="/web19.jpg"
            alt="Profile Picture"
            className="w-40 h-40 lg:h-52 lg:w-52 object-cover rounded-full border-4 border-gray-400/5 shadow-lg transition-transform hover:scale-105"
          />
          <div className="mt-6 space-y-1">
            <h3 className="text-2xl font-serif font-semibold">Brown Oziomachi</h3>
            <div className="flex items-center justify-center gap-5">
            <h4 className="text-sm text-gray-300">
              <Link href="/" className="text-gray-400 underline hover:text-orange-500">
                webwiz creation
              </Link>
            </h4>
             <h4 className="text-sm text-gray-300">
              <Link href="/blog" className="text-gray-400 underline hover:text-orange-500">
                Wiz Blog
              </Link>
            </h4>
            </div>
            <h2 className="text-xl font-bold mt-2 text-gray-500">Full-Stack Developer|Python Developer|Data Scientist|</h2>
            <p className="text-gray-400 mt-3 leading-relaxed">
              Passionate about crafting scalable and intuitive user experiences with modern web
              technologies.
            </p>
          </div>
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

      <hr className="border-gray-700 mx-8" />

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
              className="bg-gray-400/5 border-x text-white py-2 px-5 rounded-lg shadow-md hover:bg-cyan-800 transition duration-300 select-none cursor-default font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-gray-700 mx-8" />

      {/* Services Section */}
      <section className="px-8 py-10 bg-gray-400/5 border-y rounded-lg mx-8 text-center text-white">
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
              className=" border-x bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-xl hover:bg-opacity-20 transition"
            >
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-700 mx-8 mt-12" />

      {/* Hobbies Section */}
      <section className="px-8 py-10">
        <h2 className="text-center text-3xl font-extrabold mb-6 tracking-widest">Hobbies</h2>
        <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto ">
          {["Coding", "Gaming", "Praying", "Traveling", "Reading"].map((hobby, index) => (
            <span
              key={index}
              className="bg-gray-400/5 border-y text-white py-2 px-6 rounded-xl shadow-md hover:bg-gray-800 transition duration-300 select-none cursor-default font-medium"
            >
              {hobby}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-gray-700 mx-8 mt-12" />

      {/* Gallery Section with sliding arrows */}
      <section className="px-8 py-10 relative">
        <h2 className="text-center text-3xl font-extrabold mb-8 tracking-wide">Gallery Me</h2>

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-cyan-700 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg z-20 transition"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-cyan-700 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg z-20 transition"
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
                className="overflow-hidden rounded-lg shadow-lg snap-start w-64 h-48 flex-shrink-0 transform transition-transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={`/${image}`}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-700 mx-8 mt-12" />

      {/* Contact Section */}
      <section className="px-8 py-10 mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 tracking-wide">Contact Me</h2>
        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
          Interested in collaborating or hiring me? Feel free to reach out!
        </p>
        <div className="flex justify-center gap-2">
          <a
            href="mailto:browncemmanuel@gmail.com"
            className="bg-gray-00/50 border-x text-white py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-800 transition duration-300"
          >
            Email Me✉️
          </a>
          <a
            href="https://docs.google.com/document/d/1qOyfN6tep1N_eR8wgfoKTPxCeH7FP3e7J-VKJjwbeAI/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-400/5 border-x text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
          >
            Resume☑️
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProfileCard;
