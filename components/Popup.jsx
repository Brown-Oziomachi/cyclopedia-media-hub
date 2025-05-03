"use client";

import { LogIn } from "lucide-react";
import React, { useState, useEffect } from "react";

const Popup = () => {    
  const [showPopup, setShowPopup] = useState(false);
  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // Show popup after 5 seconds
    return () => clearTimeout(timer);
  }, []);


 


  return (
    <div >
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-orange-500 text-gray-900 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 z-50">
            <h2 className="text-xl font-bold mb-4">WEBWIZ CREATION.</h2>
            <img src="AI wiz.png" alt="" />
           
            <p className="text-black font-serif font-black z-50">
              Please sign in to explore all the features of our website.
            </p>
            <div className="flex justify-end mt-4 z-50">
              <button
                onClick={closePopup}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
              >
                Close
              </button>
              <p
                href="/auth/signin"
                className=" flex gap-1 ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Sign In
                <LogIn />
              </p>
            </div>
            <div>
            </div>
          </div>
        </div>
    )
      }
      </div>
  )
}


export default Popup;
