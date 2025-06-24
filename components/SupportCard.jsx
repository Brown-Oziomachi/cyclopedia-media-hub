"use client";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const imageData = [
  { src: "reno1.jpg", title: "Why Tithing Is a Big Scam in Christianity", link: "https://webwizcreation-y7vx.vercel.app/blog/I0dA4zrCTd7ik2dKiyil" },
  { src: "ma.jpg", title: "Billionaire Jack Ma shows us how to be successful in our 20s, 30s, 40s and beyond", link: "https://webwizcreation-y7vx.vercel.app/blog/3W9lOrKuvHVimWAdB3qx" },
  { src: "sadhguru.jpg", title: "Higher Salary vs A Job You Enjoy: Which Should You Choose?", link: "https://webwizcreation-y7vx.vercel.app/blog/f21UAfA1F094wsO5FQt0" },
  { src: "society.jpg", title: "How will you define a society without science and technology?", link: "https://webwizcreation-y7vx.vercel.app/blog/0mSBXAvjWZBSD5NfWHcb" },
  { src: "reno2.png", title: "WHAT ARE YOUR THOUGHTS ON GOING TO CHURCH ON SUNDAY", link: "https://example.com/image5" },
  { src: "project.jpg", title: "Here are seven top coding projects to work on:", link: "https://webwizcreation-y7vx.vercel.app/blog/uMnLfrqwyE7C2xzPV6TJ" },
  { src: "salary.jpg", title: "", link: "https://webwizcreation-y7vx.vercel.app/blog/f21UAfA1F094wsO5FQt0" },
  { src: "being.jpg", title: "THE PROBLEM OF FINDING A WORD FOR THE SUPREME BEING", link: "https://webwizcreation-y7vx.vercel.app/blog/uRpGwukHugfLW08Rthvh" },
];

const SupportCard = () => {
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const slidingImages = imageData.slice(0, 5); // first 5 slide vertically

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
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
    <main className="bg-gray-800 min-h-screen text-white p-6">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-extrabold mb-6">Loading Gallery</h1>
          <LoaderCircle size={50} className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Left Vertical Scrolling/Sliding Section */}
          <aside className="w-full lg:w-1/4 bg-gray-400/5 rounded-lg p-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 mt-10 border-x rounded-md font-serif">Learn from wise people</h2>
            <div className="relative h-64 w-full overflow-hidden rounded-md border border-white/20">
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
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-sm p-2 text-center">
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Grid Gallery */}
          <section className="w-full lg:w-3/4">
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
                </div>
              ))}
            </div>
          </section>

          {/* Modal Popup */}
          {activeImage && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-white text-black rounded-lg p-6 max-w-md w-full shadow-lg relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Close
                </button>
                <img src={activeImage.src} alt={activeImage.title} className="rounded w-full h-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{activeImage.title}</h3>
                <div className="flex items-center justify-between mt-4">
                <a
                  href={activeImage.link}
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Article →
                </a>
                <a href="/blog" className=" text-blue-600">Wiz Blog →</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default SupportCard;
