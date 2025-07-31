"use client";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

const imageData = [
    { src: "/Bill.jpg", title: "Only Three Jobs Will Survive AI", link: "https://webwizcreation-y7vx.vercel.app/blog/uo2soqxHXDFIlbocSpwN" },

    { src: "/ma1.jpg", title: "Jack Ma: Why I flew 15 hours just to visit Nigeria", link: "https://webwizcreation-y7vx.vercel.app/blog/crMFd0tsdFuVCLSRuYor" },
       { src: "/tech.jpg", title: "Jack Ma Calls for Wisdom and Innovation at World AI Conference", link: "https://webwizcreation-y7vx.vercel.app/blog/ZAVCyn24lV5brija4ahE" },
    { src: "/why.jpg", title: "Attitude is Everything, Best Motivational Speech by Jack Ma", link: "https://webwizcreation-y7vx.vercel.app/blog/TIcJic9GTFSypm63zqoR" },
  { src: "/ma.jpg", title: "Billionaire Jack Ma shows us how to be successful in our 20s, 30s, 40s and beyond", link: "https://webwizcreation-y7vx.vercel.app/blog/3W9lOrKuvHVimWAdB3qx" },

  { src: "/reno1.jpg", title: "Why Tithing Is a Big Scam in Christianity", link: "https://webwizcreation-y7vx.vercel.app/blog/I0dA4zrCTd7ik2dKiyil" },
  { src: "/sadhguru.jpg", title: "Higher Salary vs A Job You Enjoy: Which Should You Choose?", link: "https://webwizcreation-y7vx.vercel.app/blog/f21UAfA1F094wsO5FQt0" },
  { src: "/society.jpg", title: "How will you define a society without science and technology?", link: "https://webwizcreation-y7vx.vercel.app/blog/0mSBXAvjWZBSD5NfWHcb" },
  { src: "/reno2.png", title: "WHAT ARE YOUR THOUGHTS ON GOING TO CHURCH ON SUNDAY", link: "https://webwizcreation-y7vx.vercel.app/blog/ZaoGbdtKLBOHAXWTY1Fe" },
  { src: "/project.jpg", title: "Here are seven top coding projects to work on:", link: "https://webwizcreation-y7vx.vercel.app/blog/uMnLfrqwyE7C2xzPV6TJ" },
  { src: "/being.jpg", title: "THE PROBLEM OF FINDING A WORD FOR THE SUPREME BEING", link: "https://webwizcreation-y7vx.vercel.app/blog/uRpGwukHugfLW08Rthvh" },

  { src: "/wrong1.jpg", title: "The Wrong Thing At The Wrong Time", link: "https://webwizcreation-y7vx.vercel.app/blog/6PkM2Tw6h72Zx51CXhAb" },
  { src: "/sex.jpg", title: "Sex: Sacred or Sinful?", link: "https://webwizcreation-y7vx.vercel.app/blog/1HXqx2I2Sb7K6p5FWiel" },
  { src: "/marryme.jpg", title: "THINK BEFORE GETTING MARRIED", link: "https://webwizcreation-y7vx.vercel.app/blog/ODs7l1jjtQ6M3bTmtucY" },
  { src: "/web21.jpg", title: "MASTERING SKILLS: A STEP BY STEP GUIDE?", link: "https://webwizcreation-y7vx.vercel.app/blog/QmpY76ELg3ZSEiRoDIXI" },
 
];

