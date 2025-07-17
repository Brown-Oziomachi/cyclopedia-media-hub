"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

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
    sessionStorage.setItem('popupShown', 'true');
  };


  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        sessionStorage.setItem('popupShown', 'true');
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
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-4 rounded-lg shadow-lg max-w-md relative z-50"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-green-200/15 border-2 border-green-600 text-gray-900 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 z-50">
                <h2 className="text-xl font-serif font-bold mb-4 text-center text-green-600 ">
                  Wiz Blog.
                </h2>
                <img
                  src="/web19.jpg"
                  alt="wiz blog image"
                  className="h-40 w-40 mx-auto"
                />

                <h1 className="font-bold font-serif py-2 text-center text-clip text-white">
                  Have something to Share?
                </h1>
                <h2 className="font-mono text-gray-400">
                  We value your thoughts and ideas! feel free to share your
                  opinions, Suggestions, or topics you'd love to see on our
                  blog.
                  <h3>📩Reach out to us directly on WhatsApp:</h3>
                  <a
                    href="https://wa.me/message/R4UKUMFIH22RJ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-green-600 cursor-pointer hover:underline"
                  >
                    Click here to chat
                  </a>
                </h2>
                <div className="flex justify-end mt-4 z-50">
                  <button
                    onClick={handleClose}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default Popup;
