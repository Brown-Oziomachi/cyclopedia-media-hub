"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import {
  ArrowRight,
  ArrowRightToLine,
  ChevronRight,
  LaptopMinimal,
  LoaderCircle,
  Palette,
  PersonStanding,
  Play,
  Store,
  Webhook,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ChatDropdown from "@/components/Chat";

const Page = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [session] = useState();
  const [showpopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setShowPopup(false);
  });

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-dvh z-50 bg-gradient-to-r from-black via-gray-800 to-gray-900">
          <h1 className="text-4xl lg:text-6xl font-extrabold z-50 tracking-wide leading-tight text-white relative"></h1>
          <LoaderCircle
            size="50"
            speed="1.10"
            color="white"
            className="animate-spin"
          />
          <img
            src="logo.png"
            alt="My Logo"
            className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
          />
        </div>
      ) : (
        <div className="py-20 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white rounded-tr-full rounded-ss-full relative overflow-hidden">
          {/* Hero Section */}
          <main className="flex flex-col justify-center items-center h-80 lg:h-200 text-center px-4 lg:px-0 ">
            <div className="space-y-2 ">
              {/* Webwiz Creation Title */}
              <h1 className="text-4xl font-bold lg:text-7xl max-md:mr-30 text-gray-400 max-md:mt-30">
                WEBWIZ{" "}
                <span className="text-white max-md:ml-50">CREATION</span>
              </h1>

              {/* The Sun Web Title */}
              <div className="flex items-center justify-center ">
                <h1
                  className="text-5xl font-bold text-white max-md:text-2xl flex items-center justify-center gap-2"
                >
                  The <span className="text-orange-400">Sun</span>Web
                </h1>
              </div>

              {/* Description Text */}
              <p className="text-lg lg:text-2xl text-gray-300 max-w-3xl mx-auto max-md:w-1/2">
                "Webwiz Creation 🌤️ Where the{" "}
                <span className="text-orange-400">Sun</span> Meets Your Vision"
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-2 group">
                <Link href="/contact">
                  <button className="cursor-pointer hover:text-xl bg-black flex gap-2 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg group-hover:bg-white group-hover:text-black ">
                    Get Started
                    <ArrowRightToLine />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="cursor-pointer hover:text-xl group-hover:bg-black group-hover:text-white bg-white flex gap-2 hover:bg-white text-black px-6 py-3 rounded-lg font-semibold transition-all shadow-lg group">
                    Learn More
                    <ChevronRight />
                  </button>
                </Link>
              </div>
            </div>

            <div className="max-md:mb-0"></div>
            <div className="flex gap-1 mt-2">
              <Link
                href="/youtubevideos"
                className="flex gap-1 bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white px-10 py-3 rounded-lg hover:bg-gray-700 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              >
                Watch Video
                <Play />
              </Link>
            </div>
          </main>
        </div>
      )}

      <div className="relative bg-gradient-to-b from-black to-gray-900 flex py-30 items-center justify-center">
        {/* Sun Glow (white pulse instead of orange) */}
        <div className="absolute w-40 h-40 rounded-full z-0 bg-white shadow-[0_0_80px_40px_rgba(255,255,255,0.5)] animate-pulse"></div>
      </div>

      <div className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb- py-1">
          <div>
            <h1
              className=""
            >
              Ready to Elevate Your Digital Presence?
            </h1>
          </div>
        </h2>

        <div className="text-lg text-gray-400 mx-auto mb-1">
          The <span className="text-orange-400">Sun</span> Web: Bringing Light
          to Your Digital Presence
        </div>
        <h4 className="text-3xl text-white">Why the Sun Web?</h4>
        <h5 className="lg:w-1/2 mx-auto text-white ">
          The sun is a universal symbol of growth, clarity, and inspiration. At
          Webwiz Creation, we channel this energy to help your ideas thrive.
          With personalized strategies, unparalleled creativity, and a
          commitment to excellence, we empower you to shine brighter in your
          industry
        </h5>
        <Link
          href={session ? "/contact" : "/auth/signin"}
          className="cursor-pointer"
        >
          <button className="bg-white flex mx-auto gap-2 cursor-pointer hover:bg-black hover:text-white hover:animate-pulse text-black px-8 py-4 text-lg rounded-lg font-bold shadow-lg transition-all">
            Connect
            <ArrowRight className="hover:animate-pulse" />
          </button>
        </Link>
      </div>

    {/* ACTION SECTION */}
      <div className="mx-auto px-6 lg:px-50 py-16 bg-black border border-amber-600 shadow-[0_0_40px_10px_rgba(255,165,0,0.3)] rounded-lg">
        <h2 className="text-center text-5xl font-extrabold text-white mb-6 animate-fade-in">
          Join WebWiz Today!
        </h2>
        <hr className="border-gray-700 mb-6" />
        <p className="text-center text-gray-400 text-lg max-w-3xl mx-auto leading-loose">
          WebWiz isn’t just a platform; it’s a radiant space where innovation meets opportunity. Like the sun illuminating all it touches, WebWiz empowers developers, innovators, and collaborators to shine.
        </p>
        <div className="text-center text-gray-300 lg:text-xl mt-8">
          <p className="py-2">
            WebWiz is your gateway to cutting-edge technology and creative innovations. We bring the warmth and energy of sunlight to individuals, businesses, and organizations striving to thrive in the digital era.
          </p>
          <p className="py-2">
            Whether you're a developer or a business, WebWiz is the sunlit hub for endless opportunities. Let us brighten your journey.
            <Link href="/registration">
              <p className="text-yellow-500 hover:text-cyan-400 underline inline-block mt-2">Register <span>here!</span></p>
            </Link>
          </p>
        </div>
      </div>

      {/* MOON SECTION */}
      <div className="bg-gradient-to-r from-orange-400 via-gray-950 to-black py-1 overflow-hidden">
        <div className="relative z-0 py-20 flex items-center justify-center">
          <div className="absolute w-64 h-64 rounded-full bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse"></div>
        </div>

        {[{
          title: "Why Your Business Needs a Professional Website",
          description:
            "In today’s digital age, a professional website isn’t just a nice-to-have—it’s a necessity. Discover why a stunning and functional online presence matters more than ever.",
          buttons: [
            { text: "Read More", href: "/lessons", icon: ChevronRight },
            { text: "Hire a Developer", href: "/developers", icon: PersonStanding },
            { text: "Get Started", href: "/contact", icon: ArrowRightToLine },
          ],
        }].map((item, index) => (
          <div
            key={index}
            className="bg-black z-50 p-5 rounded-lg shadow-lg hover:shadow-orange-500 transition border-l-4 border-black mb-10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-gray-400 mb-6">{item.description}</p>
            <div className="flex flex-wrap gap-4 group">
              {item.buttons.map((button, i) => (
                <Link key={i} href={button.href}>
                  <p className="group-hover:text-black px-4 py-2 bg-black text-white hover:text-white rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2">
                    {button.text} {button.icon && <button.icon />}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DIGITAL AGENCY SECTION */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-center text-5xl font-extrabold text-white mb-12 tracking-wide animate-fade-in">
          We Are More Than <br /> A Digital Agency
        </h2>
        <p className="text-center text-gray-400 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
          At the heart of our work lies passion and innovation. We are a vibrant team committed to delivering excellence in web development, design, and digital strategy.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            {
              img: "ourmission.png",
              title: "Our Mission",
              description: "Empowering businesses with innovative web solutions.",
              buttons: [{ text: "Learn More", href: "/about" }],
            },
            {
              img: "ourvision.png",
              title: "Our Vision",
              description: "To be the leading provider of cutting-edge web solutions.",
              buttons: [{ text: "Learn More", href: "/about" }],
            },
            {
              img: "corevalue.png",
              title: "Core Values",
              description: "Dedicated to building impactful online presences.",
              buttons: [{ text: "Learn More", href: "/about" }],
            },
            {
              img: "dev.png",
              title: "Discover Developers",
              description: "Web developers at Webwiz excel at turning ideas into reality.",
              buttons: [{ text: "Find Talent", href: "/developers" }],
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-950 hover:bg-gray-800 p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105 text-center group"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg mb-5 group-hover:opacity-80 transition duration-300"
              />
              <h3 className="text-2xl font-extrabold text-white group-hover:text-orange-500 transition duration-300 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                {item.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {item.buttons.map((button, btnIndex) => (
                  <Link key={btnIndex} href={button.href}>
                    <p className="flex gap-1 cursor-pointer px-4 py-2 bg-black hover:bg-orange-600 text-white font-medium rounded-full shadow-md transition duration-300">
                      {button.text} <ChevronRight />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SERVICES SECTION */}
        <div className="bg-gray-950 text-white py-20 mt-20">
          <h2 className="text-center text-5xl font-extrabold text-white mb-12 tracking-wide uppercase animate-fade-in">
            Explore Our Exceptional Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 bg-black w-full rounded-lg shadow-lg">
            {[
              {
                icon: <Palette className="mx-auto text-3xl" />,
                img: "webs des.png",
                title: "Website Design",
                description: "Crafting stunning, user-friendly websites tailored to your unique vision.",
              },
              {
                icon: <Webhook className="mx-auto text-3xl" />,
                img: "web main.png",
                title: "Website Maintenance",
                description: "Keeping your website secure, efficient, and running like clockwork.",
              },
              {
                icon: <Store className="mx-auto text-3xl" />,
                img: "digital marketing.png",
                title: "Digital Marketing",
                description: "Creating and optimizing online stores for maximum sales and engagement.",
              },
              {
                icon: <LaptopMinimal className="mx-auto text-3xl" />,
                img: "web dev.png",
                title: "Website Development",
                description: "Building powerful custom web applications and software solutions.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="group-hover:animate-bounce m-5">{service.icon}</div>
                {service.img && (
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full object-cover rounded-t-lg mb-3 group-hover:opacity-80 transition duration-300"
                  />
                )}
                <h3 className="text-center text-2xl font-bold mt-3 group-hover:text-cyan-400 transition">
                  {service.title}
                </h3>
                <p className="text-center text-gray-400 mt-3 group-hover:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <section className="mt-20 bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse">
          <div className="container mx-auto px-5 lg:px-20 text-center bg-black py-20">
            <h2 className="text-4xl font-bold text-white mb-5">Join Webwiz Today!</h2>
            <p className="text-lg text-gray-300 lg:w-2/3 mx-auto leading-relaxed">
              Webwiz isn't just a platform for developers; it's a space where you can uncover talent, collaborate, and thrive.
              <Link href="/registration">
                <span className="text-yellow-500 underline"> Register Now</span>
              </Link>
            </p>
            <div className="flex justify-center mt-8">
              <Link
                href={session ? "/contact" : "/auth/signin"}
                className="flex gap-2 bg-white text-black py-3 px-10 rounded-md text-lg font-semibold hover:bg-orange-600 shadow-lg transition-all"
              >
                Connect <ArrowRight className="hover:animate-bounce" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
      <ChatDropdown />
      <Footer className="h-dvh" />
    </>
  );
};

export default Page;