const SupportCard = () => {
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const slidingImages = imageData.slice(0, 5); // first 5 slide vertically

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % slidingImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [slidingImages.length]);

  const handleImageClick = (img) => {
    setActiveImage(img);
  };

  const closeModal = () => {
    setActiveImage(null);
  };

  return (
    <main className="bg-black/90 min-h-screen text-white p-6">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen mt-20 bg-black">
          <h1 className="text-4xl font-extrabold mb-6">Loading <span className="text-green-600">Gallery</span></h1>
          <LoaderCircle size={50} className="animate-spin text-green-600" />
           <img
            src="logo.jpg"
            alt="My Logo"
            className="h-30 lg:h-30 mt-10 animate-pulse absolute top-50 left-0 right-0 bottom-0 mx-auto"
          />
        </div>
      ) : (
        <div className="max-lg:flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Left Vertical Scrolling/Sliding Section */}
            <h2 className="text-3xl font-semibold mb-4 mt-20 text-center border-x rounded-md">Learn From The <span className="font-serif text-green-700 line-clamp-3 gap-2 tracking-widest text-4xl">G a l l e r y</span></h2>
          <aside className="w-full max-md:h-64 bg-gray-400/5 rounded-lg p-4 flex flex-col items-center">
            <div className="relative h-100 w-full overflow-hidden rounded-md border border-white/20">
              {slidingImages.map((img, i) => (
                <div
                  key={i}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    i === scrollIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  onClick={() => handleImageClick(img)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="object-cover w-full h-full rounded cursor-pointer"
                  />
                  <div className="absolute top-0 left-0 right-0 bg-black/70 text-sm p-2 text-center">
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <div className="items-center justify-center flex border-b space-x-5 border-b-green-600">
            <img src="logo.jpg" alt="logo" className="w-5 h-5 mr-auto"/>
          <h1 className="text-2xl font-serif text-center mr-auto"><span className="text-4xl text-green-600">L</span>atest <span className="text-4xl text-green-600">U</span>pdates</h1>
          </div>
                <div>
              <h1
                className="font-bold font-serif text-center -mt-8 cursor-pointer text-green-700 lg:mt-5"
                onClick={() => {
            const el = document.getElementById("services-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Have something to Share? ⬇
              </h1>
            </div>
          {/* Main Grid Gallery */}
          <section className="w-full ">
            <h2 className="text-3xl font-bold mb-6 text-center"></h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imageData.map((img, index) => (
                <div
                  key={index}
                  className="cursor-pointer group relative"
                  onClick={() => handleImageClick(img)}
                >
                  <img src={img.src} alt={img.title} className="rounded-lg w-full h-40 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm text-center p-2 opacity-0 group-hover:opacity-100 transition">
                    {img.title}
                  </div>
                   <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs p-2 text-center">
                    {img.title}
                  </div>

                      <div className="flex items-center justify-center space-x-6">
                        <img src="logo.jpg" alt="logo" className="w-5 h-5 absolute top-0 right-6"/>
                    <p className="text-xs  text-gray-500 absolute top-0 right-0">
                       <span className="text-gray-800">
                       </span>wiz Blog</p>
                      </div>
                </div>
              ))}
               <div className="flex items-center justify-center gap-1"> 
              <Link href="/gallery">
            <h1 className="mt-10 text-center text-green-600 underline font-bold">UPDATING GALLERY </h1>
            </Link>
             <h2 className="animate-pulse text-5xl mt-3 text-green-600">.......</h2>
             </div>
            </div>
          </section>

          {/* Modal Popup */}
          {activeImage && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
              <div className="bg-black  text-black rounded-lg p-6 max-w-md w-full shadow-xl relative border border-white  border-x-10 border-b-10 border-s-10 border-b-green-600">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-green-600 font-bold bg-gray-400/5 border-x border-x-green-600 px-3 py-1 rounded hover:bg-red-600 tracking-widest font-serif"
                >
                  Close
                </button>
                <img src={activeImage.src} alt={activeImage.title} className="rounded w-full h-auto mb-4 " />
                <a href={activeImage.link} className="text-xl font-semibold mb-2 text-white text-center underline">{activeImage.title}</a>
                <div className="flex items-center justify-between mt-4">
                <a
                  href={activeImage.link}
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Visit Article →
                </a>
                <a href="/blog" className=" text-green-600 ">Wiz Blog →</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

       <div id="services-section"></div>
      <div className=" mt-10">
        <h1 className="font-bold font-serif">Have something to Share?</h1>
        <h2 className="font-mono">We value your thoughts and ideas! feel free to share your opinions, Suggestions, or topics you'd love to see on our <a href="/blog" className="text-green-600">blog.</a>.
          <h3>📩Reach out to us directly on WhatsApp:</h3>
        </h2>
          <a
           href="https://wa.me/message/R4UKUMFIH22RJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-green-600 cursor-pointer hover:underline"
          >Click here to chat</a>
      </div>
    </main>
  );
};

export default SupportCard;
