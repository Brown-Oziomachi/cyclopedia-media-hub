"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupShown", "true");
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        sessionStorage.setItem("popupShown", "true");
      }, 50000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center"
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full sm:w-1/2 mx-2 mb-4"
          >
            {/* SVG Moving Border */}
            <svg
              className="absolute top-0 left-0 w-full h-full z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect
                x="1"
                y="1"
                width="98"
                height="98"
                stroke="#22c55e"
                strokeWidth="2"
                fill="none"
                strokeDasharray="392" // 4 * (98)
                strokeDashoffset="392"
                style={{
                  animation: "draw-border 50s linear forwards",
                }}
              />
            </svg>

            {/* Popup Content */}
            <div className="relative bg-green-200/15 border-2 border-green-600 text-gray-900 p-4 rounded-t-xl shadow-lg z-20">
              <h2 className="text-xl font-serif font-bold mb-4 text-center text-green-600">
                Wiz Blog.
              </h2>
              <video
                width="640"
                height="360"
                autoPlay
                loop
                muted
                playsInline
                className="shadow-2xl shadow-gray-400 rounded-lg brightness-150 w-full"
              >
                <source src="wiz Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-center font-serif mt-5 text-white mb-2">
                <span className="text-3xl text-green-600">E</span>xplore unique insights, research, trends, stories, histories,
                news, politics and expert opinions.
              </p>
              <h1 className="font-bold font-serif py-2 text-center text-green-600">
                Have something to Share?
              </h1>
              <h2 className="font-mono text-gray-400">
                We value your thoughts and ideas! Feel free to share your
                opinions, suggestions, or topics you'd love to see on our blog.
                <br />
                <strong>📩 Reach out to us directly on WhatsApp:</strong>
                <br />
                <a
                  href="https://wa.me/+2348142995114?text=Hello,%20my%20name%20is%20[Your%20Name].%20I'd%20like%20to%20share%20some%20information%20with%20Wiz-Blog."
                  target="_self"
                  rel="noopener noreferrer"
                  className="font-bold text-green-600 cursor-pointer hover:underline text-center"
                >
                  Click here to chat
                </a>
              </h2>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleClose}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;