"use client";

import { auth } from "@/auth";
import { Github, Instagram, Linkedin, } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ProfileCard = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <main className="z-50 max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg shadow-2xl mb-10 overflow-hidden text-white">
        {/* Header Section */}
        <div className="relative h-64 mt-10">
          <img
            src="/corevalue.png"
            alt="Header Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-100 flex items-center justify-center z-0 ">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white z-0">Brown Code</h1>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-8 lg:flex lg:justify-between lg:items-center z-50">
          <div className="flex flex-col items-center lg:items-start">
            <img
              src="/coderr.png"
              alt="Profile Picture"
              className="w-40 h-40 lg:h-52 lg:w-52 object-cover  rounded-full border-4 border-cyan-400 shadow-lg"
            />
            <div className="text-center lg:text-left mt-4">
              <h3 className=" text-xl font-serif font-semibold">Brown Oziomachi</h3>
              <h4>Company: <Link href="/" className="text-orange-400 underline">webwiz creation</Link></h4>
              <h2 className="text-3xl font-bold">Frontend Web Developer</h2>
              <p className="text-gray-400 mt-2">
                Passionate about crafting scalable and intuitive user experiences with modern web technologies.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 mt-6 lg:mt-0 justify-center lg:justify-start z-50">
            <a
              href="http://www.linkedin.com/in/brownoziomachi72a5a3229"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-600"
            >
             <Linkedin size={30} />
            </a>
            <a
              href="https://www.instagram.com/webwiz_creation_webdevelopers/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <Instagram size={30} />
            </a>
            <a
              href="https://github.com/Brown-Oziomachi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
            >
              <Github  size={30} />
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="px-8 py-10 z-50">
          <h1 className="text-center text-3xl font-extrabold mb-6">Skills</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {["HTML", "CSS", "JavaScript", "Node.js", "React", "Next.js", "Tailwind CSS"].map(
              (skill, index) => (
                <p
                  key={index}
                  className="bg-cyan-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-cyan-800 transition duration-300"
                >
                  {skill}
                </p>
              )
            )}
          </div>
        </div>

        {/* Services Section */}
        <div className="px-8 py-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-center z-50">
          <h2 className="text-4xl font-bold mb-4">Services Offered</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            I offer a range of services to meet your web development needs.
          </p>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Websites", description: "Build unique websites tailored to your business needs." },
              { title: "Web Maintenance", description: "Ensure your website stays functional and updated." },
              { title: "SEO Optimization", description: "Improve your website’s visibility on search engines." },
            ].map((service, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="px-8 py-10 z-50">
          <h2 className="text-center text-3xl font-extrabold mb-6">Hobbies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Coding", "Gaming", "Praying", "Traveling", "Reading"].map((hobby, index) => (
              <p
                key={index}
                className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
              >
                {hobby}
              </p>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
          <div className="px-8 py-10 z-50">
            <h2 className="text-center text-3xl font-extrabold mb-6">Gallery Me</h2>
            <div className="overflow-x-auto whitespace-nowrap snap-x snap-mandatory">
              <div className="grid lg:grid-flow-col gap-6">
                {["coderr.png", "bros.png", "men.png"].map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md inline-block w-64 shrink-0 snap-start">
              <img
                src={`/${image}`}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition duration-300"
              />
            </div>
                ))}
              </div>
            </div>
          </div>

               

          {/* Contact Section */}
        <div className="px-8 py- z-50 mb-10">
          <h2 className="text-center text-3xl font-extrabold mb-6">Contact Me</h2>
          <p className="text-center text-lg text-gray-300 mb-6">
            Interested in collaborating or hiring me? Feel free to reach out!
          </p>
          <div className="flex justify-center gap-5 z-50">
            <a
              href="mailto:browncemmanuel@gmail.com"
              className="bg-cyan-700 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-cyan-800 transition duration-300 cursor-pointer"
            >
              Email Me
            </a>
            <a
              href="https://docs.google.com/document/d/1qOyfN6tep1N_eR8wgfoKTPxCeH7FP3e7J-VKJjwbeAI/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
            >
              Resume
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileCard;
