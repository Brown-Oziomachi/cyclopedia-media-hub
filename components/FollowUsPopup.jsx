"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook,UserX, Twitter,Youtube, Instagram, X, X as CloseIcon, SquareParking } from "lucide-react"; // using X for both twitter and close button

export default function FollowUsPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Follow Us Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="font-bold lg:px-5 lg:py-2 size-10 rounded-full shadow-lg hover:shadow-xl transition flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center">
          <p className="text-[10px] md:text-xs rotate-180 [writing-mode:vertical-rl] tracking-wider">
            Follow us
          </p>
          <UserX className="w-5 h-5 mt-2" />
        </div>
      </button>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm  bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-400 rounded-2xl p-6 shadow-2xl text-center relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <CloseIcon size={20} />
              </button>

              <h2 className="text-sm font-bold text-black mb-4">Follow Us</h2>

              <div className="flex gap-6 justify-center">
                {/* <a
        href="https://facebook.com"
        target="_self"
        className="text-blue-600 hover:scale-110 transition-transform"
      >
        <Facebook size={32} />
      </a> */}

                <a
                  href="https://x.com/cyclopedia_news?t=yU4JjJPlLO7Zp9GVoEaF5A&s=09"
                  target="_self"
                  className="text-black hover:scale-110 transition-transform"
                >
                  <Twitter size={32} />
                </a>

                <a
                  href="https://www.instagram.com/cyclopedia_news?igsh=MThvdDEwa3c3aGpsMQ=="
                  target="_self"
                  className="text-pink-500 hover:scale-110 transition-transform"
                >
                  <Instagram size={32} />
                </a>

                <a
                  href="https://www.youtube.com/@cyclopedia-media"
                  target="_self"
                  className="text-red-600 hover:scale-110 transition-transform"
                >
                  <Youtube size={32} />
                </a>
                <a
                  href="https://thecyclopedia.substack.com/subscribe"
                  target="_self"
                  className="text-red-600 hover:scale-110 transition-transform"
                >
                  <SquareParking size={32} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
