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
              <div className="flex justify-center items-center h-screen bg-gray-400/5">
                <LoaderCircle size={50} speed={1.1} color="white" className="animate-spin" />
                <img
                        src="logo.jpg"
                        alt="My Logo"
                        className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
                      />
              </div>
            ) : (
        <div className="py-18 text-white relative overflow-hidden bg-gray-400/5">
          {/* Hero Section */}
          <div>
            <img
              src="web18.jpg"
              alt="image"
              className="w-full h-fit opacity-100 border-b-4 border-b-green-600"
            />
          </div>
          <main className=" flex flex-col justify-center items-center h- lg:h-2 text-center px-4 lg:px-0 max-lg:mt-10 opacity-100 lg:-mt-100">
            <div className="space-y-2 absolute">
              {/* Webwiz Creation Title */}

              <h1 className="text-4xl font-bold lg:text-7xl text-gray-400 -mt-80">
                WEBWIZ
                <span className="text-green-600">
                  {" "}
                  CREA<span className="text-green-600">TION</span>
                </span>
              </h1>
              {/* The Sun Web Title */}
              <div className="flex items-center justify-center ">
                {/* Sun Glow (white pulse instead of orange) */}

                <h1 className="text-5xl font-bold text-white max-md:text-2xl flex items-center justify-center border border-{animate-ping} border-green-600 border-r-white border-b-white py-2 px-10 bg-gray-900 rounded-md gap-5">
                  <div className="absolute w-10 h-10 rounded-full z-0 mr-75 max-md:ml-30 bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse"></div>
                  
                  <span className="text-green-600 "> | Sun </span>Web |
                </h1>
              </div>

              {/* Description Text */}
              <p className="text-lg lg:text-2xl text-gray-300 max-w-3xl mx-auto max-md:w-1/2">
                "Where the <span className="text-green-600">Sun</span> Meets
                Your Vision"
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-2 group">
                <Link href="/contact">
                  <button className="bg-gray-400/5 border-x border-x-green-600 cursor-pointer hover:text-xl flex gap-2 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg group-hover:bg-white group-hover:text-black ">
                    Get Started
                    <ArrowRightToLine className="text-green-600"/>
                  </button>
                </Link>
                <Link href="/about">
                  <button className="bg-gray-400/5 border-y border-y-green-600 cursor-pointer hover:text-xl flex gap-2 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg group-hover:bg-white group-hover:text-black ">
                    Learn More
                    <ChevronRight className="text-green-600"/>
                  </button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      )}

      <div className="relative bg-gray-400/5 mb-0  items-center justify-center"></div>
      {/* Mobile heading */}
      <h1 className="mt-10 text-4xl lg:text-6xl font-extrabold text-white tracking-wide lg:hidden text-center">
        Ready to Elevate Your Digital Presence?
      </h1>
      <div className="py-2 bg-gray-400/5 text-center lg:flex items-center justify-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb- py-1">
          <div>
            <img
              src="web20.jpg"
              alt="Elevate Your Digital Presence"
              className="mt-5 w-400 lg:h-200 rounded-t-lg group-hover:opacity-80 transition duration-300"
            />
          </div>
        </h2>
        <div className="lg:grid lg:space-y-10 lg:mt-50">
          {/* Desktop heading */}
          <h1 className="mt-20 text-4xl lg:text-6xl font-extrabold text-white tracking-wide text-center max-lg:hidden">
            Ready to Elevate <br /> Your Digital Presence?
          </h1>
          <div className="text-lg text-gray-400 mx-auto mb-1 border-b border-x border-x-green-600 border-b-green-600">
            The <span className="text-green-600">Sun</span> Web: Bringing Light
            to Your Digital Presence
          </div>
          <h4 className="text-3xl text-white">Why the Sun Web?</h4>
          <h5 className="lg:w-1/2 mx-auto text-white ">
            The sun is a universal symbol of growth, clarity, and inspiration.
            At Webwiz Creation, we channel this energy to help your ideas
            thrive. With personalized strategies, unparalleled creativity, and a
            commitment to excellence, we empower you to shine brighter in your
            industry
          </h5>
          <Link href="/contact" className="cursor-pointer">
            <button className="mb-10 shadow-2xl flex mx-auto gap-2 cursor-pointer hover:bg-white hover:text-black hover:animate-pulse text-white px-8 py-4 text-lg rounded-lg font-bold border-x border-x-green-600 transition-all">
              Connect
              <ArrowRight className="hover:animate-pulse text-green-600" />
            </button>
          </Link>
        </div>
      </div>

      {/* ACTION SECTION */}
      <div className="mx-auto px-6 lg:px-50 py-16 bg-gray-400/10 border-green-600 border-x-green-600  border shadow-[0_0_40px_10px_rgba(255,165,0,0.3)] rounded-lg">
        <h2 className="text-center text-5xl font-extrabold text-white mb-6 animate-fade-in">
          Join WebWiz Today!
        </h2>
        <img src="web5.jpg" alt="image" className="mx-auto" />
        <hr className="border-gray-700 " />
        <p className="text-center text-gray-400 max-w-3xl mx-auto leading-loose">
          WebWiz isn’t just a platform; it’s a radiant space where innovation
          meets opportunity. Like the sun illuminating all it touches, WebWiz
          empowers developers, innovators, and collaborators to shine.
        </p>

        <p className="py-2 text-center text-gray-400">
          Whether you're a developer or a business, WebWiz is the sunlit hub for
          endless opportunities. Let us brighten your journey.
          <Link href={session ? "/registration" : "/auth/signin"}>
            <p className="text-green-600 hover:text-cyan-400 underline ">
              Register <span>here!</span>
            </p>
          </Link>
        </p>
      </div>

      {/* MOON SECTION */}
      <div className=" py-1 overflow-hidden z-50">
        <div className="relative z-0 py-20 flex items-center justify-center mb-25">
          <div className="absolute w-20 h-20 rounded-full bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse"></div>
        </div>

        {[
          {
            title: "Why Your Business Needs a Professional Website",
            img: "web6.jpg",
            description:
              "In today’s digital age, a professional website isn’t just a nice-to-have—it’s a necessity. Discover why a stunning and functional online presence matters more than ever.",
            buttons: [
              { text: "Read More", href: "/lessons", icon: ChevronRight },
              {
                text: "Hire a Developer",
                href: "/developers",
                icon: PersonStanding,
              },
              { text: "Get Started", href: "/contact", icon: ArrowRightToLine },
            ],
          },
        ].map((item, index) => (
          <div className="items-center justify-center flex flex-col">
          <div
            key={index}
            className="bg-gray-400/10 z-0 p-5 -mt-15 rounded-lg flex flex-col items-center justify-center shadow-lg shadow-green-600 transition border-l-4 border-black mb-10 "
          >
            <h3 className="text-2xl font-bold text-white mb-4 z-50">
              {item.title}
            </h3>
            <img
              src={item.img}
              alt={item.title}
              className="w-fit ml-auto lg:h-200 rounded-t-lg mb-5 group-hover:opacity-80 transition duration-300"
            />{" "}
            <h6 className="text-gray-400 mb-6">{item.description}</h6>
            <div className="flex text-xs gap-4 group">
              {item.buttons.map((button, i) => (
                <Link key={i} href={button.href}>
                  <p className="group-hover:text-black px-4 py-2 bg-gray-400/5 border-x border-x-green-600 text-white hover:text-white rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-1">
                    {button.text} {button.icon && <button.icon  className="text-green-600"/>}
                  </p>
                </Link>
              ))}
            </div>
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
          At the heart of our work lies passion and innovation. We are a vibrant
          team committed to delivering excellence in web development, design,
          and digital strategy.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            {
              img: "web7.jpg",
              title: "Our Mission",
              description:
                "Empowering businesses with innovative web solutions.",
              buttons: [{ text: "Learn More", href: "/about" }],
            },
            {
              img: "web8.jpg",
              title: "Our Vision",
              description:
                "To be the leading provider of cutting-edge web solutions.",
              buttons: [{ text: "Learn More", href: "/about" }],
            },
            {
              img: "web17.jpg",
              title: "Core Values",
              description: "Dedicated to building impactful online presences.",
              buttons: [{ text: "Learn More", href: "/about" }],
            },
            {
              img: "web14.jpg",
              title: "Discover Developers",
              description:
                "Web developers at Webwiz excel at turning ideas into reality.",
              buttons: [{ text: "Find Talent", href: "/developers" }],
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-400/10 hover:bg-gray-800 p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105 text-center group"
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
                {item.buttons.map((button , btnIndex) => (
                  <Link key={btnIndex} href={button.href} >
                    <p className="flex gap-1 cursor-pointer px-4 py-2 bg-gray-400/5 border-x border-x-green-600 hover:bg-orange-600 text-white font-medium rounded-full shadow-md transition duration-300">
                      {button.text} <ChevronRight  className="text-green-600"/>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
          <div 
          showpopup
          id="/corevalue">Hello</div>
        {/* SERVICES SECTION */}
        <div id="services-section"></div>
        <div className=" text-white py-20 mt-20">
        <div id="services"></div>
          <h2 className="text-center text-5xl font-extrabold text-white mb-12 tracking-wide uppercase animate-fade-in">
            Explore Our Exceptional Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  w-full rounded-lg shadow-lg">
            {[
              {
                icon: <Palette className="mx-auto text-3xl" />,
                img: "web10.png",
                title: "Website Design",
                description:
                  "Crafting stunning, user-friendly websites tailored to your unique vision.",
              },
              {
                icon: <Webhook className="mx-auto text-3xl" />,
                img: "web12.png",
                title: "Website Maintenance",
                description:
                  "No worries, trust us we will Keep your website secure, efficient, and running like clockwork.",
              },
              {
                icon: <Store className="mx-auto text-3xl" />,
                img: "web15.jpg",
                title: "Digital Marketing",
                description:
                  "Creating and optimizing online stores for maximum sales and engagement.",
              },
              {
                icon: <LaptopMinimal className="mx-auto text-3xl" />,
                img: "web13.jpg",
                title: "Website Development",
                description:
                  "Building powerful custom web applications and software solutions.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-400/10 text-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="group-hover:animate-bounce m-5 text-green-600">
                  {service.icon}
                </div>
                {service.img && (
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full object-cover rounded-t-lg mb-3 group-hover:opacity-80 transition duration-300"
                  />
                )}
                <h3 className="text-center text-2xl font-bold mt-3 group-hover:text-cyan-400 transition text-white">
                  {service.title}
                </h3>
                <p className="text-center text-gray-400 mt-3 group-hover:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div id="/#services">
          <h1 className="text-2xl text-gray-400 text-center border-x underline cursor-pointer">
            MORE FEATURES
          </h1>
          <p className="text-center text-green-600 text-sm cursor-pointer ">
            view all the services we can offer{" "}
          </p>
          </div>
        </div>
        {/* CTA SECTION */}
        <section className="mt-20 bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.1)] animate-pulse">
          <div className="container mx-auto px-5 lg:px-20 text-center bg-black py-20 rounded-md">
            <h2 className="text-4xl font-bold text-white mb-5">
              Join Webwiz Today!
            </h2>
            <p className="text-lg text-gray-300 lg:w-2/3 mx-auto leading-relaxed">
              Webwiz isn't just a platform for developers; it's a space where
              you can uncover talent, collaborate, and thrive.
              <Link href={session ? "/registration" : "/auth/signin"}>
                <span className="text-green-600 underline"> Register Now</span>
              </Link>
            </p>
            <div className="flex justify-center mt-8">
              <Link
                href={session ? "/contact" : "/auth/signin"}
                className="flex gap-2 bg-black text-white py-3 px-10 rounded-md text-lg font-semibold hover:bg-orange-600 shadow-lg transition-all"
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
