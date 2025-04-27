"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer';
import Popup from '@/components/Popup';
import { ArrowRightToLine,  ChevronRight, LoaderCircle, Share, Star } from 'lucide-react';



const Page = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [session] = useState();

     useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // adjust the timeout as needed
  
      return () => clearTimeout(timer);
    }, []);
 




 
  return (
    <>
     {loading ? (
                <div className="flex justify-center items-center h-dvh z-50 bg-gradient-to-r from-gray-900 via-black to-gray-800">
                 
                  <h1 className="text-4xl lg:text-6xl font-extrabold z-50 tracking-wide leading-tight text-white relative"></h1>
                  <LoaderCircle  size="50" speed="1.10" color="orange" className='animate-spin'/>
                  <img
                    src="logo.png"
                    alt="My Logo"
                    className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
                  />
                </div>
              ) : (
                
                <div className=" py-20  bg-gradient-to-r from-gray-950 via-black to-orange-400 text-white  rounded-tr-full rounded-ss-full relative overflow-hidden">
                {/* Hero Section */}
                <main className="flex flex-col justify-center items-center h-80 lg:h-200 text-center px-4 lg:px-0 ">
                  <div className="space-y-2 ">
                    {/* Webwiz Creation Title */}
                    <h1 className='text-4xl font-bold lg:text-7xl max-md:mr-30 text-gray-600'>
                        WEBWIZ <span className="text-orange-400 max-md:ml-50">CREATION</span>
                    </h1>
                     
                    
              <Popup/>
                    {/* The Moon Web Title */}
                    <div className="flex items-center justify-center ">
                      <h1 
                        className="text-5xl font-bold text-cyan-500 max-md:text-2xl flex items-center justify-center gap-2"
                        animate={{ x: [0, 100, -100, 0] }} // Moves left, right, left, back to start
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        The <span className="text-orange-400">Sun</span>Web
                      </h1>
                    </div>
              
                    {/* Description Text */}
                    <p className="text-lg lg:text-2xl text-gray-300 max-w-3xl mx-auto max-md:w-1/2">
                    "Webwiz Creation 🌤️ Where the <span className="text-orange-400">Sun</span> Meets Your Vision"

                    </p>
              
                  
              
                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-6">
                      <Link href="/contact">
                        <button className="bg-cyan-500 flex gap-2 hover:bg-gray-800 hover:text-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg">
                          Get Started
                        <ArrowRightToLine />
                        </button>
                      </Link>
                      <Link href="/about">
                        <button className="bg-gray-800 flex gap-2 hover:bg-gray-700 text-cyan-400 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg">
                          Learn More
                          <ChevronRight />
                        </button>
                      </Link>
                    </div>
                  </div>
                  </main>
              </div>
              
              )
            }
            
              

      <div className="relative  bg-gradient-to-b from-gray-900 to-black flex py-30 items-center justify-center">
      {/* Moon */}
      <div className="absolute w-64 h-64 rounded-full z-0 bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse"></div>
    </div>





      <div className="py-20 bg-gradient-to-r from-black via-gray-950 to-black  text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb- py-1">
        <div>
      <h1
      initial={{ x: -100 }}
      animate={{ x: 1 }}
      transition={{ duration: 10.20, ease: "easeOut", }}
      className=""
      >
          Ready to Elevate Your Digital Presence?
      </h1>
          </div>
        </h2>
        
        <div className="text-lg  text-gray-400  mx-auto mb-1">
        The Sun Web: Bringing Light to Your Digital Presence
        </div>
        <h4 className='text-3xl text-orange-400'>Why the Sun Web?</h4>
        <h5 className='lg:w-1/2 mx-auto text-gray-400 '>The sun is a universal symbol of growth, clarity, and inspiration. At Webwiz Creation,
           we channel this energy to help your ideas thrive. With personalized strategies, unparalleled creativity,
           and a commitment to excellence, we empower you to shine brighter in your industry</h5>
        <Link href={session ? "/contact" : "/auth/signin"}>
          <button className="bg-orange-500 flex mx-auto gap-2 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg font-bold shadow-lg transition-all">
            Connect
            <Share className='hover:animate-bounce' />
          </button>
        </Link>
      
</div>



          {/* ACTION SECTION */}
          <div className=" mx-auto px-6 lg:px-50 py-16 bg-black ">
            <h2 className="text-center text-4xl lg:text-5xl font-extrabold text-white mb-5">
              Join <span className="text-cyan-400">WebWiz Today!</span>
            </h2>
            <div className="text-center text-gray-300 lg:text-xl max-w-3xl mx-auto">
            WebWiz isn’t just a platform; it’s a radiant space where the brilliance of innovation meets opportunity. Like the sun illuminating all it touches, WebWiz empowers developers, innovators, and collaborators to shine. Connect with talent, showcase skills, and create revolutionary ideas that light up your business..
             
            </div>
            
              <div className="max-w-6xl mx-auto px-6 lg:px-20 ">
         
            <div className="text-center text-gray-300 lg:text-xl">
              <div className='py-5'>
                WebWiz is your gateway to cutting-edge technology and creative innovations. We bring the warmth and energy of sunlight to individuals, businesses, and organizations striving to thrive in the digital era. Our dynamic solutions help your vision flourish and illuminate new possibilities.
              </div>
              <div className='py-5'>
              Whether you're a developer seeking collaboration or a business searching for talent, WebWiz is the sunlit hub for endless opportunities and revolutionary ideas. Let us brighten your journey toward success.
                <Link href="/auth/signin">
                  <p className="text-yellow-400 underline">Join us today!</p>
                </Link>
              </div>
            </div>
            </div>
          </div>


      


          <div className="bg-gradient-to-r from-orange-400 via-gray-950 to-black py-1 overflow-hidden">
  <div>
    <div className="relative z-0 py-20  overflow-hidden">
      {/* Moon */}
      <div className="py-20 absolute w-64 h-64 max-md:h-20 max-md:w-20 rounded-full bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse"></div>
    </div>

    {/* Content Section */}
    {[{
      title: "Why Your Business Needs a Professional Website",
      description:
        "In today’s digital age, a professional website isn’t just a nice-to-have—it’s a necessity. Discover why a stunning and functional online presence matters more than ever.",
      buttons: [
        { text: "Read More", href: "/lessons", icon: ChevronRight },
        { text: "Hire a Developer", href: "/developers", icon: Star  },
      ],
    }].map((item, index) => (
      <div
        key={index}
        className="bg-black z-50 p-10 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-cyan-500 mb-10"
      >
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
          {item.title}
        </h3>
        <p className="text-gray-400 mb-6">{item.description}</p>
        <div className="flex flex-wrap gap-4">
          {item.buttons.map((button, btnIndex) => (
             <Link key={btnIndex} href={button.href}>
                <p className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2">
                  {button.text}
                  {button.icon && <button.icon />}
                </p>
              </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>



  <div className="container mx-auto px-5 lg:px-20 py-16">
    {/* Section Title */}
    <h2 className="text-center text-4xl lg:text-5xl font-extrabold text-cyan-400 mb-12 tracking-wide">
      We Are More Than <br /> A Digital Agency
    </h2>
    
    {/* Introductory Paragraph */}
    <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
      At the heart of our work lies passion and innovation. We are a vibrant
      team committed to delivering excellence in web development, design, and
      digital strategy. Let us help you unlock your potential in the digital
      realm.
    </p>
 
    {/* Grid Section */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {[
    {
      img: "ourmission.png",
      title: "Our Mission",
      description: "Empowering businesses with innovative web solutions.",
      buttons: [{ text: "Learn More", href: "/#" }],
    },
    {
      img: "ourvision.png",
      title: "Our Vision",
      description: "To be the leading provider of cutting-edge web solutions.",
      buttons: [{ text: "Explore", href: "/#" }],
    },
    {
      img: "corevalue.png",
      title: "Core Values",
      description: "Dedicated to building impactful online presences.",
      buttons: [{ text: "Discover", href: "/#core-value" }],
    },
    {
      img: "dev.png",
      title: "Discover Developers",
      description:
        "Web developers at Webwiz excel at turning ideas into reality.",
      buttons: [{ text: "Find Talent", href: "/developers" }],
    },
  ].map((item, index) => (
    
    <div
      key={index}
      className="bg-gray-900 hover:bg-gray-800 p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105 text-center group"
    >
      
      {/* Image */}
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-48 object-cover rounded-t-lg mb-5 group-hover:opacity-80 transition duration-300"
      />

      {/* Title */}
      <h3 className="text-2xl font-extrabold text-orange-400 group-hover:text-orange-500 transition duration-300 mb-3">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-5 ">
        {item.description}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {item.buttons.map((button, btnIndex) => (
          <Link key={btnIndex} href={button.href}>
            <p className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full shadow-md transition duration-300">
              {button.text}
            </p>
          </Link>
        ))}
      </div>
      
    </div>
  ))}
</div>



<div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16">
  <div className="container mx-auto px-5 lg:px-20">
    {/* Section Header */}
    <h2
      id="services-section"
      className="text-center text-4xl lg:text-5xl font-extrabold text-cyan-400 mb-12 tracking-wide uppercase animate-fade-in"
    >
      Explore Our Exceptional Services
    </h2>

    {/* Services Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      
      {[
        {
          title: "Web Design",
          description:
            "Crafting stunning, user-friendly websites tailored to your unique vision.",
        },
        {
          title: "Website Maintenance",
          description:
            "Keeping your website secure, efficient, and running like clockwork.",
        },
        {
       
          title: "Digital Marketing",
          description:
            "Helping you connect with your audience and expand your digital reach.",
        },
        {
         
          title: "Development",
          description:
            "Building powerful custom web applications and software solutions.",
        },
      ].map((service, index) => (
        <div
          key={index}
          className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
        >
          {/* Icon */}
          <div className="group-hover:animate-bounce">
            {service.icon}
          </div>
          {/* Title */}
          <h3 className="text-center text-2xl font-bold mt-3 group-hover:text-cyan-400 transition">
            {service.title}
          </h3>
          {/* Description */}
          <p className="text-center text-gray-400 mt-3 group-hover:text-gray-300">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  </div>

  <div className="">
          <div className="   flex items-center justify-center">
      {/* Moon */}
      <div className=" overflow-hidden rounded-full bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse"></div>
</div>
  {/* Join Us Section */}
  <section className=" b mt-10 bg-orange-400 shadow-[0_0_80px_40px_rgba(255,165,0,0.8)] animate-pulse ">
    <div className="container mx-auto px-5 lg:px-20 text-center bg-black py-20">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Join Webwiz Today!
      </h2>
      <p className="text-lg text-gray-300 lg:w-2/3 mx-auto leading-relaxed">
        Webwiz isn't just a platform for developers; it's a space where you can
        uncover talent, collaborate, and thrive. Connect with developers across
        diverse specialties and turn innovative ideas into reality.{" "}
        <Link href="/auth/signin">
          <span className="text-yellow-500 underline">Sign up now</span>
        </Link>
      </p>
    
      <div className="flex justify-center mt-8">
        <Link
          href={session ? "/contact" : "/auth/signin"}
          className=" flex  gap-2 bg-orange-500 text-white py-3 px-10 rounded-md text-lg font-semibold hover:bg-orange-600 shadow-lg transition-all"
        >
          Connect
          <Share className='hover:animate-bounce' />
        </Link>
      </div>
    </div>
  </section>
  
    </div>
  </div>
  </div>

  <Footer/>
  </>
  )
}
export default Page;
